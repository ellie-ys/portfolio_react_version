from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from api import board


app = Flask(__name__)
app.register_blueprint(board)
db.SQLAlchemy(app)




if __name__ == '__main__':
    app.run(debug=True)