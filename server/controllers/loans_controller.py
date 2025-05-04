from flask import jsonify
from queries.loans import *
from queries.index import BASEQUERY


# Apply for a loan
def apply_for_loan(data):
    customer_id = data["customerID"]
    loan_type_id = data["loanTypeID"]
    loan_amount = data["loanAmount"]
    collateral_name = data["collateralName"]
    collateral_value = data["collateralValue"]
    issued_by = data["issuedBy"]

    # Check customer eligibility for a loan
    eligibility_query = is_customer_eligible_for_loan(customer_id)
    eligibility_result = BASEQUERY(eligibility_query)

    if eligibility_result.get("data", [{}])[0].get("eligibilityStatus") != "ELIGIBLE":
        return jsonify({"success": False, "message": "Customer not eligible for a loan", "data": None}), 400

    # Apply for the loan
    query = apply_for_loan_with_collateral(customer_id, loan_type_id, loan_amount, collateral_name, collateral_value, issued_by)
    result = BASEQUERY(query)

    if result.get("success"):
        return jsonify({"success": True, "message": "Loan application submitted", "data": None}), 200
    else:
        return jsonify({"success": False, "message": "Failed to submit loan application", "data": None}), 500


# Approve a loan
def approve_loan(data):
    loan_id = data["loanID"]
    employee_id = data["employeeID"]

    query = approve_loan(loan_id, employee_id)
    result = BASEQUERY(query)

    if result.get("success"):
        return jsonify({"success": True, "message": "Loan approved", "data": None}), 200
    else:
        return jsonify({"success": False, "message": "Failed to approve loan", "data": None}), 500


# Disburse a loan
def disburse_loan(data):
    loan_id = data["loanID"]
    employee_id = data["employeeID"]

    query = disburse_loan(loan_id, employee_id)
    result = BASEQUERY(query)

    if result.get("success"):
        return jsonify({"success": True, "message": "Loan disbursed", "data": None}), 200
    else:
        return jsonify({"success": False, "message": "Failed to disburse loan", "data": None}), 500


# Repay a loan
def repay_loan(data):
    loan_id = data["loanID"]
    amount_paid = data["amountPaid"]
    penalty_paid = data["penaltyPaid"]
    employee_id = data["employeeID"]

    query = loan_repayment(loan_id, amount_paid, penalty_paid, employee_id)
    result = BASEQUERY(query)

    if result.get("success"):
        return jsonify({"success": True, "message": "Loan repayment recorded", "data": None}), 200
    else:
        return jsonify({"success": False, "message": "Failed to record loan repayment", "data": None}), 500


# Get all loan defaulters by zone
def get_defaulters_by_zone(zone_id):
    query = get_loan_defaulters_by_zone(zone_id)
    result = BASEQUERY(query)

    if result.get("success"):
        data = [
            {
                "loanID": row[0],
                "customerID": row[1],
                "loanAmount": row[2],
                "dueAmount": row[3],
                "status": row[4]
            }
            for row in result["data"]
        ]
        return jsonify({"success": True, "message": "Loan defaulters by zone retrieved", "data": data}), 200
    else:
        return jsonify({"success": False, "message": "Failed to fetch loan defaulters", "data": None}), 500


# Get all loans by a customer
def get_loans_by_customer_id(customer_id):
    query = get_customer_loans(customer_id)
    result = BASEQUERY(query)

    if result.get("success"):
        data = [
            {
                "loanID": row[0],
                "loanType": row[1],
                "loanAmount": row[2],
                "disbursementDate": row[3],
                "status": row[4]
            }
            for row in result["data"]
        ]
        return jsonify({"success": True, "message": "Customer loans retrieved", "data": data}), 200
    else:
        return jsonify({"success": False, "message": "Failed to fetch customer loans", "data": None}), 500


# Get all disbursed loans
def get_all_disbursed_loans():
    query = get_all_disbursed_loans()
    result = BASEQUERY(query)

    if result.get("success"):
        data = [
            {
                "loanID": row[0],
                "customerID": row[1],
                "loanAmount": row[2],
                "disbursementDate": row[3],
                "status": row[4]
            }
            for row in result["data"]
        ]
        return jsonify({"success": True, "message": "Disbursed loans retrieved", "data": data}), 200
    else:
        return jsonify({"success": False, "message": "Failed to fetch disbursed loans", "data": None}), 500


# Get all loan defaulters
def get_all_defaulters():
    query = get_all_defaulters()
    result = BASEQUERY(query)

    if result.get("success"):
        data = [
            {
                "loanID": row[0],
                "customerID": row[1],
                "loanAmount": row[2],
                "dueAmount": row[3],
                "status": row[4]
            }
            for row in result["data"]
        ]
        return jsonify({"success": True, "message": "All loan defaulters retrieved", "data": data}), 200
    else:
        return jsonify({"success": False, "message": "Failed to fetch all loan defaulters", "data": None}), 500
