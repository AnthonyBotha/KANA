from app.models import db, Item,User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_off_hands():
    demo=User.query.filter_by(email='demo@aa.io').first()
    bobbie=User.query.filter_by(email='bobbie@aa.io').first()
    marnie=User.query.filter_by(email='marnie@aa.io').first()

    sheild1= Item(
        name='Wood Sheild',
        type='off hands',
        description="Wood Sheild",
        equipment=True,
        cost=30.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331934/Wooden_Shield_vrlqfc.png'
    )
    sheild2= Item(
        name='Blue sheild',
        type='off hands',
        description="Almost perfect Sheild.",
        equipment=True,
        cost=50.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331931/Training_Shield_omywua.png'
    )
    sheild3= Item(
        name='Perfect Sheild',
        type='off hands',
        description="Buy this now",
        equipment=True,
        cost=70.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331927/Simple_Buckler_iwi8xl.png'
    )

    sheilds=[sheild1,sheild2,sheild3]
    for sheild in sheilds:
        db.session.add(sheild)
    db.session.commit()

    demo.items.append(sheild1)
    bobbie.items.append(sheild1)
    marnie.items.append(sheild1)

    db.session.commit()

def undo_off_hands():
    # for no errors i had to remove in eggs file
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))

    db.session.commit()
