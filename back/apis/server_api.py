from flask import request, jsonify, Blueprint
from flask_jwt_extended import create_refresh_token, create_access_token, jwt_required, get_jwt_identity
from models.user import User
from models.token import Token
from db_connect import db
from flask_bcrypt import Bcrypt
from utils.validation import validate_email, validate_name, validate_password
from flask_jwt_extended.utils import decode_token

serverbp = Blueprint('serverbp', __name__, url_prefix='/api')
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
    password_check = request.json.get('password_check', None)
    name = request.json.get('name', None)
    user_type = request.json.get('user_type', None)
    
    if email == None or password == None or password_check == None or name == None or user_type == None:
        return jsonify(message = "invalid parameter"), 400
    if not validate_email(email):
        return jsonify(message = "invalid email"), 400
    
    if not validate_password(password):
        return jsonify(message = "invalid password"), 400
    
    if not validate_name(name):
        return jsonify(message = "invalid name"), 400

    if password != password_check:
        return jsonify(message = "password check is not correct"), 400
    
    user = User.query.filter_by(email=email, user_type=user_type).first()
    if user:
        return jsonify(message = "already exist"), 400

    hashed_password = bcrypt.generate_password_hash(password).decode()
    new_user = User(email=email, password=hashed_password, name=name, user_type=user_type)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify(message = "register success"), 200






@serverbp.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    user_type = request.json.get('user_type', None)
    password = request.json.get('password', None)
    
    if email == None or user_type == None or password == None:
        return jsonify(message = "User Not Found"), 400
    
    if not validate_email(email):
        return jsonify(message = "invalid email"), 400
    
    if not validate_password(password):
        return jsonify(message = "invalid password"), 400

    
    user_type = int(user_type)
    user = User.query.filter_by(email=email, user_type=user_type).first()

    if not user:
        return jsonify(message = "User Not Found"), 400

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify(message = "Login Failed"), 400

    user_info = {'id': user.id, 'name': user.name, 'email': user.email, 'user_type': user.user_type}
    access_token = create_access_token(identity=user_info)
    refresh_token = create_refresh_token(identity=user_info)
    


    target_token = Token.query.filter_by(user_id= user.id).first() 

    if target_token:
        target_token.token = refresh_token
    else:
        new_token = Token(user_id = user.id, token = refresh_token)
        db.session.add(new_token)
    db.session.commit()

    return jsonify(access_token=access_token, user_id=user.id), 200

@serverbp.route('/refresh/token', methods=['POST'])
def refresh_expired_token():

    user_id = request.json.get('user_id', None)
    if user_id == None:
        return jsonify(message="Not found User"), 400
    
    refresh_token = Token.query.filter_by(user_id=user_id).first().token
    try:
        identity = decode_token(refresh_token)["sub"]
        access_token = create_access_token(identity=identity)
        return jsonify(access_token=access_token), 200
    except:
        return jsonify(message = "Please login again"), 401

