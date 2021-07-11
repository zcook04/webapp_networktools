from flask_restful import Resource, reqparse
from flask_sqlalchemy import SQLAlchemy
from Models import User

db = SQLAlchemy()


class Login(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str, required=True)
        parser.add_argument('password', type=str, required=True)
        args = parser.parse_args()
        user = User.query.filter_by(email=args['email']).first()

        if user.password == args['password']:
            return {'msg': 'Login Success'}, 200
        else:
            return {'msg': 'Invalid Credentials'}, 401
