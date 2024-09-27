
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone
from sqlalchemy import Enum

from .tag import tasks_tags

class Daily(db.Model):
    __tablename__ = 'dailies'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.Text, nullable=False)
    notes = db.Column(db.Text, nullable=True)
    difficulty = db.Column(Enum('Trivial', 'Easy', 'Medium', 'Hard', name='difficulty_level'), nullable=False, default='Easy')
    start_date = db.Column(db.Date, default=lambda: datetime.now().date())
    repeats = db.Column(Enum('Daily', 'Weekly', 'Monthly', 'Yearly', name='repeat_timeframe'), default='Weekly')
    repeat_every = db.Column(db.Integer, default=1)

    is_due = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Connect Daily to user create a many-to-one relationship
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    user = db.relationship('User', back_populates='dailies')
    # Relationship with Checklists
    checklist = db.relationship('Checklist', back_populates='daily', cascade='all, delete-orphan', order_by='Checklist.created_at')
    # Relationship with Tags through tasks_tags joint table
    tags = db.relationship('Tag', secondary=tasks_tags, back_populates='daily_tags', overlaps="habit_tags,todo_tags")
    # Relationship with repeat_on
    repeat_on_days = db.relationship('RepeatOn', back_populates='daily', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'title': self.title,
            'notes': self.notes,
            'difficulty': self.difficulty,
            'startDate': self.start_date.strftime('%Y-%m-%d') if self.start_date else None,
            'repeats': self.repeats,
            'repeatEvery': self.repeat_every,
            'repeatOn': [repeat_on.day for repeat_on in self.repeat_on_days] if self.repeat_on_days else [],
            'isDue': self.is_due,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'tags': [tag.tag_name for tag in self.tags] if self.tags else [],
            'checklist': [check.to_dict() for check in self.checklist] if self.checklist else []
        }

class RepeatOn(db.Model):
    __tablename__ = 'repeat_on'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    daily_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('dailies.id')), nullable=False)
    day = db.Column(db.String, nullable=False)

    daily = db.relationship('Daily', back_populates='repeat_on_days')
