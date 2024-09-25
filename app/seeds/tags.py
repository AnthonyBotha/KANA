from app.models import db, Tag, Habit, Todo, Daily, environment, SCHEMA
from sqlalchemy.sql import text

def seed_tags():
    work = Tag(
        tag_name='Work',
        user_id=1
    )
    excercise = Tag(
        tag_name='Excercise',
        user_id=1
    )
    health = Tag(
        tag_name='Health',
        user_id=1
    )
    school = Tag(
        tag_name='School',
        user_id=1
    )
    teams = Tag(
        tag_name='Teams',
        user_id=1
    )
    chores = Tag(
        tag_name='Chores',
        user_id=1
    )
    creativity = Tag(
        tag_name='Creativity',
        user_id=1
    )

    tags = [work,excercise,health, school, teams, chores, creativity]
    for tag in tags:
        db.session.add(tag)


    habit1 = Habit.query.filter_by(id=1).first()
    habit1.tags.append(work)
    habit1.tags.append(chores)

    daily1 = Daily.query.filter_by(id=2).first()
    daily1.tags.append(excercise)

    todo1 = Todo.query.filter_by(id=1).first()
    todo1.tags.append(teams)

    db.session.commit()


def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks_tags RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks_tags"))
        db.session.execute(text("DELETE FROM tags"))

        db.session.commit()
