from RunningConfiguration import RunningConfiguration
from MyDevices import MyDevices
from flask import Flask
# from flask.templating import render_template
from flask_restful import Api

app = Flask(__name__, static_folder='../frontend/build/static',
            template_folder='../frontend/build')
api = Api(app)

api.add_resource(RunningConfiguration,
                 '/api/v1/running-config')

api.add_resource(MyDevices, '/api/v1/<string:user>/mydevices')


# Uncomment for production.
# @app.route("/")
# def index():
#     return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
