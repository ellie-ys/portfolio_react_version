from flask import Blueprint, jsonify, request, session
from models.award import *
from models.education import *
from models.license import *
from models.project import *
from models.user import User
from templates import *

from werkzeug.security import check_password_hash, generate_password_hash

from db_connect import db

bp = Blueprint('auth', __name__)

@bp.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        email = request.form.get("email")
        password = request.form.get("password")

        if request.json:
            email = request.json.get("email")
            password = request.json.get("password")

        user = User.query.filter_by(email=email).one_or_none()
        if user is None:
            return jsonify(result="failed", message="잘못된 정보입니다."), 401
        if not check_password_hash(user.password, password):
            return jsonify(result="failed", message="비밀번호가 일치하지 않습니다."), 401
        

        session['auth'] = user.id
        return jsonify(result="success", message="로그인되었습니다!", data={"user": user.to_dict()}), 200



@bp.route("/register", methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form.get("email")
        password = request.form.get("password")
        password2 = request.form.get("password2")
        name = request.form.get("name")

        if request.json:
            email = request.json.get("email")
            password = request.json.get("password")
            password2 = request.json.get("password2")
            name = request.json.get("name")

        
        if password != password2:
            return jsonify(result="failed", message="비밀번호와 비밀번호 확인이 일치하지 않습니다"), 400 
        user = User.query.filter_by(email=email).one_or_none()
        if user is not None:
            return jsonify(result="failed", message="이미 가입된 이메일입니다."), 400

        hash_pw = generate_password_hash(password)

        new_user = User(email, hash_pw, name)
        db.session.add(new_user)
        db.session.commit()
        return jsonify(result="success", message="회원가입 완료!"), 201

    return jsonify(result="failed", message="요청이 잘못되었습니다"), 401

@bp.route("/logout")
def logout():
    session.clear()
    return jsonify(result="success", message="로그아웃 완료!"), 200