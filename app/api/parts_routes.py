from flask_login import login_required
from flask import Blueprint, jsonify
from app.models.parts.antenna import Antenna
from app.models.parts.background import Background
from app.models.parts.body import Body
from app.models.parts.ear import Ear
from app.models.parts.eye import Eye
from app.models.parts.head import Head
from app.models.parts.mouth import Mouth
from app.models.parts.neck import Neck
from app.models.parts.nose import Nose


parts_routes = Blueprint('parts',__name__)



@parts_routes.route('/antennas')
@login_required
def antennas():
    """
    Query for antennas and there dictionaries in a list
    """
    antennas=Antenna.query.all()
    return {'antennas': [antenna.to_dict() for antenna in antennas]}


@parts_routes.route('/backgrounds')
@login_required
def backgrounds():
    """
    Query for backgrounds and there dictionaries in a list
    """
    backgrounds=Background.query.all()
    return {'backgrounds': [background.to_dict() for background in backgrounds]}


@parts_routes.route('/bodies')
@login_required
def bodies():
    """
    Query for bodies and there dictionaries in a list
    """
    bodies=Body.query.all()
    return {'bodies': [body.to_dict() for body in bodies]}


@parts_routes.route('/ears')
@login_required
def ears():
    """
    Query for ears and there dictionaries in a list
    """
    ears=Ear.query.all()
    return {'ears': [ear.to_dict() for ear in ears]}


@parts_routes.route('/eyes')
@login_required
def eyes():
    """
    Query for eyes and there dictionaries in a list
    """
    eyes=Eye.query.all()
    return {'eyes': [eye.to_dict() for eye in eyes]}



@parts_routes.route('/heads')
@login_required
def heads():
    """
    Query for heads and there dictionaries in a list
    """
    heads=Head.query.all()
    return {'heads': [head.to_dict() for head in heads]}


@parts_routes.route('/mouths')
@login_required
def mouths():
    """
    Query for mouths and there dictionaries in a list
    """
    mouths=Mouth.query.all()
    return {'mouths': [mouth.to_dict() for mouth in mouths]}


@parts_routes.route('/necks')
@login_required
def necks():
    """
    Query for necks and there dictionaries in a list
    """
    necks=Neck.query.all()
    return {'necks': [neck.to_dict() for neck in necks]}


@parts_routes.route('/noses')
@login_required
def noses():
    """
    Query for noses and there dictionaries in a list
    """
    noses=Nose.query.all()
    return {'noses': [nose.to_dict() for nose in noses]}
