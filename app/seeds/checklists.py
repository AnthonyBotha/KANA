from app.models import db, Checklist, Todo, Daily, environment, SCHEMA
from sqlalchemy.sql import text

def seed_checklists():
    check1 = Checklist(
        todo_id = 1,
        completed = True,
        description = 'Team up'
    )

    check2 = Checklist(
        todo_id = 1,
        completed = True,
        description = 'Organize and divide tasks'
    )

    check3 = Checklist(
        todo_id = 1,
        description = 'Finish first step'
    )

    check4 = Checklist(
        todo_id = 1,
        description = 'Finish second step'
    )

    check5 = Checklist(
        todo_id = 1,
        description = 'Deploy and score an A'
    )

    checklists = [check1,check2,check3,check4,check5]
    for check in checklists:
        db.session.add(check)

    todo1 = Todo.query.filter_by(id=1).first()
    todo1.checklist.append(check1)
    todo1.checklist.append(check2)
    todo1.checklist.append(check3)
    todo1.checklist.append(check4)
    todo1.checklist.append(check5)

    db.session.commit()



def undo_checklists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.checklists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM checklists"))

        db.session.commit()
