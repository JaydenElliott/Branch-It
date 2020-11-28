# Flask Resources
from flask import Response, request, jsonify
from flask_restful import Resource



class LogInAPI (Resource):
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
        login_information = request.get_json()
        
        # Validate username and password login_information["username"]

        
    

        return 


    
    def get(self) -> Response:

        """
        GET response method for displaying log-in page

        Authorisation not required

        :r
        """


        return ("Login-page-here")







    
