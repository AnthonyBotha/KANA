from flask import Blueprint, request,jsonify
from app.models import User, db,Item,Reward
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': {'message': 'Unauthorized'}}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()

        login_user(user)
        return user.to_dict()
    return form.errors, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()

        # giving defualt items to new user
        egg=Item.query.filter_by(type='egg',item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331213/Yellow_Egg_amwdrb.png').first()
        food=Item.query.filter_by(type='food',item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331254/Strawberry_yuwpqx.png').first()
        potion=Item.query.filter_by(type='potion',item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331310/Yellow_Potion_ltq2s8.png').first()
        special=Item.query.filter_by(type='special',item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331484/Yellow_Baby_Dragon_tbk3l1.png').first()
        armor=Item.query.filter_by(type='armor',item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331571/Tunic_ni2cut.png').first()
        hat=Item.query.filter_by(type='hat',item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331816/Sant_Hat_eh6jyy.png').first()
        helmet=Item.query.filter_by(type='helmet',item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331857/Hat_fngaa9.png').first()
        sheild=Item.query.filter_by(type='off hands',item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331934/Wooden_Shield_vrlqfc.png').first()
        weapon=Item.query.filter_by(type='weapon',item_img='https://res.cloudinary.com/dzsguqdmg/image/upload/v1726331895/Dagger_lv3g4u.png').first()

        try:
            user.items.append(egg)
            user.items.append(food)
            user.items.append(potion)
            user.items.append(special)
            user.items.append(armor)
            user.items.append(hat)
            user.items.append(helmet)
            user.items.append(sheild)
            user.items.append(weapon)



            db.session.commit()

            # giving user default rewards
            rewards=Reward.query.all()
            for reward in rewards:
                user.rewards.append(reward)
            db.session.commit()

            login_user(user)

            return user.to_dict()

        except Exception as e:
            db.session.rollback()
            return jsonify({'error': "Items did not go through"}), 400


    return form.errors, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': {'message': 'Unauthorized'}}, 401
