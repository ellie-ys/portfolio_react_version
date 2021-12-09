from db_connect import db

class Token(db.Model):

    __tablename__ = 'token'

    id          = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id     = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    token       = db.Column(db.String(500), nullable=False)

    def __init__(self, user_id, token):
        self.user_id      = user_id
        self.token        = token
