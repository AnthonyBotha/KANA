from app.models import db, User,Habit, environment, SCHEMA
from sqlalchemy.sql import text



def seed_habits():
    demo=User.query.filter_by(email='demo@aa.io').first()
    bobbie=User.query.filter_by(email='bobbie@aa.io').first()
    marnie=User.query.filter_by(email='marnie@aa.io').first()

    habit1_demo = Habit(
        title='Add a task to KANA',
        notes='Either a Habit, a Daily, or a To Do',
        difficulty='Easy',
        is_positive=True,
        user_id=demo.id
    )

    habit2_demo= Habit(
        title="Click here to edit this into a bad habit you'd like to quit",
        notes='Or delete from the edit screen',
        difficulty='Easy',
        is_positive=False,
        user_id=demo.id
    )
    habit3_demo= Habit(
        title="10 min cardio >> + 10 minutes cardio",
        difficulty='Easy',
        is_positive=True,
        user_id=demo.id
    )
    habit4_demo= Habit(
        title="Process email",
        difficulty='Easy',
        is_positive=True,
        user_id=demo.id
    )


    habit1_mar = Habit(
        title='Add a task to KANA',
        notes='Either a Habit, a Daily, or a To Do',
        difficulty='Easy',
        is_positive=True,
        user_id=marnie.id
    )

    habit2_mar= Habit(
        title="Click here to edit this into a bad habit you'd like to quit",
        notes='Or delete from the edit screen',
        difficulty='Easy',
        is_positive=False,
        user_id=marnie.id
    )
    habit3_mar= Habit(
        title="10 min cardio >> + 10 minutes cardio",
        difficulty='Easy',
        is_positive=True,
        user_id=marnie.id
    )
    habit4_mar= Habit(
        title="Process email",
        difficulty='Easy',
        is_positive=True,
        user_id=marnie.id
    )



    habit1_bobbie = Habit(
        title='Add a task to KANA',
        notes='Either a Habit, a Daily, or a To Do',
        difficulty='Easy',
        is_positive=True,
        user_id=bobbie.id
    )

    habit2_bobbie= Habit(
        title="Click here to edit this into a bad habit you'd like to quit",
        notes='Or delete from the edit screen',
        difficulty='Easy',
        is_positive=False,
        user_id=bobbie.id
    )
    habit3_bobbie= Habit(
        title="10 min cardio >> + 10 minutes cardio",
        difficulty='Easy',
        is_positive=True,
        user_id=bobbie.id
    )
    habit4_bobbie= Habit(
        title="Process email",
        difficulty='Easy',
        is_positive=True,
        user_id=bobbie.id
    )


    habits=[habit1_bobbie,habit1_demo,habit1_mar,habit2_bobbie,habit2_demo,habit2_mar,
    habit3_bobbie,habit3_demo,habit3_mar,habit4_bobbie,habit4_mar,habit4_demo]

    for habit in habits:
        db.session.add(habit)
    db.session.commit()






def undo_habits():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.habits RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM habits"))

    db.session.commit()
