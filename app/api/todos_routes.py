from flask import Blueprint, jsonify, request
from flask_login import login_required,current_user
from app.models import Todo,db
from datetime import date

todos_routes = Blueprint('todos',__name__)

@todos_routes.route('/current')
@login_required
def todos():
    """
    Query for all the users todos in a list of dictornaries
    """
    user_todos = Todo.query.filter_by(user_id=current_user.id).all()

    if len(user_todos) < 1:
        return {'todos':[]}

    return {'todos': [todo.to_dict_user() for todo in user_todos]}



@todos_routes.route('/',methods=["POST"])
@login_required
def create_todo():
    """
    Create new To-do for the current user
    """

    data = request.json

    title= data.get("title")
    notes= data.get("notes")
    difficulty= data.get('difficulty')
    due_date=data.get('due_date')

    due_date = due_date.split('-')
    if len(due_date) < 3:
        return {'error':{'message':'date needs to be formatted (YYYY-MM-DD)'}},400

    new_todo = Todo(
        title=title,
        notes=notes,
        difficulty=difficulty,
        due_date=date(int(due_date[0]),int(due_date[1]),int(due_date[2])),
        user_id=current_user.id
    )

    db.session.add(new_todo)
    db.session.commit()

    return jsonify({'todo': new_todo.to_dict_user()}),201


@todos_routes.route('/<int:todo_id>',methods=['PUT'])
@login_required
def update_todo(todo_id):
    """
    Update todo by id for the current user by extracting fields from request body
    """

    data=request.json
    todo=Todo.query.get(todo_id)

    if todo.user_id != current_user.id:
        return {'errors': {'message': 'Unauthorized'}}, 401


    todo.title=data.get('title',todo.title)
    todo.notes=data.get('notes',todo.notes)
    todo.difficulty=data.get('difficulty',todo.difficulty)
    todo.completed=data.get('completed',todo.completed)

    if data.get('due_date'):
        due_date=data.get('due_date',todo.due_date)
        due_date = due_date.split('-')
        if len(due_date) < 3:
            return {'error':{'message':'date needs to be formatted (YYYY-MM-DD)'}},400

        todo.due_date = date(int(due_date[0]),int(due_date[1]),int(due_date[2]))

    db.session.commit()

    return jsonify(todo.to_dict_user())


@todos_routes.route('/<int:todo_id>', methods=['DELETE'])
@login_required
def delete_todo(todo_id):
    """
    Delete todo by id
    """

    todo=Todo.query.get(todo_id)


    if todo.user_id != current_user.id:
        return {'errors': {'message': 'Unauthorized'}}, 401

    db.session.delete(todo)
    db.session.commit()

    return {"message":"Successfully deleted"},200
