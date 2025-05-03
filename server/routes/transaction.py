from flask import Blueprint, request
from controllers.transaction_controller import *
transaction_bp = Blueprint('transaction_bp', __name__)

@transaction_bp.route('/create', methods=['POST'])
def create_new_transaction():
    data = request.get_json()
    return create_transaction(data)


@transaction_bp.route('/', methods=['GET'])
def fetch_all_transactions():
    return get_all_transactions()


@transaction_bp.route('/zone/<zone_id>', methods=['GET'])
def fetch_transactions_by_zone(zone_id):
    return get_transactions_by_zone(zone_id)


@transaction_bp.route('/customer/<customer_id>', methods=['GET'])
def fetch_transactions_by_customer(customer_id):
    return get_transactions_by_customer_id(customer_id)


@transaction_bp.route('/collector/<collector_id>', methods=['GET'])
def fetch_transactions_by_collector(collector_id):
    return get_transactions_by_collector(collector_id)
