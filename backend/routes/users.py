from flask_restful import Resource, reqparse
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
            return {"isAuthenticated": True, "token": create_access_token(identity=args['email']), "user": args['username'], "email": args['email']}, 201
        except sqlalchemy.exc.IntegrityError:
            return {'error': 'User alreasdy exists'}, 501

    @jwt_required()
    def delete(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str, required=True)
        args = parser.parse_args()
        email = args['email']
        jwtemail = get_jwt_identity()

        # Verify User is Deleted Itself
        if jwtemail != email:
            return {"msg": "Not Authorized"}, 401

        user = User.query.filter_by(email=email).first()
        try:
            db.session.delete(user)
            db.session.commit()
            return {"msg": "success"}, 202
        except sqlalchemy.orm.exc.UnmappedInstanceError:
            return {"msg": "User Does Not Exist"}, 404


class LoginUser(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str, required=True)
        parser.add_argument('password', type=str, required=True)
        args = parser.parse_args()

        if not args['email'] or not args['password']:
            return {"isAuthenticated": False, "token": None, 'msg': 'Email and Password are required'}

        user = User.query.filter_by(email=args['email']).first()

        if user and bcrypt.checkpw(args['password'].encode('utf8'), user.password):
            return {"isAuthenticated": True, "token": create_access_token(identity=args['email']), "user": user.username, "email": user.email}, 200
        else:
            return {"isAuthenticated": False, "token": None, 'msg': 'Invalid Credentials'}


# FOR TESTING DATABASE ONLY------------------------------------------------------------------------
class AllUsers(Resource):
    def get(self):
        return{u.id: u.email for u in db.session.query(User).all()}
