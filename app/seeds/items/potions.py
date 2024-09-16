from app.models import db, Item,User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_potions():
    demo=User.query.filter_by(email='demo@aa.io').first()
    bobbie=User.query.filter_by(email='bobbie@aa.io').first()

    potion1= Item(
        name='yellow potion',
        type='potion',
        description="Helpful potion",
        equipment=False,
        cost=30.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331310/Yellow_Potion_ltq2s8.png'
    )
    potion2= Item(
        name='white potion',
        type='potion',
        description="Almost perfect.",
        equipment=False,
        cost=50.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331308/White_Potion_jvpmak.png'
    )
    potion3= Item(
        name='red potion',
        type='potion',
        description="better than blue",
        equipment=False,
        cost=20.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331305/Red_Potion_xa8idn.png'
    )
    potion4= Item(
        name='purple potion',
        type='potion',
        description="healthy potion",
        equipment=False,
        cost=30.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331303/Purple_Potion_bsvs49.png'
    )
    potion5= Item(
        name='orange potion',
        type='potion',
        description="Helpful potion",
        equipment=False,
        cost=30.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331301/Orange_Potion_byouow.png'
    )
    potion6= Item(
        name='green potion',
        type='potion',
        description="helpful potion",
        equipment=False,
        cost=30.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331299/Green_Potion_a5i88w.png'
    )
    potion7= Item(
        name='blue potion',
        type='potion',
        description="worse potion",
        equipment=False,
        cost=10.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331296/Blue_Potion_mu1jhk.png'
    )
    potion8= Item(
        name='dark potion',
        type='potion',
        description="heals you 100%",
        equipment=False,
        cost=60.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331294/Black_Potion_udpofx.png'
    )

    potions=[potion1,potion2,potion3,potion4,potion5,potion6,potion7,potion8]
    for potion in potions:
        db.session.add(potion)
    db.session.commit()

    demo.items.append(potion1)
    demo.items.append(potion2)
    bobbie.items.append(potion3)

    db.session.commit()

def undo_potions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))

    db.session.commit()
