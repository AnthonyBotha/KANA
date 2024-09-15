from app.models import db,environment,SCHEMA
from app.models.parts.background import Background
from sqlalchemy.sql import text

def seed_backgrounds():
    blue= Background(
        type='blue',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726416988/Blue_v7pmmv.png'
    )
    brown= Background(
        type='brown',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726416988/Brown_cnfgxf.png'
    )
    gray= Background(
        type='gray',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726416988/Gray_li1dnm.png'
    )
    green= Background(
        type='green',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726416988/Green_zkpdax.png'
    )
    light_blue= Background(
        type='light_blue',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726416988/Light_Blue_nl6iwg.png'
    )
    light_brown= Background(
        type='light_brown',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726416989/Light_Brown_hcofri.png'
    )
    light_gray= Background(
        type='light_gray',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726416989/Light_Gray_fexxsg.png'
    )
    light_green= Background(
        type='light_green',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726416990/Light_Green_vf7gnm.png'
    )
    light_orange= Background(
        type='light_orange',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726416990/Light_Orange_u3unut.png'
    )
    light_pink= Background(
        type='light_pink',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726416990/Light_Pink_elcw5s.png'
    )
    light_purple= Background(
        type='light_purple',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726416991/Light_Purple_t82jpv.png'
    )
    light_red= Background(
        type='light_red',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726416991/Light_Red_issgrq.png'
    )
    light_yellow= Background(
        type='light_yellow',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726416992/Light_Yellow_tn63ry.png'
    )
    orange= Background(
        type='orange',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726416992/Orange_tzy8sr.png'
    )
    pink= Background(
        type='pink',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726416993/Pink_obcihb.png'
    )
    purple= Background(
        type='purple',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726416993/Purple_zboc6x.png'
    )
    red= Background(
        type='red',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726416994/Red_cmoew2.png'
    )
    yellow= Background(
        type='yellow',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726416994/Yellow_plfh18.png'
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
