from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Enum
from datetime import datetime, timezone
from .tag import tasks_tags


class Todo(db.Model):
    __tablename__ = 'todos'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True,autoincrement=True)

    title = db.Column(db.Text, nullable=False)
    notes = db.Column(db.Text, nullable=True)
    difficulty = db.Column(Enum('Trivial', 'Easy', 'Medium', 'Hard', name='dificulty_level'), default='Easy',nullable=False)
    due_date = db.Column(db.Date,nullable=False)
    completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    #connect Todos to user creating a many to one relationship
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    user = db.relationship('User', back_populates='todos')
    # Relationship with Checklist
    checklist = db.relationship('Checklist', back_populates='todo')
    # Relationship with Tags throught tasks_tags joint table
    tags = db.relationship('Tag', secondary=tasks_tags, back_populates='todo_tags', overlaps="habit_tags,daily_tags")



    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'title': self.title,
            'notes': self.notes,
            'difficulty': self.difficulty,
            'dueDate': self.due_date,
            'completed': self.completed,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at,
            'user':self.user,
            'tags': [tag.tag_name for tag in self.tags] if self.tags else [],
            'checklist': [check.to_dict() for check in self.checklist] if self.checklist else []
        }
    def to_dict_user(self):
        return{
            'id': self.id,
            'userId': self.user_id,
            'title': self.title,
            'notes': self.notes,
            'difficulty': self.difficulty,
            'dueDate': self.due_date,
            'completed': self.completed,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at,
            'tags': [tag.tag_name for tag in self.tags] if self.tags else [],
            'checklist': [check.to_dict() for check in self.checklist] if self.checklist else []
        }
