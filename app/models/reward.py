from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime,timezone


user_rewards=db.Table(
    'user_rewards',
    db.Model.metadata,
    db.Column("id",db.Integer, primary_key=True,autoincrement=True),
    db.Column("user_id",db.Integer,db.ForeignKey(add_prefix_for_prod('users.id')),primary_key=True),
    db.Column("reward_id",db.Integer,db.ForeignKey(add_prefix_for_prod('rewards.id')),primary_key=True),
    db.Column("created_at",db.DateTime, default=lambda: datetime.now(timezone.utc)),
    db.Column("updated_at",db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc)),
    db.PrimaryKeyConstraint('user_id', 'reward_id')
)

class Reward(db.Model):
    __tablename__ = 'rewards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    title = db.Column(db.String(30), nullable=False)
    notes = db.Column(db.Text, nullable=True)
    cost = db.Column(db.Integer, default=10, nullable=False)
    custom = db.Column(db.Boolean, nullable=False)
    reward_img = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    users= db.relationship('User',secondary=user_rewards,back_populates='rewards')


    def to_dict(self):
        return {
            'id':self.id,
            'title':self.title,
            'notes':self.notes,
            'cost':self.cost,
            'custom':self.custom,
            'rewardImg':self.reward_img,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at,
            'users':self.users
        }
