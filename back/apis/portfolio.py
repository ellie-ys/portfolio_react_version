from flask import Blueprint, jsonify
from models.award import *
from models.education import *
from models.license import *
from models.project import *
from models.user import *

bp = Blueprint('portfolio', __name__)

@bp.route("/<int:user_id>", methods=["GET"])
def get_portfolio(user_id):
    user = User.query.filter_by(id=user_id).one_or_none()
    if user is None:
        return jsonify(result="falied", message="존재하지 않는 사용자입니다."), 404
    result = {
        "user": user.to_dict(),
        "awards": [],
        "educations": [],
        "licenses": [],
        "projects": [],
    }

    awards = Award.query.filter_by(user_id=user_id).all()
    educations = Education.query.filter_by(user_id=user_id).all()
    licenses = License.query.filter_by(user_id=user_id).all()
    projects = Project.query.filter_by(user_id=user_id).all()

    for award in awards:
        result["awards"].append(award.to_dict())
    for education in educations:
        result["educations"].append(education.to_dict())
    for license in licenses:
        result["licenses"].append(license.to_dict())
    for project in projects:
        result["projects"].append(project.to_dict())

    return jsonify(result="success", data={"portfolio": result}), 200
