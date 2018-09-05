import unittest
from app.commonResponses.game_array_response import return_game_array

test_games_array = [{"path": "Path1", "sync_path": "Path1", "found": False, "name": "Game 1"}, {"path": "Path2", "sync_path": "Path2", "found": False, "name": "Game 2"}]

expected_game_dict = {"game_list": [{"path": "Path1", "sync_path": "Path1", "found": False, "name": "Game 1"}, {"path": "Path2", "sync_path": "Path2", "found": False, "name": "Game 2"}]}

test_error = [{"Error": "No games found..."}]


class gameArrayResponseTestCase(unittest.TestCase):
    def test_returns_game_array(self):
        print("none")
        self.assertEqual(expected_game_dict, return_game_array(test_games_array), 'This should return a dict with an array of the games')
        self.assertEqual("No games found...", return_game_array(test_error), "this should return the error string")
