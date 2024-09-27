from flask import Blueprint, jsonify, request
from flask_login import login_required,current_user
from app.models import Daily, db, Checklist
from app.models.daily import RepeatOn
from sqlalchemy.orm import joinedload
from app.utils import tags_post_manager, tags_update_manager, checklist_post_manager, checklist_update_manager
from datetime import datetime
daily_routes = Blueprint('dailies', __name__)


#route to test checklists being properly created and assigned:
@daily_routes.route('/check')
def checklists():
    checklists = Checklist.query.all()
    checklists_dict= [check.to_dict() for check in checklists]
    return jsonify(checklists_dict)

@daily_routes.route('/current')
@login_required
def dailies():
    '''
    Query current user's dailies and returns a list of dictionaries
    '''
    user_dailies = Daily.query.filter_by(user_id = current_user.id).options(
        joinedload(Daily.tags),
        joinedload(Daily.checklist)
    ).order_by(Daily.id.asc()).all()

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
        repeat_every = data.get('repeat_every'),
        # repeat_on = data.get('repeatOn')
    )
    db.session.add(new_daily)
    db.session.commit()

    #CHECKLIST
    checklist_post_manager(data, new_daily)

    #TAGS
    tags_post_manager(data, new_daily) #helper function in app.utils

    #REPEAT ON
    request_days = data.get('repeatOn', [])
    for day in request_days:
        new_day = RepeatOn(daily_id=new_daily.id, day=day)
        db.session.add(new_day)
        new_daily.repeat_on_days.append(new_day)
    db.session.commit()


    return jsonify({'newDaily':new_daily.to_dict()})



@daily_routes.route('/<int:daily_id>', methods=["PUT"])
@login_required
def update_daily(daily_id):
    """
    Update Daily by id for the current user by extracting fields from request body
    """
    data = request.json

    print('DATA GOT TO THE ROUTE','--------'*100, data)
    daily=Daily.query.get(daily_id)

    if daily.user_id != current_user.id:
        return {'errors': {'message': 'Unauthorized'}}, 401

    if 'start_date' in data:
        try:
            data['start_date'] = datetime.strptime(data['start_date'], '%Y-%m-%d').date()
        except ValueError:
            return {"error": "Invalid date format. Expected 'YYYY-MM-DD'."}, 400

    daily.user_id = current_user.id
    daily.title = data.get('title', daily.title)
    daily.notes = data.get('notes', daily.notes)
    daily.difficulty = data.get('difficulty', daily.difficulty)
    daily.start_date = data.get('start_date', daily.start_date)
    daily.repeats = data.get('repeats', daily.repeats)
    daily.repeat_every = int(data.get('repeat_every', daily.repeat_every))

    # daily.repeat_on = data.get('repeatOn', daily.repeat_on)
    #Todo: repeat on table association

    #Checklist
    checklist_update_manager(data, daily)
    #tags
    tags_update_manager(data, daily)
    #RepeatOn
     #REPEAT_ON
    #receiving an array of days ['Monday', 'Thursday']
    #get(repeatOn, []) then iterate, create instances of RepetOn model, save them, and new_daily.repeat_on_day.append(day)
    current_repeat_on_days = {day:day for day in daily.repeat_on_days}
    request_days = data.get('repeatOn', [])
    for day in list(current_repeat_on_days):
        if day not in request_days:
            day_to_remove = current_repeat_on_days[day]
            daily.repeat_on_days.remove(day_to_remove)

    for day in request_days:
        if day not in current_repeat_on_days:
            new_day = RepeatOn(daily_id=daily.id, day=day)
            db.session.add(new_day)
            daily.repeat_on_days.append(new_day)
    db.session.commit()


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
