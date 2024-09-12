from ..db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime


class Nose(db.Model):
    __tablename__ = 'noses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    type = db.Column(db.String(30), nullable=False)
    img_url = db.Column(db.String(255),nullable=False)

    avatars= db.relationship('Avatar', backref='nose', lazy=True, cascade="all, delete")
