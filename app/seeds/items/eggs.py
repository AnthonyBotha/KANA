from app.models import db, Item,User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_eggs():
    demo=User.query.filter_by(email='demo@aa.io').first()
    bobbie=User.query.filter_by(email='bobbie@aa.io').first()


    egg1= Item(
        name='yellow egg',
        type='egg',
        description="Pretty good",
        equipment=False,
        cost=60.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331213/Yellow_Egg_amwdrb.png'
    )
    egg2= Item(
        name='white egg',
        type='egg',
        description="Buy it!!!!",
        equipment=False,
        cost=80.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331211/White_Egg_u54za0.png'
    )
    egg3= Item(
        name='red egg',
        type='egg',
        description="Why get this",
        equipment=False,
        cost=10.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331209/Red_Egg_zu5eae.png'
    )
    egg4= Item(
        name='purple egg',
        type='egg',
        description="Maybe you should buy this",
        equipment=False,
        cost=50.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331207/Purple_Egg_a8gnz0.png'
    )
    egg5= Item(
        name='orange egg',
        type='egg',
        description="A bit better then average",
        equipment=False,
        cost=40.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331205/Orange_Egg_d3xblu.png'
    )
    egg6= Item(
        name='green egg',
        type='egg',
        description="An average egg",
        equipment=False,
        cost=30.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331203/Green_Egg_rxfqic.png'
    )
    egg7= Item(
        name='blue egg',
        type='egg',
        description="Worst Egg you can have! Please Run!",
        equipment=False,
        cost=1.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331201/Blue_Egg_rwe7jw.png'
    )
    egg8= Item(
        name='black egg',
        type='egg',
        description="Best Egg You can Have!!! Buy this!!!",
        equipment=False,
        cost=80.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331199/Black_Egg_aqud1z.png'
    )

    eggs=[egg1,egg2,egg3,egg4,egg5,egg6,egg7,egg8]
    for egg in eggs:
        db.session.add(egg)
    db.session.commit()
    demo.items.append(egg8)
    demo.items.append(egg1)
    bobbie.items.append(egg4)

    db.session.commit()

def undo_eggs():
    demo=User.query.filter_by(email='demo@aa.io').first()
    bobbie=User.query.filter_by(email='bobbie@aa.io').first()
    # eggs removed from inventory
    egg8=Item.query.filter_by(item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331199/Black_Egg_aqud1z.png',type='egg').first()
    egg1=Item.query.filter_by(item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331213/Yellow_Egg_amwdrb.png',type='egg').first()
    egg4=Item.query.filter_by(item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331207/Purple_Egg_a8gnz0.png',type='egg').first()

    demo.items.remove(egg8)
    demo.items.remove(egg1)
    bobbie.items.remove(egg4)
    # foods removed from inventory
    food1=Item.query.filter_by(item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331254/Strawberry_yuwpqx.png',type='food').first()
    food2=Item.query.filter_by(item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331252/Pineapple_h4xmqi.png',type='food').first()
    food3=Item.query.filter_by(item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331256/Watermelon_kaqmno.png',type='food').first()

    demo.items.remove(food1)
    demo.items.remove(food2)
    bobbie.items.remove(food3)


    # potions removed
    potion1=Item.query.filter_by(item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331310/Yellow_Potion_ltq2s8.png',type='potion').first()
    potion2=Item.query.filter_by(item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331308/White_Potion_jvpmak.png',type='potion').first()
    potion3=Item.query.filter_by(item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331305/Red_Potion_xa8idn.png',type='potion').first()

    demo.items.remove(potion1)
    demo.items.remove(potion2)
    bobbie.items.remove(potion3)


    # specials removed
    special1=Item.query.filter_by(item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331484/Yellow_Baby_Dragon_tbk3l1.png',type='special').first()
    special2=Item.query.filter_by(item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331482/White_Baby_Dragon_wgn3uv.png',type='special').first()
    special3=Item.query.filter_by(item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331479/Red_Baby_Dragon_nyrbuo.png',type='special').first()

    demo.items.remove(special1)
    demo.items.remove(special2)
    bobbie.items.remove(special3)
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))

    db.session.commit()