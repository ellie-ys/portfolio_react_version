from flask import Blueprint, request, session
from flask_restful import Resource, Api
from db_connect import db
from models.project import *
from models.user import *
from datetime import datetime


bp = Blueprint('project', __name__)

class Project(Resource):
    def get(self, user_id):
        user = User.query.filter_by(id=user_id).one_or_none()
        if user :
            result = []
            projects = Project.query.filter_by(user_id=user_id).all()
        for project in projects:
            result.append(project.to_dict())
        return {"result":"success", "data":{"projects": result}}, 200
    
    def post(self, user_id):
        if user_id == session.get("auth"):
            users = User.query.filter_by(id=user_id).one_or_none()
            if users:
                name = request.form.get("name")
                description = request.form.get("description")
                startdate = request.form.get("startdate")
                enddate = request.form.get("enddate")
            if request.json:
                name = request.json.get("name")
                description = request.json.get("description")
                startdate = request.json.get("startdate")
                enddate = request.json.get("enddate")

            startdate = datetime.strptime(startdate, "%Y-%m-%d")
            enddate = datetime.strptime(enddate, "%Y-%m-%d")
            new_project = Project(user_id, name, description, startdate, enddate)
            db.session.add(new_project)
            db.session.commit()
            return {"result": "success"}, 201

api = Api(bp)

api.add_resource(Project, "/elicer/<int:user_id>", "/<int:project_id>")