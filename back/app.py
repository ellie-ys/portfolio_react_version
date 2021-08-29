from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from db_connect import db
from flask_cors import CORS
from models.user import *
from templates import *

from apis import elicer 
from apis import auth
from apis import portfolio
import config
from admin import admin_password

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config.from_object(config)
    db.init_app(app)
    app.secret_key = admin_password
    app.config['SESSION_TYPE'] = 'filesystem'


    app.register_blueprint(elicer.bp, url_prefix="/api/elicer")
    app.register_blueprint(auth.bp, url_prefix="/api/auth")
    app.register_blueprint(portfolio.bp, url_prefix="/api/portfolio")

    @app.route('/api')
    def home():
        return "Hello, World!"

    

    return app
    
if __name__ == "__main__":
    create_app().run()