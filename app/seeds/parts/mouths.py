from app.models import db,environment,SCHEMA
from app.models.parts.mouth import Mouth
from sqlalchemy.sql import text

def seed_mouths():
    gray_zipper= Mouth(
        type='gray_zipper',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714115/mouth1_o1mfeb.png'
    )
    gray= Mouth(
        type='gray',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714116/mouth2_x9gzlz.png'
    )
    green_trapezoid= Mouth(
        type='green_trapezoid',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714131/mouth3_ncytsv.png'
    )
    dark_green= Mouth(
        type='dark_green',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714192/mouth4_nmypux.png'
    )
    purple= Mouth(
        type='purple',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714192/mouth5_z9unal.png'
    )
    orange= Mouth(
        type='orange',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714194/mouth6_vmpws0.png'
    )
    gold= Mouth(
        type='gold',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714194/mouth7_vvnu9k.png'
    )
    red= Mouth(
        type='red',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714196/mouth8_imklqj.png'
    )
    blue= Mouth(
        type='blue',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714196/mouth9_hkfqax.png'
    )
    light_green= Mouth(
        type='light_green',
        img_url='https://res.cloudinary.com/dmg8yuivs/image/upload/v1726714197/mouth10_f7snod.png'
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
