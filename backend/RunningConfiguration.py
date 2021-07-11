
from netmiko import ConnectHandler, NetMikoAuthenticationException
from flask_restful import Resource, reqparse

from netmiko.ssh_exception import NetmikoTimeoutException


class RunningConfiguration(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('ipv4', type=str, required=True)
        parser.add_argument('username', type=str, required=True)
        parser.add_argument('password', type=str, required=True)
        args = parser.parse_args()
        try:
            ssh_connection = ConnectHandler(
                device_type='cisco_ios', ip=args['ipv4'], username=args['username'], password=args['password'], timeout=15)
            conf = ssh_connection.send_command('show running-config')
            ssh_connection.disconnect()
        except NetmikoTimeoutException as error:
            return {"Error": f'Connection Timeout {error}'}, 403
        except NetMikoAuthenticationException as error:
            return {"Error": f'Authentication Failed: \n{error}'}, 403
        else:
            return conf, 200
        return 'Failure', 501
