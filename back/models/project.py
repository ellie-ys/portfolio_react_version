from db_connect import db


class Project(db.Model):

    __tablename__ = 'project'

    project_id = db.Column(db.Integer, primary_key=True, autoincrement=True) 
    name = db.Column(db.String(45), nullable = False)
    description = db.Column(db.String(255), nullable=False)
    startdate = db.Column(db.String(20), nullable=False)
    enddate = db.Column(db.String(20), nullable=False)
    url = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete="CASCADE", onupdate="CASCADE"), nullable=False)


    def __init__(self, name, description, startdate, enddate, url, user_id):
        self.name = name
        self.description = description
        self.startdate = startdate
        self.enddate = enddate
        self.url = url
        self.user_id = user_id

        
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "startdate": self.startdate.strftime("%Y-%m-%d"),
            "enddate": self.enddate.strftime("%Y-%m-%d"),
        }