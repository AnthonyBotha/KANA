from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

class Avatar(db.Model):
    __tablename__ = 'avatars'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True,autoincrement=True)


    # connects avatars to users creating a one to one relationship
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True, nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,

        }
