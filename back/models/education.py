from db_connect import db
from sqlalchemy.orm import relationship, backref

class Education(db.Model):

    __tablename__ = 'education'

    id = db.Column(db.Integer, primary_key=True, nullable=False) 
    school = db.Column(db.String(45), nullable = False)
    major = db.Column(db.String(45),  nullable = False)
    type = db.Column(db.String(45), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete="CASCADE", onupdate="CASCADE"), nullable=False)
    user_education = relationship("User", backref = backref("education", order_by = id))

    def __init__(self, school, major, degree, user_id):
        self.school = school
        self.major = major
        self.type = type
        self.user_id = user_id

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
