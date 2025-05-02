from flask import Blueprint
from controllers.customer_controller import create_customer
from flask import request

customer_bp = Blueprint('customer_bp', __name__)


@customer_bp.route('/create', methods=['POST'])
def create_new_customer():

    data = request.get_json()
    
    return create_customer(data)

