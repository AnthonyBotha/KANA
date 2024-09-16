"""Added Daily model with updated fields

Revision ID: feec63a14dce
Revises: aa57599a1973
Create Date: 2024-09-15 12:51:59.409343

"""
from alembic import op
import sqlalchemy as sa



import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = 'feec63a14dce'
down_revision = 'aa57599a1973'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('dailies',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('title', sa.String(length=30), nullable=False),
    sa.Column('notes', sa.Text(), nullable=False),
    sa.Column('difficulty', sa.Enum('Trivial', 'Easy', 'Medium', 'Hard', name='difficulty_level'), nullable=False),
    sa.Column('start_date', sa.Date(), nullable=True),
    sa.Column('repeats', sa.Enum('Daily', 'Weekly', 'Monthly', 'Yearly', name='repeat_timeframe'), nullable=True),
    sa.Column('repeat_every', sa.Integer(), nullable=True),
    sa.Column('repeat_on', sa.Enum('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',name='week_days'), nullable=True),
    sa.Column('is_due', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE dailies SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('dailies')
    # ### end Alembic commands ###
