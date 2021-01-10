class UserMethods():
    '''
    Class to handle all the user RESTFUL API methods
    '''
    def __init__(self,httpRequest):
        self.httpRequest = httpRequest    

    def getUser(self):
        '''
        @params e: email.

        Returns user details excluding password
        '''
        if self.httpRequest.method == 'GET' and 'e' in self.httpRequest.args:
            email = self.httpRequest.args['e']
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

        def postUser(self):
            return
