from flask import request, jsonify, Blueprint, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity

from models.education import Education
from models.certificate import Certificate
from models.award import Award
from models.user import User
from models.project import Project

from PIL import Image
from base64 import b64encode
import os
import io



posts = Blueprint('posts', __name__, url_prefix='/posts')

@posts.route('', methods=['GET'])
@jwt_required()
def get_portfolio():
  # user_info = get_jwt_identity()
  requested_id = int(request.args.get('user'))
  edus = Education.query.filter_by(user_id = requested_id).all()
  awards = Award.query.filter_by(user_id = requested_id).all()
  projects = Project.query.filter_by(user_id = requested_id).all()
  certificates = Certificate.query.filter_by(user_id = requested_id).all()
  profiles = User.query.filter_by(id = requested_id).first()
  


  if profiles.image:
    profile_image = Image.open(os.path.join(current_app.config['UPLOAD_DIR'], 'media', profiles.image))
    buffered = io.BytesIO()
    profile_image.save(buffered, format=profile_image.format)
    profile_image_bytes = buffered.getvalue()
    profile_image_base64 = b64encode(profile_image_bytes)
    profile_image_str = profile_image_base64.decode('utf-8')
  



  json_edus = [edu.as_dict() for edu in edus]
  json_awards = [award.as_dict() for award in awards]
  json_projects = [project.as_dict() for project in projects]
  json_certificates = [certificate.as_dict() for certificate in certificates]
  
  response_data = {
      'user_id': requested_id,
      'profile': {
        'name': profiles.name,
        'description': profiles.description,
        'image': profile_image_str if profiles.image else profiles.image
      },
    'edus': json_edus,
    'awards': json_awards,
    'projects': json_projects,
    'certificates': json_certificates
  }
  
  return jsonify(response_data), 200