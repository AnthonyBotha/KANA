from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired,ValidationError

def head_exists(form,field):
    head_id=field.data
    if head_id is None:
        raise ValidationError('Head Id is required')



def eye_exists(form,field):
    eye_id=field.data
    if eye_id is None:
        raise ValidationError('Head Id is required')

def mouth_exist(form,field):
    mouth_id=field.data
    if mouth_id is None:
        raise ValidationError('Head Id is required')

def antenna_exist(form,field):
    antenna_id=field.data
    if antenna_id is None:
        raise ValidationError('Head Id is required')

def neck_exist(form,field):
    neck_id=field.data
    if neck_id is None:
        raise ValidationError('Head Id is required')
def ear_exist(form,field):
    ear_id=field.data
    if ear_id is None:
        raise ValidationError('Head Id is required')
def nose_exist(form,field):
    nose_id=field.data
    if nose_id is None:
        raise ValidationError('Head Id is required')
def background_exist(form,field):
    background_id=field.data
    if background_id is None:
        raise ValidationError('Head Id is required')


class Avatar_Form(FlaskForm):
    head_id=IntegerField('head_id',validators=[DataRequired(),head_exists])
    eye_id=IntegerField('eye_id',validators=[DataRequired(),eye_exists])
    mouth_id=IntegerField('mouth_id',validators=[DataRequired(),mouth_exist])
    antenna_id=IntegerField('antenna_id',validators=[DataRequired(),antenna_exist])
    neck_id=IntegerField('neck_id',validators=[DataRequired(),neck_exist])
    ear_id=IntegerField('ear_id',validators=[DataRequired(),ear_exist])
    nose_id=IntegerField('nose_id',validators=[DataRequired(),nose_exist])
    background_id=IntegerField('background_id',validators=[DataRequired(),background_exist])
    # user_id=IntegerField('eye_id',validators=[DataRequired(),eye_exists])
