from db_connect import db
from sqlalchemy.orm import relationship, backref

class Education(db.Model):

    __tablename__ = 'education'

    id = db.Column(db.Integer, primary_key=True, nullable=False) 
    name = db.Column(db.String(45), nullable = False)
    major = db.Column(db.String(45),  nullable = False)
    edu_type = db.Column(db.String(45), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete="CASCADE", onupdate="CASCADE"), nullable=False)
    user_edu = relationship("User", backref = backref("education", order_by = id))

    def __init__(self, name, major, edu_type, user_id):
        self.name = name
        self.major = major
        self.edu_type = edu_type
        self.user_id = user_id

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
