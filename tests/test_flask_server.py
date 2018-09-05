import os
import unittest
import tempfile
import app as flask_server
from app.errorHandling.raise_invalid_usage import InvalidUsage

GSB_TEST = os.environ.get("GSB_TEST", "0")


class FlaskServerTestCase(unittest.TestCase):
    """docstring for FlaskServerTestCase."""
    def __init__(self, *args):
        super().__init__(*args)
        flask_server.app.config["TESTING"] = True
        self.client = flask_server.app.test_client()

    def test_api_routes(self):
        route1 = self.client.get("/api/games?all_games=no&user_id=no_id")
        route2 = self.client.get("/api/games?all_games=no&user_id=STEAM_0:1:35807358")
        self.assertEqual(200, route1.status_code, "Status code should be 200")
        self.assertEqual(200, route2.status_code, "Status code should be 200")

    def test_no_games_response(self):
        if GSB_TEST == "1":
            os.environ["GSB_TEST"] = "0"
            route1 = self.client.get("/api/games?all_games=no&user_id=no_id&route_testing=1")
            self.assertEqual(418, route1.status_code, "Status code should be 418")

    def test_api_invalid_usage(self):
        route1 = self.client.get("/api/games?all_games=no&user_id=some_wrong_id")
        self.assertEqual(400, route1.status_code, "Status code should be 400")



if __name__ == "__main__":
    unittest.main()
