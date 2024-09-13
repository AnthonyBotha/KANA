from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime


class Item(db.Model):
    __tablename__ = 'items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow,onupdate=datetime.utcnow)

    name=db.Column(db.Text,nullable=False)
    type=db.Column(db.Text,nullable=False)
    description = db.Column(db.Text,nullable=False)
    equipment=db.Column(db.Boolean,nullable=False)
    cost=db.Column(db.Float,nullable=False,default=0.0)
    item_img=db.Column(db.String(255),nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at,
            'name':self.name,
            'type':self.type,
            'description':self.description,
            'equipment':self.equipment,
            'cost':self.cost,
            'itemImg':self.item_img
        }
