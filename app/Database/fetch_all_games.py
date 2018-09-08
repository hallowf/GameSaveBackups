import os , pickle
import json
import platform
from app.Database.db_utilities import simple_pickler, game_checker
from app.utilities.id_converter import convert_id


### Check OS
current_os = platform.system()

### Check if in testing mode
GSB_TEST = os.environ.get('GSB_TEST', "0")

### If on windows import win32api
if current_os.upper() == "WINDOWS": # pragma: no win cover
    import win32api


### class for constructing game objects

class Game():
    def __init__(self, game_name, game_path, sync_path):
        self.name = game_name
        self.path = game_path
        self.sync_path = sync_path
        self.found = False
    def to_dict(self):
        self.name
        self.path
        self.sync_path
        return {"name": self.name, "path": self.path, "sync_path": self.sync_path, "found": self.found}


### The game database to load
save_database = json.load(open("app/Database/database.json"))

#save_database = json.load(open("Database/database.json"))


### Function to return game objects
def load_game(db_item):
    current_os = platform.system()
    path = ""
    sync_path = ""
    [name, win_path, win_sync, lin_path, lin_sync] = db_item
    if current_os.upper() == "WINDOWS": # pragma: no win cover
        sync_path = win_sync
        path = win_path
    else:
        sync_path = lin_sync
        path = lin_path
    return Game(name, os.path.expanduser(path), os.path.expanduser(sync_path))


### Assign to save_database a list with each game and it's attributes from the database
save_database = list(map(load_game, save_database))



### Functions to yield games to dict

## Simple function that returns all games
## Wont work for steam sync
def get_unsynced_games(gameDatabase = save_database, gsb_test = GSB_TEST):
    g = []
    game_paths = []
    if gsb_test == "1":
        for game in gameDatabase:
            game_checker(game, g, game_paths, "no", None)
            simple_pickler("write", game_paths)
            #g.append(game.to_dict())
        return g
    if gsb_test == "2":
        return [{"Error": "No games found on this machine"}]
    for game in gameDatabase:
        game.found = False
        if os.path.isdir(game.path) and game.found == False:
            game_checker(game, g, game_paths, "no", None)
    if not g:
        return [{"Error": "No games found on this machine"}]
    else:
        simple_pickler("write", game_paths)
        return g



### Check the OS and searches for the games in steam library's across all hard drives
## TODO: At the moment it can only search all drives in windows, add linux functionality
def get_synced_games(user_id, gameDatabase = save_database, gsb_test = GSB_TEST):
    user_id = convert_id(user_id)
    g = []
    game_paths = []
    if gsb_test == "1":
        for game in gameDatabase:
            game_checker(game, g, game_paths, "no", None)
            simple_pickler("write", game_paths)
        return g
    if gsb_test == "2": # pragma: no cover
        return [{"Error": "No games found on this machine"}]
    if current_os.upper() == "WINDOWS": # pragma: no win cover
        drive_letters = win32api.GetLogicalDriveStrings().split("\000")[:-1]
        for game in gameDatabase:
            game.found = False
            new_sync = game.sync_path.replace("XXXXX", str(user_id))
            for drive in drive_letters:
                if os.path.isdir(new_sync) and game.found == False:
                    print("Found " + game.name + " at " + game.sync_path)
                    game_checker(game, g, game_paths, "yes", new_sync)
                else:
                    new_path = new_sync.replace("C:\\", drive)
                    if os.path.isdir(new_path) and game.found == False:
                        print("Found " + game.name + " at " + new_path)
                        game_checker(game, g, game_paths, "yes", new_sync)
                    elif os.path.isdir(new_path) == False and game.found == False:
                        print("Couldn't find " + game.name + " at " + new_path)
        if not g:
            return  [{"Error": "No games found on this machine"}]
        else:
            simple_pickler("write", game_paths)
            return g
    else:
        for game in gameDatabase:
            game.found = False
            new_sync = game.sync_path.replace("XXXXX", str(user_id))
            if os.path.isdir(new_sync) and game.found == False:
                print("Found game at:" + new_sync)
                game_checker(game, g, game_paths, "yes", new_sync)
        if not g:
            return [{"Error": "No games found on this machine"}]
        else:
            simple_pickler("write", game_paths)
            return g
