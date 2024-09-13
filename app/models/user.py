from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime,timezone
from .item import inventory

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    experience = db.Column(db.Integer, default=0)
    health = db.Column(db.Integer,default=100)
    level = db.Column(db.Integer,default=1)
    gold = db.Column(db.Float,default=0.0)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))


    # connects items to users creating a many to many relationship
    items=db.relationship('Item',secondary=inventory,back_populates='users')
    # connects habits to users creating a one to many relationship
    habits=db.relationship('Habit',back_populates='user',cascade='all, delete-orphan')
    # connects habits to users creating a one to many relationship
    todos=db.relationship('Todo', back_populates='user', cascade='all, delete-orphan')
    # creates one to one relationship to Avatar
    avatar= db.relationship('Avatar',back_populates='user',uselist=False,cascade="all,delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName':self.first_name,
            'lastName':self.last_name,
            'experience':self.experience,
            'level':self.level,
            'health':self.health,
            'gold':self.gold,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at,
            'avatar':self.avatar,
            'habits':self.habits,
            'todos':self.todos,
            'items':self.items
        }
