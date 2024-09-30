from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime,timezone
from sqlalchemy import Enum
from .tag import tasks_tags


class Habit(db.Model):
    __tablename__ = 'habits'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    title = db.Column(db.Text, nullable=False)
    notes = db.Column(db.Text, nullable=True)
    difficulty = db.Column(Enum('Trivial', 'Easy', 'Medium', 'Hard', name='difficulty_level'), nullable=False, default='Easy')
    score= db.Column(db.Integer, default=0, nullable=False)
    is_positive = db.Column(db.Boolean, nullable=True)

    # connects habits to users creating a one to many relationship
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')),nullable=False)
    user= db.relationship('User',back_populates='habits')

    # Relationship with Tags through tasks_tags joint table
    tags = db.relationship('Tag',secondary=tasks_tags,back_populates='habit_tags', overlaps="daily_tags,todo_tags")

    def to_dict(self):
        dic = {
            'id':self.id,
            'userId':self.user_id,
            'title':self.title,
            'notes':self.notes,
            'difficulty':self.difficulty,
            'score':self.score,
            'isPositive':self.is_positive,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at,
            'user':self.user.to_dict(),
            # 'tags': [tag.tag_name for tag in self.tags] if self.tags else [],
        }
        if self.tags is not None and len(self.tags) > 0:
            dic['tags']=[tag.to_dict() for tag in self.tags]

        return dic



    def to_dict_user(self):
        dic = {
            'id':self.id,
            'userId':self.user_id,
            'title':self.title,
            'notes':self.notes,
            'difficulty':self.difficulty,
            'score':self.score,
            'isPositive':self.is_positive,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at,
            'tags': [tag.tag_name for tag in self.tags] if self.tags else []
        }

        # if self.tags is not None and len(self.tags) > 0:
        #     dic['tags']=[tag.to_dict() for tag in self.tags]

        return dic
