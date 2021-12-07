from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from db_connect import db

from apis.server_api import serverbp

from apis.posts import posts
from apis.edus import edus
from apis.awards import awards
from apis.profile import profiles
from apis.projects import projects
from apis.certificates import certificates

import config
from admin import SECRET_KEY, JWT_SECRET_KEY
from flask_jwt_extended import JWTManager

import os

def create_app():
    app = Flask(__name__)


    app.register_blueprint(serverbp)
    app.register_blueprint(posts)
    app.register_blueprint(edus)
    app.register_blueprint(awards)
    app.register_blueprint(profiles)
    app.register_blueprint(projects)
    app.register_blueprint(certificates)

    app.config.from_object(config) 
    db.init_app(app)

    migrate = Migrate()
    migrate.init_app(app, db, compare_type=True)

    from models import user, award, education, project, certificate
    
    app.config['UPLOAD_DIR'] = os.getcwd()

    app.secret_key = SECRET_KEY
    app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = config.expires_access
    app.config['JWT_REFRESH_TOKEN_EXPIRES'] = config.expires_refresh
    jwt = JWTManager(app)

    CORS(app)

    return app


if __name__ == "__main__":
    create_app().run(debug=True) #배포할 때 devug=True안지우면 안됨