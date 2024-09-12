from ..db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime


class Mouth(db.Model):
    __tablename__ = 'mouths'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    type = db.Column(db.String(30), nullable=False)
    img_url = db.Column(db.String(255),nullable=False)

    avatars= db.relationship('Avatar', backref='mouth', lazy=True, cascade="all, delete")
