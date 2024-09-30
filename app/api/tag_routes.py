from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Tag, User

tag_routes = Blueprint('tags', __name__)

@tag_routes.route('/current')
@login_required
def get_user_tags():
    '''
    Get current users and default Tags
    '''
    user = User.query.get(current_user.id)
    user_tags = [tag.tag_name for tag in user.tags]
    default_tags = Tag.default_tags
    clean_user_and_default_tags = list(set(user_tags) | set(default_tags)) #creating a set to eliminate duplicates
    # return {'user_tags': [tag.tag_name for tag in user.tags], 'default_tags': default_tags}
    return clean_user_and_default_tags
