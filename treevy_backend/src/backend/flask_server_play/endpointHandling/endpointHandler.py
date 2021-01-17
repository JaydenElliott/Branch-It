# API method imports
from backend.flask_server_play.endpointHandling.methods.listMethods import ListMethods
from backend.flask_server_play.endpointHandling.methods.loginMethods import LoginMethods
from backend.flask_server_play.endpointHandling.methods.userMethods import UserMethods

# SQL
from backend.flask_server_play.mysql_python_handler.mysql_communicator import MySQLCommunicator

class makeEndpointHandler():
    """
    Factory that creates a functions which handle request endpoints

    Input: endpointType: see endpoint_Dict below for choice of input

    Returns: . . . 
    
    """

    def __init__(self, endpointType, httpRequest):
        self.httpRequest = httpRequest
        endpoint_Dict = {"lists": self.lists, "login": self.login, "user": self.user, "test": self.test}

        # MySQL
        self.communicator = MySQLCommunicator()

        # Handlers
        self.listMethods = ListMethods(self.httpRequest, self.communicator)
        self.loginMethods = LoginMethods(self.httpRequest, self.communicator)
        self.userMethods = UserMethods(self.httpRequest, self.communicator)
        self.testMethods = TestMethods(self.httpRequest, self.communicator)

        self.res = endpoint_Dict[endpointType]()


    def lists(self):
        if self.httpRequest.method == "GET":
            return self.listMethods.getList()
        
        elif self.httpRequest.method == "POST":
            return self.listMethods.postList()
        
        else:
            errorDict = {statusCode: 405, errorMessage: "Method {} is not allowd.".format(self.httpRequest.method)}
            return makeHttpError(errorDict)
    

    
    def login(self):
        if self.httpRequest.method == "GET":
            return self.loginMethods.getLogin()
        
        elif self.method == "POST":
            return self.loginMethods.postLogin()
        
        else:
            errorDict = {statusCode: 405, errorMessage: "Method {} is not allowd.".format(self.httpRequest.method)}
            return makeHttpError(errorDict)
    

    def user(self):
        if self.httpRequest.method == "GET":
            return self.userMethods.getUser()
        
        elif self.method == "POST":
            return self.userMethods.postUser()
        
        else:
            errorDict = {statusCode: 405, errorMessage: "Method {} is not allowd.".format(self.httpRequest.method)}
            return errorDict

    
    def test(self):
        if self.httpRequest.method == "GET":
            return self.testMethods.getTest()
        
        elif self.method == "POST":
            return self.testMethods.postTest()
        
        else:
            errorDict = {statusCode: 405, errorMessage: "Method {} is not allowd.".format(self.httpRequest.method)}
            return errorDict
    

        