from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.project import Project
from db_connect import db

projects = Blueprint('projects', __name__, url_prefix='/projects')
@projects.route('', methods=['PUT'])
@jwt_required()
def put_project():

    project_data = request.get_json()  

    for project in project_data:
        name = project['name']
        description = project['description']
        startdate = project['startdate']
        enddate = project['enddate']
        url = project['url']
        user_id = project['user_id']
        if not all([name, description, startdate, enddate, url, user_id]):
            return jsonify(message = "invalid parameters"), 400

        if project['id'] <= 0 :
            newProject = Project(name, description, startdate, enddate, url, user_id)
            db.session.add(newProject)
            db.session.commit()
        else: 
            target_project = Project.query.filter_by(id=project['id']).first()
            target_project.name = name
            target_project.description = description
            target_project.startdate = startdate
            target_project.enddate = enddate
            target_project.url = url

            db.session.commit()

    user_info = get_jwt_identity()  
    projects = Project.query.filter_by(user_id = user_info['id']).all()
    json_projects = [project.as_dict() for project in projects]
    
    return jsonify(json_projects), 200


@projects.route('/delete', methods=['POST'])
@jwt_required()
def delete_project():
    
    delete_list = request.get_json()
    for item in delete_list:
        target_project = Project.query.filter_by(id=item).first()
        db.session.delete(target_project)
        db.session.commit()
    
    return jsonify("delete successfully"), 200
