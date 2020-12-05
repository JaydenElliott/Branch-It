# flask dependencies
from flask import Flask, Blueprint, request, app, jsonify
from flask_cors import CORS

<<<<<<< HEAD
=======
from mysql_python_handler.mysql_communicator import MySQLCommunicator

app = Flask(__name__)
api = Blueprint("api",__name__)
>>>>>>> origin/34-BUILD-users-api
CORS(app)
# CORS(api)

# Setting up MySQLCommunicator
communicator : MySQLCommunicator = MySQLCommunicator()

# FIX: Replace with api.route(). Currrently blueprint is not working as intended.
@api.route("/users", methods=['GET'])
def get_user_details():
    '''
    @params e: email or id: user id.

    Returns user details excluding password
    '''
    if request.method == 'GET' and 'e' in request.args:
        email = request.args['e']
        res = communicator.get_user_details_from_email(email)

        if (res == None):
            # Nothing was retrieved form the database for the given parameters. Status code: not found (404)
            return "Error: email does not exist", 404    
        else:
            # Turn into json
            js = {
                'user_id':res[0][0],
                'username':res[0][1],
                'email':res[0][2],
                'access':res[0][3],
                'use_case':res[0][4],
                'phone':res[0][5],
                'time_of_deletion':res[0][7]
            }
        return jsonify(js), 200
    else:
        # No email provided, status code: bad request (400)
        return "Error: no email provided", 400

@api.route("/users/login", methods=['POST'])
def login():
    '''
    @data json: {email, password}
    
    Returns user details excluding the password if successful
    '''
    data = request.get_json()

<<<<<<< HEAD
=======
    # Check that the relevant data was provided
    if ('email' in data and 'password' in data):
        res = communicator.get_user_details_from_email(data['email'])

        # Check if passwords match
        if (res[0][6] == data['password']):
            # Match
            # Turn into json
            js = {
                'user_id':res[0][0],
                'username':res[0][1],
                'email':res[0][2],
                'access':res[0][3],
                'use_case':res[0][4],
                'phone':res[0][5],
                'time_of_deletion':res[0][7]
            }
            return jsonify(js), 200
        else:
            # Does not match. status code: unauthorized (401)
            return "Error: password does not match", 401
    else:
        # Either email or password were not provided, status code: bad request (400)
        return "Error: email and password must be provided", 400

>>>>>>> origin/34-BUILD-users-api
@api.route("/test_flask", methods=["GET", "POST"])
def helloWorld():
  return "worked!"


@api.route("/v1/login", methods=["POST"])
def get_login():
    content = request.get_json()
    print(content)
    return "Hello"

@api.route("/v1/signup", methods=["POST"])
def get_signup():
    content = request.get_json()
    print(content)
    return "Hello"

app.register_blueprint(api, url_prefix="/api")
<<<<<<< HEAD

=======
>>>>>>> origin/34-BUILD-users-api
if __name__ == '__main__':
    # Main entry point when run in stand-alone mode.
    # app = get_flask_app()
    app.run(host="0.0.0.0", debug=True, port=5000)
