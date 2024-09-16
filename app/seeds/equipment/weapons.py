from app.models import db, Item,User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_weapons():
    demo=User.query.filter_by(email='demo@aa.io').first()
    bobbie=User.query.filter_by(email='bobbie@aa.io').first()
    marnie=User.query.filter_by(email='marnie@aa.io').first()

    weapon1= Item(
        name='Basic Sword',
        type='weapon',
        description="For Training",
        equipment=True,
        cost=10.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331895/Dagger_lv3g4u.png'
    )
    weapon2= Item(
        name='Knight Sword',
        type='weapon',
        description="A True Sword.",
        equipment=True,
        cost=50.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331898/Sword_nepysc.png'
    )
    weapon3= Item(
        name='Axe',
        type='weapon',
        description="are you crazy?",
        equipment=True,
        cost=50.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331892/Axe_onciqu.png'
    )
    weapon4= Item(
        name='Staff',
        type='weapon',
        description="Warlocks can have this",
        equipment=True,
        cost=40.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331901/Wand_wa54tw.png'
    )

    weapons=[weapon1,weapon2,weapon3,weapon4]
    for weapon in weapons:
        db.session.add(weapon)
    db.session.commit()

    demo.items.append(weapon1)
    bobbie.items.append(weapon1)
    marnie.items.append(weapon1)

    db.session.commit()

def undo_weapons():
    # for no errors i had to remove in eggs file
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))

    db.session.commit()
