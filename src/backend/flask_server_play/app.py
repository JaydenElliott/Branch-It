# flask dependencies
from flask import Flask, app
from flask_restful import Api
import os
# local packages

from backend.flask_server_play._api.routes import create_routes
# external packages





def get_flask_app() -> app.Flask:
    """
    :return: app
    """

    # init flask
    flask_app = Flask(__name__)


    # init api and routes
    api = Api(app=flask_app)
    create_routes(api=api)

    # init mysql database
    # db = mysql

    return flask_app


if __name__ == '__main__':
    # Main entry point when run in stand-alone mode.
    app = get_flask_app()
    app.run(debug=True)