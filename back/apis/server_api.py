from flask import request, jsonify, Blueprint
from flask_jwt_extended import create_refresh_token, create_access_token, jwt_required, get_jwt_identity
from models.user import User
from db_connect import db
from flask_bcrypt import Bcrypt

serverbp = Blueprint('serverbp', __name__)
bcrypt = Bcrypt()

@serverbp.route('/network', methods=["POST"])
@jwt_required()
def network():
    user_info = get_jwt_identity()
    return jsonify(user_info), 200



@serverbp.route('/register', methods=['POST'])
def register():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    name = request.json.get('name', None)
    type = request.json.get('type', None)
    
    if email == None or password == None or name == None or type == None:
        return jsonify("fail")

    
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
    email = request.json.get('email', None)
    type = request.json.get('type', None)
    password = request.json.get('password', None)
    
    if email == None or type == None or password == None:
        return jsonify({"error_message":"User Not Found"}), 400
    
    type = int(type)

    
    user = User.query.filter_by(email=email, type=type).first()
    
    if not user:
        return jsonify({"error_message":"User Not Found"}), 400

    if bcrypt.check_password_hash(user.password, password):
        user_info = {'id': user.id, 'name': user.name, 'email': user.email, 'type': user.type}
        access_token = create_access_token(identity=user_info)
        refresh_token = create_refresh_token(identity=user_info)
        return jsonify(access_token=access_token, refresh_token=refresh_token), 200

    
    return jsonify({"error_message":"Login Failed"}), 400


