import os
from admin import db_password
import pymysql

#폴더 구조가 달라져도 현재 폴더 가져와서 사용
BASE_DIR = os.path.dirname(__file__)

SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:'+db_password+'@localhost:3306/elice?charset=utf8'
SQLALCHEMY_TRACK_MODIFICATIONS = False
