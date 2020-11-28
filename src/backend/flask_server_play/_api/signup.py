# Flask Resources
from flask import Response, request, jsonify
from flask_restful import Resource


# Project Resources
from backend.flask_server_play._api.users import Users
# from api.errors import forbidden

class SignUpAPI (Resource):
    """
    Flask restful resource for sign-up
    @param Resource: flask restful class that defines get,push ... methods
    """


    def put(self) -> Response:
        """
        PUT response method for creating a user

        Authorisation not required

        :returns user_info dictionary for mysql server
        """

        # Gather user info
        user_information = request.get_json()

        # Check for empty fields
        for item in user_information.items():
            if item == "":
                # return forbidden()
                return

        user = Users(user_information)
        user.save_data(user_dict=user_information)

        return ("Thank you {} , enjoy TREEVY!".format(user_information["name"]))


    
    def get(self) -> Response:

        """
        get response method for displaying sign-up page

        Authorisation not required

        :r
        """


        return ("Sign-up page here")







    
