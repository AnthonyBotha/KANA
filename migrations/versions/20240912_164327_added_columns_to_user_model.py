"""added columns to User Model

Revision ID: 5d5c9baac40e
Revises: ffdc0a98111c
Create Date: 2024-09-12 16:43:27.170607

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


schema = SCHEMA if environment == "production" else None
# revision identifiers, used by Alembic.
revision = '5d5c9baac40e'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('antennas',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('type', sa.String(length=30), nullable=False),
    sa.Column('img_url', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('backgrounds',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('type', sa.String(length=30), nullable=False),
    sa.Column('img_url', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('bodies',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('type', sa.String(length=30), nullable=False),
    sa.Column('img_url', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('ears',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('type', sa.String(length=30), nullable=False),
    sa.Column('img_url', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('eyes',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('type', sa.String(length=30), nullable=False),
    sa.Column('img_url', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('heads',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('type', sa.String(length=30), nullable=False),
    sa.Column('img_url', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('mouths',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('type', sa.String(length=30), nullable=False),
    sa.Column('img_url', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('necks',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('type', sa.String(length=30), nullable=False),
    sa.Column('img_url', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('noses',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('type', sa.String(length=30), nullable=False),
    sa.Column('img_url', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('avatars',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('body_id', sa.Integer(), nullable=False),
    sa.Column('head_id', sa.Integer(), nullable=False),
    sa.Column('eye_id', sa.Integer(), nullable=False),
    sa.Column('mouth_id', sa.Integer(), nullable=False),
    sa.Column('antenna_id', sa.Integer(), nullable=False),
    sa.Column('neck_id', sa.Integer(), nullable=False),
    sa.Column('ear_id', sa.Integer(), nullable=False),
    sa.Column('nose_id', sa.Integer(), nullable=False),
    sa.Column('background_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['antenna_id'], ['antennas.id'], ),
    sa.ForeignKeyConstraint(['background_id'], ['backgrounds.id'], ),
    sa.ForeignKeyConstraint(['body_id'], ['bodies.id'], ),
    sa.ForeignKeyConstraint(['ear_id'], ['ears.id'], ),
    sa.ForeignKeyConstraint(['eye_id'], ['eyes.id'], ),
    sa.ForeignKeyConstraint(['head_id'], ['heads.id'], ),
    sa.ForeignKeyConstraint(['mouth_id'], ['mouths.id'], ),
    sa.ForeignKeyConstraint(['neck_id'], ['necks.id'], ),
    sa.ForeignKeyConstraint(['nose_id'], ['noses.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_id')
    )
    with op.batch_alter_table('users', schema=schema) as batch_op:
        batch_op.add_column(sa.Column('first_name', sa.String(length=30), nullable=False))
        batch_op.add_column(sa.Column('last_name', sa.String(length=30), nullable=False))
        batch_op.add_column(sa.Column('experience', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('health', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('level', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('gold', sa.Float(), nullable=True))
        batch_op.add_column(sa.Column('created_at', sa.DateTime(), nullable=True))
        batch_op.add_column(sa.Column('updated_at', sa.DateTime(), nullable=True))


    if environment == "production":
        op.execute(f"ALTER TABLE antennas SET SCHEMA {SCHEMA};")

    if environment == "production":
        op.execute(f"ALTER TABLE backgrounds SET SCHEMA {SCHEMA};")

    if environment == "production":
        op.execute(f"ALTER TABLE bodies SET SCHEMA {SCHEMA};")

    if environment == "production":
        op.execute(f"ALTER TABLE ears SET SCHEMA {SCHEMA};")

    if environment == "production":
        op.execute(f"ALTER TABLE eyes SET SCHEMA {SCHEMA};")

    if environment == "production":
        op.execute(f"ALTER TABLE heads SET SCHEMA {SCHEMA};")

    if environment == "production":
        op.execute(f"ALTER TABLE mouths SET SCHEMA {SCHEMA};")

    if environment == "production":
        op.execute(f"ALTER TABLE backgrounds necks SCHEMA {SCHEMA};")

    if environment == "production":
        op.execute(f"ALTER TABLE noses SET SCHEMA {SCHEMA};")

    if environment == "production":
        op.execute(f"ALTER TABLE avatars SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=schema) as batch_op:
        batch_op.drop_column('updated_at')
        batch_op.drop_column('created_at')
        batch_op.drop_column('gold')
        batch_op.drop_column('level')
        batch_op.drop_column('health')
        batch_op.drop_column('experience')
        batch_op.drop_column('last_name')
        batch_op.drop_column('first_name')

    op.drop_table('avatars')
    op.drop_table('noses')
    op.drop_table('necks')
    op.drop_table('mouths')
    op.drop_table('heads')
    op.drop_table('eyes')
    op.drop_table('ears')
    op.drop_table('bodies')
    op.drop_table('backgrounds')
    op.drop_table('antennas')
    # ### end Alembic commands ###
