from .models import db, Tag, tasks_tags, Daily, Habit, Todo
#HELPER FUNCTIONS

def str_to_bool(value):
    return str(value).lower() == 'true'



#To manage tags updates on tasks (daily, todo, habit)
def tags_update_manager(request_tags, current_tags, stored_tags, task_instance):
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
    else:
        task_instance.tags = []
