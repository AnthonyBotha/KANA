from app.models import db, User,Avatar, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.parts.head import Head
from app.models.parts.eye import Eye
from app.models.parts.mouth import Mouth
from app.models.parts.antenna import Antenna
from app.models.parts.neck import Neck
from app.models.parts.ear import Ear
from app.models.parts.nose import Nose
from app.models.parts.background import Background



def seed_avatars():
    demo=User.query.filter_by(email='demo@aa.io').first()
    bobbie=User.query.filter_by(email='bobbie@aa.io').first()
    marnie=User.query.filter_by(email='marnie@aa.io').first()

    # heads
    head1=Head.query.filter_by(type='turquoise').first()
    head2=Head.query.filter_by(type='gold').first()
    head3=Head.query.filter_by(type='purple').first()

    print('heads:',type(head1.id),head1.id,type(head2.id),head2.id,type(head3.id),head3.id)

    # eyes
    eye1=Eye.query.filter_by(type='pink').first()
    eye2=Eye.query.filter_by(type='yellow').first()
    eye3=Eye.query.filter_by(type='turquoise').first()
    print('eyes:',type(eye1.id),type(eye2.id),type(eye3.id))
    # mouths
    mouth1=Mouth.query.filter_by(type='gray_zipper').first()
    mouth2=Mouth.query.filter_by(type='gray').first()
    mouth3=Mouth.query.filter_by(type='green_trapezoid').first()
    print('mouths:',type(mouth1.id),type(mouth2.id),type(mouth3.id))
    # antennas
    antenna1=Antenna.query.filter_by(type='blue').first()
    antenna2=Antenna.query.filter_by(type='green triangle').first()
    antenna3=Antenna.query.filter_by(type='purple rectangles').first()
    print('antennas:',type(antenna1.id),antenna1.type,type(antenna2.id),antenna2.type,type(antenna3.id),antenna3.type)
    # necks
    neck1=Neck.query.filter_by(type='gray').first()
    neck2=Neck.query.filter_by(type='light_blue').first()
    neck3=Neck.query.filter_by(type='light_gold').first()
    print('necks:',type(neck1.id),type(neck2.id),type(neck3.id))
    # ears
    ear1=Ear.query.filter_by(type='light_purple').first()
    ear2=Ear.query.filter_by(type='green').first()
    ear3=Ear.query.filter_by(type='light_pink').first()
    print('ears:',type(ear1.id),type(ear2.id),type(ear3.id))
    #  noses
    nose1=Nose.query.filter_by(type='gray_triangle').first()
    nose2=Nose.query.filter_by(type='gray_rectangle').first()
    nose3=Nose.query.filter_by(type='horizontal_stripes').first()
    print('noses:',type(nose1.id),type(nose2.id),type(nose3.id))
    # backgrounds
    background1=Background.query.filter_by(type='blue').first()
    background2=Background.query.filter_by(type='brown').first()
    background3=Background.query.filter_by(type='gray').first()
    print('backgrounds:',type(background1.id),type(background2.id),type(background3.id))
    avatar1 = Avatar(
        user_id=demo.id,
        head_id=head1.id,
        eye_id = eye1.id,
        mouth_id=mouth1.id,
        antenna_id=antenna1.id,
        neck_id=neck1.id,
        ear_id=ear1.id,
        nose_id=nose1.id,
        background_id=background1.id
        )
    avatar2 = Avatar(
        user_id=marnie.id,
        head_id=head2.id,
        eye_id = eye2.id,
        mouth_id=mouth2.id,
        antenna_id=antenna2.id,
        neck_id=neck2.id,
        ear_id=ear2.id,
        nose_id=nose2.id,
        background_id=background2.id
    )

    avatar3 = Avatar(
        user_id=bobbie.id,
        head_id=head3.id,
        eye_id = eye3.id,
        mouth_id=mouth3.id,
        antenna_id=antenna3.id,
        neck_id=neck3.id,
        ear_id=ear3.id,
        nose_id=nose3.id,
        background_id=background3.id
    )

    avatars = [avatar1,avatar2,avatar3]

    for avatar in avatars:
        db.session.add(avatar)


    db.session.commit()


def undo_avatars():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.avatars RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM avatars"))

    db.session.commit()
