# flask dependencies
from flask import Flask, Blueprint, json, request, app, jsonify
from flask_cors import CORS

from mysql_python_handler.mysql_communicator import MySQLCommunicator

app = Flask(__name__)
api = Blueprint("api",__name__)
CORS(app)
CORS(api)

# Setting up MySQLCommunicator
communicator : MySQLCommunicator = MySQLCommunicator()

@api.route('/lists', methods=['GET', 'POST'])
def get_lists():

    # Get request
    if request.method == 'GET':
        '''
        @params e: email.

        Returns all lists associated with user
        '''
        if 'e' in request.args:
            email = request.args['e']
            usr_id = communicator.get_user_id(email)
            if (usr_id == None):
                # Nothing was retrieved form the database for the given parameters. Status code: not found (404)
                return "Error: email does not exist", 404
            
            res = communicator.get_lists(usr_id)

            if (res == None):
                # Nothing was retrieved form the database for the given parameters. Status code: not found (404)
                return "Error: no lists found for user", 404
            else:
                # FIX: return a json which has appropriate key strings (currently are just numbers: 1, 2, etc.).
                # lists = []
                # for list in res:
                #     lists.append(json.dumps({ # Dumps simply outputs a string from this.
                #         'list_id':list[0],
                #         'user_id':list[1],
                #         'list':list[2]
                #     }))
                # print(lists)
                return jsonify(res), 200
        else:
            # No email provided, status code: bad request (400)
            return "Error: no email provided", 400
    
    # POST request
    elif request.method == 'POST':
        '''
        @data json: {email: string, list: json}.

        Returns id of newly added list.
        Warning: will not check if list structure or contents.
        '''

        data = request.get_json()
        if (data == None):
            return "Error: nothing provided", 400
        
        # First checks if email parameter is provided
        if 'email' in data:
            # Obtain user_id from email
            email = data['email']
            usr_id = communicator.get_user_id(email)
            if (usr_id == None):
                return "Error: email does not exist", 404
            
            # Then checks if list is provided
            if 'list' in data:
                # Insert the list
                list_id = communicator.insert_treevy(usr_id, data['list'])
                return str(list_id), 200
            else:
                return "Error: no list provided", 400
        else:
            return "Error: no email provided", 400


@api.route("/users", methods=['GET'])
def get_user_details():
    '''
    @params e: email.

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
    if (data == None):
            return "Error: nothing provided", 400
    
    # Check that the relevant data was provided
    if ('email' in data and 'password' in data):
        res = communicator.get_user_details_from_email(data['email'])

        if (res == None):
            return "Error: email does not exist", 404

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
if __name__ == '__main__':
    # Main entry point when run in stand-alone mode.
    # app = get_flask_app()
    app.run(host="0.0.0.0", debug=True, port=5000)