from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

class Avatar(db.Model):
    __tablename__ = 'avatars'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow,onupdate=datetime.utcnow)

    # all images for avatar forgein keys
    body_id = db.Column(db.Integer, db.ForeignKey('bodies.id'),nullable=False)
    head_id = db.Column(db.Integer, db.ForeignKey('heads.id'), nullable=False)
    eye_id = db.Column(db.Integer, db.ForeignKey('eyes.id'), nullable=False)
    mouth_id = db.Column(db.Integer, db.ForeignKey('mouths.id'), nullable=False)
    antenna_id = db.Column(db.Integer, db.ForeignKey('antennas.id'), nullable=False)
    neck_id = db.Column(db.Integer, db.ForeignKey('necks.id'), nullable=False)
    ear_id = db.Column(db.Integer, db.ForeignKey('ears.id'), nullable=False)
    nose_id = db.Column(db.Integer, db.ForeignKey('noses.id'), nullable=False)
    background_id = db.Column(db.Integer, db.ForeignKey('backgrounds.id'), nullable=False)


    # connects avatars to users creating a one to one relationship
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True, nullable=True)


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'bodyId': self.body_id,
            'headId': self.head_id,
            'eyeId': self.eye_id,
            'mouthId': self.mouth_id,
            'antennaId': self.antenna_id,
            'neckId': self.neck_id,
            'earId': self.ear_id,
            'noseId': self.nose_id,
            'backgroundId': self.background_id,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at
        }
