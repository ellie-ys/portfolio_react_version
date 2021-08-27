from db_connect import db

class User(db.Model):    
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True) 
    email = db.Column(db.String(255), nullable=False,
    unique = True)
    password = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(45), nullable = False)
    description = db.Column(db.String(255))
    image = db.Column(db.String(255))
    

    def __init__(self, email, password, name):
        self.email = email
        self.password = password
        self.name = name

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "description": self.description,
            "image": self.image,
        }
        
    # def as_dict(self):
    #     return {c.name: getattr(self, c.name) for c in self.__table__.columns if (c.name not in ['email', 'password'])}