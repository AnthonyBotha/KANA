from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Enum
from datetime import datetime, timezone


class TagsTasks(db.Model):
    __tablename__ = 'tags_tasks'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    task_type = db.Column(Enum('habit', 'todo', 'daily', name='task_types'), nullable=False)
    task_id = db.Column(db.Integer, nullable=False)
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), nullable=False)

    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    #creating relationship between
    tag = db.relationship('Tag', back_populates='tags_tasks')


class Tag(db.Model):
    __tablename__ = 'tags'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    tag_name = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationship with TagsTasks joint table
    tags_tasks = db.relationship('TagsTasks', back_populates='tag')

    # Relationships with each task type through TagsTasks joint table
    dailies = db.relationship(
        'Daily',
        secondary='tags_tasks',
        primaryjoin='Tag.id == TagsTasks.tag_id',
        secondaryjoin="and_(TagsTasks.task_id == Daily.id, TagsTasks.task_type == 'daily')",
        back_populates='tags'
    )
    todos = db.relationship(
        'Todo',
        secondary='tags_tasks',
        primaryjoin='Tag.id == TagsTasks.tag_id',
        secondaryjoin="and_(TagsTasks.task_id == Todo.id, TagsTasks.task_type == 'todo')",
        back_populates='tags'
    )
    habits = db.relationship(
        'Habit',
        secondary='tags_tasks',
        primaryjoin='Tag.id == TagsTasks.tag_id',
        secondaryjoin="and_(TagsTasks.task_id == Habit.id, TagsTasks.task_type == 'habit')",
        back_populates='tags'
    )
