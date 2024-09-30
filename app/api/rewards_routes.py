from flask import Blueprint, jsonify, request
from flask_login import login_required,current_user
from app.models import db,User,Reward
from app.models.reward import user_rewards

rewards_routes = Blueprint('rewards',__name__)


@rewards_routes.route('/current')
@login_required
def get_user_rewards():
    user = User.query.filter_by(id=current_user.id).first()

    if user.rewards is None and len(user.rewards) < 1:
        return {'rewards': []}
    return {'rewards': [reward.to_dict_user() for reward in user.rewards]}


@rewards_routes.route('/user_rewards',methods=['POST'])
@login_required
def insert_reward():
    data=request.json
    user = User.query.filter_by(id=current_user.id).first()


    item_img=data.get('itemImg')
    reward=Reward.query.filter_by(reward_img=item_img).first()
    # looking if reward exists
    if reward is None:
        return {'errors': {'message': 'reward can not be added to user rewards'}}, 400
    # looks if user has reward already
    user_reward=db.session.query(user_rewards).filter_by(user_id=current_user.id,reward_id=reward.id).first()
    if user_reward:
        return {'errors': {'message': 'User has Reward in user rewards'}}, 400

    # adds reward to user rewards
    try:
        user.rewards.append(reward)
        db.session.commit()

        return  {'reward': reward.to_dict_user()},201

    # if anything goes wrong
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': "Couldn't Add To User Rewards"}), 400

@rewards_routes.route('/',methods=['POST'])
@login_required
def create_reward():
    data=request.json
    user = User.query.filter_by(id=current_user.id).first()

    title=data.get("title")
    notes=data.get('notes')
    cost=data.get('cost')
    try:
        new_reward = Reward(
        title=title,
        notes=notes,
        cost=cost,
        custom=True
        )

        db.session.add(new_reward)
        db.session.commit()


        user.rewards.append(new_reward)
        db.session.commit()

        return jsonify({'reward': new_reward.to_dict_user()}),201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': "Title Required"}), 400


@rewards_routes.route('/<int:reward_id>',methods=['PUT'])
@login_required
def update_custom_reward(reward_id):
    data = request.json
    reward=Reward.query.get(reward_id)

    if reward is None:
        return {'errors': {'message': 'Reward Not Found'}}, 404

    user_reward=db.session.query(user_rewards).filter_by(user_id=current_user.id,reward_id=reward.id).first()

    if user_reward is None:
        return {'errors': {'message': 'Reward Not Found In User Rewards'}}, 404


    if reward.custom is False:
        return {'errors': {'message': 'Reward can not be edited'}}, 400

    try:
        reward.title=data.get('title',reward.title)
        reward.notes = data.get('notes', reward.notes)
        reward.cost = data.get('cost',reward.cost)

        db.session.commit()

        return {'reward': reward.to_dict_user()}

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': "Title can not be null"}), 400


@rewards_routes.route('/<int:reward_id>',methods=['DELETE'])
@login_required
def delete_reward(reward_id):
    reward=Reward.query.get(reward_id)
    user = User.query.filter_by(id=current_user.id).first()

    if reward is None:
        return {'errors': {'message': 'Reward Not Found'}}, 404

    user_reward=db.session.query(user_rewards).filter_by(user_id=current_user.id,reward_id=reward.id).first()

    if user_reward is None:
        return {'errors': {'message': 'Reward Not Found In User Rewards'}}, 404


    try:
        user.rewards.remove(reward)
        if reward.custom is True:
            db.session.delete(reward)
        db.session.commit()

        return {"message":"Successfully deleted"},200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': "Reward couldn't be Deleted"}), 400
