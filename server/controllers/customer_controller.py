from flask import jsonify
from queries.customer_account import create_new_customer_and_account, login, customer_by_zone
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


def login_user(data):
    email = data.get('email')
    password = data.get('password')

    query = login(email, password)
    result = BASEQUERY(query)

    if len(result) == 0:
        return jsonify({"success": False, "message": "Invalid Credentials!!! please input a valid credentials", "data": None}), 400

    details = {
        "employeeID": result[0][2],
        "fullName": result[0][3],
        "role": result[0][0],
        "zoneId": result[0][1],
        "zoneName": result[0][4],
    }

    return jsonify({"success": True, "data": details}), 200


def get_customer_by_zone(zone):

    query = customer_by_zone(zone)
    results = BASEQUERY(query)

    details = [
        {
            "id": row[0],
            "status": row[1],
            "phone": row[2],
            "occupation": row[3],
            "zone": row[4],
            "name": row[5]
        }
        for row in results
    ]

    # details = {
    #     "employeeID": result[0][2],
    #     "fullName": result[0][3],
    #     "role": result[0][0],
    #     "zoneId": result[0][1],
    #     "zoneName": result[0][4],
    #     }

    return jsonify({"success": True, "data": details}), 200
