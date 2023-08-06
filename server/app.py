from flask import request, session as flask_session
from config import app, db
from models import User, Car, Specs, Transaction
from sqlalchemy.exc import IntegrityError
from sqlalchemy import event


@app.route("/")
def home():
    return ""


@app.route("/cars", methods=["GET", "POST"])
def cars():
    if request.method == "GET":
        all = Car.query.all()
        cars = []
        for car in all:
            cars.append(car.to_dict())
        return cars
    elif request.method == "POST":
        data = request.json
        car = Car()
        try:
            for key in data:
                setattr(car, key, data[key])
            db.session.add(car)
            db.session.commit()
            return car.to_dict(), 201
        except (IntegrityError, ValueError) as ie:
            return {"error": ie.args}, 422


@app.route("/cars/<int:id>", methods=["GET", "PATCH", "DELETE"])
def get_car_by_id(id):
    car = Car.query.filter(Car.id == id).first()
    if not car:
        return {}, 404
    elif request.method == "GET":
        return car.to_dict(), 200
    elif request.method == "PATCH":
        data = request.json
        try:
            for key in data:
                setattr(car, key, data[key])
            db.session.commit()
            return car.to_dict(), 200
        except (IntegrityError, ValueError) as ie:
            return {"error": ie.args}, 422
    elif request.method == "DELETE":
        if car.status == "sold":
            return {"error": "can't delete sold car"}, 403
        else:
            db.session.delete(car)
            db.session.commit()
            return {"message": "Car deleted successfully"}, 200
