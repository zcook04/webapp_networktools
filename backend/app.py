from RunningConfiguration import RunningConfiguration
from MyDevices import MyDevices
from Login import Login

from Models import CreateUser, db

from flask import Flask
from flask_restful import Api

import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

# INIT APP
app = Flask(__name__, static_folder='../frontend/build/static',
            template_folder='../frontend/build')
api = Api(app)

# DB CONFIG
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
    os.path.join(BASE_DIR, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# INIT DB
db.init_app(app)


api.add_resource(RunningConfiguration,
                 '/api/v1/running-config')

api.add_resource(MyDevices, '/api/v1/<string:user>/mydevices')

api.add_resource(CreateUser, '/api/v1/register/user')
api.add_resource(Login, '/api/v1/login')


# Uncomment for production.
# @app.route("/")
# def index():
#     return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
