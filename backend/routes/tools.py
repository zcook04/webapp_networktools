from flask_restful import Resource, reqparse

from netmiko import ConnectHandler, NetMikoAuthenticationException
from netmiko.ssh_exception import NetmikoTimeoutException

from utils.TerminalOutput import msg
from utils.Exceptions import InvalidInputDetected, AmbiguousCommand

# Init Parent Parser For IOS Devices.
ios_device_parser = reqparse.RequestParser()
ios_device_parser.add_argument('ipv4', type=str, required=True)
ios_device_parser.add_argument('username', type=str, required=True)
ios_device_parser.add_argument('password', type=str, required=True)


class IosGetConfig(Resource):
    def post(self, command):
        args = ios_device_parser.copy().parse_args()
        ipv4 = args['ipv4']
        username = args['username']
        password = args['password']

        try:
            ssh_connection = ConnectHandler(
                device_type='cisco_ios', ip=ipv4, username=username, password=password, timeout=15)
            if command == 'get-running-config':
                conf = ssh_connection.send_command('show running-config')
            elif command == 'get-show-version':
                conf = ssh_connection.send_command('show version')
            elif command == 'get-show-int-status':
                conf = ssh_connection.send_command(
                    'show ip interface brief')
                conf += "\n\n\n\n\n"
                conf += ssh_connection.send_command('show ip interface')
            elif command == 'get-show-vlans':
                conf = ssh_connection.send_command(
                    'show vlan brief')
                conf += "\n\n\n\n\n"
                conf += ssh_connection.send_command('show vlan')
            elif command == 'get-show-cdp-neighbors':
                conf = ssh_connection.send_command('show cdp neighbors')
                conf += "\n\n\n\n\n"
                conf += ssh_connection.send_command(
                    'show cdp neighbors detail')
            elif command == 'get-show-ip-route':
                conf = ssh_connection.send_command('show ip route')
            else:
                ssh_connection.disconnectio()
                return 404
            ssh_connection.disconnect()
            if "Invalid input detected" in conf:
                raise InvalidInputDetected
            if "Ambiguous command:" in conf:
                raise AmbiguousCommand
        except InvalidInputDetected as error:
            msg(
                f'Config retrieval from device {ipv4} failed. Returned Invalid Input Detected')
            return {"Error": "Command Not Accepted By Device: Returned Invalid Input Detected"}, 204
        except AmbiguousCommand as error:
            msg(
                f'Config retrieval from device {ipv4} failed. Returned AmbiguousCommand')
            return {"Error": "Command Not Accepted By Device: Returned AmbiguousCommand"}, 204
        except NetmikoTimeoutException as error:
            msg(f'Connection to device {ipv4} failed. Returning 403')
            return {"Error": f'Connection Timeout {error}'}, 403
        except NetMikoAuthenticationException as error:
            msg(f"Connection to device {ipv4} failed. Returning 403")
            return {f'"Error": Authentication Failed: \n{error}'}, 403
        else:
            return conf, 200
