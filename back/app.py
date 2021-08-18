from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from db_connect import db
import config

def create_app():

    app = Flask(__name__)

    app.config.from_object(config) 
    db.init_app(app)

    from blueprints import main_view
    app.register_blueprint(main_view.bp)


    app.secret_key = 'Top Secret!'
    app.config['SESSION_TYPE'] = 'filesystem'


    return app

if __name__ == "__main__":
    create_app().run(debug=True, port=1234)