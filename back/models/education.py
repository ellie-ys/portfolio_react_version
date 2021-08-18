from db_connect import db


class elice_education(db.Model):

    __tablename__ = 'elice_education'

    edu_id = db.Column(db.Integer, primary_key=True, autoincrement=True) 
    school = db.Column(db.String(255), nullable = False)
    major = db.Column(db.String(255),  nullable = False)
    type = db.Column(db.String(255), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('elice_user.id'), nullable=False)

    def __init__(self, school, major, type):
        self.school = school
        self.major = major
        self.type = type
