from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy import DateTime
import re

class User(db.Model, SerializerMixin):
    __tablename__="users"

    id=db.Column(db.Integer,primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    fullname=db.Column(db.String, nullable=False)
    #User type is either buyer or seller
    user_type = db.Column(db.String, nullable=False)
    phone = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)

class Buyer(User, SerializerMixin):
    __tablename__="buyers"
    user_id=db.Column(db.Integer,db.ForeignKey("users.id"),primary_key=True)
    cars = db.Relationship("Car", back_populates="buyer" )
    transactions = db.Relationship("Transaction", back_populates="buyers")

    serialize_rules = ("-cars.buyer","-transactions.buyers")


class Seller(User, SerializerMixin):
    __tablename__="sellers"
    user_id=db.Column(db.Integer,db.ForeignKey("users.id"),primary_key=True)
    cars = db.Relationship("Car", back_populates="seller")

    serialize_rules = ("-cars.seller",)

class Car(db.Model, SerializerMixin):

    __tablename__="cars"

    id=db.Column(db.Integer,primary_key=True)
    car_make=db.Column(db.String, nullable=False)
    car_model = db.Column(db.String, nullable=False)
    listed_price = db.Column(db.Integer, nullable=False)
    #Status denotes whether the car is for sale or has been sold
    status = db.Column(db.String, nullable=False)
    pictures = db.Column(db.String, nullable=False)
    reviews = db.Column(db.String, nullable=False)
    date = db.Column(db.DateTime) 
    seller_id = db.Column(db.Integer, db.ForeignKey("sellers.user_id"))
    #Relationships
    seller = db.Relationship("Seller", back_populates="cars")
    transaction = db.Relationship("Transaction", back_populates="car")

    #Rules
    serialize_rules=("-seller.cars","-transaction.car")

class Transaction(db.Model, SerializerMixin):
    __tablename__="transactions"

    id=db.Column(db.Integer,primary_key=True)
    price_paid = db.Column(db.Integer, nullable = False)
    date = db.Column(db.DateTime, nullable = False)
    car_id = db.Column(db.Integer, db.ForeignKey("cars.id"), nullable = False)
    seller_id = db.Column(db.Integer, db.ForeignKey("sellers.user_id"), nullable = False)
    buyer_id = db.Column(db.Integer, db.ForeignKey("buyers.user_id"), nullable=False)

    buyer = db.Relationship("Buyer", back_populates="transactions")
    car = db.Relationship("Car", back_populates="transactions")

    serialize_rules = ("-buyer.transactions","-car.transactions")


