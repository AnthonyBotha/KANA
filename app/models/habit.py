from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

class Habit(db.Model):
    __tablename__ = 'habits'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow,onupdate=datetime.utcnow)

    title = db.Column(db.String(30), nullable=False)
    notes = db.Column(db.Text, nullable=True)
    difficulty = db.Column(db.String(10), nullable=True)
    score= db.Column(db.Integer, default=0, nullable=False)
    is_postitve = db.Column(db.Boolean, nullable=True)

    # connects habits to users creating a one to many relationship
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')),nullable=False)
    user= db.relationship('User',backref=db.backref('habits',lazy=True))
