from app.models import db, Item,User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_eggs():
    demo=User.query.filter_by(email='demo@aa.io').first()
    bobbie=User.query.filter_by(email='bobbie@aa.io').first()
    marnie=User.query.filter_by(email='marnie@aa.io').first()

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

    demo.items.append(egg1)
    bobbie.items.append(egg1)
    marnie.items.append(egg1)

    db.session.commit()

def undo_eggs():
    # demo=User.query.filter_by(email='demo@aa.io').first()
    # if demo is not None and demo.items is not None and len(demo.items) > 0:
    #     undo_inventory()

    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.inventory RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM inventory"))
        db.session.execute(text("DELETE FROM items"))

    db.session.commit()



def undo_inventory():
    demo=User.query.filter_by(email='demo@aa.io').first()
    bobbie=User.query.filter_by(email='bobbie@aa.io').first()
    marnie=User.query.filter_by(email='marnie@aa.io').first()
    # eggs removed from inventory
    egg1=Item.query.filter_by(item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331213/Yellow_Egg_amwdrb.png',type='egg').first()



    demo.items.remove(egg1)
    bobbie.items.remove(egg1)
    marnie.items.remove(egg1)
    # foods removed from inventory
    food1=Item.query.filter_by(item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331254/Strawberry_yuwpqx.png',type='food').first()


    demo.items.remove(food1)
    bobbie.items.remove(food1)
    marnie.items.remove(food1)


    # potions removed
    potion1=Item.query.filter_by(item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331310/Yellow_Potion_ltq2s8.png',type='potion').first()


    demo.items.remove(potion1)
    bobbie.items.remove(potion1)
    marnie.items.remove(potion1)


    # specials removed
    special1=Item.query.filter_by(item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331484/Yellow_Baby_Dragon_tbk3l1.png',type='special').first()

    demo.items.remove(special1)
    bobbie.items.remove(special1)
    marnie.items.remove(special1)

    # off hands removed
    sheild1=Item.query.filter_by(item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331934/Wooden_Shield_vrlqfc.png',name='Wood Sheild').first()

    demo.items.remove(sheild1)
    bobbie.items.remove(sheild1)
    marnie.items.remove(sheild1)

    # armor removed
    armor1=Item.query.filter_by(item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331571/Tunic_ni2cut.png',type='armor').first()

    demo.items.remove(armor1)
    bobbie.items.remove(armor1)
    marnie.items.remove(armor1)

    # hats
    hat1=Item.query.filter_by(item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331816/Sant_Hat_eh6jyy.png',type='hat').first()

    demo.items.remove(hat1)
    bobbie.items.remove(hat1)
    marnie.items.remove(hat1)

    # helmets
    helmet1=Item.query.filter_by(item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331857/Hat_fngaa9.png',type='helmet').first()
    demo.items.remove(helmet1)
    bobbie.items.remove(helmet1)
    marnie.items.remove(helmet1)

    #weapons
    weapon1=Item.query.filter_by(item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331895/Dagger_lv3g4u.png',type='weapon').first()
    demo.items.remove(weapon1)
    bobbie.items.remove(weapon1)
    marnie.items.remove(weapon1)
