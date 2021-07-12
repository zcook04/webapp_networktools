from flask_restful import Resource


class MyDevices(Resource):
    def get(self):
        return [{'ipv4': '192.168.101.32', 'username': 'cisco', 'password': 'cisco', 'deviceType': 'cisco_ios'},
                {'ipv4': '192.168.101.33', 'username': 'zack', 'password': 'zack', 'deviceType': 'cisco_ios'}]
