from app.models import db,environment,SCHEMA
from app.models.parts.eye import Eye
from sqlalchemy.sql import text

def seed_eyes():
    pink= Eye(
        type='pink',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714097/eyes1_he7ugr.png'
    )
    yellow= Eye(
        type='yellow',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714098/eyes2_axnwpm.png'
    )
    light_green= Eye(
        type='light_green',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714099/eyes3_bdqweu.png'
    )
    dark_green= Eye(
        type='dark_green',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714100/eyes4_zd65pg.png'
    )
    turquoise= Eye(
        type='turquoise',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714101/eyes5_gcr4cs.png'
    )
    square_green= Eye(
        type='square_green',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714102/eyes6_olnkyr.png'
    )
    purple= Eye(
        type='purple',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714102/eyes7_w9upq1.png'
    )
    light_turquoise= Eye(
        type='light_turquoise',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714104/eyes8_pj1ggg.png'
    )
    brown= Eye(
        type='brown',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714104/eyes9_yulsrb.png'
    )
    round_red= Eye(
        type='round_red',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714105/eyes10_poaovy.png'
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
