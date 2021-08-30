from flask import Blueprint, jsonify, request, session

from models.award import *
from models.education import *
from models.license import *
from models.project import *
from models.user import *
from templates import *

from werkzeug.security import check_password_hash, generate_password_hash

from db_connect import db

import re

bp = Blueprint('auth', __name__)

    
@bp.route('/login', methods=['POST'])
def login():

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

@bp.route("/register", methods=['POST'])
def register():

    email = request.form.get("email")
    password = request.form.get("password")
    name = request.form.get("name")

    if request.json:
        email = request.json.get("email")
        password = request.json.get("password")
        name = request.json.get("name")
    #email validation
    # email_form = re.compile("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")
    # if email_form.match(email) == None:
    #     return jsonify(result="failed", message="올바른 이메일 형식이 아닙니다."), 400
    #password validation
    password_length = len(password)
    count = 0
    if re.compile("[a-zA-Z]").search(password):
        count += 1
    if re.compile("[0-9]").search(password):
        count += 1
    if re.compile("[\W]").search(password):
        count += 1

    if count <= 2 and password_length < 10:
        return jsonify(result="failed", message="올바른 비밀번호가 아닙니다."), 401
    elif count == 3 and password_length < 8:
        return jsonify(result="failed", message="올바른 비밀번호가 아닙니다."), 401
    if re.compile("[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]").search(name) != None:
        return jsonify(result="failed", message="올바른 이름이 아닙니다."), 400
    
    user = User.query.filter_by(email=email).one_or_none()
    if user is not None:
        return jsonify(result="failed", message="이미 가입된 이메일입니다."), 400

    #password hash
    hash_pw = generate_password_hash(password)

    #register 
    new_user = User(email, hash_pw, name)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(result="success", message="회원가입 완료!"), 201

@bp.route("/logout")
def logout():
    session.clear()
    return jsonify(result="success", message="로그아웃 완료!"), 200