from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from db_connect import db
import config
import requests
from flask_cors import CORS
from admin import admin_password
from templates import *

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config.from_object(config) 

    db = SQLAlchemy(app)
    db.init_app(app)


    from apis import main_view

    app.register_blueprint(main_view.bp)

    app.secret_key = admin_password
    app.config['SESSION_TYPE'] = 'filesystem'

    return app


if __name__ == "__main__":
    create_app().run(debug=True, port = 5000)