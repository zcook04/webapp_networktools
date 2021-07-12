from flask_restful import Resource, reqparse

from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from Models import mongo_client


class MyDevices(Resource):
    #ROUTE /API/V1/MYDEVICES
    @jwt_required()
    def get(self):
        # TEMP RETURN VAL FOR TESTING
        return [{'ipv4': '192.168.101.32', 'owner': 'zack@zack.com', 'username': 'cisco', 'password': 'cisco', 'deviceType': 'cisco_ios'},
                {'ipv4': '192.168.101.33', 'owner': 'zack@zack.com', 'username': 'cisco', 'password': 'cisco', 'deviceType': 'cisco_ios'}]


class DeviceInfo(Resource):
    #ROUTE /API/V1/MYDEVICES/DEVICE
    # @jwt_required()
    def get(self):
        # TEMP RETURN VAL FOR TESTING
        return {'ipv4': '192.168.101.32', 'owner': "zack@zack.com", 'username': 'cisco', 'password': 'cisco', 'deviceType': 'cisco_ios'}, 200

    @jwt_required()
    def post(self):
        device_parser = reqparse.RequestParser()
        device_parser.add_argument('ipv4', type=str, required=True)
        device_parser.add_argument('password', type=str, required=True)
        device_parser.add_argument('username', type=str, required=True)
        device_parser.add_argument('deviceType', type=str, required=True)
        args = device_parser.parse_args()
        args['owner'] = get_jwt_identity()
        mongo_client.db.devices.insert_one(args)
        return 201

    @jwt_required()
    def put(self):
        # TEMP RETURN VAL FOR TESTING
        return {'ipv4': '192.168.101.32', 'owner': "zack@zack.com", 'username': 'cisco', 'password': 'cisco', 'deviceType': 'cisco_ios'}, 200

    @jwt_required()
    def delete(self):
        # TEMP RETURN VAL FOR TESTING
        return {'ipv4': '192.168.101.32', 'owner': "zack@zack.com", 'username': 'cisco', 'password': 'cisco', 'deviceType': 'cisco_ios'}, 200
