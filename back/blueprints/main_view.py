from models import elice_award, elice_certification, elice_education, elice_project
from flask import Flask, jsonify, request, Response,Blueprint
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker

bp = Blueprint('main', __name__, url_prefix='/')

@bp.route('/')
def main():
    pass

@bp.route('/elicer/<int:user_id>/', methods=['GET'])
def user_detail(user_id):

    pass



@bp.route("/signup", methods=["POST", "GET"])
def signup():
    
    # # get values from flask request
    # email = request.form.get("email")
    # password = request.form.get("password")
    # name = request.form.get("name")

    # #사용자 추가
    # #session.add(user)
    # #session.commit()

    return Response("SUCCESS", status=201)



#마이 페이지
@bp.route('/mypage')
def main_page():
    pass

#회원가입페이지
@bp.route('/join')
def register():
    pass


#로그인페이지
@bp.route('/login')
def login_page():
    pass

#네트워크 페이지
@bp.route('/network')
def network_page():
    pass





