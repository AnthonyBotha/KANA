from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Enum
from datetime import datetime, timezone


tasks_tags = db.Table('tasks_tags',
    db.Model.metadata,
    db.Column('id', db.Integer, primary_key=True, autoincrement=True),
    db.Column('daily_id', db.Integer,  db.ForeignKey(add_prefix_for_prod('dailies.id')), nullable=True),
    db.Column('todo_id', db.Integer,  db.ForeignKey(add_prefix_for_prod('todos.id')), nullable=True),
    db.Column('habit_id', db.Integer,  db.ForeignKey(add_prefix_for_prod('habits.id')), nullable=True),
    db.Column('tag_id', db.Integer, db.ForeignKey(add_prefix_for_prod('tags.id')), nullable=False),
    db.Column('created_at', db.DateTime, default=lambda: datetime.now(timezone.utc)),
    db.Column('updated_at', db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc)),
    schema=SCHEMA if environment == 'production' else None
)


class Tag(db.Model):
    __tablename__ = 'tags'

    default_tags = ['Health + Wellness', 'Excercise', 'Work', 'Teams', 'School']

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    tag_name = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    habit_tags = db.relationship('Habit', secondary=tasks_tags, back_populates='tags', overlaps="daily_tags,todo_tags")
    daily_tags = db.relationship('Daily', secondary=tasks_tags, back_populates='tags', overlaps="habit_tags,todo_tags")
    todo_tags = db.relationship('Todo', secondary=tasks_tags, back_populates='tags', overlaps="habit_tags,daily_tags")
    user = db.relationship('User', back_populates='tags')

    def to_dict(self):
        dic={
            'tagName':self.tag_name,
            'userId': self.user_id
        }

        return dic
