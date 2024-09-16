from app.models import db, Item,User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_helmets():
    demo=User.query.filter_by(email='demo@aa.io').first()
    bobbie=User.query.filter_by(email='bobbie@aa.io').first()
    marnie=User.query.filter_by(email='marnie@aa.io').first()

    helmet1= Item(
        name="Basic Helmet",
        type='helmet',
        description="For Training",
        equipment=True,
        cost=10.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331857/Hat_fngaa9.png'
    )
    helmet2= Item(
        name='Hood',
        type='helmet',
        description="Ur actually cool wearing this. Other people pay attention!",
        equipment=True,
        cost=30.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331864/Hood_zdepfc.png'
    )
    helmet3= Item(
        name='Knight Helmet',
        type='helmet',
        description="For Knights",
        equipment=True,
        cost=50.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331860/Helmet_eii9mq.png'
    )
    helmet4= Item(
        name='Lame Helmet',
        type='helmet',
        description="you suck!",
        equipment=True,
        cost=1.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331854/Cap_fkm0fn.png'
    )


    helmets=[helmet1,helmet2,helmet3,helmet4]
    for helmet in helmets:
        db.session.add(helmet)
    db.session.commit()

    demo.items.append(helmet1)
    bobbie.items.append(helmet1)
    marnie.items.append(helmet1)

    db.session.commit()

def undo_helmets():
    # for no errors i had to remove in eggs file
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))

    db.session.commit()
