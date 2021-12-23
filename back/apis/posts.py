from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity

from models.education import Education
from models.certificate import Certificate
from models.award import Award
from models.user import User
from models.project import Project




posts = Blueprint('posts', __name__, url_prefix='/posts')

@posts.route('', methods=['GET'])
@jwt_required()
def get_portfolio():

  requested_id = int(request.args.get('user'))

  if not requested_id:
    return jsonify(message = "Not found User"), 400

  edus = Education.query.filter_by(user_id = requested_id).all()
  awards = Award.query.filter_by(user_id = requested_id).all()
  projects = Project.query.filter_by(user_id = requested_id).all()
  certificates = Certificate.query.filter_by(user_id = requested_id).all()
  profiles = User.query.filter_by(id = requested_id).first()
  




  json_edus = [edu.as_dict() for edu in edus]
  json_awards = [award.as_dict() for award in awards]
  json_projects = [project.as_dict() for project in projects]
  json_certificates = [certificate.as_dict() for certificate in certificates]
  
  response_data = {
      'user_id': requested_id,
      'profile': {
        'name': profiles.name,
        'description': profiles.description,
        'image': profiles.image
      },
    'edus': json_edus,
    'awards': json_awards,
    'projects': json_projects,
    'certificates': json_certificates
  }
  
  return jsonify(response_data), 200