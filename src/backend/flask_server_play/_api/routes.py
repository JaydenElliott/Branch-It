from flask_restful import Api
# project resources
from backend.flask_server_play._api.signup import SignUpAPI


def create_routes(api: Api):
    """
    Adds resources to the api.
    :param api: Flask-RESTful Api Object
    """
    api.add_resource(SignUpAPI, '/api/v1/signup/')
    # api.add_resource(LoginApi, '/api/v1/signup/login/')
