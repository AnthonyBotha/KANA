from flask import Blueprint, jsonify, request
from flask_login import login_required,current_user
from app.models import db, Avatar,User
from app.forms.avatar_form import Avatar_Form

avatar_routes = Blueprint('avatars', __name__)


@avatar_routes.route('/current')
@login_required
def avatar():
    """
    Query for current users Avatar
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
    form = Avatar_Form()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        new_avatar=Avatar(
            user_id=current_user.id,
            head_id=form.data['head_id'],
            eye_id = form.data['eye_id'],
            mouth_id=form.data['mouth_id'],
            antenna_id=form.data['antenna_id'],
            neck_id=form.data['neck_id'],
            ear_id=form.data['ear_id'],
            nose_id=form.data['nose_id'],
            background_id=form.data['background_id']
            )
        db.session.add(new_avatar)
        db.session.commit()
        return jsonify({'avatar':new_avatar.to_dict_user()}),201

    return form.errors,400



@avatar_routes.route("/", methods=["PUT"])
@login_required
def update_avatar():
    """
    Update avatar for the current user by extracting fields from request body
    """
    data = request.json
    user = User.query.filter_by(id=current_user.id).first()
    avatar = user.avatar

    if not avatar:
        return {"error":"Avatar Not Found"}, 404


    try:
        avatar.head_id = data.get("head_id", avatar.head_id)
        avatar.eye_id = data.get("eye_id", avatar.eye_id)
        avatar.mouth_id = data.get("mouth_id", avatar.mouth_id)
        avatar.antenna_id = data.get("antenna_id", avatar.antenna_id)
        avatar.neck_id = data.get("neck_id", avatar.neck_id)
        avatar.ear_id = data.get("ear_id", avatar.ear_id)
        avatar.nose_id = data.get("nose_id", avatar.nose_id)
        avatar.background_id = data.get("background_id", avatar.background_id)


        db.session.commit()

        return jsonify({'avatar':user.avatar.to_dict_user()}),201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': "all data in the request body can not be null"}), 400

@avatar_routes.route("/", methods=["DELETE"])
@login_required
def delete_avatar():
    """
    Delete avatar by id
    """

    user = User.query.filter_by(id=current_user.id).first()
    avatar = user.avatar

    if not avatar:
        return {"error":"Avatar Not Found"}, 404

    try:

        db.session.delete(avatar)
        db.session.commit()

        return {"message":"Successfully deleted"},200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': "Couldn't delete Avatar"}), 400
