from flask import Blueprint, request, session, jsonify

from models.award import *
from models.education import *
from models.license import *
from models.project import *
from models.user import User

from db_connect import db

bp = Blueprint('elicer', __name__, url_prefix='/elicer')

@bp.route("/", methods=["GET"])
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

@bp.route("/elicer/<int:user_id>/description", methods=["PATCH"])
def edit_description(user_id):
    if user_id != session.get("auth"):
        return jsonify(result="falied", message="권한이 없는 사용자입니다."), 403

    user = User.query.filter_by(id=user_id).one_or_none()
    if user is None:
        return jsonify(result="failed", message="존재하지 않는 사용자입니다."), 404


    description = request.form.get("description")
    if request.json:
        description = request.json.get("description")

    user = User.query.filter_by(id=user_id).one_or_none()
    user.description = description
    db.session.add(user)
    db.session.commit()

    return jsonify(result="success"), 200