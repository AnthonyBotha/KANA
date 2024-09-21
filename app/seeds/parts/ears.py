from app.models import db,environment,SCHEMA
from app.models.parts.ear import Ear
from sqlalchemy.sql import text

def seed_ears():
    light_purple= Ear(
        type='light_purple',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714088/ears1_jbkfow.png'
    )
    green= Ear(
        type='green',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714089/ears2_g6lws9.png'
    )
    light_pink= Ear(
        type='light_pink',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714090/ears3_em2xm4.png'
    )
    blue= Ear(
        type='blue',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714091/ears4_xfpgoo.png'
    )
    pink= Ear(
        type='pink',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714092/ears5_sxgmrl.png'
    )
    orange= Ear(
        type='orange',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714093/ears6_fya0dm.png'
    )
    purple= Ear(
        type='purple',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714094/ears7_qespgv.png'
    )
    green_round= Ear(
        type='green_round',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714095/ears8_v72n39.png'
    )
    blue_hexagon= Ear(
        type='blue_hexagon',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714096/ears9_i5ucn2.png'
    )
    red_circle= Ear(
        type='red_circle',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714096/ears10_nem5u5.png'
    )

    ears_list= [light_purple,green,light_pink,blue,pink,orange,purple,green_round,blue_hexagon,red_circle]
    for ears in ears_list:
        db.session.add(ears)

    db.session.commit()


def undo_ears():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bodies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM ears"))

    db.session.commit()
