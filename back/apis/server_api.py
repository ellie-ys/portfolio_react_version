from flask import request, jsonify, Blueprint, make_response
from models.user import User
from db_connect import db
from flask_bcrypt import Bcrypt
from admin import bwt_key, bwt_algorithm
import jwt

serverbp = Blueprint('serverbp', __name__)
bcrypt = Bcrypt()


@serverbp.route('/register', methods=['POST'])
def register():
    user_info = request.get_json()
    email = user_info['email']
    password = user_info['password']
    name = user_info['name']
    type = user_info['type']
    
    user = User.query.filter_by(email=email, type=type).first()
    if user:
        return jsonify("fail")

    hashed_password = bcrypt.generate_password_hash(password).decode()
    new_user = User(email=email, password=hashed_password, name=name, type=type)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify("success")

@serverbp.route('/login', methods=['POST'])
def login():
    login_info = request.get_json()
    email = login_info['email']
    type = int(login_info['type'])
    password = login_info['password']
    
    user = User.query.filter_by(email=email, type=type).first()
    
    if not user:
        return make_response(jsonify({"error_message":"User Not Found"}), 400)

    if bcrypt.check_password_hash(user.password, password):
        data_to_encode = {'id': user.id, 'name': user.name, 'email': user.email, 'type': user.type}
        encoded_user = jwt.encode(data_to_encode, bwt_key, bwt_algorithm)
        return make_response(jsonify({"auth":encoded_user}), 200)
    
    return make_response(jsonify({"error_message":"Login Failed"}), 400)


