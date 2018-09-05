
def return_game_array(games_array):
    for key in games_array[0].keys():
        if key == "Error":
            return games_array[0][key]
    else:
        return {"game_list": games_array}
