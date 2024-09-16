from app.models import db, User,Daily, environment, SCHEMA
from sqlalchemy.sql import text



def seed_dailies():
    demo=User.query.filter_by(email='demo@aa.io').first()
    bobbie=User.query.filter_by(email='bobbie@aa.io').first()
    marnie=User.query.filter_by(email='marnie@aa.io').first()

    demo_daily1 = Daily(
        title="Most important task >> Worked on today's most important task",
        notes='Tap to specify your most important task',
        difficulty='Easy',
        user_id=demo.id
    )

    demo_daily2= Daily(
        title="Stretching >> Daily workout routine",
        notes='Tap to choose your schedule and specify exercises!',
        difficulty='Easy',
        user_id=demo.id,
        repeats='Daily'
    )


    mar_daily1 = Daily(
        title="Most important task >> Worked on today's most important task",
        notes='Either a Habit, a Daily, or a To Do',
        difficulty='Easy',
        repeats='Monthly',
        user_id=marnie.id
    )

    mar_daily2= Daily(
        title="Stretching >> Daily workout routine",
        notes='Tap to choose your schedule and specify exercises!',
        difficulty='Easy',
        repeats='Daily',
        user_id=marnie.id
    )



    bob_daily1 = Daily(
        title="Most important task >> Worked on today's most important task",
        notes='Tap to specify your most important task',
        difficulty='Easy',
        user_id=bobbie.id
    )

    bob_daily2= Daily(
        title="Stretching >> Daily workout routine",
        notes='Tap to choose your schedule and specify exercises!',
        difficulty='Easy',
        repeats='Yearly',
        user_id=bobbie.id
    )


    dailies=[demo_daily1,demo_daily2,mar_daily1,mar_daily2,bob_daily1,bob_daily2]


    for daily in dailies:
        db.session.add(daily)
    db.session.commit()



def undo_dailies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.dailies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM dailies"))

    db.session.commit()
