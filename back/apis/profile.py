from azure.storage.blob.models import ContentSettings
from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user import User
from db_connect import db, azure_storage
from io import BytesIO
from json import dumps
from utils.validation import validate_name
from admin import STORAGE_URL

profiles = Blueprint('profiles', __name__, url_prefix='/api/profiles')

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

    container_client = blob_service_client.get_container_client('profile-image')
    blob_client = container_client.get_blob_client(str(user_info['id']))
    blob_client.upload_blob(image_stream, blob_type="BlockBlob", overwrite=True)

    image_name = image_name = STORAGE_URL + str(user_info['id']) 
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
