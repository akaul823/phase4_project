from flask import request, session as flask_session
from flask import send_from_directory
from config import app, db
from models import User, Car, Specs, Transaction
from sqlalchemy.exc import IntegrityError
from sqlalchemy import event
from flask_cors import CORS
import os

CORS(app)


@app.route("/")
def home():
    return ""


# get all cars or add car in db
@app.route("/cars", methods=["GET", "POST"])
def cars():
    if request.method == "GET":
        all = Car.query.all()
        cars = []
        for car in all:
            cars.append(car.to_dict(rules=("-spec.car",)))
        return cars
    elif request.method == "POST":
        data = request.json
        car = Car()
        try:
            for key in data:
                setattr(car, key, data[key])
            db.session.add(car)
            db.session.commit()
            return car.to_dict(rules=("-spec.car",)), 201
        except (IntegrityError, ValueError) as ie:
            return {"error": ie.args}, 422


# get single car , edit or delete it. checking if car is already sold
# you wont be allowed to delete it from DB
@app.route("/cars/<int:id>", methods=["GET", "PATCH", "DELETE"])
def get_car_by_id(id):
    car = Car.query.filter(Car.id == id).first()
    if not car:
        return {}, 404
    elif request.method == "GET":
        return car.to_dict(rules=("-spec.car",)), 200
    elif request.method == "PATCH":
        if car.status == "sold":
            return {"error": "can't edit sold car"}, 403
        data = request.json
        try:
            for key in data:
                setattr(car, key, data[key])
            db.session.commit()
            return car.to_dict(rules=("-spec.car",)), 200
        except (IntegrityError, ValueError) as ie:
            return {"error": ie.args}, 422
    elif request.method == "DELETE":
        if car.status == "sold":
            return {"error": "can't delete sold car"}, 403
        else:
            db.session.delete(car)
            db.session.commit()
            return {"message": "Car deleted successfully"}, 200


# get or add specs for cars. I dont know if we need get method here
@app.route("/specs", methods=["GET", "POST"])
def get_specs():
    if request.method == "GET":
        all = Specs.query.all()
        specs = []
        for spec in all:
            specs.append(spec.to_dict(rules=("-car.spec",)))
        return specs, 200
    elif request.method == "POST":
        data = request.json
        specs = Specs()
        try:
            for key in data:
                setattr(specs, key, data[key])
            db.session.add(specs)
            db.session.commit()
            return specs.to_dict(rules=("-car.spec",)), 201
        except (IntegrityError, ValueError) as ie:
            return {"error": ie.args}, 422


# get edit or delete specs for single car, same thing, check if car
# is sold or not, cant edit sold car's specs.
# P.S. I think we should do that cascade delete, if you delete car, specs should
# be gone automatically
@app.route("/specs/<int:car_id>", methods=["GET", "PATCH", "DELETE"])
def get_specs_by_car_id(car_id):
    specs = Specs.query.filter(Specs.car_id == car_id).first()

    if not specs:
        return {"error": "Specs not found for the given car ID"}, 404

    if request.method == "PATCH":
        if specs.car.status == "sold":
            return {"error": "Can't edit specs of a sold car"}, 403

        data = request.json
        try:
            for key in data:
                setattr(specs, key, data[key])
            db.session.commit()
            return specs.to_dict(rules=("-car.spec",)), 200
        except (IntegrityError, ValueError) as ie:
            return {"error": ie.args}, 422

    elif request.method == "DELETE":
        if specs.car.status == "sold":
            return {"error": "Can't delete specs of a sold car"}, 403

        db.session.delete(specs)
        db.session.commit()
        return {"message": "Specs deleted successfully"}, 200

    elif request.method == "GET":
        return specs.to_dict(rules=("-car.spec",)), 200


@app.route("/imgs/<path:filename>")
def serve_image(filename):
    absolute_path = os.path.join("/imgs", filename)
    print("Serving image from:", absolute_path)
    return send_from_directory("server/imgs", filename)
