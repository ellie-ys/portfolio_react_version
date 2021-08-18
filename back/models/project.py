from db_connect import db


class elice_project(db.Model):

    __tablename__ = 'elice_project'

    project_id = db.Column(db.Integer, primary_key=True, autoincrement=True) 
    name = db.Column(db.String(255), nullable = False)
    description = db.Column(db.String(255), nullable=False)
    startdate = db.Column(db.String(20), nullable=False)
    enddate = db.Column(db.String(20), nullable=False)
    url = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey('elice_user.id'), nullable=False)


    def __init__(self, name, description, startdate, enddate, url):
        self.name = name
        self.description = description
        self.startdate = startdate
        self.enddate = enddate
        self.url = url