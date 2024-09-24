from app.models import db,environment,SCHEMA
from sqlalchemy.sql import text
from app.models.parts.antenna import Antenna

def seed_antennas():
    blue=Antenna(
        type='blue',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714088/antenna10_ywdimn.png'
    )
    green_triangle=Antenna(
        type='green triangle',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714086/antenna9_bivvx3.png'
    )
    purple_rectangles=Antenna(
        type='purple rectangles',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714086/antenna8_v58ndm.png'
    )
    purple_circles=Antenna(
        type='purple circles',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714085/antenna7_dgxvuu.png'
    )
    basic=Antenna(
        type='basic',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714084/antenna6_sfxhae.png'
    )
    yellow=Antenna(
        type='yellow',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714083/antenna5_ww61jc.png'
    )
    green_top=Antenna(
        type='green top',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714083/antenna4_ijvvoy.png'
    )
    small_pink=Antenna(
        type='small pink antenna',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714082/antenna3_zyblqx.png'
    )
    double_blue=Antenna(
        type='double blue',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714081/antenna2_iggfb8.png'
    )
    double_gray=Antenna(
        type='double gray',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714081/antenna1_s8esf4.png'
    )

    antennas=[blue,green_triangle,purple_rectangles,purple_circles,
    basic,yellow,green_top,small_pink,double_blue,double_gray]

    for antenna in antennas:
        db.session.add(antenna)

    db.session.commit()

def undo_antennas():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.antennas RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM antennas"))

    db.session.commit()
