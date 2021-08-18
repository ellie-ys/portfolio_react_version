import os

BASE_DIR = os.path.dirname(__file__) 
# 폴더 구조가 달라져도, 현재 폴더를 가져와 사용가능

SQLALCHEMY_DATABASE_URI = 'sqlite:///{}'.format(os.path.join(BASE_DIR, 'elice.db'))
SQLALCHEMY_TRACK_MODIFICATIONS = False

