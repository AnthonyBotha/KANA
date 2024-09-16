from app.models import db, Tag, Habit, Todo, Daily, environment, SCHEMA
from sqlalchemy.sql import text

def seed_tags():
    work = Tag(
        tag_name='Work'
    )
    excercise = Tag(
        tag_name='Excercise'
    )
    health = Tag(
        tag_name='health'
    )
    school = Tag(
        tag_name='school'
    )
    teams = Tag(
        tag_name='teams'
    )
    chores = Tag(
        tag_name='chores'
    )
    creativity = Tag(
        tag_name='creativity'
    )

    tags = [work,excercise,health, school, teams, chores, creativity]
    for tag in tags:
        db.session.add(tag)

    db.session.commit()


def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks_tags RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks_tags"))
        db.session.execute(text("DELETE FROM tags"))

        db.session.commit()
