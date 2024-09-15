from app.models import db,environment,SCHEMA
from app.models.parts.ear import Ear
from sqlalchemy.sql import text

def seed_ears():
    light_purple= Ear(
        type='light_purple',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368872/ears1_uwrtov.png'
    )
    green= Ear(
        type='green',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368873/ears2_i84g8a.png'
    )
    light_pink= Ear(
        type='light_pink',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368873/ears3_q1qigr.png'
    )
    blue= Ear(
        type='blue',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368873/ears4_n58vvm.png'
    )
    pink= Ear(
        type='pink',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368874/ears5_wvjejq.png'
    )
    orange= Ear(
        type='orange',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368874/ears6_jfvbsw.png'
    )
    purple= Ear(
        type='purple',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368875/ears7_tcxst4.png'
    )

    ears_list= [light_purple,green,light_pink,blue,pink,orange,purple]
    for ears in ears_list:
        db.session.add(ears)

    db.session.commit()


def undo_ears():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bodies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM ears"))

    db.session.commit()
