from flask import Blueprint, request
from controllers.loans_controller import *
loans_bp = Blueprint('loans_bp', __name__)


@loans_bp.route('/apply', methods=['POST'])
def apply_loan():
    data = request.get_json()
    return apply_for_loan(data)


@loans_bp.route('/eligibility/<customer_id>', methods=['GET'])
def check_eligibility(customer_id):
    return is_customer_eligible_for_loan(customer_id)


@loans_bp.route('/approve', methods=['POST'])
def approve_customer_loan():
    data = request.get_json()
    return approve_loan(
        loan_id=data['loan_id'],
        employee_id=data['employee_id']
    )


@loans_bp.route('/disburse', methods=['POST'])
def disburse_customer_loan():
    data = request.get_json()
    return disburse_loan(
        loan_id=data['loan_id'],
        employee_id=data['employee_id']
    )


@loans_bp.route('/repayment', methods=['POST'])
def repay_loan():
    data = request.get_json()
    return loan_repayment(
        loan_id=data['loan_id'],
        amount_paid=data['amount_paid'],
        penalty_paid=data['penalty_paid'],
        employee_id=data['employee_id']
    )


@loans_bp.route('/defaulters/zone/<zone_id>', methods=['GET'])
def get_zone_defaulters(zone_id):
    return get_loan_defaulters_by_zone(zone_id)


@loans_bp.route('/defaulters/all', methods=['GET'])
def get_all_loan_defaulters():
    return get_all_defaulters()


@loans_bp.route('/customer/<customer_id>', methods=['GET'])
def get_loans_for_customer(customer_id):
    return get_customer_loans(customer_id)


@loans_bp.route('/disbursed', methods=['GET'])
def get_disbursed_loans():
    return get_all_disbursed_loans()
