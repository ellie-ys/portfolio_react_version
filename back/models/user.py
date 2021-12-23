from db_connect import db

class User(db.Model):    
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True,  nullable=False) 
    email = db.Column(db.String(45), nullable=False,
    unique = True)
    password = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(45), nullable = False)
    description = db.Column(db.String(255))
    image = db.Column(db.String(256))
    user_type = db.Column(db.Integer, nullable=False)
    

    def __init__(self, email, password, name, user_type):
        self.email = email
        self.password = password
        self.name = name
        self.user_type = user_type
        
        return {c.name: getattr(self, c.name) for c in self.__table__.columns if (c.name not in ['email', 'password', 'user_type'])}