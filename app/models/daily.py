from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone
from sqlalchemy import Enum

class Daily(db.Model):
    __tablename__='dailies'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(30), nullable=False)
    notes = db.Column(db.Text, nullable=False)
    difficulty = db.Column(Enum('Trivial', 'Easy', 'Medium', 'Hard', name='difficulty_level'), nullable=False)
    start_date = db.Column(db.Date, default=lambda: datetime.now().date())
    repeats = db.Column(Enum('Daily', 'Weekly', 'Monthly', 'Yearly', name='repeat_timeframe'), default='Weekly')
    repeat_every = db.Column(db.Integer, default=1)

    repeat_on = db.Column(Enum('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', name='week_days'),nullable=True)

    is_due = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    #connect Daily to user create a many to one relationship
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    user = db.relationship('User', back_populates='dailies')

    checklist = db.relationship('Checklist', back_populates='daily')


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'title': self.title,
            'notes': self.notes,
            'difficulty': self.difficulty,
            'startDate': self.start_date,
            'repeats': self.repeats,
            'repeatEvery': self.repeat_every,
            'repeatOn': self.repeat_on,
            'isDue': self.is_due,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at
        }
