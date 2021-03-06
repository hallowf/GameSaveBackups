import pickle

### Simple function for pickling the games and the respective paths when they're found,
### to avoid making more calls to database
def simple_pickler(mode, object=False , path="game_paths.pckl"):
    if mode == "write" and object != False:
        with open(path, "wb") as pckl:
            pickle.dump(object, pckl, protocol=pickle.HIGHEST_PROTOCOL)
    elif mode == "read":
        with open(path, "rb") as pckl:
            paths = pickle.load(pckl)
            return paths


### This modifies the game_obj properties and appends to game_list and game_paths
### the modified versions
def game_checker(game_obj, game_list, game_paths, synced, path_to_sync=None):
    if synced == "yes" and path_to_sync is not None:
        game_obj.path = path_to_sync
        game_obj.sync_path = "yes"
    elif synced == "no" and path_to_sync != None:
        game_obj.path = path_to_sync
        game.obj.sync_path = "no"
    else:
        game_obj.sync_path = "no"
    game_obj.found = True
    game_dict = { "name": game_obj.name, "path": game_obj.path}
    game_paths.append(game_dict)
    game_list.append(game_obj.to_dict())
