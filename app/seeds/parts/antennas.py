from app.models import db,environment,SCHEMA
from sqlalchemy.sql import text
from app.models.parts.antenna import Antenna

def seed_antennas():
    blue=Antenna(
        type='blue',
        img_url='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726330461/antenna10_plenvr.png'
    )
    green_triangle=Antenna(
        type='green triangle',
        img_url='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726330450/antenna9_jwxc88.png'
    )
    purple_rectangles=Antenna(
        type='purple rectangles',
        img_url='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726330440/antenna8_ci8hzu.png'
    )
    purple_circles=Antenna(
        type='purple circles',
        img_url='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726330431/antenna7_xbsehn.png'
    )
    basic=Antenna(
        type='basic',
        img_url='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726330422/antenna6_lo9mvf.png'
    )
    yellow=Antenna(
        type='yellow',
        img_url='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726330414/antenna5_i2hoiw.png'
    )
    green_top=Antenna(
        type='green top',
        img_url='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726330337/antenna4_tsddxf.png'
    )
    small_pink=Antenna(
        type='small pink antenna',
        img_url='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726330329/antenna3_ummzkl.png'
    )
    double_blue=Antenna(
        type='double blue',
        img_url='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726330321/antenna2_bk4agt.png'
    )
    double_gray=Antenna(
        type='double gray',
        img_url='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726330255/antenna1_nonhvg.png'
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
