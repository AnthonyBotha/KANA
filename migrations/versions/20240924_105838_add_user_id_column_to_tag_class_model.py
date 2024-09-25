"""add user_id column to Tag class model

Revision ID: a68e0cfaa4e8
Revises: 741019596dc2
Create Date: 2024-09-24 10:58:38.353341

"""
from alembic import op
import sqlalchemy as sa
import os

# Get environment and schema
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")
schema = SCHEMA if environment == "production" else None

# revision identifiers, used by Alembic.
revision = 'a68e0cfaa4e8'
down_revision = '741019596dc2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tags', schema=schema) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=False))
        batch_op.create_foreign_key(
            'tag_users',  # Let Alembic generate the foreign key name
            'users',  # Reference table
            ['user_id'],  # Source column
            ['id']  # Target column
        )

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tags', schema=schema) as batch_op:
        batch_op.drop_constraint('tag_users', type_='foreignkey')  # Use None if you didn't name it
        batch_op.drop_column('user_id')

    # ### end Alembic commands ###