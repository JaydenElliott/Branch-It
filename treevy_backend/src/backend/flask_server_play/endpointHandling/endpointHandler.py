# API method imports
from backend.flask_server_play.endpointHandling.methods.testMethods import TestMethods
from backend.flask_server_play.endpointHandling.methods.listMethods import ListMethods
from backend.flask_server_play.endpointHandling.methods.loginMethods import LoginMethods
from backend.flask_server_play.endpointHandling.methods.userMethods import UserMethods

class makeEndpointHandler():
    """
    Factory that creates a functions which handle request endpoints

    Input: endpointType: see endpoint_Dict below for choice of input

    Returns: . . . 
    
    """

    def __init__(self, endpointType, httpRequest):
        self.httpRequest = httpRequest
        endpoint_Dict = {"lists": self.lists, "login": self.login, "user": self.user, "test": self.test}
        self.res = endpoint_Dict[endpointType]()


    def lists(self):
        handler = ListMethods(self.httpRequest)

        if self.httpRequest.method == "GET":
            return handler.getList()
        
        elif self.method == "POST":
            return handler.postList()
        
        else:
            errorDict = {statusCode: 405, errorMessage: "Method {} is not allowd.".format(self.httpRequest.method)}
            return makeHttpError(errorDict)
    

    
    def login(self):
        handler = LoginMethods(self.httpRequest)

        if self.httpRequest.method == "GET":
            return handler.getLogin()
        
        elif self.method == "POST":
            return handler.postLogin()
        
        else:
            errorDict = {statusCode: 405, errorMessage: "Method {} is not allowd.".format(self.httpRequest.method)}
            return makeHttpError(errorDict)
    

    def user(self):
        handler = UserMethods(self.httpRequest)
        if self.httpRequest.method == "GET":
            return handler.getUser()
        
        elif self.method == "POST":
            return handler.postUser()
        
        else:
            errorDict = {statusCode: 405, errorMessage: "Method {} is not allowd.".format(self.httpRequest.method)}
            return errorDict

    
    def test(self):
        handler = TestMethods(self.httpRequest)
        
        if self.httpRequest.method == "GET":
            return handler.getTest()
        
        elif self.method == "POST":
            return handler.postTest()
        
        else:
            errorDict = {statusCode: 405, errorMessage: "Method {} is not allowd.".format(self.httpRequest.method)}
            return errorDict
    

        