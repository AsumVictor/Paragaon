from flask import Blueprint

# Import sub-routes
from routes.zone import zone_bp
from routes.customer import customer_bp
from routes.transaction import transaction_bp
from routes.loans import loans_bp
 
index_bp = Blueprint('index_bp', __name__)

# All routes should be here
index_bp.register_blueprint(zone_bp, url_prefix='/zone')
index_bp.register_blueprint(customer_bp, url_prefix='/customer')
index_bp.register_blueprint(transaction_bp, url_prefix='/transaction')
index_bp.register_blueprint(loans_bp, url_prefix='/loans')

@index_bp.route('/')
def hello():
    return 'Hello from /api!'