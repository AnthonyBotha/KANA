from flask import Blueprint, jsonify, request
from flask_login import login_required,current_user
from app.models import Daily, db, Checklist, Tag, tasks_tags
from sqlalchemy.orm import joinedload
from app.utils import str_to_bool

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
    checklist = data.get('checklist') #return a list of dictionaries
    if checklist:
        for check in checklist:
            new_check = Checklist(
                daily_id = new_daily.id,
                completed = str_to_bool(check.get('completed', False)),
                description = check.get('description')
            )
            db.session.add(new_check)
        db.session.commit()

    #TAGS
    db_tags = Tag.query.all() #query for all tags in database
    stored_tags = [tag.to_dict()['tag_name'] for tag in db_tags] # returns a list of the tags in the database in this format: ['Work', 'Excercise', 'Creativity', 'Chores', etc]
    tags = data.get('tags') #return a list of strings representing the tags in the request (from frontend)
    if tags:
        for tag in tags:
            if tag not in stored_tags:
                # store new tag to get id
                new_tag = Tag(tag_name = str(tag))
                db.session.add(new_tag)
                db.session.commit()
            else:
                #fetch the existing tag to get id
                new_tag = Tag.query.filter_by(tag_name=tag).first()

            #create association in joined table:
            db.session.execute(
                tasks_tags.insert().values(
                    daily_id = new_daily.id,
                    tag_id = new_tag.id
                )
            )
        db.session.commit()


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
    checklist = data.get('checklist') # list of dictionaries (array of objects)
    if checklist:
        for checklist_item in checklist:

            if checklist_item['description'] is None:
                return {"errors": "message: description can't be None"}

            if checklist_item.get('id'):
                db_checklist = Checklist.query.get(int(checklist_item['id']))
                db_checklist.description = checklist_item['description'] or db_checklist.description
                db_checklist.completed = str_to_bool(checklist_item.get('completed', False)) or db_checklist.completed

            else:
                new_check = Checklist(
                    daily_id = daily_id,
                    completed = str_to_bool(checklist_item.get('completed')),
                    description = checklist_item['description']
                )
                db.session.add(new_check)

        db.session.commit()

    #tags
    request_tags = data.get('tags') #Tag incoming from request
    db_tags = Tag.query.all() #query for all tags in database
    stored_tags = [tag.tag_name for tag in db_tags] # returns a list of the tags in the database in this format: ['Work', 'Excercise', 'Creativity', 'Chores', etc]
    current_tags = [tag.tag_name for tag in daily.tags] #Tags the current Daily instance has.

    if request_tags:
    #check for removed tags
        for tag in current_tags:
            if tag not in request_tags:
                #find the specific tag in the database
                tag_to_remove = Tag.query.filter_by(tag_name=tag).first()
                if tag_to_remove:
                    # Remove the association between the Daily instance and the Tag
                    daily.tags.remove(tag_to_remove)
    #check for new tags
        for tag in request_tags:
            if tag not in current_tags:
                #check if its in the database already so that we don't have duplicates
                if tag in stored_tags:
                    new_tag = Tag.query.filter_by(tag_name=tag).first()
                else:
                    new_tag = Tag(tag_name=str(tag))
                db.session.add(new_tag)
                db.session.commit()
                #add to db and make association on joined table
                db.session.execute(
                tasks_tags.insert().values(
                    daily_id = daily.id,
                    tag_id = new_tag.id
                )
            )
    else:
        daily.tags = []


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
