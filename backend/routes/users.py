from flask import jsonify
from flask_restful import Resource, reqparse
from flask_sqlalchemy import SQLAlchemy

from Models import User, db

import sqlalchemy

# JWT Token Import
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

# INIT BCRYPT
import os
import bcrypt
BCRYPT_SECRET = os.environ.get('BCRYPT_SECRET')
SALT = bcrypt.gensalt()


class RegisterUser(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, required=True)
        parser.add_argument('email', type=str, required=True)
        parser.add_argument('password', type=str, required=True)
        args = parser.parse_args()

        new_user = User(
            username=args['username'], email=args['email'], password=bcrypt.hashpw(args['password'].encode('utf8'), SALT))

        try:
            db.session.add(new_user)
            db.session.commit()
            return 201
        except sqlalchemy.exc.IntegrityError:
            return {'error': 'User alreasdy exists'}, 501


class LoginUser(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str, required=True)
        parser.add_argument('password', type=str, required=True)
        args = parser.parse_args()
        user = User.query.filter_by(email=args['email']).first()

        if bcrypt.checkpw(args['password'].encode('utf8'), user.password):
            return {"token": create_access_token(identity=args['email']), "username": user.username}, 200
        else:
            return {'msg': 'Invalid Credentials'}, 401
