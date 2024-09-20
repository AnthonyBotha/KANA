from .models import db, Tag, tasks_tags, Daily, Habit, Todo, Checklist
#HELPER FUNCTIONS

def str_to_bool(value):
    return str(value).lower() == 'true'


# TAGS MANAGERS:

def tags_post_manager(data, task_instance):
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
            _create_tag_association(task_instance, new_tag)
        db.session.commit()


def tags_update_manager(data, task_instance):
    request_tags = data.get('tags') #Tag incoming from request
    db_tags = Tag.query.all() #query for all tags in database
    stored_tags = [tag.tag_name for tag in db_tags] # returns a list of the tags in the database in this format: ['Work', 'Excercise', 'Creativity', 'Chores', etc]
    current_tags = [tag.tag_name for tag in task_instance.tags] #Tags the current Daily instance has.
    if request_tags:
    #check for removed tags
        for tag in current_tags:
            if tag not in request_tags:
                #find the specific tag in the database
                tag_to_remove = Tag.query.filter_by(tag_name=tag).first()
                if tag_to_remove:
                    # Remove the association between the Daily instance and the Tag
                    task_instance.tags.remove(tag_to_remove)
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
                _create_tag_association(task_instance, new_tag)
    else:
        task_instance.tags = []



def _create_tag_association(task_instance, new_tag):
    if isinstance(task_instance, Daily):
        db.session.execute(
        tasks_tags.insert().values(
            daily_id=task_instance.id,
            tag_id=new_tag.id
        ))
    elif isinstance(task_instance, Habit):
        db.session.execute(
        tasks_tags.insert().values(
            habit_id=task_instance.id,
            tag_id=new_tag.id
        ))
    elif isinstance(task_instance, Todo):
        db.session.execute(
        tasks_tags.insert().values(
            todo_id=task_instance.id,
            tag_id=new_tag.id
        ))


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
    current_checklist_ids = {check.id for check in task_instance.checklist} if task_instance.checklist else set()
    request_checklist_ids = {check['id'] for check in checklist if check.get('id') is not None} if checklist else set()
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

            print('-----'*200, checklist_item)

            if checklist_item.get('id'):
                db_checklist = Checklist.query.get(int(checklist_item['id']))
                db_checklist.description = checklist_item['description'] or db_checklist.description
                db_checklist.completed = str_to_bool(checklist_item.get('completed', db_checklist.completed))


            else:
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
