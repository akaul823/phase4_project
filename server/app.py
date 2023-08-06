from flask import request, session as flask_session
from config import app, db
from models import User, Car, Specs, Transaction
from sqlalchemy.exc import IntegrityError
from sqlalchemy import event




@app.route('/')
def home():
    return ''

@app.route("/cars",methods=["GET","POST"])
def cars():
    if(request.method=="GET"):
        all=Car.query.all()
        cars=[]
        for car in all:
            cars.append(car.to_dict())
        return cars
    elif(request.method=="POST"):
        data=request.json
        car=Car()
        try:
            for key in data:
                setattr(car,key,data[key])
            db.session.add(car)
            db.session.commit()
            return car.to_dict(),201
        except (IntegrityError,ValueError) as ie:
            return {"error":ie.args},422
        


