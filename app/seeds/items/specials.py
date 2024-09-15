from app.models import db, Item,User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_specials():
    demo=User.query.filter_by(email='demo@aa.io').first()
    bobbie=User.query.filter_by(email='bobbie@aa.io').first()

    special1= Item(
        name='yellow dragon',
        type='special',
        description="It's a special friend and pet. It's a Dragon!!! Everyone wants a dragon thats yellow.",
        equipment=False,
        cost=30.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331484/Yellow_Baby_Dragon_tbk3l1.png'
    )
    special2= Item(
        name='white dragon',
        type='special',
        description="It's a special friend and pet. It's a Dragon!!! Everyone wants a dragon thats white.",
        equipment=False,
        cost=30.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331482/White_Baby_Dragon_wgn3uv.png'
    )
    special3= Item(
        name='red dragon',
        type='special',
        description="Run!!! It's a Dragon!!! Mean dragon's are red.",
        equipment=False,
        cost=20.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331479/Red_Baby_Dragon_nyrbuo.png'
    )
    special4= Item(
        name='purple dragon',
        type='special',
        description="It's a special friend and pet. It's a Dragon!!! Everyone wants a dragon thats purple.",
        equipment=False,
        cost=30.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331477/Purple_Baby_Dragon_zfz8ni.png'
    )
    special5= Item(
        name='orange dragon',
        type='special',
        description="It's a special friend and pet. It's a Dragon!!! Everyone wants a dragon thats orange.",
        equipment=False,
        cost=30.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331475/Orange_Baby_Dragon_mnbuim.png'
    )
    special6= Item(
        name='green dragon',
        type='special',
        description="This is your best friend. It's a Dragon!!! This is the cutest dragon you can have",
        equipment=False,
        cost=30.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331472/Green_Baby_Dragon_a85vvx.png'
    )
    special7= Item(
        name='blue dragon',
        type='special',
        description="I don't know about this. Do you want this Dragon? Ugly Dragon.",
        equipment=False,
        cost=10.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331470/Blue_Baby_Dragon_smxztc.png'
    )
    special8= Item(
        name='black dragon',
        type='special',
        description="The rarest dragon you can have!!! Better buy it!!!",
        equipment=False,
        cost=60.0,
        item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331468/Black_Baby_Dragon_ppepfq.png'
    )

    specials=[special1,special2,special3,special4,special5,special6,special7,special8]
    for special in specials:
        db.session.add(special)
    db.session.commit()

    demo.items.append(special1)
    demo.items.append(special2)
    bobbie.items.append(special3)

    db.session.commit()

def undo_specials():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))

    db.session.commit()
