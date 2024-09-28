from flask import Blueprint, jsonify, request
from flask_login import login_required,current_user
from app.models import Habit,db, Tag, tasks_tags
from sqlalchemy.orm import joinedload
from app.utils import str_to_bool, tags_update_manager, tags_post_manager

habit_routes=Blueprint('habits', __name__)


@habit_routes.route('/current')
@login_required
def habits():
    """
    Query for all users habits in a list of dictornaries
    """

    users_habits = Habit.query.filter_by(user_id=current_user.id).options(
        joinedload(Habit.tags)
    ).all()

    if len(users_habits) < 1:
        return {'habits': []}

    return {'habits': [habit.to_dict_user() for habit in users_habits]}

@habit_routes.route('/',methods=["POST"])
@login_required
def create_habit():
    """
    Create new Habit for the current user
    """

    data = request.json


    title = data.get("title")
    notes= data.get("notes")
    is_positive = str_to_bool(data.get('isPositive'))
    difficulty=data.get('difficulty')

    new_habit = Habit(
        title=title,
        notes=notes,
        difficulty=difficulty,
        is_positive=is_positive,
        user_id=current_user.id
    )

    db.session.add(new_habit)
    db.session.commit()

    #tags
    tags_post_manager(data, new_habit)

    return jsonify({'habit': new_habit.to_dict_user()}),201


@habit_routes.route('/<int:habit_id>', methods=['PUT'])
@login_required
def update_habit(habit_id):
    """
    Update habit by id for the current user by extracting fields from request body
    """
    data = request.json
    habit=Habit.query.get(habit_id)

    if habit.user_id != current_user.id:
        return {'errors': {'message': 'Unauthorized'}}, 401

    habit.title=data.get('title',habit.title)
    habit.notes=data.get('notes',habit.notes)
    habit.difficulty=data.get('difficulty',habit.difficulty)
    habit.is_positive=str_to_bool(data.get('isPositive',habit.is_positive))

    #TAGS
    tags_update_manager(data, habit)

    db.session.commit()

    return jsonify(habit.to_dict_user())


@habit_routes.route('/<int:habit_id>', methods=['DELETE'])
@login_required
def delete_habit(habit_id):
    """
    Delete habit by id
    """
    habit=Habit.query.get(habit_id)

    if habit.user_id != current_user.id:
        return {'errors': {'message': 'Unauthorized'}}, 401

    db.session.delete(habit)
    db.session.commit()

    return {"message":"Successfully deleted"},200
