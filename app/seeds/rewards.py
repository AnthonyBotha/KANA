from app.models import db, Item,User,Reward, environment, SCHEMA
from sqlalchemy.sql import text


def seed_rewards():
    demo=User.query.filter_by(email='demo@aa.io').first()
    bobbie=User.query.filter_by(email='bobbie@aa.io').first()
    marnie=User.query.filter_by(email='marnie@aa.io').first()
    items= Item.query.all()

    for item in items:
        if (item.id != demo.items[0].id and item.id != demo.items[1].id
        and item.id != demo.items[2].id and item.id != demo.items[3].id
        and item.id != demo.items[4].id and item.id != demo.items[5].id
        and item.id != demo.items[6].id and item.id != demo.items[7].id
        and item.id != demo.items[8].id):
            reward = Reward(
            title=item.name,
            notes=item.description,
            cost=item.cost,
            custom=False,
            reward_img=item.item_img
            )
            db.session.add(reward)
    db.session.commit()
    # user_rewards seeds
    rewards=Reward.query.all()
    for reward in rewards:
        demo.rewards.append(reward)
        marnie.rewards.append(reward)
        bobbie.rewards.append(reward)
    db.session.commit()



def undo_rewards():
    # user_rewards undo
    # demo=User.query.filter_by(email='demo@aa.io').first()
    # bobbie=User.query.filter_by(email='bobbie@aa.io').first()
    # marnie=User.query.filter_by(email='marnie@aa.io').first()

    # if demo and demo.rewards:
    #     demo.rewards.clear()  # This will remove all rewards associated with demo
    # if marnie and marnie.rewards:
    #     marnie.rewards.clear()  # This will remove all rewards associated with marnie
    # if bobbie and bobbie.rewards:
    #     bobbie.rewards.clear()  # This will remove all rewards associated with bobbie


    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_rewards RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.rewards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_rewards"))
        db.session.execute(text("DELETE FROM rewards"))

    db.session.commit()
