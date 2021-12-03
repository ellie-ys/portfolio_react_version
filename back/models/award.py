from db_connect import db
from sqlalchemy.orm import backref, relationship
class Award(db.Model):

    __tablename__ = 'award'

    award_id = db.Column(db.Integer, primary_key=True, autoincrement=True) 
    name = db.Column(db.String(45), nullable = False)
    description = db.Column(db.Text())
    user_id = db.Column("User", db.ForeignKey('user.id'))
    userAward = relationship("User", backref=backref("awards", order_by =id))

    def __init__(self, name, description, user_id):
        self.name = name
        self.description = description
        self.user_id = user_id