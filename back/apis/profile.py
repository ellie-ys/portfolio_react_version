from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user import User
from db_connect import db

profiles = Blueprint('profiles', __name__, url_prefix='/profiles')

@profiles.route('', methods=['PUT'])
@jwt_required()
def put_profile():
  
  user_info = get_jwt_identity()  
  profile_data = request.get_json()  
  
  target_profile = User.query.filter_by(id = user_info['id']).first()
  target_profile.name = profile_data['name']
  target_profile.description = profile_data['description']
  target_profile.image = profile_data['image']
  db.session.commit()
  
  json_profiles = {
    'name': target_profile.name,
    'description': target_profile.description,
    'image': target_profile.image
  }
  return jsonify(json_profiles), 200
