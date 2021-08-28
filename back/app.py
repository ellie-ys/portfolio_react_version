from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from db_connect import db
import config
from flask_cors import CORS
from admin import admin_password
from templates import *

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config.from_object(config) 
    db.init_app(app)

    from apis import elicer, auth, education, award, license, portfolio, project

    app.register_blueprint(elicer.bp)
    app.register_blueprint(auth.bp)
    app.register_blueprint(portfolio.bp)

    app.register_blueprint(education.bp)
    app.register_blueprint(award.bp)
    app.register_blueprint(license.bp)
    app.register_blueprint(project.bp)

    app.secret_key = admin_password
    app.config['SESSION_TYPE'] = 'filesystem'


    return app


if __name__ == "__main__":
    create_app().run()