from flask import Blueprint, request, session
from flask_restful import Resource, Api
from datetime import datetime
from models.license import *
from models.user import User
from db_connect import db

bp = Blueprint('license', __name__)

class License(Resource):
    def get(self, user_id):
        user = User.query.filter_by(id=user_id).one_or_none()
        if user:        
            result = []
            licenses = License.query.filter_by(id=user_id).one_or_none()
        for license in licenses:
            result.append(license.to_dict())
        return {"result":"success", "data":{"licenses": result}}, 200

    def post(self, user_id):
        if user_id == session.get("auth"):
            user = User.query.filter_by(id=user_id).one_or_none()
            name = request.form.get("name")
            agency = request.form.get("agency")
            date = request.form.get("date")

            if request.json:
                name = request.json.get("name")
                agency = request.json.get("agency")
                date = request.json.get("date")

            new_license = License(user_id, name, agency, date)
            db.session.add(new_license)
            db.session.commit()
            return {"result": "success"}, 201

api = Api(bp)

api.add_resource(License, "/elicer/<int:user_id>", "/<int:license_id>")