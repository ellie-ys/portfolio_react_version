from azure.storage.blob.models import ContentSettings
from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user import User
from db_connect import db, azure_storage
from io import BytesIO
from json import dumps
from utils.validation import validate_name


profiles = Blueprint('profiles', __name__, url_prefix='/profiles')

@profiles.route('', methods=['POST'])
@jwt_required()
def put_profile():
  
  name = request.form['name']
  if not name:
    return jsonify(message = 'invalid name'), 400
  
  if not validate_name(name):
    return jsonify(message = 'invalid name'), 400

  user_info = get_jwt_identity()
  target_profile = User.query.filter_by(id = user_info['id']).first()
  if 'image' in request.files:
    image_file = request.files['image'].read()
    image_stream = BytesIO(image_file)
    azure_storage.block_blob_service.create_blob_from_stream(container_name='profile-image', blob_name=str(user_info['id']), stream=image_stream, content_settings=ContentSettings(content_type='image'))
    image_name = 'https://racerportfolio.blob.core.windows.net/profile-image/' + str(user_info['id']) 
    target_profile.image = image_name

  
  target_profile.name = request.form['name']
  target_profile.description = request.form['description']
  db.session.commit()
  json_profiles = dumps({
    'name': target_profile.name,
    'description': target_profile.description,
    'image': target_profile.image
  })
  return json_profiles, 200
