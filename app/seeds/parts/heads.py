from app.models import db,environment,SCHEMA
from app.models.parts.head import Head
from sqlalchemy.sql import text

def seed_heads():
    turquoise= Head(
        type='turquoise',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714106/head1_bsadil.png'
    )
    purple= Head(
        type='purple',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714107/head2_a51jim.png'
    )
    light_green= Head(
        type='light_green',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714108/head3_beazf2.png'
    )
    red= Head(
        type='red',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714109/head4_qfdwql.png'
    )
    gold= Head(
        type='gold',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714110/head5_ui8z2e.png'
    )
    navy_blue= Head(
        type='navy_blue',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714111/head6_yb1gg8.png'
    )
    dark_green= Head(
        type='dark_green',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714111/head7_ukkylr.png'
    )
    orange= Head(
        type='orange',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714112/head8_aq5cie.png'
    )
    blue= Head(
        type='blue',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714113/head9_nchibj.png'
    )
    gray= Head(
        type='gray',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714114/head10_gt4nhm.png'
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
