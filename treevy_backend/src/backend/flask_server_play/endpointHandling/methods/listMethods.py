from flask import json, jsonify

class ListMethods():
    '''
    Class to handle all the to-do list RESTFUL API methods
    '''
    def __init__(self, httpRequest, communicator):
        self.httpRequest = httpRequest
        self.communicator = communicator

    def getList(self):
        '''
        @params e: email.

        Returns all lists associated with user
        '''
        if 'e' in self.httpRequest.args:
            email = self.httpRequest.args['e']
            usr_id = self.communicator.get_user_id(email)
            if (usr_id == None):
                # Nothing was retrieved form the database for the given parameters. Status code: not found (404)
                return "Error: email does not exist", 404
            
            res = self.communicator.get_lists(usr_id)

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
            # No email provided, status code: bad httpRequest (400)
            return "Error: no email provided", 400


    def postList(self):
        '''
        @data json: {email: string, list: json}.

        Returns id of newly added list.
        Warning: will not check list structure or contents.
        '''

        data = self.httpRequest.get_json()
        if (data == None):
            return "Error: nothing provided", 400
        
        # First checks if email parameter is provided
        if 'email' in data:
            # Obtain user_id from email
            email = data['email']
            usr_id = self.communicator.get_user_id(email)
            if (usr_id == None):
                return "Error: email does not exist", 404
            
            # Then checks if list is provided
            if 'list' in data:
                # Insert the list
                list_id = self.communicator.insert_treevy(usr_id, json.dumps(data['list']))
                if (list_id == None):
                    return "Error: unable to add list", 403
                return str(list_id), 200
            else:
                return "Error: no list provided", 400
        else:
            return "Error: no email provided", 400
    