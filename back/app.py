
from flask import Flask, Blueprint
from db_connect import db
import config
from admin import admin_password
from models.user import User


def create_app():
    app = Flask(__name__)
    app.config.from_object(config) 

    db.init_app(app)


    @app.route("/api")
    def info():
        
        return "Hello World!"


    @app.route('/register')
    def index():

        user1 = User("a@elice.io", "1234", "racer1")
        db.session.add(user1)
        user2 = User("b@elice.io", "1234", "racer2")
        db.session.add(user2)
        user3 = User("c@elice.io", "1234", "racer3")
        db.session.add(user3)

        db.session.commit()

        return "SUCCESS"

    app.secret_key = admin_password
    app.config['SESSION_TYPE'] = 'filesystem'

    return app


if __name__ == "__main__":
    create_app().run(debug=True)