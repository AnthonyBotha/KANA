from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Enum

class Todo(db.Model):
    __tablename__ = 'todos'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    user_id = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(30), nullable=False)
    notes = db.Column(db.Text, nullable=False)
    difficulty = db.Column(Enum('Trivial', 'Easy', 'Medium', 'Hard', name='dificulty_level'), nullable=False)
    due_date = db.Column()
