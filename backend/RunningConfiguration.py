
from netmiko import ConnectHandler
from flask_restful import Resource, reqparse
import json


class RunningConfiguration(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('ipv4', type=str, required=True)
        parser.add_argument('username', type=str, required=True)
        parser.add_argument('password', type=str, required=True)
        args = parser.parse_args()
        try:
            ssh_connection = ConnectHandler(
                device_type='cisco_ios', ip=args['ipv4'], username=args['username'], password=args['password'])
            conf = ssh_connection.send_command('show running-config')
            ssh_connection.disconnect()
        except:
            return {"Error": "Connection Unsuccessful"}, 403
        else:
            print(json.dumps(conf))
            return json.dumps(conf), 200
