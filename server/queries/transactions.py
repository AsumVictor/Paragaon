import uuid
from utils.utils import get_current_date



# This is a query that retrieves all transactions made by a specific customer can be used by credit managers when evaluating a customer's creditworthiness.
def get_customer_transactions_view(customer_id):
    res = f"""
    SELECT 
        t.transactionID,
        t.transactionDate,
        t.amount,
        t.transactionType,
        t.collectorEmployeeID,
        t.status
    FROM TransactionHistory t
    WHERE t.customerID = '{customer_id}'
    ORDER BY t.transactionDate DESC;
    """
    return res


# A query that retrieves all transactions made by a specific collector. This can be used by the collector to view their own transaction processing history.
def get_transactions_by_collector(collector_employee_id):
    res = f"""
    SELECT 
        t.transactionID,
        t.transactionDate,
        t.amount,
        t.transactionType,
        t.customerID,
        t.status
    FROM TransactionHistory t
    WHERE t.collectorEmployeeID = '{collector_employee_id}';
    """
    return res

# This is a query that allows a collector to perform a transaction on behalf of a customer
def perform_transaction_by_collector(collector_employee_id, customer_id, amount, transaction_type):
    transaction_id = str(uuid.uuid4()).replace("-", '_')
    date = get_current_date()
    
    res = f"""
    START TRANSACTION;

    -- Check if the customer exists and get current balance
    WITH CustomerBalance AS (
        SELECT c.customerID, a.accountID, a.balance
        FROM Customer c
        INNER JOIN Account a ON c.customerID = a.customerID
        WHERE c.customerID = '{customer_id}' AND a.status = 'ACTIVE'
    )

    -- Perform the transaction only if balance is sufficient for withdrawal or it's a deposit
    INSERT INTO TransactionHistory (
        transactionID, transactionDate, amount, transactionType, collectorEmployeeID, customerID, status
    )
    SELECT
        '{transaction_id}', '{date}', {amount}, '{transaction_type}', '{collector_employee_id}', '{customer_id}', 'COMPLETED'
    FROM CustomerBalance cb
    WHERE (
        '{transaction_type}' = 'DEPOSIT'
        OR ('{transaction_type}' = 'Withdrawal' AND {amount} <= cb.balance)
    );

    -- Update balance accordingly only if the above insert went through
    UPDATE Account
    SET balance = CASE
        WHEN '{transaction_type}' = 'Deposit' THEN balance + {amount}
        WHEN '{transaction_type}' = 'Withdrawal' AND {amount} <= balance THEN balance - {amount}
        ELSE balance
    END
    WHERE accountID = (SELECT accountID FROM CustomerBalance)
      AND EXISTS (
        SELECT 1 FROM TransactionHistory WHERE transactionID = '{transaction_id}'
      );

    COMMIT;
    """
    return res

# Retrieve all transactions made by a specific zone. This can be used by the admin to view all transactions made in a specific zone.
def get_transactions_by_zone(zone_id):
    res = f"""
    SELECT 
        t.transactionID,
        t.transactionDate,
        t.amount,
        t.transactionType,
        t.collectorEmployeeID,
        t.customerID,
        t.status
    FROM TransactionHistory t
    INNER JOIN Customer c ON t.customerID = c.customerID
    WHERE c.zoneID = '{zone_id}';
    """
    return res

