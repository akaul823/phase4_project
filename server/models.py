from config import db, flask_bcrypt
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy import DateTime
import re
from sqlalchemy.ext.hybrid import hybrid_property


class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    # decided to remove user_type. any user can be as seller as buyer. if anyone adds car to sell, car just shows up in selling list.
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    fullname = db.Column(db.String, nullable=False)
    # User type is either buyer or seller
    # user_type = db.Column(db.String, nullable=False)
    phone = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    # Relationships
    cars = db.Relationship("Car", back_populates="seller")

    @hybrid_property
    def password_hash(self):
        raise ValueError("Password hash is private")

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = flask_bcrypt.generate_password_hash(password).decode(
            "utf-8"
        )

    def authenticate(self, password):
        return flask_bcrypt.check_password_hash(self._password_hash, password)

    serialize_rules = ("-_password_hash",)


# class Buyer(User, SerializerMixin):
#     __tablename__ = "buyers"
#     user_id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
#     cars = db.Relationship("Car", back_populates="buyer")
#     transactions = db.Relationship("Transaction", back_populates="buyers")

#     serialize_rules = ("-cars.buyer", "-transactions.buyers")


# class Seller(User, SerializerMixin):
#     __tablename__ = "sellers"
#     user_id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
#     cars = db.Relationship("Car", back_populates="seller")

#     serialize_rules = ("-cars.seller",)


class Car(db.Model, SerializerMixin):
    __tablename__ = "cars"

    id = db.Column(db.Integer, primary_key=True)
    car_make = db.Column(db.String, nullable=False)
    car_model = db.Column(db.String, nullable=False)
    listed_price = db.Column(db.Integer, nullable=False)
    # Status denotes whether the car is for sale or has been sold
    status = db.Column(db.String, default = "selling", nullable=False)
    pictures = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    date = db.Column(db.DateTime, default=db.func.now())
    seller_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    # Relationships
    seller = db.Relationship("User", back_populates="cars")
    transaction = db.Relationship("Transaction", back_populates="car")
    spec = db.relationship("Specs", back_populates="car")

    # Rules
    serialize_rules = ("-seller.cars", "-transaction.car")


class Specs(db.Model, SerializerMixin):
    __tablename__ = "specs"

    id = db.Column(db.Integer, primary_key=True)
    engine = db.Column(db.String, nullable=False)
    milage = db.Column(db.Integer, nullable=False)
    hp = db.Column(db.Integer, nullable=False)
    doors = db.Column(db.Integer, nullable=False)
    transmission = db.Column(db.String, nullable=False)
    seats = db.Column(db.Integer, nullable=False)
    vin_num = db.Column(db.Integer, nullable=False)
    history = db.Column(db.String, nullable=False)
    car_id = db.Column(db.Integer, db.ForeignKey("cars.id"), nullable=False)
    mpg = db.Column(db.Integer, nullable=False)
    energy = db.Column(db.String, nullable=False)
    car = db.relationship("Car", back_populates="spec")


class Transaction(db.Model, SerializerMixin):
    __tablename__ = "transactions"

    id = db.Column(db.Integer, primary_key=True)
    price_paid = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, default=db.func.now(), nullable=False)
    date = db.Column(db.DateTime, default=db.func.now(), nullable=False)
    # car_id. ID of a car which was sold
    car_id = db.Column(db.Integer, db.ForeignKey("cars.id"), nullable=False)
    # seller's ID must be a value of a collumn seller_id in cars table. because when car gets added, the user who added it
    # is automatically seller
    # we even don't need seller_id, because with relationships between cars and transactions, we can have seller_id
    # from cars.seller_id
    # seller_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    # buyer's id is a ID of user who clicked BUY NOW xD
    buyer_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    car = db.Relationship("Car", back_populates="transaction")

    serialize_rules = ("-car.transaction",)