from flask import Blueprint, request, session, jsonify

from models.award import *
from models.education import *
from models.license import *
from models.project import *
from models.user import User

from db_connect import db

bp = Blueprint('elicer', __name__)


@bp.route("/elicer", methods=["GET"])
def users():
    query = request.args.get("query")
    result = []

    users = User.query.filter(User.name.like(f"%{query}%")).all()
    for user in users:
        result.append(user.to_dict())
    
    return jsonify(result="success", data={"users": result}), 200

@bp.route("/<int:user_id>", methods=["GET"])
def user_info(user_id):
    user = User.query.filter_by(id=user_id).one_or_none()
    if user is None:
        return jsonify(result="failed", message="존재하지 않는 사용자입니다."), 404

    return jsonify(result="success", data={"user": user.to_dict()}), 200

@bp.route("/<int:user_id>/image", methods=["PATCH"])
def edit_image(user_id):
    if user_id != session.get("auth"):
        return jsonify(result="falied", message="수정 권한이 없습니다."), 403

    user = User.query.filter_by(id=user_id).one_or_none()
    if user is None:
        return jsonify(result="failed", message="존재하지 않는 사용자입니다."), 404

    return "준비 중"

@bp.route("/<int:user_id>/description", methods=["PATCH"])
def edit_description(user_id):
    if user_id != session.get("auth"):
        return jsonify(result="falied", message="권한이 없는 사용자입니다."), 403

    user = User.query.filter_by(id=user_id).one_or_none()
    if user is None:
        return jsonify(result="failed", message="존재하지 않는 사용자입니다."), 404

    description = request.form.get("description")
    if request.json:
        description = request.json.get("description")

    user.description = description
    db.session.add(user)
    db.session.commit()
    return jsonify(result="success"), 200





# @bp.route("/elicer", methods=["POST"])
# def elicer():
#     search_text = request.json['searchText']
#     result = User.query.filter(User.name.like(f'%{search_text}%')).all()

#     users = {
#             "id": result.id,
#             "name": result.name,
#             "description": result.description
#     }

#     return jsonify({"result": "success", "data": users})



# @bp.route("/elicer", methods=['GET'])        
# def elicesearch(user):
#     user_info = User.query.filter(User.user_id == user).first()
#     return dict({
#         "user_id": user_info.user_id,
#         "user_name": user_info.user_name,
#         "user_desc": user_info.user_desc}
#     )



#     # query = request.args.get("query")
#     # result = []

#     # users = User.query.filter(User.name.like(f"%{query}%")).all()
#     # for user in users:
#     #     result.append(user.to_dict())
    
#     # return jsonify(result="success", data={"users": result}), 200


# #유저정보보기
# @bp.route("/<int:user_id>", methods=["GET"])
# def user_info(user_id):
#     users = User.query.filter_by(id=user_id).one_or_none()
#     return jsonify(result="success", data={"user": users.to_dict()}), 200



# @bp.route("/<int:user_id>/image", methods=["PATCH"])
# def edit_image(user_id):
#     if user_id == session.get("auth"):
#         users = User.query.filter_by(id=user_id).one_or_none()


# @bp.route("/<int:user_id>/description", methods=["PATCH"])
# def edit_description(user_id):
#     if user_id == session.get("auth"):
#         user = User.query.filter_by(id=user_id).one_or_none()
#         description = request.form.get("description")
#         if request.json:
#             description = request.json.get("description")

#     user = User.query.filter_by(id=user_id).one_or_none()
#     user.description = description
#     db.session.add(user)
#     db.session.commit()

#     return jsonify(result="success"), 200
