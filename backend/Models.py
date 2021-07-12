from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password

    def __repr__(self):
        return f'{str(self.id)}: {self.email}'


class Device(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    owner = db.Column(db.String(120), unique=True, nullable=False)
    deviceType = db.Column(db.String(20), nullable=False)
    ipv4 = db.Column(db.String(15), nullable=False)
    username = db.Column(db.String(60), nullable=False)
    password = db.Column(db.String(60), nullable=False)
    runningConfig = db.Column(db.Text())

    def __init__(self, owner, deviceType, username, password):
        self.owner = owner
        self.deviceType = deviceType
        self.username = username
        self.password = password

    def __repr__(self):
        return f'{str(self.owner)}: {self.ipv4}'
