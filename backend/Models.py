from flask_restful import Resource, reqparse
from flask_sqlalchemy import SQLAlchemy
import json

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
        self.id = id

    def __repr__(self):
        return f'{str(self.id)}: {self.email}'
