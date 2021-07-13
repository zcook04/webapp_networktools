from flask_restful import Resource, reqparse, request

from Models import mongo_client

# JWT Token Import
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

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
        hashedpw = bcrypt.hashpw(args['password'].encode('utf8'), SALT)
        args['password'] = hashedpw
        if mongo_client.db.users.find_one({"email": args['email']}):
            return {"result": "fail", "msg": "Email exists and must be unique"}, 409
        mongo_client.db.users.insert_one(args)
        if(args):
            token = "Bearer " + create_access_token(identity=args['email'])
            return {"isAuthenticated": True, "token": token, "user": args['username'], "email": args['email'], "id": str(args['_id'])}, 201
        else:
            return 500

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
        return {"msg": "success"}, 202


class LoginUser(Resource):
    @jwt_required()
    def get(self):
        user_email = get_jwt_identity()
        user_token = request.headers['Authorization']
        dbuser = mongo_client.db.users.find_one_or_404({"email": user_email})
        if dbuser:
            return {"isAuthenticated": True, "token": user_token, "username": dbuser['username'], "email": dbuser['email'], "id": str(dbuser['_id'])}

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str, required=True)
        parser.add_argument('password', type=str, required=True)
        args = parser.parse_args()

        # Validate Input
        if not args['email'] or not args['password']:
            return {"isAuthenticated": False, "token": None, 'msg': 'Email and Password are required'}

        # Pull variables out of user object or return 404.
        user = mongo_client.db.users.find_one_or_404({"email": args['email']})
        username = user['username']
        email = user['email']
        _id = str(user['_id'])
        token = "Bearer " + create_access_token(identity=email)

        # Validate PW And Return Token
        if bcrypt.checkpw(args['password'].encode('utf8'), user['password']):
            return {"isAuthenticated": True, "token": token, "username": username, "email": email, "id": _id}, 200
        else:
            return {"isAuthenticated": False, "token": None, 'msg': 'Invalid Credentials'}


# FOR TESTING DATABASE ONLY------------------------------------------------------------------------
class AllUsers(Resource):
    def get(self):
        return [usr for usr in mongo_client.db.users.find({}, {'_id': False, 'password': False})]
