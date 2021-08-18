from db_connect import db

class elice_award(db.Model):

    __tablename__ = 'elice_award'

    award_id = db.Column(db.Integer, primary_key=True, autoincrement=True) 
    name = db.Column(db.String(255), nullable = False)
    description = db.Column(db.String(255), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('elice_user.id'), nullable=False)

    def __init__(self, name, description):
        self.name = name
        self.description = description
