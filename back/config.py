from admin import db_password

SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:'+db_password+'@localhost:3306/elice?charset=utf8'
SQLALCHEMY_TRACK_MODIFICATIONS = False
