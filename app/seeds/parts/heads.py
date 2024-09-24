from app.models import db,environment,SCHEMA
from app.models.parts.head import Head
from sqlalchemy.sql import text

def seed_heads():
    turquoise= Head(
        type='turquoise',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368881/head1_pghhub.png'
    )
    purple= Head(
        type='purple',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368881/head2_sevtx7.png'
    )
    light_green= Head(
        type='light_green',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368882/head3_vkeorn.png'
    )
    red= Head(
        type='red',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368882/head4_yquyzq.png'
    )
    gold= Head(
        type='gold',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368883/head5_oxvskz.png'
    )
    navy_blue= Head(
        type='navy_blue',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368893/head6_ftrp68.png'
    )
    dark_green= Head(
        type='dark_green',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368893/head7_etbfrs.png'
    )
    orange= Head(
        type='orange',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368893/head8_cmobvm.png'
    )
    blue= Head(
        type='blue',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368894/head9_sm24ee.png'
    )
    gray= Head(
        type='gray',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368894/head10_hhjdxg.png'
    )

    heads= [turquoise,purple,light_green,red,gold,navy_blue,dark_green,orange,blue,gray]
    for head in heads:
        db.session.add(head)

    db.session.commit()


def undo_heads():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bodies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM heads"))

    db.session.commit()
