from db_connect import db


class education(db.Model):

    __tablename__ = 'education'

    edu_id = db.Column(db.Integer, primary_key=True, autoincrement=True) 
    school = db.Column(db.String(45), nullable = False)
    major = db.Column(db.String(45),  nullable = False)
    degree = db.Column(db.String(45), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)

    def __init__(self, school, major, degree):
        self.school = school
        self.major = major
        self.degree = degree
