from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import os
from secretKeys import secret_key

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")


def fk_connect(conn, conn_record):
    conn.execute("PRAGMA foreign_keys='ON'")


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
flask_bcrypt = Bcrypt(app)
app.secret_key = secret_key
CORS(app)
# app.json.compact = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)


SESSION_TYPE = "sqlalchemy"

if __name__ == "__main__":
    app.run(port=5555, debug=True)
