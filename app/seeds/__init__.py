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
        undo_eggs()
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
        undo_users()

    seed_users()
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
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_eggs()
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
    undo_users()
    # Add other undo functions here
