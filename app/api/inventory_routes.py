from flask import Blueprint, jsonify, request
from flask_login import login_required,current_user
from app.models import User,db,Item
from app.models.item import inventory



inventory_routes = Blueprint('inventory', __name__)

@inventory_routes.route('/current')
@login_required
def get_inventory():
    user = User.query.filter_by(id=current_user.id).first()

    if user.items is not None and len(user.items) > 0:
        items_equip=[]

        for item in user.items:
            inventory_of_item=db.session.query(inventory).filter_by(user_id=current_user.id,item_id=item.id).first()
            equipped = inventory_of_item.equiped

            item_data = item.to_dict_user()
            item_data['equipped'] = equipped

            items_equip.append(item_data)



        return  {'items': items_equip}

    else:
        return {'items': []}



@inventory_routes.route('/<int:item_id>',methods=['PUT'])
@login_required
def equip_item(item_id):
    item=Item.query.filter_by(id=item_id).first()

    if item is None:
        return {'errors': {'message': 'Item Not Found'}}, 404

    # sends an error if equipment is false bcz only equipment can be equipped
    # if item.equipment is False:
    #     return {'errors': {'message': 'Item can not be equipped'}}, 400


    inventory_of_item=db.session.query(inventory).filter_by(user_id=current_user.id,item_id=item.id).first()

    if inventory_of_item is None:
        return {'errors': {'message': 'Item Not Found In Inventory'}}, 404


    # if item is not equipped it equips it
    if inventory_of_item.equiped is False:
        db.session.execute(
            inventory.update().where(
                (inventory.c.user_id == current_user.id) &
                (inventory.c.item_id == item_id)
            ).values(equiped=True)
        )
    else:
        # if item is equipped it unequips it
        db.session.execute(
            inventory.update().where(
                (inventory.c.user_id == current_user.id) &
                (inventory.c.item_id == item_id)
            ).values(equiped=False)
        )

    db.session.commit()

    # updated version of the inventory table so the new info shows
    inventory_of_item=db.session.query(inventory).filter_by(user_id=current_user.id,item_id=item.id).first()
    equipped = inventory_of_item.equiped

    item_data = item.to_dict_user()
    item_data['equipped'] = equipped

    return  {'item': item_data}



@inventory_routes.route('/',methods=['POST'])
@login_required
def add_to_inventory():
    user = User.query.filter_by(id=current_user.id).first()
    data = request.json


    # this is to see if the reward is elgible to be part of inventory
    reward_img=data.get('rewardImg')

    item=Item.query.filter_by(item_img=reward_img).first()
    if item is None:
        return {'errors': {'message': 'Item can not be added to Inventory'}}, 400

    # see if user already has item in inventory
    inventory_of_item=db.session.query(inventory).filter_by(user_id=current_user.id,item_id=item.id).first()
    if inventory_of_item:
        return {'errors': {'message': 'User has Item in Inventory'}}, 400
    try:
        user.items.append(item)
        db.session.commit()
    # updating for the inventory item to exist now
        inventory_of_item=db.session.query(inventory).filter_by(user_id=current_user.id,item_id=item.id).first()

        equipped = inventory_of_item.equiped

        item_data = item.to_dict_user()
        item_data['equipped'] = equipped

        return  {'item': item_data},201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': "Couldn't Add To inventory"}), 400

@inventory_routes.route('/<int:item_id>',methods=['DELETE'])
@login_required
def delete_from_inventory(item_id):
    item=Item.query.get(item_id)
    if item is None:
        return {'errors': {'message': 'Item not Found'}}, 404

    inventory_of_item=db.session.query(inventory).filter_by(user_id=current_user.id,item_id=item.id).first()
    if inventory_of_item is None:
        return {'errors': {'message': "Item is not in User's inventory"}}, 404

    user = User.query.filter_by(id=current_user.id).first()
    try:
        user.items.remove(item)
        db.session.commit()

        return {"message":"Successfully deleted"},200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': "Couldn't delete from Inventory"}), 400
