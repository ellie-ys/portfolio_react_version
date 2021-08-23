from flask import Blueprint, request, session, render_template, jsonify, redirect, flash, url_for
from flask_bcrypt import Bcrypt
from db_connect import db
from models.user import *
from models.award import *
from models.education import *
from models.license import *
from models.project import *
from templates import *

from werkzeug.security import check_password_hash, generate_password_hash

bp = Blueprint('main', __name__, url_prefix='/')
# bp = Blueprint('login', __name__, url_prefix='/')
# bp = Blueprint('register', __name__, url_prefix='/')


#마이페이지, 수정하기
@bp.route("/mypage")
def mypage():
    if request.method == 'GET':
        info = db.session.query(user).all()
        result = []
        for i in info:
            user_info= {
                'email':i.email,
                'name':i.name,
                'description':i.description,
                'image':i.image
            }
            result.append(user_info)

        return jsonify(result)

    elif request.method == 'POST':
        info = request.get_json()
        user.append(info)
        users = user(info['input_email'],info['input_name'],info['input_pw'],info['verify_pw'],info['input_description'],info['input_image'])
        db.session.add(users)
        db.session.commit()
        return jsonify(status="success")

@bp.route("/")
def home():
    elicer_list = user.query.order_by(user.name.asc())
    return render_template('elicer.html', elicer_list = elicer_list)


#회원가입
@bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template('register.html')
    else:
        #request.form으로 데이터 받아오기
        email = request.form['input_email']
        password = request.form['input_pw']
        verify_pw = request.form['verify_pw']
        name = request.form['input_name']

        #비밀번호 일치하는 지 확인
        if password != verify_pw:
            flash('비밀번호가 일치하지 않습니다.')
            return redirect('/register')

        #이미 가입된 정보인지 확인
        user_info = user.query.filter(user.email == email).first()
        if user_info:
            flash('이미 가입된 정보입니다.')
            return redirect('/register')
        else:
            #회원가입 진행 - password 해쉬화
            pw = generate_password_hash(password)

    #elicer 생성
    elicer = user(email=email, password=pw, name=name)
    db.session.add(elicer)
    db.session.commit()
    
    flash(f"회원가입이 완료되었습니다. 반갑습니다 {elicer.name}님")
    return redirect("/")

#로그인
@bp.route("/login", methods=["GET", "POST"])
def login():
    if request.method == 'GET':
        return render_template("login.html")
    else: 
        email = request.form['input_email']
        password = request.form['input_pw']

    user_data = user.query.filter(user.email == email).first()
    if not user_data:
        flash("존재하지 않는 아이디 입니다.")
        return redirect('/login')
    if not check_password_hash(user_data.password, password):
        flash("비밀번호가 일치하지 않습니다.")
        return redirect(url_for('main.login'))

    session.clear()
    session['email'] = user_data.email
    session['name'] = user_data.name
    flash(f"안녕하세요, {user_data.name}님!")
    return redirect("/elicer")


#로그아웃
@bp.route('/logout')
def logout():
    name = session['name']
    session.clear()
    flash(f"안녕히가세요, {name}님")
    return redirect()

#메인페이지
@bp.route('/elicer')
def elicer():
    elicer_list = user.query.order_by(user.name.asc())
    return render_template('elicer.html', elicer_list = elicer_list)

#유저정보보기, 내 페이지 수정하기
@bp.route('/elicer/<int:elice_id>/')
def elicer_detail(elice_id):
    elice_info = user.query.filter(user.id == elice_id).first()
    elice_education = education.query.filter(education.user_id == elice_id).first()
    elice_award = award.query.filter(award.user_id == elice_id).first()
    elice_project = project.query.filter(project.user_id == elice_id).first()
    elice_license = license.query.filter(license.user_id == elice_id).first()
    return render_template('elicer_detail.html', elice_info = elice_info, elice_education = elice_education, elice_project= elice_project, elice_license=elice_license, elice_award=elice_award)

