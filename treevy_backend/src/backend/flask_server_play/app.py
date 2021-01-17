# Flask
from flask import Flask, Blueprint, json, request, app, jsonify
from flask_cors import CORS

# To set up environment variables (MacOS and Linux, may not work on windows)
import sys
import os
sys.path.append(os.environ['PWD'] + '/endpointHandling')
sys.path.append(os.environ['PWD'] + '/endpointHandling/methods')
sys.path.append(os.environ['PWD'] + '/mysql_python_handler')

# API method factory
# To use: export PYTHONPATH="$PWD/flask_server_play/endpointHandling/" (just ensure you have the endpointHandling directory in your python path variable).
from backend.flask_server_play.endpointHandling.endpointHandler import makeEndpointHandler


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