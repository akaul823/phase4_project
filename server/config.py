# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
# from flask_cors import CORS
# from flask_bcrypt import Bcrypt
# from secretKeys import secret_key


# def fk_connect(conn,conn_record):
#     conn.execute("PRAGMA foreign_keys='ON'")

# app=Flask(__name__)
# app.config["SQLALCHEMY_DATABASE_URI"]="sqlite:///app.db"
# db=SQLAlchemy(app)
# migrate=Migrate(app,db)
# CORS(app)
# app.secret_key = secret_key


# SESSION_TYPE="sqlalchemy"

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_bcrypt import Bcrypt

#  app = Flask(__name__)
# #app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"

# app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# migrate = Migrate(app, db)
# CORS(app)
# bcrypt = Bcrypt(app)
# db.init_app(app)


import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# app.json.compact = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)


SESSION_TYPE = "sqlalchemy"

if __name__ == "__main__":
    app.run(port=5555, debug=True)
