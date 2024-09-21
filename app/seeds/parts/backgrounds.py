from app.models import db,environment,SCHEMA
from app.models.parts.background import Background
from sqlalchemy.sql import text

def seed_backgrounds():
    blue= Background(
        type='blue',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726716915/Blue_nwrh4b.png'
    )
    brown= Background(
        type='brown',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726716916/Brown_zu1y20.png'
    )
    gray= Background(
        type='gray',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726716917/Gray_uztfr1.png'
    )
    green= Background(
        type='green',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726716919/Green_ywnbwv.png'
    )
    light_blue= Background(
        type='light_blue',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726716920/Light_Blue_hphisa.png'
    )
    light_brown= Background(
        type='light_brown',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726716922/Light_Brown_bwqlt6.png'
    )
    light_gray= Background(
        type='light_gray',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726716923/Light_Gray_hrsvug.png'
    )
    light_green= Background(
        type='light_green',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726716924/Light_Green_ttvar8.png'
    )
    light_orange= Background(
        type='light_orange',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726716926/Light_Orange_fn4fif.png'
    )
    light_pink= Background(
        type='light_pink',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726716927/Light_Pink_vaxmys.png'
    )
    light_purple= Background(
        type='light_purple',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726716929/Light_Purple_zyeidh.png'
    )
    light_red= Background(
        type='light_red',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726716930/Light_Red_uwfjvc.png'
    )
    light_yellow= Background(
        type='light_yellow',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726716932/Light_Yellow_lfmqtl.png'
    )
    orange= Background(
        type='orange',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726716947/Orange_idforz.png'
    )
    pink= Background(
        type='pink',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726716948/Pink_aunfwq.png'
    )
    purple= Background(
        type='purple',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726716950/Purple_qbhmz0.png'
    )
    red= Background(
        type='red',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726716952/Red_tywltm.png'
    )
    yellow= Background(
        type='yellow',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726716953/Yellow_wp18j4.png'
    )


    backgrounds= [blue,brown,gray,green,light_blue,light_brown,light_gray,light_green,light_orange,light_pink,light_purple,light_red,light_yellow,orange,pink,purple,red,yellow]
    for background in backgrounds:
        db.session.add(background)

    db.session.commit()


def undo_backgrounds():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bodies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM backgrounds"))

    db.session.commit()
