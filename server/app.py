from flask import request, session as flask_session
from flask import send_from_directory
from config import app, db
from models import User, Car, Specs, Transaction
from sqlalchemy.exc import IntegrityError
from sqlalchemy import event
from flask_cors import CORS
import os
from sqlalchemy import and_
from random import randrange
from flask import request, jsonify

# from flask import Flask, flash, request, redirect, url_for
# from werkzeug.utils import secure_filename
# from config import ALLOWED_EXTENSIONS
# from werkzeug.datastructures import FileStorage

# CORS(app)

GLOBAL_SESSIONS = set()


@app.route("/")
def home():
    return ""


# get all cars or add car in db
@app.route("/cars", methods=["GET", "POST"])
def cars():
    if request.method == "GET":
        print(flask_session)
        # if flask_session["session_id"] not in GLOBAL_SESSIONS:
        #     # if not user:
        #     return {"error": "Please login"}, 401

        all = Car.query.all()
        cars = []
        for car in all:
            cars.append(car.to_dict(rules=("-spec.car",)))
        return cars
    elif request.method == "POST":
        data = request.json
        print(data)
        car = Car()
        try:
            for key in data:
                setattr(car, key, data[key])
            print(car.listed_price)
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
        db.session.delete(car)
        db.session.commit()
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


@app.route("/users/<int:id>", methods=["GET", "PATCH"])
def user_page(id):
    user = User.query.filter(User.id == id).first()
    print(user)
    if not user:
        return {"error": "user not found"}, 404
    if request.method == "GET":
        return user.to_dict(), 200
    elif request.method == "PATCH":
        data = request.json
        try:
            for key in data:
                setattr(user, key, data[key])
            db.session.commit()
            return user.to_dict(), 200
        except (IntegrityError, ValueError) as ie:
            return {"error": ie.args}, 422


@app.route("/registration", methods=["POST", "DELETE"])
def user_registration():
    data = request.json
    print(data)
    if request.method == "POST":
        try:
            new_user = User()
            # print(new_user)
            for key in data:
                setattr(new_user, key, data[key])
            # print(new_user.password)
            db.session.add(new_user)
            db.session.commit()
            return (
                new_user.to_dict(
                    rules=("-_password_hash",),
                ),
                201,
            )
        except (IntegrityError, ValueError) as ie:
            print(ie)
            return {"error": ie.args}, 422
    # elif request.method == "DELETE":
    #     user = User.query.filter(User.id == 3).first()
    #     db.session.delete(user)
    #     db.session.commit()


# @app.route("/transactions/<int:id>", methods=["GET"])
# def transactions_by_id(id):
#     if request.method == "GET":
#         sold_cars = Car.query.filter(
#             and_(Car.seller_id == flask_session["user_id"], Car.status == "sold")
#         ).all()
#         bought_cars = Transaction.query.filter(Transaction.buyer_id == id).all()
#         transactions = []
#         # for sold_Car,bought_car in sold_cars,bought_cars:

#         for transaction in sold_cars:
#             transactions.append(transaction.to_dict())
#         for transaction in bought_cars:
#             transactions.append(transaction.to_dict(rules=("-car.transaction",)))
#         return transactions


@app.route("/transactions", methods=["GET", "POST"])
def transactions():
    if request.method == "POST":
        data = request.json
        print(data["price_paid"])
        print(data)
        if (
            data["price_paid"]
            != Car.query.filter(Car.id == data.get("car_id")).first().listed_price
        ):
            return {"error": "This price does not match the listed price"}, 403
        transaction = Transaction()
        try:
            for key in data:
                setattr(transaction, key, data[key])

            db.session.add(transaction)
            db.session.commit()
            print(transaction.car)
            transaction.car.status = "sold"
            transaction.car.seller_id = data["buyer_id"]
            db.session.add(transaction)
            db.session.commit()
            return transaction.to_dict(), 201
        except (IntegrityError, ValueError) as ie:
            return {"error": ie.args}, 422
    elif request.method == "GET":
        print("---------------------------", flask_session["user_id"])
        sold_cars = Car.query.filter(
            and_(Car.seller_id == flask_session["user_id"], Car.status == "selling")
        ).all()
        bought_cars = Transaction.query.filter(
            Transaction.buyer_id == flask_session["user_id"]
        ).all()
        transactions = []
        print(sold_cars)
        if sold_cars:
            for transaction in sold_cars:
                transactions.append(transaction.to_dict(rules=("-car.transaction",)))
        if bought_cars:
            for transaction in bought_cars:
                transactions.append(transaction.to_dict(rules=("-car.transaction",)))
        return transactions


@app.route("/session")
def session():
    user = User.query.filter(User.id == flask_session.get("user_id")).first()
    if (
        "session_id" not in flask_session
        or flask_session["session_id"] not in GLOBAL_SESSIONS
    ):
        return {"error": "Please login"}, 401
    print(flask_session["user_id"])
    return user.to_dict(rules=("-cars",))


@app.route("/login", methods=["POST"])
def login():
    print(request.json)
    errorMsg = {"error": "username/password not on file"}
    username = request.json.get("username")
    password = request.json.get("password")
    user = User.query.filter(User.username == username).first()
    if not user:
        return errorMsg, 401
    if not user.authenticate(password):
        return errorMsg, 401
    flask_session["user_id"] = user.id
    flask_session["session_id"] = randrange(0, 1e18)
    GLOBAL_SESSIONS.add(flask_session["session_id"])
    return user.to_dict(rules=("-cars",))


@app.route("/logout", methods=["DELETE"])
def logout():
    flask_session["user_id"] = None
    print(flask_session["session_id"])
    GLOBAL_SESSIONS.remove(flask_session["session_id"])
    return {}, 204


# def allowed_file(filename):
#     return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


# @app.route("/photos", methods=["GET", "POST"])
# def upload_file():
#     if request.method == "POST":
#         # check if the post request has the file part
#         if "file" not in request.files:
#             flash("No file part")
#             return redirect(request.url)
#         file = request.files["file"]
#         # If the user does not select a file, the browser submits an
#         # empty file without a filename.
#         if file.filename == "":
#             flash("No selected file")
#             return redirect(request.url)
#         if file and allowed_file(file.filename):
#             filename = secure_filename(file.filename)
#             file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
#             return redirect(url_for("download_file", name=filename))
#     return """
#     <!doctype html>
#     <title>Upload new File</title>
#     <h1>Upload new File</h1>
#     <form method=post enctype=multipart/form-data>
#       <input type=file name=file>
#       <input type=submit value=Upload>
#     </form>
#     """
