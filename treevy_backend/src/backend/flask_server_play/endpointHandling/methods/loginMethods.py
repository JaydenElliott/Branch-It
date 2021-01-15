from flask import jsonify

class LoginMethods():
    '''
    Class to handle all the login RESTFUL API methods
    '''
    def __init__(self, httpRequest, communicator):
        self.httpRequest = httpRequest
        self.communicator = communicator

    def getLogin(self):
        return "Login GET successful"

        
    def postLogin(self):
        '''
        @data json: {email, password}
        
        Returns user details excluding the password if successful
        '''
        data = self.httpRequest.get_json()
        if (data == None):
                return "Error: nothing provided", 400
        
        # Check that the relevant data was provided
        if ('email' in data and 'password' in data):
            res = self.communicator.get_user_details_from_email(data['email'])

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
