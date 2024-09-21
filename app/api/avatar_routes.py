from flask import Blueprint, jsonify, request
from flask_login import login_required,current_user
from app.models import db, Avatar,User

avatar_routes = Blueprint('avatars', __name__)


@avatar_routes.route('/current')
@login_required
def avatar():
    """
    Query for all avatars and returns them in a list of avatar dictionaries
    """
    user_avatar = Avatar.query.filter_by(user_id=current_user.id).first()

    if user_avatar:
        return {"avatar":user_avatar.to_dict_user()}
    else:
        return {"error":"Avatar Not Found"}, 404

@avatar_routes.route("/", methods=["POST"])
@login_required
def create_avatar():
    """
    Create new avatar for the current user by extracting fields from request body
    """
    data = request.json

    head_id = data.get("headId")
    eye_id = data.get("eyeId")
    mouth_id = data.get("mouthId")
    antenna_id = data.get("antennaId")
    neck_id = data.get("neckId")
    ear_id = data.get("earId")
    nose_id = data.get("noseId")
    background_id = data.get("backgroundId")

    new_avatar = Avatar(
        user_id=current_user.id,
        head_id=head_id,
        eye_id = eye_id,
        mouth_id=mouth_id,
        antenna_id=antenna_id,
        neck_id=neck_id,
        ear_id=ear_id,
        nose_id=nose_id,
        background_id=background_id
    )

    db.session.add(new_avatar)
    db.session.commit()

    return jsonify({'avatar':new_avatar.to_dict_user()}),201


@avatar_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_avatar(id):
    """
    Update avatar for the current user by extracting fields from request body
    """
    data = request.json

    avatar = Avatar.query.get(id)



    if not avatar:
        return {"error":"Avatar Not Found"}, 404

    avatar.user_id = data.get("userId", avatar.user_id)
    avatar.head_id = data.get("headId", avatar.head_id)
    avatar.eye_id = data.get("eyeId", avatar.eye_id)
    avatar.mouth_id = data.get("mouthId", avatar.mouth_id)
    avatar.antenna_id = data.get("antennaId", avatar.antenna_id)
    avatar.neck_id = data.get("neckId", avatar.neck_id)
    avatar.ear_id = data.get("earId", avatar.ear_id)
    avatar.nose_id = data.get("noseId", avatar.nose_id)
    avatar.background_id = data.get("backgroundId", avatar.background_id)


    db.session.commit()

    return jsonify({'avatar':avatar.to_dict_user()}),201

@avatar_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_avatar(id):
    """
    Delete avatar by id
    """

    avatar = Avatar.query.get(id)

    if not avatar:
        return {"error":"Avatar Not Found"}, 404

    db.session.delete(avatar)
    db.session.commit()

    return {"message":"Successfully deleted"},200


# @avatar_routes.route('/<int:id>')
# @login_required
# def user(id):
#     """
#     Query for a user by id and returns that user in a dictionary
#     """
#     user = User.query.get(id)
#     return user.to_dict()
