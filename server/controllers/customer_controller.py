from flask import jsonify
from queries.customer_account import create_new_customer_and_account
from queries.index import BASEQUERY

# create a new customer and account


def create_customer(data):
    current_balance = data.get('currentBalance')
    first_name = data.get('firstName')
    initial_deposit = data.get('initial_deposit')
    last_name = data.get('lastName')
    occupation = data.get('occupation')
    phone = data.get('phone')
    zone = data.get('zone')

    query = create_new_customer_and_account(
        current_balance, first_name, initial_deposit, last_name, occupation, phone, zone)

    result = BASEQUERY(query)

    return jsonify({"success": True, "message": "Customer account created", "data": result})
