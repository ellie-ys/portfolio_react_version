from flask import request, jsonify, Blueprint, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user import User
from db_connect import db

from PIL import Image
from base64 import b64encode
import os
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
  
  if 'image' in request.files:
    image_file = request.files['image'].read()
    image_save = Image.open(BytesIO(image_file))
    filename = str(user_info['id']) + '.' + image_save.format
    image_save.save(os.path.join(current_app.config['UPLOAD_DIR'], 'media', filename))
    
    target_profile = User.query.filter_by(id = user_info['id']).first()
    target_profile.image = filename
    db.session.commit()



  
  target_profile = User.query.filter_by(id = user_info['id']).first()
  if target_profile.image:
    profile_image = Image.open(os.path.join(current_app.config['UPLOAD_DIR'], 'media', target_profile.image))
    buffered = BytesIO()
    profile_image.save(buffered, format=profile_image.format)
    profile_image_bytes = buffered.getvalue()
    profile_image_base64 = b64encode(profile_image_bytes)
    profile_image_str = profile_image_base64.decode('utf-8')
  
  target_profile.name = request.form['name']
  target_profile.description = request.form['description']
  db.session.commit()
  json_profiles = dumps({
    'name': target_profile.name,
    'description': target_profile.description,
    'image': profile_image_str if target_profile.image else target_profile.image
  })
  return json_profiles, 200
