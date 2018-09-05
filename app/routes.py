from flask import Flask, request, jsonify, send_from_directory
from app import app
from app.Database.fetch_all_games import get_synced_games, get_unsynced_games
from app.errorHandling.raise_invalid_usage import InvalidUsage
from app.commonResponses.game_array_response import return_game_array
from app.utilities.id_converter import convert_id
import os


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
def games():
    # Get all arguments
    user_id = request.args.get("user_id")
    all_games = request.args.get("all_games")
    route_testing = request.args.get("route_testing")

    # Check if in testing mode
    if route_testing == "1":
        unsynced_games = get_unsynced_games(gsb_test="2")
        if user_id != "no_id":
            try:
                synced_games = get_synced_games(convert_id(user_id), gsb_test="2")
            except ValueError as e:
                raise InvalidUsage(str(e), status_code=400)
    else:
        unsynced_games = get_unsynced_games()
        if user_id != "no_id":
            try:
                synced_games = get_synced_games(convert_id(user_id))
            except ValueError as e:
                raise InvalidUsage(str(e), status_code=400)

    # Return game array based in arguments
    if user_id == "no_id":
        unsynced_array = return_game_array(unsynced_games)
        if unsynced_array == "No games found on this machine":
            raise InvalidUsage(unsynced_array, status_code=418)
        else:
            return jsonify(unsynced_array)
    else:
        # # TODO: Not implemented
        if all_games == "yes": # pragma: no cover
            try:
                converted_id = convert_id(user_id)
                games_array = "Null" # get_all_games(converted_id) ##FIXME: this function does not exist
                raise InvalidUsage("Not implemented", status_code=501)
            except ValueError as e:
                raise InvalidUsage(str(e), status_code=400)
        else:
            ## ** all_games = No, user_id = (user input) ** ##
            synced_array = return_game_array(synced_games)
            if synced_array == "No games found on this machine":
                raise InvalidUsage(synced_array, status_code=418)
            else:
                return jsonify(synced_array)
