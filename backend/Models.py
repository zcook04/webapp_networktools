from flask_restful import Resource, reqparse
from flask_sqlalchemy import SQLAlchemy
import sqlalchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password


class CreateUser(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, required=True)
        parser.add_argument('email', type=str, required=True)
        parser.add_argument('password', type=str, required=True)
        args = parser.parse_args()

        new_user = User(
            username=args['username'], email=args['email'], password=args['password'])

        try:
            db.session.add(new_user)
            db.session.commit()
            return 201
        except sqlalchemy.exc.IntegrityError:
            return {'error': 'User alreasdy exists'}, 501
