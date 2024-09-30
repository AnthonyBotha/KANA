from .models import db, Tag, tasks_tags, Daily, Habit, Todo, Checklist, User
from flask_login import current_user
#HELPER FUNCTIONS

def str_to_bool(value):
    return str(value).lower() == 'true'


# TAGS MANAGERS:

def tags_post_manager(data, task_instance):
    user = User.query.get(current_user.id)
    db_tags = user.tags #query all tags from the database associated with the user
    stored_tags = {tag.tag_name: tag for tag in db_tags} # returns a list of the tags in the database in this format: ['Work', 'Excercise', 'Creativity', 'Chores', etc]
    request_tags = data.get('tags', []) #return a list of strings representing the tags in the request (from frontend)

    for tag_name in request_tags:
        new_tag = stored_tags.get(tag_name) #check if the tag exists in the db and get it
        if new_tag is None: # meaning is not in the db, then create a new Tag
            new_tag = Tag(tag_name=str(tag_name), user_id=current_user.id)
            db.session.add(new_tag)
        #create association
        task_instance.tags.append(new_tag)
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(f"Error committing tags: {e}")


def tags_update_manager(data, task_instance):
    user = User.query.get(current_user.id)
    db_tags = user.tags  # query all tags from the database associated with the user
    stored_tags = {tag.tag_name: tag for tag in db_tags}  # Dictionary for fast lookup O(n)
    current_tags = {tag.tag_name: tag for tag in task_instance.tags}  # Dictionary for fast lookup O(n)
    request_tags = data.get('tags', [])  # get the tags in the incoming request or default to an empty list

    # check for removed tags
    for tag_name in list(current_tags):  # create a copy of the current_tags as an array to avoid modifying the original dictionary
        if tag_name not in request_tags:
            tag_to_remove = current_tags[tag_name]
            task_instance.tags.remove(tag_to_remove)

    # associate new tags if they exist in db(stored_tags) or create and associate new ones
    for tag_name in request_tags:
        if tag_name not in current_tags: # Then fetch existing tag from db or create a new one
            if tag_name in stored_tags:
                new_tag = stored_tags[tag_name]
            else:
                new_tag = Tag(tag_name=tag_name, user_id=current_user.id)
                db.session.add(new_tag)

            # create association
            task_instance.tags.append(new_tag)

    db.session.commit()



## CHECKLIST MANAGERS

def checklist_post_manager(data, task_instance):
    checklist = data.get('checklist') #return a list of dictionaries
    if checklist:
        for check in checklist:
            if isinstance(task_instance, Daily):
                new_check = Checklist(
                    daily_id = task_instance.id,
                    completed = str_to_bool(check.get('completed', False)),
                    description = check.get('description')
                )
            elif isinstance(task_instance, Todo):
                new_check = Checklist(
                    todo_id = task_instance.id,
                    completed = str_to_bool(check.get('completed', False)),
                    description = check.get('description')
                )
            db.session.add(new_check)
        db.session.commit()


def checklist_update_manager(data, task_instance):
    checklist = data.get('checklist') # list of dictionaries (array of objects)

     #check for removed items by creating id sets and getting the difference:
    current_checklist_ids = {int(check.id) for check in task_instance.checklist} if task_instance.checklist else set()
    request_checklist_ids = {int(check['id']) for check in checklist if check.get('id') is not None} if checklist else set()
    removed_items = current_checklist_ids - request_checklist_ids

    if removed_items:
        for id in removed_items:
            checklist_to_remove = Checklist.query.filter_by(id=id).first()
            if checklist_to_remove:
                db.session.delete(checklist_to_remove)
        db.session.commit()


    #check for new ones and updates
    if checklist:
        for checklist_item in checklist:

            if checklist_item['description'] is None:
                return {"errors": "message: description can't be None"}

            if checklist_item.get('id'):

                db_checklist = Checklist.query.get(int(checklist_item['id']))
                db_checklist.description = checklist_item['description'] or db_checklist.description
                db_checklist.completed = str_to_bool(checklist_item.get('completed', db_checklist.completed))


            if not checklist_item.get('id'):
                if isinstance(task_instance, Daily):
                    new_check = Checklist(
                        daily_id = task_instance.id,
                        completed = str_to_bool(checklist_item.get('completed', False)),
                        description = checklist_item.get('description')
                    )
                elif isinstance(task_instance, Todo):
                    new_check = Checklist(
                        todo_id = task_instance.id,
                        completed = str_to_bool(checklist_item.get('completed', False)),
                        description = checklist_item.get('description')
                    )
                db.session.add(new_check)

        db.session.commit()
    else:
        task_instance.checklist = []
