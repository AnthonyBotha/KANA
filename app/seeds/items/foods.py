from app.models import db, Item,User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_foods():
    demo=User.query.filter_by(email='demo@aa.io').first()
    bobbie=User.query.filter_by(email='bobbie@aa.io').first()
    marnie=User.query.filter_by(email='marnie@aa.io').first()

    food1= Item(
        name='strawberry',
        type='food',
        description="Helpful food",
        equipment=False,
        cost=30.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331254/Strawberry_yuwpqx.png'
    )
    food2= Item(
        name='pineapple',
        type='food',
        description="Almost perfect.",
        equipment=False,
        cost=30.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331252/Pineapple_h4xmqi.png'
    )
    food3= Item(
        name='watermelon',
        type='food',
        description="better then bananas",
        equipment=False,
        cost=20.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331256/Watermelon_kaqmno.png'
    )
    food4= Item(
        name='pear',
        type='food',
        description="healthy fruit",
        equipment=False,
        cost=30.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331250/Pear_vjiybe.png'
    )
    food5= Item(
        name='oranges',
        type='food',
        description="Helpful food",
        equipment=False,
        cost=30.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331248/Orange_hl1xsv.png'
    )
    food6= Item(
        name='grapes',
        type='food',
        description="helpful food",
        equipment=False,
        cost=30.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331246/Grapes_igfz6z.png'
    )
    food7= Item(
        name='bananas',
        type='food',
        description="helpful food",
        equipment=False,
        cost=10.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331244/Bananas_c4rifz.png'
    )
    food8= Item(
        name='perfect apple',
        type='food',
        description="heals you 100%",
        equipment=False,
        cost=60.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331242/Apple_yiuqyj.png'
    )

    foods=[food1,food2,food3,food4,food5,food6,food7,food8]
    for food in foods:
        db.session.add(food)
    db.session.commit()
    demo.items.append(food1)
    bobbie.items.append(food1)
    marnie.items.append(food1)

    db.session.commit()

def undo_foods():
    # for no errors i had to remove in eggs file
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))

    db.session.commit()
