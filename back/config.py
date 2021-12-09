from admin import db_password
from datetime import timedelta


SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:'+db_password+'@localhost:3306/elice?charset=utf8'
SQLALCHEMY_TRACK_MODIFICATIONS = False

expires_access = timedelta(hours=1)
expires_refresh = timedelta(days=30)
