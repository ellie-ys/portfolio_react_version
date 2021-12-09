from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.education import Education
from db_connect import db

edus = Blueprint('edus', __name__, url_prefix='/edus')

@edus.route('', methods=['PUT'])
@jwt_required()
def put_edu():
  
  edu_data = request.get_json()  
  
  for edu in edu_data:
    if edu['id'] <= 0 :
      newEdu = Education(edu['name'], edu['major'], edu['edu_type'], edu['user_id'])
      db.session.add(newEdu)
      db.session.commit()
    else: 
      target_edu = Education.query.filter_by(id=edu['id']).first()
      target_edu.name = edu['name']
      target_edu.major = edu['major']
      target_edu.edu_type = edu['edu_type']
      db.session.commit()

  user_info = get_jwt_identity()  
  edus = Education.query.filter_by(user_id = user_info['id']).all()
  json_edus = [edu.as_dict() for edu in edus]
  
  return jsonify(json_edus), 200


@edus.route('/delete', methods=['POST'])
@jwt_required()
def delete_edu():
  
  delete_list = request.get_json()
  for item in delete_list:
    target_edu = Education.query.filter_by(id=item).first()
    db.session.delete(target_edu)
    db.session.commit()
  
  return jsonify("delete successfully"), 200
