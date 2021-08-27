from flask import Blueprint, request, session
from flask_restful import Resource, Api
from db_connect import db
from models import *
from models.user import User

bp = Blueprint('award', __name__)

class Award(Resource):
    def get(self, user_id):
        user = User.query.filter_by(id=user_id).one_or_none()
                
        result = []
        awards = Award.query.filter_by(user_id=user.user_id).all()
        for award in awards:
            result.append(award.to_dict())
        return {"result":"success", "data":{"awards": result}}, 200

    def post(self, user_id):
        if user_id != session.get("auth"):
            return {"result": "failed", "message": "권한이 없는 사용자입니다."}, 403

        users = User.query.filter_by(id=user_id).one_or_none()
        if users :
            name = request.form.get("name")
            description = request.form.get("description")
            if request.json:
                name = request.json.get("name")
                description = request.json.get("description")
            newAward = Award(user_id, name, description)
            db.session.add(newAward)
            db.session.commit()
            return {"result": "success"}, 201

api = Api(bp)

api.add_resource(Award, "/elicer/<int:user_id>", "/<int:award_id>")