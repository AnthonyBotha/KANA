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
        tag_name='Health'
    )
    school = Tag(
        tag_name='School'
    )
    teams = Tag(
        tag_name='Teams'
    )
    chores = Tag(
        tag_name='Chores'
    )
    creativity = Tag(
        tag_name='Creativity'
    )

    tags = [work,excercise,health, school, teams, chores, creativity]
    for tag in tags:
        db.session.add(tag)


    habit1 = Habit.query.filter_by(id=1).first()
    habit1.tags.append(work)

    
    db.session.commit()

def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks_tags RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks_tags"))
        db.session.execute(text("DELETE FROM tags"))

        db.session.commit()
