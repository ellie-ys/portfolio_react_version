from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.certificate import Certificate
from db_connect import db

certificates = Blueprint('certificates', __name__, url_prefix='/api/certificates')

@certificates.route('', methods=['PUT'])
@jwt_required()
def put_certificate():
  
  certificate_data = request.get_json()  
  
  for certificate in certificate_data:
    name = certificate['name']
    agency = certificate['agency']
    date = certificate['date']
    user_id = certificate['user_id']

    if certificate['id'] <= 0 :
      newCertificate = Certificate(name, agency, date, user_id)
      db.session.add(newCertificate)
      db.session.commit()
    else: 
      target_certificate = Certificate.query.filter_by(id=certificate['id']).first()
      target_certificate.name = name
      target_certificate.agency = agency
      target_certificate.date = date
      db.session.commit()

  user_info = get_jwt_identity()  
  certificates = Certificate.query.filter_by(user_id = user_info['id']).all()
  json_certificates = [certificate.as_dict() for certificate in certificates]
  return jsonify(json_certificates), 200


@certificates.route('/delete', methods=['POST'])
@jwt_required()
def delete_certificate():
  
  delete_list = request.get_json()
  for item in delete_list:
    target_certificate = Certificate.query.filter_by(id=item).first()
    db.session.delete(target_certificate)
    db.session.commit()
  
  return jsonify("delete successfully"), 200
