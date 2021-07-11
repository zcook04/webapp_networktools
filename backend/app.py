from flask import Flask
# from flask.templating import render_template
from flask_restful import Api
from RunningConfiguration import RunningConfiguration

app = Flask(__name__, static_folder='../frontend/build/static',
            template_folder='../frontend/build')
api = Api(app)

api.add_resource(RunningConfiguration,
                 '/api/v1/running-config')


# Uncomment for production.
# @app.route("/")
# def index():
#     return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
