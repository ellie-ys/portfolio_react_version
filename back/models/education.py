from db_connect import db

class Education(db.Model):

    __tablename__ = 'education'

    edu_id = db.Column(db.Integer, primary_key=True, autoincrement=True) 
    school = db.Column(db.String(45), nullable = False)
    major = db.Column(db.String(45),  nullable = False)
    degree = db.Column(db.String(45), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete="CASCADE", onupdate="CASCADE"), nullable=False)

    def __init__(self, school, major, degree, user_id):
        self.school = school
        self.major = major
        self.degree = degree
        self.user_id = user_id

    
    def to_dict(self):
        return {
            "id": self.id,
            "school": self.school,
            "major": self.major,
            "degree": self.degree,
        }