from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Enum
from datetime import datetime, timezone


# class TagsTasks(db.Model):
#     __tablename__ = 'tags_tasks'

#     if environment == 'production':
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     task_type = db.Column(Enum('habit', 'todo', 'daily', name='task_types'), nullable=False)
#     task_id = db.Column(db.Integer, nullable=False)
#     tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), nullable=False)

#     created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
#     updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

#     #creating relationship between
#     tag = db.relationship('Tag', back_populates='tags_tasks')

tasks_tags = db.Table('tasks_tags',
    db.Model.metadata,
    db.Column('id', db.Integer, primary_key=True, autoincrement=True),
    # db.Column('task_type', Enum('habit', 'todo', 'daily', name='task_types'), nullable=False),
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

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    tag_name = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    habit_tags = db.relationship('Habit', secondary=tasks_tags, back_populates='tags')
    daily_tags = db.relationship('Daily', secondary=tasks_tags, back_populates='tags')
    todo_tags = db.relationship('Todo', secondary=tasks_tags, back_populates='tags')



    def to_dict(self):
        dic={
            'tag_name':self.tag_name
        }

        return dic
