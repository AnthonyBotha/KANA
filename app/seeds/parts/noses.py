from app.models import db,environment,SCHEMA
from app.models.parts.nose import Nose
from sqlalchemy.sql import text

def seed_noses():
    gray_triangle= Nose(
        type='gray_triangle',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368904/nose1_gcefav.png'
    )
    gray_rectangle= Nose(
        type='gray_rectangle',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368904/nose2_tzbd30.png'
    )
    horizontal_stripes= Nose(
        type='horizontal_stripes',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368905/nose3_j1kjak.png'
    )
    green= Nose(
        type='green',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368905/nose4_q46apf.png'
    )
    light_purple= Nose(
        type='light_purple',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368906/nose5_opcwfo.png'
    )
    light_blue= Nose(
        type='light_blue',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368906/nose6_keeypd.png'
    )
    vertical_stripes= Nose(
        type='vertical_stripes',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368906/nose7_r8jkyl.png'
    )
    gray_pentagon= Nose(
        type='gray_pentagon',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368907/nose8_p0fblh.png'
    )
    light_red= Nose(
        type='light_red',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368907/nose9_rtwfmz.png'
    )
    yellow= Nose(
        type='yellow',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368908/nose10_svs1yu.png'
    )

    noses= [gray_triangle,gray_rectangle,horizontal_stripes,green,light_purple,light_blue,vertical_stripes,gray_pentagon,light_red,yellow]
    for nose in noses:
        db.session.add(nose)

    db.session.commit()


def undo_noses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bodies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM noses"))

    db.session.commit()
