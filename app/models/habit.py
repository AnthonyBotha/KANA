from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime,timezone
from sqlalchemy import Enum

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

    # Relationship with Tags through TagsTasks joint table
    tags = db.relationship(
        'Tag',
        secondary='tags_tasks',  # The association table
        primaryjoin="and_(TagsTasks.task_id == Habit.id, TagsTasks.task_type == 'habit')",
        secondaryjoin='Tag.id == TagsTasks.tag_id',
        back_populates='tasks'
    )

    def to_dict(self):
        return {
            'id':self.id,
            'userId':self.user_id,
            'title':self.title,
            'notes':self.notes,
            'difficulty':self.difficulty,
            'score':self.score,
            'isPositive':self.is_positive,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at,
            'user':self.user
        }
