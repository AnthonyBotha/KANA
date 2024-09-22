from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone

class Checklist(db.Model):
    __tablename__ = 'checklists'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True,autoincrement=True)

    todo_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('todos.id')), nullable=True)
    daily_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('dailies.id')), nullable=True)

    completed = db.Column(db.Boolean, default=False)
    description = db.Column(db.String(40), nullable=False)

    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    todo = db.relationship('Todo', back_populates='checklist')
    daily = db.relationship('Daily', back_populates='checklist')

    def to_dict(self):
        dic = {
            "id": self.id,
            "todoId": self.todo_id,
            "dailyId": self.daily_id,
            "completed" : self.completed,
            "description": self.description,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at
        }
        return dic
