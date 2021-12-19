from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.award import Award
from db_connect import db

awards = Blueprint('awards', __name__, url_prefix='/awards')

@awards.route('', methods=['PUT'])
@jwt_required()
def put_award():
  
  award_data = request.get_json()  
  
  for award in award_data:
    name = award['name']
    description = award['description']
    user_id = award['user_id']
    if not all([name, description, user_id]):
      return jsonify(message = "invalid parameters"), 400

    if award['id'] <= 0 :
      newAward = Award(name, description, user_id)
      db.session.add(newAward)
      db.session.commit()
    else: 
      target_award = Award.query.filter_by(id=award['id']).first()
      target_award.name = name
      target_award.description = description
      db.session.commit()

  user_info = get_jwt_identity()  
  awards = Award.query.filter_by(user_id = user_info['id']).all()
  json_awards = [award.as_dict() for award in awards]
  
  return jsonify(json_awards), 200


@awards.route('/delete', methods=['POST'])
@jwt_required()
def delete_award():
  
  delete_list = request.get_json()
  for item in delete_list:
    target_award = Award.query.filter_by(id=item).first()
    db.session.delete(target_award)
    db.session.commit()
  
  return jsonify("delete successfully"), 200
