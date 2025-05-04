from flask import jsonify
from queries.index import BASEQUERY
from queries.transactions import *

# Creating a new transaction

# Resolved


def create_transaction(data):
    transactionType = data["type"]
    accountID = data["accountID"]
    amount = data["amount"]
    employeeID = data["employeeID"]
    penalty_paid = data["penaltyPaid"]
    loan_id = data["loanID"]

    # Deposit
    if transactionType == "DEPOSIT":  # Deposit
        query = perform_deposit(employeeID, accountID, amount)
        try:
            result = BASEQUERY(query)
            return jsonify({"success": True, "message": "Transaction Successful"}), 200

        except:
            return jsonify({"success": False, "message": "Deposit failed", "data": None}), 400

    # Withdrawals
    elif transactionType == "WITHDRAW":
        check_query = is_balance_sufficient_for_withdrawal(accountID, amount)
        balance_check = BASEQUERY(check_query)[0][0]

        if balance_check != "SUFFICIENT":
            return jsonify({"success": False, "message": "Insufficient balance or Account maybe Inactive", "data": None}), 400

        query = perform_withdrawal(employeeID, accountID, amount)
        try:
            result = BASEQUERY(query)
            print(result)
            return jsonify({"success": True, "message": "Withdrawal successful", "data": None}), 200
        except:
            return jsonify({"success": False, "message": "Withdrawal failed", "data": None}), 400

    elif transactionType == "LOANREPAY":  # Loan
        query = transaction_loan_repayment_query(amount, accountID, employeeID,
                                                 penalty_paid, loan_id)
        try:
            result = BASEQUERY(query)
            return jsonify({"success": True, "message": "Loan Repaid Successfull"}), 200

        except:
            return jsonify({"success": False, "message": "Loan payment failed", "data": None}), 400

    elif transactionType == "DISBURSE":  # Loan
        query = disbursed_transaction(amount, accountID, employeeID, amount)
        try:
            result = BASEQUERY(query)
            return jsonify({"success": True, "message": "Transaction Successful"}), 200

        except:
            return jsonify({"success": False, "message": "Deposit failed", "data": None}), 400
    else:
        return jsonify({"success": False, "message": "Unknown Transaction", "data": None}), 400


# Get all transactions (across all users/zones)

def get_all_transactions():
    query = """
    SELECT
    t.transactionID,
    tt.transactionName,
    t.transactionDate,
    t.transactionAmount,
    t.savingsAccountID,
    CONCAT(c.firstName, ' ', c.lastName) AS accountFullName,
    CONCAT(e.firstName, ' ', e.lastName) AS employeeFullName
    FROM Transaction t
    INNER JOIN TransactionType tt ON t.transactionTypeID = tt.transactionTypeID
    LEFT JOIN Employee e ON t.processedBy = e.employeeID
    INNER JOIN SavingsAccount sa ON t.savingsAccountID = sa.savingsAccountID
    INNER JOIN Customer c ON sa.customerID = c.customerID
    ORDER BY t.transactionDate DESC;
    """
    try:
        results = BASEQUERY(query)
        transactions = [
            {
                'id': row[0],
                'type': row[1],
                'transactionDate': row[2],
                'transactionAmount': float(row[3]),
                'account_id': row[4],
                'accountHolder': row[5],
                'processedBy': row[6]
            }
            for row in results
        ]

        return jsonify({"success": True, "data": transactions}), 200
    except:
        return jsonify({"success": False, "data": ""}), 400


# Get transactions for a specific customer
# Resolved
def get_transactions_by_customer_id(customer_id):
    query = get_customer_transactions_view(customer_id)

    try:
        result = BASEQUERY(query)

        data = [{
                "transactionID": row[0],
                "transactionDate": row[1],
                "transactionAmount": row[2],
                "transactionType": row[3],
                "customerName": row[4],
                "collectorName": row[5]
                } for row in result]

        return jsonify({"success": True, "message": "Customer Transactions have successsfully been retrieved", "data": data}), 200

    except:
        return jsonify({"success": False, "message": "Failed to fetch customer transactions", "data": None}), 400


# Get transactions processed by a specific collector
def get_transactionsCollector(collector_id):
    query = get_transactions_by_collector(collector_id)
    try:
        result = BASEQUERY(query)

        data = [{
                "transactionID": row[0],
                "transactionDate": row[1],
                "transactionAmount": row[2],
                "transactionType": row[3],
                "customerName": row[4],
                } for row in result]

        return jsonify({"success": True, "message": "Success to fetch collector transaction", "data": data}), 200

    except:
        return jsonify({"success": False, "message": "Failed to fetch collector transactions", "data": None}), 400


# Get transactions by zone
# resolved
def get_transactionsZone(zone_id):

    query = get_transactions_by_zone(zone_id)

    try:

        result = BASEQUERY(query)

        transaction = [{
            'transactionID': row[0],
            'transactionDate': row[1],
            'transactionAmount': row[2],
            'type': row[3],
            'processedBy': row[4],
            'accountHolder': row[5],
            'zoneName': row[6]
        } for row in result]

        return jsonify({"success": True, "message": "Zone transactions retrieved", "data": transaction}), 200

    except Exception:

        return jsonify({"success": False, "message": "Failed to fetch zone transactions", "data": None}), 400
