from app.models import db,environment,SCHEMA
from app.models.parts.body import Body
from sqlalchemy.sql import text

def seed_bodies():
    red= Body(
        type='red',
        img_url='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726330657/body4_hhj2xa.png'
    )
    green= Body(
        type='green',
        img_url='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726330656/body3_hiztlv.png'
    )
    purple= Body(
        type='purple',
        img_url='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726330649/body2_ombj7r.png'
    )
    blue= Body(
        type='blue',
        img_url='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726330642/body1_nprcde.png'
    )

    bodies= [red,green,purple,blue]
    for body in bodies:
        db.session.add(body)

    db.session.commit()


def undo_bodies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bodies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bodies"))

    db.session.commit()
