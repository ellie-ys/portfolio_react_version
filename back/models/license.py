from db_connect import db

class License(db.Model):

    __tablename__ = 'license'
    
    license_id = db.Column(db.Integer, primary_key=True, autoincrement=True) 
    name = db.Column(db.String(255), nullable = False)
    agency = db.Column(db.String(20))
    date = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)

    def __init__(self, name, agency, date):
        self.name = name
        self.agency = agency
        self.date = date
