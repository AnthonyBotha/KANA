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
        undo_users()
        undo_bodies()
        undo_antennas()
        undo_ears()
        undo_eyes()
        undo_heads()
        undo_mouths()
        undo_necks()
        undo_noses()
        
    seed_users()
    seed_bodies()
    seed_antennas()
    seed_ears()
    seed_eyes()
    seed_heads()
    seed_mouths()
    seed_necks()
    seed_noses()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_bodies()
    undo_antennas()
    undo_ears()
    undo_eyes()
    undo_heads()
    undo_mouths()
    undo_necks()
    undo_noses()
    # Add other undo functions here
