from app.models import db, Item,User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_armors():
    demo=User.query.filter_by(email='demo@aa.io').first()
    bobbie=User.query.filter_by(email='bobbie@aa.io').first()
    marnie=User.query.filter_by(email='marnie@aa.io').first()

    armor1= Item(
        name='Basic Armor',
        type='armor',
        description="Basic for starting",
        equipment=True,
        cost=10.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331571/Tunic_ni2cut.png'
    )
    armor2= Item(
        name='Warlock Armor',
        type='armor',
        description="For Warlocks",
        equipment=True,
        cost=30.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331569/Robe_vrxb3u.png'
    )
    armor3= Item(
        name='Light Armor',
        type='armor',
        description="Buy this now. Will not fall in battle",
        equipment=True,
        cost=70.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331566/Light_Armor_xpjl3n.png'
    )
    armor4= Item(
        name='Knight Armor',
        type='armor',
        description="Armor that will last a while",
        equipment=True,
        cost=50.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331564/Armor_ojwjon.png'
    )

    armors=[armor1,armor2,armor3,armor4]
    for armor in armors:
        db.session.add(armor)
    db.session.commit()

    demo.items.append(armor1)
    bobbie.items.append(armor1)
    marnie.items.append(armor1)

    db.session.commit()

def undo_armors():
    # for no errors i had to remove in eggs file
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))

    db.session.commit()
