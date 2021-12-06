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
        if project['id'] <= 0 :
            newProject = Project(project['name'], project['description'], project['startdate'][:10], project['enddate'][:10], project['url'], project['user_id'])
            db.session.add(newProject)
            db.session.commit()
        else: 
            target_project = Project.query.filter_by(id=project['id']).first()
            target_project.name = project['name']
            target_project.description = project['description']
            target_project.startdate = project['startdate'][:10]
            target_project.enddate = project['enddate'][:10]
            target_project.url = project['url']
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
