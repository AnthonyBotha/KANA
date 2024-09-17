from flask.cli import AppGroup
from .users import seed_users, undo_users
from .parts.bodies import undo_bodies,seed_bodies
from .parts.antennas import undo_antennas,seed_antennas
from .parts.ears import undo_ears,seed_ears
from .parts.eyes import undo_eyes,seed_eyes
from .parts.heads import undo_heads,seed_heads
from .parts.mouths import undo_mouths,seed_mouths
from .parts.necks import undo_necks,seed_necks
from .parts.noses import undo_noses,seed_noses
from .parts.backgrounds import undo_backgrounds,seed_backgrounds
from .items.specials import seed_specials,undo_specials
from .items.eggs import seed_eggs,undo_eggs
from .items.foods import seed_foods,undo_foods
from .items.potions import seed_potions,undo_potions
from .equipment.off_hands import seed_off_hands,undo_off_hands
from .equipment.armors import seed_armors,undo_armors
from .equipment.back_accessories import seed_back,undo_back
from .equipment.body_accessories import seed_body_items,undo_body_items
from .equipment.eyewear import seed_eyewear,undo_eyewear
from .equipment.hats import seed_hats,undo_hats
from .equipment.helmets import seed_helmets,undo_helmets
from .equipment.weapons import seed_weapons,undo_weapons
from .rewards import seed_rewards,undo_rewards
from .habits import seed_habits,undo_habits
from .dailies import seed_dailies,undo_dailies
from .todos import seed_todos,undo_todos
from .tags import seed_tags, undo_tags
from .checklists import seed_checklists, undo_checklists
from .avatars import seed_avatars,undo_avatars

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_checklists()
        undo_tags()
        undo_rewards()
        undo_eggs()
        undo_back()
        undo_weapons()
        undo_helmets()
        undo_armors()
        undo_hats()
        undo_off_hands()
        undo_body_items()
        undo_eyewear()
        undo_foods()
        undo_bodies()
        undo_antennas()
        undo_ears()
        undo_eyes()
        undo_heads()
        undo_mouths()
        undo_necks()
        undo_noses()
        undo_backgrounds()
        undo_specials()
        undo_potions()
        undo_dailies()
        undo_habits()
        undo_todos()
        undo_avatars()
        undo_users()

    seed_users()
    seed_habits()
    seed_dailies()
    seed_todos()
    seed_bodies()
    seed_antennas()
    seed_ears()
    seed_eyes()
    seed_heads()
    seed_mouths()
    seed_necks()
    seed_noses()
    seed_backgrounds()
    seed_specials()
    seed_eggs()
    seed_foods()
    seed_potions()
    seed_off_hands()
    seed_armors()
    seed_weapons()
    seed_back()
    seed_hats()
    seed_body_items()
    seed_eyewear()
    seed_helmets()
    seed_rewards()
    seed_avatars()
    seed_tags()
    seed_checklists()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_checklists()
    undo_tags()
    undo_rewards()
    undo_eggs()
    undo_eyewear()
    undo_weapons()
    undo_back()
    undo_armors
    undo_off_hands()
    undo_helmets()
    undo_hats()
    undo_body_items()
    undo_foods()
    undo_bodies()
    undo_antennas()
    undo_ears()
    undo_eyes()
    undo_heads()
    undo_mouths()
    undo_necks()
    undo_noses()
    undo_backgrounds()
    undo_specials()
    undo_potions()
    undo_dailies()
    undo_habits()
    undo_todos()
    undo_avatars()
    undo_users()
    # Add other undo functions here
