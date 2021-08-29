from db_connect import db

class License(db.Model):

    __tablename__ = 'license'
    
    license_id = db.Column(db.Integer, primary_key=True, autoincrement=True) 
    name = db.Column(db.String(255), nullable = False)
    agency = db.Column(db.String(20))
    date = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete="CASCADE", onupdate="CASCADE"), nullable=False)

    def __init__(self, name, agency, date, user_id):
        self.name = name
        self.agency = agency
        self.date = date
        self.user_id = user_id

    
    def to_dict(self):
        return {
            "license_id": self.license_id,
            "name": self.name,
            "agency": self.organiagencyzation,
            "date": self.date.strftime("%Y-%m-%d"),
        }