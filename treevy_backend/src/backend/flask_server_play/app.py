# Flask
from flask import Flask, Blueprint, json, request, app, jsonify
from flask_cors import CORS

# API method factory
from backend.flask_server_play.endpointHandling.endpointHandler import makeEndpointHandler

# SQL
from backend.flask_server_play.mysql_python_handler.mysql_communicator import MySQLCommunicator


# Flask Setup
app = Flask(__name__)
api = Blueprint("api",__name__)
CORS(app)
CORS(api)


# Route APIs
@api.route('/lists', methods=['GET', 'POST'])
def listsController():
    endpoint = makeEndpointHandler("lists", request)
    return endpoint.res


@api.route('/login', methods=['GET', 'POST'])
def loginController():
    endpoint = makeEndpointHandler("login", request)
    return endpoint.res


@api.route('/user', methods=['GET', 'POST'])
def userController():
    endpoint = makeEndpointHandler("user", request)
    return endpoint.res


@api.route('/test', methods=['GET', 'POST'])
def testController():
    endpoint = makeEndpointHandler("test", request)
    return endpoint.res


# Generate url prefix
app.register_blueprint(api, url_prefix="/api")
if __name__ == '__main__':
    # Main entry point when run in stand-alone mode.
    # app = get_flask_app()
    app.run(host="0.0.0.0", debug=True, port=5000)