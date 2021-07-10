from flask import Flask
from flask.templating import render_template
from flask_restful import Api, Resource

app = Flask(__name__, static_folder='../frontend/build/static',
            template_folder='../frontend/build')
api = Api(app)


class RunningConfiguration(Resource):
    def get(self, ipv4_address):
        return {'ipv4_address': ipv4_address, 'hostname': 'hostname placeholder', 'data': 'This is the running configuration placeholder'}

    def post(self):
        return {'data': 'Posted'}


api.add_resource(RunningConfiguration,
                 '/api/v1/running-config/<string:ipv4_address>')


# Uncomment for production.
# @app.route("/")
# def index():
#     return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
