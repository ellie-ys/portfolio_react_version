from flask import Blueprint, request, session
from flask_restful import Resource, Api
from db_connect import db
from models.education import *
from models.user import *

bp = Blueprint('education', __name__)

class Education(Resource):
    def get(self, user_id):
        user = User.query.filter_by(id=user_id).one_or_none()
        if user :      
            result = []
            educations = Education.query.filter_by(id=user_id).one_or_none()
            for education in educations:
                result.append(education.to_dict())
            return {"result":"success", "data":{"educations": result}}, 200

    
    def post(self, user_id):
        user = User.query.filter_by(id=user_id).one_or_none()
        school = request.form.get("school")
        major = request.form.get("major")
        degree = request.form.get("degree")

        if request.json:
            school = request.json.get("school")
            major = request.json.get("major")
            degree = request.json.get("degree")

        new_education = Education(user_id, school, major, degree)
        db.session.add(new_education)
        db.session.commit()
        return {"result": "success"}, 201
    
api = Api(bp)

api.add_resource(Education, "/elicer/<int:user_id>", "/<int:education_id>")