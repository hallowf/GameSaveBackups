import unittest, json, platform, os, shutil
from app.Database.fetch_all_games import get_unsynced_games, get_synced_games, load_game

GSB_TEST = os.environ.get('GSB_TEST', "0")

## Get the current system
current_os = platform.system()

def make_test_paths(): # pragma: no cover
    paths = ["WinPath1", "WinPath2", "LinPath1", "LinPath2"]
    for path in paths:
        if not os.path.exists(path):
            os.mkdir(path)

def remove_test_paths(): # pragma: no cover
    paths = ["WinPath1", "WinPath2", "LinPath1", "LinPath2"]
    for path in paths:
        if os.path.exists(path):
            os.rmdir(path)

## Load testing game database
test_database = json.load(open("tests/test_database.json"))

## Map the games to a list
test_games = list(map(load_game, test_database))

## Check the os and match the paths accordingly
if current_os.upper() == "WINDOWS": # pragma: no win cover
    expected_unsynced_dict = [{"path": "WinPath1", "sync_path": "no", "found": True, "name": "Game 1"}]
    expected_synced_dict= [{"path": "WinPath1", "sync_path": "yes", "found": True, "name": "Game 1"}]
else:
    expected_unsynced_dict = [{"path": "LinPath1", "sync_path": "no", "found": True, "name": "Game 1"}]
    expected_synced_dict = [{"path": "LinPath1", "sync_path": "yes", "found": True, "name": "Game 1"}]



class fetchAllGamesTestCase(unittest.TestCase):
    """docstring for fetchAllGamesTestCase."""

    def setUpClass():
        make_test_paths()

    def tearDownClass():
        remove_test_paths()


    def test_load_games(self):
        self.assertEqual("Game 1", load_game(test_database[0]).name, "The game name should be Game 1")

    def test_load_games_path_change(self):
        if current_os.upper() == "WINDOWS": # pragma: no win cover
            self.assertEqual("WinPath1", load_game(test_database[0]).path, "The path attribute should be equal to Win/Path1")
        else:
            self.assertEqual("LinPath1", load_game(test_database[0]).path, "The path attribute should be equal to Lin/Path1")

    def test_get_unsyced_games(self):
        self.assertCountEqual(expected_unsynced_dict, get_unsynced_games(test_games, 0), "This should return the variable expected_unsynced_dict")

    def test_get_synced_games(self):
        self.assertCountEqual(expected_synced_dict, get_synced_games("STEAM_0:1:35807358", test_games, 0), 'message')
