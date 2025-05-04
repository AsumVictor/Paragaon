from flask import jsonify
from queries.index import BASEQUERY
from queries.transactions import *

# Creating a new transaction
def create_transaction(data):
    transactionType = data["type"]
    customerID = data["customerID"]
    amount = data["amount"]
    collectorID = data["collectorID"]


    # Deposit
    if transactionType == "TT001":  # Deposit
        query = perform_deposit(collectorID, customerID, amount)
        result = BASEQUERY(query)
        print(result)
        # if result.get("success"):
        #     return jsonify({"success": True, "message": "Deposit successful", "data": None}), 200
        # else:
        return jsonify({"success": False, "message": "Deposit failed", "data": None}), 400

    # Withdrawals
    elif transactionType == "TT002":  
        check_query = is_balance_sufficient_for_withdrawal(customerID, amount)
        balance_check = BASEQUERY(check_query)
        status = balance_check.get("data", [{}])[0].get("balanceStatus")

        if status != "SUFFICIENT":
            return jsonify({"success": False, "message": "Insufficient balance", "data": None}), 400

        query = perform_withdrawal(collectorID, customerID, amount)
        result = BASEQUERY(query)

        if result.get("success"):
            return jsonify({"success": True, "message": "Withdrawal successful", "data": None}), 200
        else:
            return jsonify({"success": False, "message": "Withdrawal failed", "data": None}), 500

    else:
        return jsonify({"success": False, "message": "Invalid transaction type", "data": None}), 400


# Get all transactions (across all users/zones)

def get_all_transactions():
    query = """
    SELECT 
        t.transactionID,
        t.transactionDate,
        t.amount,
        t.transactionType,
        t.collectorEmployeeID,
        t.customerID,
        t.status
    FROM Transaction t
    ORDER BY t.transactionDate DESC;
    """
    result = BASEQUERY(query)


    transactions = [
        {
            "transactionID": row[0],
            "transactionDate": row[1],
            "amount": row[2],
            "transactionType": row[3],
            "collectorEmployeeID": row[4],
            "customerID": row[5],
            "status": row[6]
        }
        for row in result
    ]
    
    return jsonify({"success": True, "data": transactions}), 200


# Get transactions for a specific customer
def get_transactions_by_customer_id(customer_id):
    query = get_customer_transactions_view(customer_id)
    result = BASEQUERY(query)
    
    if result.get("success"):
        data = [
            {
            "transactionID": row[0],
            "transactionDate": row[1],
            "transactionAmount": row[2],
            "transactionType": row[3],
            "customerName": row[4],
            "collectorName": row[5]
            }
            for row in result["data"]
        ]
        return jsonify({"success": True, "message": "Customer Transactions have successsfully been retrieved", "data": data}), 200
    else:
        return jsonify({"success": False, "message": "Failed to fetch customer transactions", "data": None}), 400


# Get transactions processed by a specific collector
def get_transactions_by_collector(collector_id):
    query = get_transactions_by_collector(collector_id)
    result = BASEQUERY(query)
    
    if result.get("success"):
        data = [
            {
                "transactionID": row[0],
                "transactionDate": row[1],
                "amount": row[2],
                "transactionType": row[3],
                "customerID": row[4],
                "status": row[5]
            }
            for row in result["data"]
        ]
        return jsonify({"success": True, "message": "Collector transactions retrieved", "data": data}), 200
    else:
        return jsonify({"success": False, "message": "Failed to fetch collector transactions", "data": None}), 400


# Get transactions by zone
def get_transactions_by_zone(zone_id):
    query = get_transactions_by_zone(zone_id)
    result = BASEQUERY(query)
    
    if result.get("success"):
        data = [
            {
            "transactionID": row[0],
            "transactionDate": row[1],
            "transactionAmount": row[2],
            "transactionType": row[3],
            "collectorName": row[4],
            "customerName": row[5],
            "status": row[6]
            }
            for row in result["data"]
        ]
        return jsonify({"success": True, "message": "Zone transactions retrieved", "data": data}), 200
    else:
        return jsonify({"success": False, "message": "Failed to fetch zone transactions", "data": None}), 400
