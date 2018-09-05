import eventlet, os
eventlet.monkey_patch()
from app import app
from flask_cors import CORS
from raven.contrib.flask import Sentry


### App parameters
app.config['SECRET_KEY'] = 'secret!'

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
sentry = Sentry(app, dsn='https://0fefacd0609d400981c0ddec3fbe806b:47f1ea6778ad45d28e928c3bfb945c67@sentry.io/1264488')


# Run app

if __name__ == "__main__":
    port = int(os.environ.get("PORT", "2890"))
    app.run( host="0.0.0.0",port=port, debug=True)
