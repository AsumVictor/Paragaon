from flask import Blueprint

# Import sub-routes
from routes.zone import zone_bp

index_bp = Blueprint('index_bp', __name__)

# All routes should be here
index_bp.register_blueprint(zone_bp, url_prefix='/zone')

@index_bp.route('/')
def hello():
    return 'Hello from /api!'
