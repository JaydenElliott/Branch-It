class TestMethods():
    '''
    Class to handle all the test RESTFUL API methods
    '''
    def __init__(self, httpRequest, communicator):
        self.httpRequest = httpRequest
        self.communicator = communicator
        
    def getTest(self):
        return {"item": "do the washing", "statusCode": 200, "method": self.httpRequest.method}

    def postList(self):
        print(self.httpRequest.get_json())
        return {note: "post successful", statusCode: 200}
