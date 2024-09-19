from app.models import db,environment,SCHEMA
from app.models.parts.nose import Nose
from sqlalchemy.sql import text

def seed_noses():
    gray_triangle= Nose(
        type='gray_triangle',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714207/nose1_zbafyx.png'
    )
    gray_rectangle= Nose(
        type='gray_rectangle',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714208/nose2_yrkqbt.png'
    )
    horizontal_stripes= Nose(
        type='horizontal_stripes',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714209/nose3_s437lo.png'
    )
    green= Nose(
        type='green',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714210/nose4_e22jor.png'
    )
    light_purple= Nose(
        type='light_purple',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714211/nose5_haecmn.png'
    )
    light_blue= Nose(
        type='light_blue',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714212/nose6_szcdao.png'
    )
    vertical_stripes= Nose(
        type='vertical_stripes',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714213/nose7_ohfxhx.png'
    )
    gray_pentagon= Nose(
        type='gray_pentagon',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714214/nose8_lzegw9.png'
    )
    light_red= Nose(
        type='light_red',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714215/nose9_wxtege.png'
    )
    yellow= Nose(
        type='yellow',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714215/nose10_qrbqd1.png'
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
