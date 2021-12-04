from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from db_connect import db
from apis.server_api import serverbp

from db_connect import db
import config
from admin import admin_password


def create_app():
    app = Flask(__name__)
    app.register_blueprint(serverbp)

    app.config.from_object(config) 
    db.init_app(app)

    migrate = Migrate()
    migrate.init_app(app, db, compare_type=True)

    from models import user, award, education, project, certificate
    
    app.secret_key = admin_password
    CORS(app)

    return app


if __name__ == "__main__":
    create_app().run()