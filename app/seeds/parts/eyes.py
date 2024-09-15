from app.models import db,environment,SCHEMA
from app.models.parts.eye import Eye
from sqlalchemy.sql import text

def seed_eyes():
    pink= Eye(
        type='pink',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368877/eyes1_ifqpad.png'
    )
    yellow= Eye(
        type='yellow',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368877/eyes2_pufxlw.png'
    )
    light_green= Eye(
        type='light_green',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368877/eyes3_dfzqwt.png'
    )
    dark_green= Eye(
        type='dark_green',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368878/eyes4_jz0yqn.png'
    )
    turquoise= Eye(
        type='turquoise',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368878/eyes5_zrr7fr.png'
    )
    square_green= Eye(
        type='square_green',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368879/eyes6_zzyhre.png'
    )
    purple= Eye(
        type='purple',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368879/eyes7_ptbceh.png'
    )
    light_turquoise= Eye(
        type='light_turquoise',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368880/eyes8_hizhr8.png'
    )
    brown= Eye(
        type='brown',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368880/eyes9_kq3boz.png'
    )
    round_red= Eye(
        type='round_red',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368880/eyes10_solcup.png'
    )

    eyes_list= [pink,yellow,light_green,dark_green,turquoise,square_green,purple,light_turquoise,brown,round_red]
    for eyes in eyes_list:
        db.session.add(eyes)

    db.session.commit()


def undo_eyes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bodies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM eyes"))

    db.session.commit()
