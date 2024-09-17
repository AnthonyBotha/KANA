from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Antenna,Background,Ear,Eye,Head,Mouth,Neck,Nose


avatarparts_routes = Blueprint('avatar_parts', __name__)


@avatarparts_routes.route('/heads')
@login_required
def heads():
    """
    Query for all avatar head options and returns them in a list of dictionaries
    """
    heads = Head.query.all()
    return {'heads': [head.to_dict() for head in heads]}


@avatarparts_routes.route('/eyes')
@login_required
def eyes():
    """
    Query for all avatar eyes options and returns them in a list of dictionaries
    """
    eyes = Eye.query.all()
    return {'eyes': [eye.to_dict() for eye in eyes]}