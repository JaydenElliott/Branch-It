# flask dependencies
from flask import Flask, app
from flask_cors import CORS
from flask import Blueprint, request

app = Flask(__name__)
api = Blueprint("api",__name__)
app.register_blueprint(api, url_prefix="/api")
CORS(app)

@api.route("/test_flask", methods=["POST"])
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

if __name__ == '__main__':
    # Main entry point when run in stand-alone mode.
    # app = get_flask_app()
    app.run(host="0.0.0.0", debug=True, port=5000)