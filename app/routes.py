from flask import Flask, request, jsonify, send_from_directory
from app import app
from app.Database.db_utilities import simple_pickler
from app.Database.fetch_all_games import get_synced_games, get_unsynced_games, get_all_games
from app.errorHandling.raise_invalid_usage import InvalidUsage
from app.commonResponses.game_array_response import return_game_array
from app.utilities.id_converter import convert_id
from app.utilities.backup_generator import make_backups_to_zip
import os, json


### Register Error handler
@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


### Reactjs routes
@app.route("/")
def serve_static_index():
    return send_from_directory("static/build/", "index.html")

@app.route("/static/css/<path:path>")
def serve_static_css(path):
    return send_from_directory("static/build/static/css/", path)

@app.route("/static/js/<path:path>")
def serve_static_js(path):
    return send_from_directory("static/build/static/js/", path)

### Images used for styles
@app.route("/static/images/<path:path>")
def serve_style_images(path):
    return send_from_directory("static/images/", path)

### Game Screenshots
@app.route("/static/images/gameimgs/<path:path>")
def serve_game_screenshots(path):
    return send_from_directory("static/images/gameimgs/", path)


### Api routes

## ** Notes ** ##

## If the user inputs an incorrect value for the user_id the convert_id function raises an exception

## The functions that fetch the games from the database should always return a list with dicts
## In case no games are found the list must contain one dict and one key inside with the value "Error"

## All exceptions are handled by the InvalidUsage class
## To avoid further errors this route should always raise the class mentioned above if something fails


@app.route("/api/games")
def game_responses():
    # Get all arguments
    user_id = request.args.get("user_id")
    all_games = request.args.get("all_games")
    route_testing = request.args.get("route_testing")

    # Return game array based in arguments
    if user_id == "no_id":
        if route_testing == "1":
            unsynced_games = get_unsynced_games(gsb_test="2")
        elif route_testing == "2":
            unsynced_games = get_unsynced_games(gsb_test="1")
        else:
            unsynced_games = get_unsynced_games()
        unsynced_array = return_game_array(unsynced_games)
        if unsynced_array == "No games found on this machine":
            raise InvalidUsage(unsynced_array, status_code=418)
        else:
            return jsonify(unsynced_array)
    else:
        if all_games == "yes": # pragma: no cover
            try:
                converted_id = convert_id(user_id)
            except ValueError as e:
                raise InvalidUsage(str(e), status_code=400)
            all_games = get_all_games(converted_id)
            all_games_array = return_game_array(all_games)
            if all_games_array == "No games found on this machine":
                raise InvalidUsage(unsynced_array, status_code=418)
            else:
                return jsonify(all_games_array)

        else:
            ## ** all_games = No, user_id = (user input) ** ##
            try:
                converted_id = convert_id(user_id)
            except ValueError as e:
                raise InvalidUsage(str(e), status_code=400)
            if route_testing == "1":
                synced_games = get_synced_games(converted_id, gsb_test="2")
            elif route_testing == "2":
                synced_games = get_synced_games(converted_id, gsb_test="1")
            else:
                synced_games = get_synced_games(converted_id)
                synced_array = return_game_array(synced_games)
                if synced_array == "No games found on this machine":
                    raise InvalidUsage(synced_array, status_code=418)
                else:
                    return jsonify(synced_array)

@app.route("/api/backup", methods=["POST"])
def backup_games():
    game_list = json.loads(request.data.decode("utf-8"))
    game_paths = simple_pickler(mode="read")
    games_received = [ game for i, game in enumerate(game_list) if game_list[game] == True]
    games_to_backup = []
    for game in game_paths:
        if game["name"] in games_received:
            games_to_backup.append({"name": game["name"], "path": game["path"]})
    make_backups_to_zip(games_to_backup)
    print(games_to_backup)
    return "ok"
