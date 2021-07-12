from flask_restful import Resource, reqparse

from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from Models import Device, db

# INIT PARENT DEVICE PARSER
device_parser = reqparse.RequestParser()
device_parser.add_argument('ipv4', type=str, required=True)


class MyDevices(Resource):
    #ROUTE /API/V1/MYDEVICES
    def get(self):
        # TEMP RETURN VAL FOR TESTING
        return [{'ipv4': '192.168.101.32', 'owner': 'zack@zack.com', 'username': 'cisco', 'password': 'cisco', 'deviceType': 'cisco_ios'},
                {'ipv4': '192.168.101.33', 'owner': 'zack@zack.com', 'username': 'cisco', 'password': 'cisco', 'deviceType': 'cisco_ios'}]


class DeviceInfo(Resource):
    #ROUTE /API/V1/MYDEVICES/DEVICE
    @jwt_required()
    def get(self):
        device_parser_copy = device_parser.copy()
        # TEMP RETURN VAL FOR TESTING
        return {'ipv4': '192.168.101.32', 'owner': "zack@zack.com", 'username': 'cisco', 'password': 'cisco', 'deviceType': 'cisco_ios'}, 200

    @jwt_required()
    def post(self):
        device_parser_copy = device_parser.copy()
        device_parser_copy.add_argument('password', type=str, required=True)
        device_parser_copy.add_argument('username', type=str, required=True)
        device_parser_copy.add_argument('deviceType', type=str, required=True)

        args = device_parser_copy.parse_args()
        args['owner'] = get_jwt_identity()
        new_device = Device(
            username=args['username'], owner=args['owner'], password=args['password'], ipv4=args['ipv4'], deviceType=args['deviceType'], runningConfig='')

        db.session.add(new_device)
        db.session.commit()
        return {new_device.ipv4: new_device.owner}, 202

        # TEMP RETURN VAL FOR TESTING
        return {'ipv4': '192.168.101.32', 'owner': "zack@zack.com", 'username': 'cisco', 'password': 'cisco', 'deviceType': 'cisco_ios'}, 200

    @jwt_required()
    def put(self):
        device_parser_copy = device_parser.copy()
        # TEMP RETURN VAL FOR TESTING
        return {'ipv4': '192.168.101.32', 'owner': "zack@zack.com", 'username': 'cisco', 'password': 'cisco', 'deviceType': 'cisco_ios'}, 200

    @jwt_required()
    def delete(self):
        device_parser_copy = device_parser.copy()
        # TEMP RETURN VAL FOR TESTING
        return {'ipv4': '192.168.101.32', 'owner': "zack@zack.com", 'username': 'cisco', 'password': 'cisco', 'deviceType': 'cisco_ios'}, 200
