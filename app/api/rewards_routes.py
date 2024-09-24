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



@rewards_routes.route('/',methods=['POST'])
@login_required
def create_reward():
    data=request.json
    user = User.query.filter_by(id=current_user.id).first()

    title=data.get("title")
    notes=data.get('notes')
    cost=data.get('cost')
<<<<<<< HEAD
    try:
        new_reward = Reward(
=======

    new_reward = Reward(
>>>>>>> 039a5213bcf1ed311dc57d1fdc7b21dc6b59331c
        title=title,
        notes=notes,
        cost=cost,
        custom=True
<<<<<<< HEAD
        )

        db.session.add(new_reward)
        db.session.commit()


        user.rewards.append(new_reward)
        db.session.commit()

        return jsonify({'reward': new_reward.to_dict_user()}),201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': "Title Required"}), 400
=======
    )

    db.session.add(new_reward)
    db.session.commit()


    user.rewards.append(new_reward)
    db.session.commit()


    return jsonify({'reward': new_reward.to_dict_user()}),201
>>>>>>> 039a5213bcf1ed311dc57d1fdc7b21dc6b59331c


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

<<<<<<< HEAD
    try:
        reward.title=data.get('title',reward.title)
        reward.notes = data.get('notes', reward.notes)
        reward.cost = data.get('cost',reward.cost)

        db.session.commit()

        return {'reward': reward.to_dict_user()}

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': "Title can not be null"}), 400
=======
    reward.title=data.get('title',reward.title)
    reward.notes = data.get('notes', reward.notes)
    reward.cost = data.get('cost',reward.cost)

    db.session.commit()

    return {'reward': reward.to_dict_user()}
>>>>>>> 039a5213bcf1ed311dc57d1fdc7b21dc6b59331c


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

<<<<<<< HEAD

    try:
        user.rewards.remove(reward)
        if reward.custom is True:
            db.session.delete(reward)
        db.session.commit()

        return {"message":"Successfully deleted"},200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': "Reward couldn't be Deleted"}), 400
=======
    user.rewards.remove(reward)
    if reward.custom is True:
        db.session.delete(reward)
    db.session.commit()
    return {"message":"Successfully deleted"},200
>>>>>>> 039a5213bcf1ed311dc57d1fdc7b21dc6b59331c
