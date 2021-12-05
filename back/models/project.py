from db_connect import db
from sqlalchemy.orm import relationship, backref
from datetime import datetime

class Project(db.Model):

    __tablename__ = 'project'

    id = db.Column(db.Integer, primary_key=True, nullable=False) 
    name = db.Column(db.String(45), nullable = False)
    description = db.Column(db.Text(), nullable=False)
    startdate = db.Column(db.Date, nullable=False)
    enddate = db.Column(db.Date, nullable=False)
    url = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    user_project = relationship("User", backref= backref("projects", order_by = id))


    def __init__(self, name, description, startdate, enddate, user_id):
        self.name = name
        self.description = description
        self.startdate = startdate
        self.enddate = enddate
        self.user_id = user_id

    def as_dict(self):
        return dict([[c.name, getattr(self, c.name).strftime('%Y-%m-%d')] if (c.name == 'startdate' or c.name == 'enddate') else [c.name, getattr(self, c.name)] for c in self.__table__.columns])