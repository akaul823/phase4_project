"""empty message

Revision ID: 3f8e137f3f47
Revises: 
Create Date: 2023-08-10 16:44:09.536617

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3f8e137f3f47'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('_password_hash', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('fullname', sa.String(), nullable=False),
    sa.Column('phone', sa.String(), nullable=False),
    sa.Column('address', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.create_table('cars',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('car_make', sa.String(), nullable=False),
    sa.Column('car_model', sa.String(), nullable=False),
    sa.Column('listed_price', sa.Integer(), nullable=False),
    sa.Column('status', sa.String(), nullable=False),
    sa.Column('pictures', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=True),
    sa.Column('seller_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['seller_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('specs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('engine', sa.String(), nullable=False),
    sa.Column('milage', sa.Integer(), nullable=False),
    sa.Column('hp', sa.Integer(), nullable=False),
    sa.Column('doors', sa.Integer(), nullable=False),
    sa.Column('transmission', sa.String(), nullable=False),
    sa.Column('seats', sa.Integer(), nullable=False),
    sa.Column('vin_num', sa.Integer(), nullable=False),
    sa.Column('history', sa.String(), nullable=False),
    sa.Column('car_id', sa.Integer(), nullable=False),
    sa.Column('mpg', sa.Integer(), nullable=False),
    sa.Column('energy', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['car_id'], ['cars.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('transactions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('price_paid', sa.Integer(), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=False),
    sa.Column('car_id', sa.Integer(), nullable=False),
    sa.Column('buyer_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['buyer_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['car_id'], ['cars.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('transactions')
    op.drop_table('specs')
    op.drop_table('cars')
    op.drop_table('users')
    # ### end Alembic commands ###
