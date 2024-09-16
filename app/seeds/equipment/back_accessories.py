from app.models import db, Item, environment, SCHEMA
from sqlalchemy.sql import text


def seed_back():
    back1= Item(
        name='Basic Wings',
        type='back',
        description="Try to Fly",
        equipment=True,
        cost=30.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331611/Feathered_Wings_ii6qlf.png'
    )
    back2= Item(
        name='Warlock Wings',
        type='back',
        description="For Warlocks",
        equipment=True,
        cost=50.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331609/Dragon_Wings_vbwn12.png'
    )
    back3= Item(
        name='Angel Wings',
        type='back',
        description="Buy this now. Will not fall in battle",
        equipment=True,
        cost=70.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331606/Angel_Wings_mf3gsz.png'
    )


    backs=[back1,back2,back3]
    for back in backs:
        db.session.add(back)
    db.session.commit()


def undo_back():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))

    db.session.commit()
