from flask import Blueprint, jsonify,  session, request

from models.award import *
from models.education import *
from models.license import *
from models.project import *
from models.user import *
from templates import *

bp = Blueprint('portfolio', __name__)

@bp.route('/', methods = ['GET'])
def get_portfolio(user_id):
    user = User.query.filter_by(id=user_id).one_or_none()
    
    if user is None:
        return jsonify(result="falied", message="사용자 정보가 없습니다.."), 404
    
    result = {
        "user": user.to_dict(),
        "award":[],
        "education":[],
        "Project":[],
        "license":[],
    }
    user_id = session.get("auth")
    user = User.query.filter(User.id == user_id).first()
    if user is not None:
        # user_data = {
        #     "id" : user.id,
        #     "name" : user.name,
        #     "description": user.description,
        # } 
        # retult['user'].append(user_data)
        result.append(user.to_dict())

    educations = Education.query.filter(Education.user_id == user_id).all()
    if educations is not None:
        for education in educations:
            result.append(education.to_dict())

    awards = Award.query.filter(Award.user_id == user_id).all()
    if awards is not None:
        for award in awards:
            result.append(award.to_dict())

    licenses = License.query.filter(License.user_id == user_id).all()
    if licenses is not None:
        for license in licenses:
            result.append(license.to_dict())

    projects = Project.query.filter(Project.user_id == user_id).all()
    if projects is not None:
        for project in projects:
            result.append(project.to_dict())
    
    return jsonify(result="success", data={"portfolio": result}), 200