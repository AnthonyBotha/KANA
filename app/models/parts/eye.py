from ..db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime,timezone


class Eye(db.Model):
    __tablename__ = 'eyes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    type = db.Column(db.String(30), nullable=False)
    img_url = db.Column(db.String(255),nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    avatars= db.relationship('Avatar', back_populates='eye', cascade="all, delete")

    def to_dict(self):
        return {
            'id':self.id,
            'type':self.type,
            'imgUrl':self.img_url,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at,
            'avatars':[avatar.to_dict() for avatar in self.avatars]
        }

    def no_avatar(self):
        return{
            'id':self.id,
            'type':self.type,
            'imgUrl':self.img_url,
            'createdAt':self.created_at,
            'updatedAt':self.updated_at,
        }
