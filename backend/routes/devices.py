from flask_restful import Resource, reqparse
from flask import request

from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from Models import mongo_client


class MyDevices(Resource):
    # ROUTE  /API/V1/MYDEVICES
    # DESC   GET ALL DEVICES ASSOCIATED WITH USER ACCOUNT FOUND IN JWT TOKEN
    @jwt_required()
    def get(self):
        return [device for device in mongo_client.db.devices.find({'owner': get_jwt_identity()}, {'_id': False})], 200


class DeviceInfo(Resource):
    # ROUTE  /API/V1/MYDEVICES/DEVICE
    # DESC   GET ALL AVAILABLE INFORMATION ON A GIVEN DEVICE ID
    @jwt_required()
    def get(self, device):
        return mongo_client.db.devices.find_one_or_404({'owner': get_jwt_identity(), 'ipv4': device}, {'_id': False}), 200

    # DESC   ADD A DEVICE AND ASSOCIATE IT WITH ID FOUND IN JWT_TOKEN
    @jwt_required()
    def post(self, device):
        device_parser = reqparse.RequestParser()
        device_parser.add_argument('ipv4', type=str, required=True)
        device_parser.add_argument('password', type=str, required=True)
        device_parser.add_argument('username', type=str, required=True)
        device_parser.add_argument('deviceType', type=str, required=True)
        args = device_parser.parse_args()
        args['owner'] = get_jwt_identity()
        if not args['owner']:
            return 401
        else:
            mongo_client.db.devices.insert_one(args)
            return 201

    # DESC   VALIDATE JWT_ASSOCIATION AND UPDATE DEVICE VALUES
    @jwt_required()
    def put(self, device):
        device_parser = reqparse.RequestParser()
        device_parser.add_argument('ipv4', type=str, required=True)
        device_parser.add_argument('deviceType', type=str, required=True)
        device_parser.add_argument('username', type=str, required=True)
        device_parser.add_argument('password', type=str, required=True)
        args = device_parser.parse_args()
        mongo_client.db.devices.find_one_and_update(
            {'owner': get_jwt_identity(), 'ipv4': device}, {"$set": request.get_json()})
        return 200

    # DESC   VALIDATIE JWT_ASSOCIATION AND REMOVE DEVICE FROM ASSOCIATED USER
    @jwt_required()
    def delete(self, device):
        print(device, get_jwt_identity)
        mongo_client.db.devices.delete_one(
            {'owner': get_jwt_identity(), 'ipv4': device})
        return 200
