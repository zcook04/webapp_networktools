from routes.users import RegisterUser, LoginUser, AllUsers
from routes.devices import MyDevices, DeviceInfo
from routes.tools import IosGetConfig

from flask import Flask, render_template
from flask_restful import Api

from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

from Models import mongo_client

import os
from datetime import timedelta


BASE_DIR = os.path.abspath(os.path.dirname(__file__))

load_dotenv('.env')

MONGO_URI = os.getenv('MONGO_URI')
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
DEPLOYMENT_MODE = os.getenv('DEPLOYMENT_MODE')

# INIT APP
app = Flask(__name__, static_folder='../frontend/build/static',
            template_folder='../frontend/build')
api = Api(app)

# JWT CONFIG
app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=8)
jwt = JWTManager(app)

# INIT DB
app.config['MONGO_URI'] = MONGO_URI
mongo_client.init_app(app)


# TOOL ROUTES
api.add_resource(IosGetConfig,
                 '/api/v1/tools/ios/<string:command>')

# DEVICE ROUTES
api.add_resource(MyDevices, '/api/v1/mydevices')
api.add_resource(DeviceInfo, '/api/v1/mydevices/device/<string:device>')

# USER ROUTES
api.add_resource(RegisterUser, '/api/v1/user/register')
api.add_resource(LoginUser, '/api/v1/user/login')
api.add_resource(AllUsers, '/api/v1/users')


if DEPLOYMENT_MODE and DEPLOYMENT_MODE != 'DEV':
    @app.route("/")
    def index():
        return render_template('index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
