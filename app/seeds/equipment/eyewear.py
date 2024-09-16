from app.models import db, Item, environment, SCHEMA
from sqlalchemy.sql import text


def seed_eyewear():
    eye1= Item(
        name='sunglasses',
        type='eyewear',
        description="nice for the sun",
        equipment=True,
        cost=10.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331731/Sunglasses_s0tt2q.png'
    )
    eye2= Item(
        name='square glasses',
        type='eyewear',
        description="For reading",
        equipment=True,
        cost=10.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331728/Square_Glasses_ygti3w.png'
    )
    eye3= Item(
        name='round glasses',
        type='eyewear',
        description="for dorks",
        equipment=True,
        cost=10.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331725/Round_Glasses_yzyjjj.png'
    )
    eye4= Item(
        name='monocle',
        type='eyewear',
        description="Perfect for Robots",
        equipment=True,
        cost=10.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331723/Monocle_tswpa4.png'
    )


    eyewear=[eye1,eye2,eye3,eye4]
    for eye in eyewear:
        db.session.add(eye)
    db.session.commit()


def undo_eyewear():

    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))

    db.session.commit()
