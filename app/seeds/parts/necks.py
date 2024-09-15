from app.models import db,environment,SCHEMA
from app.models.parts.neck import Neck
from sqlalchemy.sql import text

def seed_necks():
    gray= Neck(
        type='gray',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368899/neck1_dso3ln.png'
    )
    light_blue= Neck(
        type='light_blue',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368900/neck2_ohuuin.png'
    )
    light_gold= Neck(
        type='light_gold',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368900/neck3_fzbquv.png'
    )
    blue= Neck(
        type='blue',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368901/neck4_lz15bs.png'
    )
    gold= Neck(
        type='gold',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368901/neck5_togu8y.png'
    )
    green= Neck(
        type='green',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368902/neck6_ljwym3.png'
    )
    turquoise= Neck(
        type='turquoise',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368902/neck7_l3obun.png'
    )
    light_red= Neck(
        type='light_red',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368903/neck8_uudp45.png'
    )
    orange= Neck(
        type='orange',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368903/neck9_e2caeg.png'
    )
    dark_green= Neck(
        type='dark_green',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368903/neck10_zkqurj.png'
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
