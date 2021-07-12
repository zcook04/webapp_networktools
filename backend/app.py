from routes.users import RegisterUser, LoginUser
from routes.devices import MyDevices
from routes.tools import RunningConfiguration

from Models import db

from flask import Flask
from flask_restful import Api

from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

import os


BASE_DIR = os.path.abspath(os.path.dirname(__file__))
load_dotenv(BASE_DIR, '.env')

# INIT APP
app = Flask(__name__, static_folder='../frontend/build/static',
            template_folder='../frontend/build')
api = Api(app)

# JWT CONFIG
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')
jwt = JWTManager(app)

# DB CONFIG
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
    os.path.join(BASE_DIR, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# INIT DB
db.init_app(app)
with app.app_context():
    db.create_all()

# TOOL ROUTES
api.add_resource(RunningConfiguration,
                 '/api/v1/running-config')

# DEVICE ROUTES
api.add_resource(MyDevices, '/api/v1/<string:user>/mydevices')

# USER ROUTES
api.add_resource(RegisterUser, '/api/v1/user/register')
api.add_resource(LoginUser, '/api/v1/user/login')

# Uncomment for production.
# @app.route("/")
# def index():
#     return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
