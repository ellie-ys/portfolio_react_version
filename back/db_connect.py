from flask_sqlalchemy import SQLAlchemy
from flask_azure_storage import FlaskAzureStorage

db = SQLAlchemy()
azure_storage = FlaskAzureStorage()
