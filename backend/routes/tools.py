from flask_restful import Resource, reqparse

from netmiko import ConnectHandler, NetMikoAuthenticationException
from netmiko.ssh_exception import NetmikoTimeoutException

# Init Parent Parser For IOS Devices.
ios_device_parser = reqparse.RequestParser()
ios_device_parser.add_argument('ipv4', type=str, required=True)
ios_device_parser.add_argument('username', type=str, required=True)
ios_device_parser.add_argument('password', type=str, required=True)


class IosGetConfig(Resource):
    def post(self, command):
        args = ios_device_parser.copy().parse_args()
        try:
            ssh_connection = ConnectHandler(
                device_type='cisco_ios', ip=args['ipv4'], username=args['username'], password=args['password'], timeout=15)
            if command == 'get-running-config':
                conf = ssh_connection.send_command('show running-config')
            elif command == 'get-show-version':
                conf = ssh_connection.send_command('show version')
            elif command == 'get-show-int-status':
                conf = ssh_connection.send_command('show ip interface status')
            elif command == 'get-show-ip-int-br':
                conf = ssh_connection.send_command(
                    'show ip interface brief | ex una')
            elif command == 'get-show-vlans':
                conf = ssh_connection.send_command(
                    'show vlan brief\nshow vlan')
            elif command == 'get-show-cdp-neighbors':
                conf = ssh_connection.send_command(
                    'show cdp neighbors brief\nshow cdp neighbors detail')
            elif command == 'get-show-ip-route':
                conf = ssh_connection.send_command('show ip route')
            else:
                ssh_connection.disconnectio()
                return 404
            ssh_connection.disconnect()
        except NetmikoTimeoutException as error:
            return {"Error": f'Connection Timeout {error}'}, 403
        except NetMikoAuthenticationException as error:
            return {"Error": f'Authentication Failed: \n{error}'}, 403
        else:
            return conf, 200
