from app.models import db,environment,SCHEMA
from app.models.parts.neck import Neck
from sqlalchemy.sql import text

def seed_necks():
    gray= Neck(
        type='gray',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714198/neck1_nwbclf.png'
    )
    light_blue= Neck(
        type='light_blue',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714199/neck2_y7ugeo.png'
    )
    light_gold= Neck(
        type='light_gold',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714200/neck3_gxeu63.png'
    )
    blue= Neck(
        type='blue',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714201/neck4_qe3mwo.png'
    )
    gold= Neck(
        type='gold',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714202/neck5_gfa8xy.png'
    )
    green= Neck(
        type='green',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714203/neck6_urwmrg.png'
    )
    turquoise= Neck(
        type='turquoise',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714204/neck7_kfx4cu.png'
    )
    light_red= Neck(
        type='light_red',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714205/neck8_p52szo.png'
    )
    orange= Neck(
        type='orange',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714205/neck9_duuofa.png'
    )
    dark_green= Neck(
        type='dark_green',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714206/neck10_lkcgnw.png'
    )

    necks= [gray,light_blue,light_gold,blue,gold,green,turquoise,light_red,orange,dark_green]
    for neck in necks:
        db.session.add(neck)

    db.session.commit()


def undo_necks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bodies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM necks"))

    db.session.commit()
