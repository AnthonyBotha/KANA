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
    return {'antennas': [antenna.no_avatar() for antenna in antennas]}


@parts_routes.route('/backgrounds')
@login_required
def backgrounds():
    """
    Query for backgrounds and there dictionaries in a list
    """
    backgrounds=Background.query.all()
    return {'backgrounds': [background.no_avatar() for background in backgrounds]}


@parts_routes.route('/bodies')
@login_required
def bodies():
    """
    Query for bodies and there dictionaries in a list
    """
    bodies=Body.query.all()
    return {'bodies': [body.no_avatar() for body in bodies]}


@parts_routes.route('/ears')
@login_required
def ears():
    """
    Query for ears and there dictionaries in a list
    """
    ears=Ear.query.all()
    return {'ears': [ear.no_avatar() for ear in ears]}


@parts_routes.route('/eyes')
@login_required
def eyes():
    """
    Query for eyes and there dictionaries in a list
    """
    eyes=Eye.query.all()
    return {'eyes': [eye.no_avatar() for eye in eyes]}



@parts_routes.route('/heads')
@login_required
def heads():
    """
    Query for heads and there dictionaries in a list
    """
    heads=Head.query.all()
    return {'heads': [head.no_avatar() for head in heads]}


@parts_routes.route('/mouths')
@login_required
def mouths():
    """
    Query for mouths and there dictionaries in a list
    """
    mouths=Mouth.query.all()
    return {'mouths': [mouth.no_avatar() for mouth in mouths]}


@parts_routes.route('/necks')
@login_required
def necks():
    """
    Query for necks and there dictionaries in a list
    """
    necks=Neck.query.all()
    return {'necks': [neck.no_avatar() for neck in necks]}


@parts_routes.route('/noses')
@login_required
def noses():
    """
    Query for noses and there dictionaries in a list
    """
    noses=Nose.query.all()
    return {'noses': [nose.no_avatar() for nose in noses]}
