from flask import Blueprint
from controllers.customer_controller import create_customer, login_user, get_customer_by_zone
from flask import request

customer_bp = Blueprint('customer_bp', __name__)


@customer_bp.route('/create', methods=['POST'])
def create_new_customer():

    data = request.get_json()

    return create_customer(data)


@customer_bp.route('/login', methods=['POST'])
def login_customer():

    data = request.get_json()

    return login_user(data)


@customer_bp.route('/collector/<param>', methods=['GET'])
def collector_customer(param):

    return get_customer_by_zone(param)
