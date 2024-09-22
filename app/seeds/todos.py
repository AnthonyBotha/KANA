from app.models import db, User,Todo, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date



def seed_todos():
    demo=User.query.filter_by(email='demo@aa.io').first()
    bobbie=User.query.filter_by(email='bobbie@aa.io').first()
    marnie=User.query.filter_by(email='marnie@aa.io').first()

    demo_todo1 = Todo(
        title="Work project >> Complete work project",
        notes='Tap to specify the name of your current project + set a due date!',
        difficulty='Easy',
        user_id=demo.id,
        due_date=date(2025,9,20)
    )

    demo_todo2= Todo(
        title="Set up workout schedule",
        notes='Tap to add a checklist!',
        difficulty='Easy',
        user_id=demo.id,
        due_date=date(2025,10,11)
    )


    mar_todo1 = Todo(
        title="Work project >> Complete work project",
        notes='Tap to specify the name of your current project + set a due date!',
        difficulty='Easy',
        user_id=marnie.id,
        due_date=date(2025,9,20)
    )

    mar_todo2= Todo(
        title="Set up workout schedule",
        notes='Tap to add a checklist!',
        difficulty='Easy',
        user_id=marnie.id,
        due_date=date(2025,10,11)
    )



    bob_todo1 = Todo(
        title="Work project >> Complete work project",
        notes='Tap to specify the name of your current project + set a due date!',
        difficulty='Easy',
        user_id=bobbie.id,
        due_date=date(2025,9,20)
    )

    bob_todo2= Todo(
        title="Set up workout schedule",
        notes='Tap to add a checklist!',
        user_id=bobbie.id,
        due_date=date(2025,10,11)
    )


    todos=[demo_todo1,demo_todo2,mar_todo1,mar_todo2,bob_todo1,bob_todo2]


    for todo in todos:
        db.session.add(todo)
    db.session.commit()



def undo_todos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.todos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM todos"))

    db.session.commit()
