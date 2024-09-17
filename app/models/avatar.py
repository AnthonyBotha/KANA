from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime,timezone

class Avatar(db.Model):
    __tablename__ = 'avatars'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # all images for avatar forgein keys
    # body_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('bodies.id')),nullable=False)
    head_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('heads.id')), nullable=False)
    eye_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('eyes.id')), nullable=False)
    mouth_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('mouths.id')), nullable=False)
    antenna_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('antennas.id')), nullable=False)
    neck_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('necks.id')), nullable=False)
    ear_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('ears.id')), nullable=False)
    nose_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('noses.id')), nullable=False)
    background_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('backgrounds.id')), nullable=False)


    # body=db.relationship('Body',back_populates='avatars')
    head=db.relationship('Head',back_populates='avatars')
    eye=db.relationship('Eye',back_populates='avatars')
    mouth=db.relationship('Mouth',back_populates='avatars')
    antenna=db.relationship('Antenna',back_populates='avatars')
    neck=db.relationship('Neck',back_populates='avatars')
    ear=db.relationship('Ear',back_populates='avatars')
    nose=db.relationship('Nose',back_populates='avatars')
    background=db.relationship('Background',back_populates='avatars')

    # connects avatars to users creating a one to one relationship
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), unique=True, nullable=True)
    user = db.relationship('User', back_populates='avatar')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            # 'bodyId': self.body_id,
            'headId': self.head_id,
            'eyeId': self.eye_id,
            'mouthId': self.mouth_id,
            'antennaId': self.antenna_id,
            'neckId': self.neck_id,
            'earId': self.ear_id,
            'noseId': self.nose_id,
            'backgroundId': self.background_id,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at,
            'user':self.user.to_dict()
        }

    def to_dict_user(self):
        return{
            'id': self.id,
            'userId': self.user_id,
            # 'bodyId': self.body_id,
            'headId': self.head_id,
            'eyeId': self.eye_id,
            'mouthId': self.mouth_id,
            'antennaId': self.antenna_id,
            'neckId': self.neck_id,
            'earId': self.ear_id,
            'noseId': self.nose_id,
            'backgroundId': self.background_id,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at,
        }
