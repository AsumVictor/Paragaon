from flask import Blueprint, request
from controllers.transaction_controller import *
transaction_bp = Blueprint('transaction_bp', __name__)

@transaction_bp.route('/create', methods=['POST'])
def transaction_data():

    data = request.get_json()
    
    return create_new_transaction(data)
