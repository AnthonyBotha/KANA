from flask import Blueprint, jsonify, request
from flask_login import login_required,current_user
from app.models import Daily, db, Checklist, Tag, tasks_tags
from sqlalchemy.orm import joinedload
from app.utils import tags_post_manager, tags_update_manager, checklist_post_manager, checklist_update_manager

daily_routes = Blueprint('dailies', __name__)

@daily_routes.route('/current')
@login_required
def dailies():
    '''
    Query current user's dailies and returns a list of dictionaries
    '''
    user_dailies = Daily.query.filter_by(user_id = current_user.id).options(
        joinedload(Daily.tags),
        joinedload(Daily.checklist)
    ).all()

    if len(user_dailies) < 1:
        return {'dailies': []}

    return {'dailies': [daily.to_dict() for daily in user_dailies]}


@daily_routes.route('/', methods=['POST'])
@login_required
def create_daily():
    '''
     Create new Daily for the current user
    '''
    data = request.json

    new_daily = Daily(
        user_id = current_user.id,
        title = data.get('title'),
        start_date = data.get('startDate'),
        notes = data.get('notes'),
        difficulty = data.get('difficulty'),
        repeats = data.get('repeats'),
        repeat_every = data.get('repeatEvery'),
        repeat_on = data.get('repeatOn')
    )
    db.session.add(new_daily)
    db.session.commit()

    #CHECKLIST
    checklist_post_manager(data, new_daily)

    #TAGS
    tags_post_manager(data, new_daily) #helper function in app.utils

    return jsonify({'new_daily':new_daily.to_dict()})



@daily_routes.route('/<int:daily_id>', methods=["PUT"])
@login_required
def update_daily(daily_id):
    """
    Update Daily by id for the current user by extracting fields from request body
    """
    data = request.json
    daily=Daily.query.get(daily_id)

    if daily.user_id != current_user.id:
        return {'errors': {'message': 'Unauthorized'}}, 401

    daily.user_id = current_user.id
    daily.title = data.get('title', daily.title)
    daily.start_date = data.get('startDate', daily.start_date)
    daily.notes = data.get('notes', daily.notes)
    daily.difficulty = data.get('difficulty', daily.difficulty)
    daily.repeats = data.get('repeats', daily.repeats)
    daily.repeat_every = data.get('repeatEvery', daily.repeat_every)
    daily.repeat_on = data.get('repeatOn', daily.repeat_on)

    #Checklist
    checklist_update_manager(data, daily)
    #tags
    tags_update_manager(data, daily)

    # db.session.commit() ? not necessary but leaving it here just in case we have a bug

    return jsonify(daily.to_dict())



@daily_routes.route('/<int:daily_id>', methods=['DELETE'])
@login_required
def delete_daily(daily_id):
    """
    Delete daily by id
    """
    daily=Daily.query.get(daily_id)

    if daily.user_id != current_user.id:
        return {'errors': {'message': 'Unauthorized'}}, 401

    db.session.delete(daily)
    db.session.commit()

    return {"message":"Successfully deleted"},200
