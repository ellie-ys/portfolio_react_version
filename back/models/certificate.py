from db_connect import db
from sqlalchemy.orm import backref, relationship

class Certificate(db.Model):

    __tablename__ = 'certificate'
    
    id = db.Column(db.Integer, primary_key=True,  nullable=False) 
    name = db.Column(db.String(45), nullable = False)
    agency = db.Column(db.String(45), nullable=False)
    date = db.Column(db.Date, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete="CASCADE", onupdate="CASCADE"), nullable=False)
    user_certificate  = relationship("User", backref=backref("certificates", order_by=id))

    def __init__(self, name, agency, date, user_id):
        self.name = name
        self.agency = agency
        self.date = date
        self.user_id = user_id

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
