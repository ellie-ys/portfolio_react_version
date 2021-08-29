from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from db_connect import db
import config
from flask_cors import CORS
from models.user import *
from templates import *

from apis.elicer import elicer 
from apis.auth import auth

from apis.portfolio import portfolio

from admin import admin_password

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.register_blueprint(elicer)
    app.register_blueprint(auth)
    app.register_blueprint(portfolio)

    app.config.from_object(config) 
    db.init_app(app)
    app.secret_key = admin_password
    app.config['SESSION_TYPE'] = 'filesystem'

    CORS(app)
    return app
    
if __name__ == "__main__":
    create_app().run(host='0.0.0.0')