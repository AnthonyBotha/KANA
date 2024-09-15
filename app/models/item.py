from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime,timezone


inventory=db.Table(
    'inventory',
    db.Model.metadata,
    db.Column("id",db.Integer, primary_key=True,autoincrement=True),
    db.Column("user_id",db.Integer,db.ForeignKey(add_prefix_for_prod('users.id')),primary_key=True),
    db.Column("item_id",db.Integer,db.ForeignKey(add_prefix_for_prod('items.id')),primary_key=True),
    db.Column("created_at",db.DateTime, default=lambda: datetime.now(timezone.utc)),
    db.Column("updated_at",db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc)),
    # db.PrimaryKeyConstraint('user_id', 'item_id')

    )

class Item(db.Model):
    __tablename__ = 'items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    name=db.Column(db.Text,nullable=False)
    type=db.Column(db.Text,nullable=False)
    description = db.Column(db.Text,nullable=False)
    equipment=db.Column(db.Boolean,nullable=False)
    cost=db.Column(db.Float,nullable=False,default=0.0)
    item_img=db.Column(db.String(255),nullable=False)

    users= db.relationship('User',secondary=inventory,back_populates='items')


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
            'itemImg':self.item_img,
            'users':self.users
        }