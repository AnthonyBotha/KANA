from app.models import db,environment,SCHEMA
from app.models.parts.mouth import Mouth
from sqlalchemy.sql import text

def seed_mouths():
    gray_zipper= Mouth(
        type='gray_zipper',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368895/mouth1_ik5qin.png'
    )
    gray= Mouth(
        type='gray',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368895/mouth2_zloniv.png'
    )
    green_trapezoid= Mouth(
        type='green_trapezoid',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368896/mouth3_wqnysu.png'
    )
    dark_green= Mouth(
        type='dark_green',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368896/mouth4_oi6kvw.png'
    )
    purple= Mouth(
        type='purple',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368897/mouth5_p05e9q.png'
    )
    orange= Mouth(
        type='orange',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368897/mouth6_tfbja0.png'
    )
    gold= Mouth(
        type='gold',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368898/mouth7_ydzntu.png'
    )
    red= Mouth(
        type='red',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368898/mouth8_fl8njv.png'
    )
    blue= Mouth(
        type='blue',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368898/mouth9_bknsqb.png'
    )
    light_green= Mouth(
        type='light_green',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726368899/mouth10_nhdgos.png'
    )

    mouths= [gray_zipper,gray,green_trapezoid,dark_green,purple,orange,gold,red,blue,light_green]
    for mouth in mouths:
        db.session.add(mouth)

    db.session.commit()


def undo_mouths():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bodies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM mouths"))

    db.session.commit()
