from queries.index import BASEQUERY
from flask import jsonify
from queries.transactions import *

# Create a new transaction
def create_new_transaction(data):
    
    transactionType = data["type"]
    customerID = data["customerID"]
    amount = data["amount"]
    collectorID = data["collectorID"]
    
    if transactionType == "TT002":
        # query to get account balance
        # if balance insuc
        # return jsonify({"success": False, "message": "Insu Balance", "data": None}), 400

        # get a withdraw query
        # query = withdrawaQuery(...)
        # result = BASEQUERY(query)
        
        # Transform the output
        return jsonify({"success": False, "message": "Will implement later", "data": None}), 400
    elif transactionType == "TT001":
          
         #query =  perform_transaction_by_collector(collector_employee_id, customer_id, amount, transaction_type)
         ## query = withdrawaQuery(...)
         # result = BASEQUERY(query)
         
         # Transform the output
         # return sucess output
        return jsonify({"success": False, "message": "Will implement later", "data": None}), 400
    else:
        return jsonify({"success": False, "message": "Invalid Transaction Type", "data": None}), 400


