from app.models import db, Item, environment, SCHEMA
from sqlalchemy.sql import text


def seed_body_items():
    body1= Item(
        name='Scarf',
        type='body',
        description="Fashion",
        equipment=True,
        cost=10.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331681/Scarf_pjhfm7.png'
    )
    body2= Item(
        name='Breif Case',
        type='body',
        description="For Storage",
        equipment=True,
        cost=10.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331679/Satchel_u8dwm6.png'
    )
    body3= Item(
        name='Cape',
        type='body',
        description="Be Doctor Strange",
        equipment=True,
        cost=30.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331676/Cape_om2veh.png'
    )
    body4= Item(
        name='Backpack',
        type='body',
        description="Buy this now.Ultimate Storage",
        equipment=True,
        cost=50.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331673/Backpack_s9etxm.png'
    )


    bodies=[body1,body2,body3,body4]
    for body in bodies:
        db.session.add(body)
    db.session.commit()


def undo_body_items():

    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))

    db.session.commit()
