from flask import Blueprint

# Import sub-routes
from routes.load import load_bp

index_bp = Blueprint('index_bp', __name__)

# All routes should be here
index_bp.register_blueprint(load_bp, url_prefix='/load')

@index_bp.route('/')
def hello():
    return 'Hello from /api!'
