from db_connect import db

class Award(db.Model):

    __tablename__ = 'award'

    award_id = db.Column(db.Integer, primary_key=True, autoincrement=True) 
    name = db.Column(db.String(45), nullable = False)
    description = db.Column(db.String(45), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete="CASCADE", onupdate="CASCADE"), nullable=False)

    def __init__(self, name, description, user_id):
        self.name = name
        self.description = description
        self.user_id = user_id

    def to_dict(self):
        return {
            "award_id":self.award_id,
            "name":self.name,
            "description": self.description,
        }