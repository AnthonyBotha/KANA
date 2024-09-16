from app.models import db, Item,User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_hats():
    demo=User.query.filter_by(email='demo@aa.io').first()
    bobbie=User.query.filter_by(email='bobbie@aa.io').first()
    marnie=User.query.filter_by(email='marnie@aa.io').first()

    hat1= Item(
        name="Santa's Hat",
        type='hat',
        description="For the hoildays",
        equipment=True,
        cost=10.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331816/Sant_Hat_eh6jyy.png'
    )
    hat2= Item(
        name='Headband',
        type='hat',
        description="Guardians wear this.",
        equipment=True,
        cost=10.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331813/Headband_wjtvrn.png'
    )
    hat3= Item(
        name='Funky hat',
        type='hat',
        description="Are you funky?",
        equipment=True,
        cost=10.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331810/Hat_fuokkk.png'
    )
    hat4= Item(
        name='Cap',
        type='hat',
        description="you are basic!",
        equipment=True,
        cost=10.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331807/Cap_ow29zo.png'
    )


    hats=[hat1,hat2,hat3,hat4]
    for hat in hats:
        db.session.add(hat)
    db.session.commit()

    demo.items.append(hat1)
    bobbie.items.append(hat1)
    marnie.items.append(hat1)

    db.session.commit()

def undo_hats():
    # for no errors i had to remove in eggs file
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))

    db.session.commit()
