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

### Do not do this it's not reccomended in python3 see: https://docs.python.org/3.0/whatsnew/3.0.html#views-and-iterators-instead-of-lists
### save_database = list(map(load_game, save_database))
### Use a list comprehension like so
save_database = [load_game(game) for game in save_database]

### Functions to yield games to dict

## Simple function that returns all games
## Wont work for steam sync
def get_unsynced_games(gameDatabase = save_database, gsb_test = GSB_TEST):
    games = []
    game_paths = []
    if gsb_test == "1":
        for game in gameDatabase:
            game_checker(game, games, game_paths, "no")
            simple_pickler("write", game_paths)
            #g.append(game.to_dict())
        return games
    if gsb_test == "2":
        return [{"Error": "No games found on this machine"}]
    for game in gameDatabase:
        game.found = False
        if os.path.isdir(game.path) and game.found == False:
            game_checker(game, games, game_paths, "no")
    if not games:
        return [{"Error": "No games found on this machine"}]
    else:
        simple_pickler("write", game_paths)
        return games



### Check the OS and searches for the games in steam library's across all hard drives
## TODO: At the moment it can only search all drives in windows, add linux functionality
def get_synced_games(user_id, gameDatabase = save_database, gsb_test = GSB_TEST):
    games = []
    game_paths = []

    ## Check GSB_TEST env var
    if gsb_test == "1":
        for game in gameDatabase:
            game_checker(game, games, game_paths, "no", None)
            simple_pickler("write", game_paths)
        return games
    if gsb_test == "2": # pragma: no cover
        return [{"Error": "No games found on this machine"}]

    ### Windows game saves search
    if current_os.upper() == "WINDOWS": # pragma: no win cover
        drive_letters = win32api.GetLogicalDriveStrings().split("\000")[:-1]
        for game in gameDatabase:
            game.found = False

            # Replace XXXXX by user_id and check if path exists
            new_sync = game.sync_path.replace("XXXXX", str(user_id))
            if os.path.isdir(new_sync) and game.found == False:
                print("Found " + game.name + " at " + game.sync_path)
                game_checker(game, games, game_paths, "yes", new_sync)
            else:
                # Replace "C:\\" with other drives if there are other drives
                if len(drive_letters) > 1:
                    for drive in drive_letters:
                        new_path = new_sync.replace("C:\\", drive)
                        if os.path.isdir(new_path) and game.found == False:
                            print("Found " + game.name + " at " + new_path)
                            game_checker(game, games, game_paths, "yes", new_sync)
                        elif os.path.isdir(new_path) == False and game.found == False:
                            print("Couldn't find " + game.name + " at " + new_path)

        if not games:
            return  [{"Error": "No games found on this machine"}]
        else:
            simple_pickler("write", game_paths)
            return games
    ### Linux game saves search
    else:
        for game in gameDatabase:
            game.found = False
            # Replace XXXXX by user_id and check if path exists
            new_sync = game.sync_path.replace("XXXXX", str(user_id))
            if os.path.isdir(new_sync) and game.found == False:
                print("Found game at:" + new_sync)
                game_checker(game, games, game_paths, "yes", new_sync)
        if not games:
            return [{"Error": "No games found on this machine"}]
        else:
            simple_pickler("write", game_paths)
            return games



#### function to fetch all games
### # NOTE: It is reccomended to first check synced games and then the local paths,
### # since the local path exists even if the game is synced but the more recent saves,
### # will be  in the steam sync path

def get_all_games(user_id, game_database=save_database, gsb_test=GSB_TEST):
    games = []
    game_paths = []

    ### Windows game saves search
    if current_os.upper() == "WINDOWS": # pragma: no win cover
        drive_letters = win32api.GetLogicalDriveStrings().split("\000")[:-1]
        for game in save_database:
            game.found = False


            ## Synced Games ==========>
            # Replace XXXXX by user_id and check if path exists
            print("uid ====>",user_id)
            new_sync = game.sync_path.replace("XXXXX", user_id)
            print("new_sync =====>",new_sync)
            #print("searching", game.name, "at", new_sync)
            if os.path.isdir(new_sync) and game.found == False:
                game_checker(game, games, game_paths, "yes", new_sync)
                print("Found game at:", game.path)
            # else:
            #     print("Couldn't find", game.name, "at", new_sync)
            # Replace "C:\\" with other drives if there are other drives
            if len(drive_letters) > 1:
                for drive in drive_letters:
                    # No need to check C:\\ again
                    if drive != "C:\\":
                        new_path = new_sync.replace("C:\\", drive)
                        #print("searching", game.name, "at", new_path)
                        if os.path.isdir(new_path) and game.found == False:
                            game_checker(game, games, game_paths, "yes", new_path)
                            print("Found game at:", game.path)
                        # else:
                        #     print("Couldn't find", game.name, "at", new_path)


            ## Unsynced Games ===========>
            # If the game was not found by sync_path check local path
            #print("searching", game.name , "at", game.path)
            if os.path.isdir(game.path) and game.found == False:
                game_checker(game, games, game_paths, "no")
                print("Found game at:", game.path)
            # else:
            #     print("Couldn't find", game.name, "at", game.path)
            # check on other drives except C:\\
            if len(drive_letters) > 1:
                for drive in drive_letters:
                    if drive != "C:\\":
                        new_path = game.path.replace("C:\\", drive)
                        #print("searching", game.name, "at", new_path)
                        if os.path.isdir(new_path) and game.found == False:
                            game_checker(game, games, game_paths, "no", new_path)
                            print("Found game at:", game.path)
                        # else:
                        #     print("Couldn't find", game.name, "at", new_path)
            if game.found == False:
                print("didn't find", game.name)

        # Write the game paths to a pickle for later use, and return games
        simple_pickler("write", game_paths)
        return games


    ### Linux game saves search
    else:
        for game in save_database:
            game.found = False

            new_sync = game.sync_path.replace("XXXXX", user_id)
            if os.path.isdir(new_sync) and game.found == False:
                game_checker(game, games, game_paths, "yes", new_sync)
            else:
                print()
            if os.path.isdir(game.path) and game.found == False:
                game_checker(game, games, game_paths, "no", None)
            else:
                print("Couldn't find", game.name, "at", game.path)

        simple_pickler("write", game_paths)
        return games
