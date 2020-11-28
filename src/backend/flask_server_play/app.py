# flask dependencies
from flask import Flask, app
from flask_restful import Api
import os
# local packages

from backend.flask_server_play._api.routes import create_routes
# external packages


# Mysql config
# For connecting db later
mysql_details = {
    # Database connection (FIX: currently local)
    "host": "localhost",    # 18.221.221.228
    "user": "root",         # far
    "passwd": "password",   # Mysql_password2020

    # Databases
    "users_database":"Users",
    "treevys_database":"Treevys"
}


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