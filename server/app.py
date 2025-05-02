import os
from flask import Flask
from flask_mysqldb import MySQL
from dotenv import load_dotenv
from flask_cors import CORS

mysql = MySQL()

def create_app():
    load_dotenv()
    app = Flask(__name__)

    app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
    app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
    app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
    app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')

    mysql.init_app(app)

    from routes.index import index_bp
    app.register_blueprint(index_bp, url_prefix='/api')

    env = os.getenv('FLASK_ENV', 'development')

    if env == 'production':
        CORS(app, origins=['https://paragaon.vercel.app'])
    else:
        CORS(app)

    return app
