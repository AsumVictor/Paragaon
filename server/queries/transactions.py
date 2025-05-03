import uuid
from utils.utils import get_current_date



# This is a query that retrieves all transactions made by a specific customer can be used by credit managers when evaluating a customer's creditworthiness.
def get_customer_transactions_view(customer_id):
    res = f""" 
        SELECT 
            t.transactionID,
            t.transactionDate,
            t.transactionAmount,
            tt.transactionName AS transactionType,
            CONCAT(c.firstName, ' ', c.lastName) AS customerName,
            CONCAT(e.firstName, ' ', e.lastName) AS collectorName
        FROM Transaction t
        JOIN TransactionType tt ON t.transactionTypeID = tt.transactionTypeID
        JOIN SavingsAccount sa ON t.savingsAccountID = sa.savingsAccountID
        JOIN Customer c ON sa.customerID = c.customerID
        LEFT JOIN Employee e ON t.processedBy = e.employeeID
        WHERE c.customerID = '{customer_id}' 
        ORDER BY t.transactionDate DESC;

    """
    return res


# A query that retrieves all transactions made by a specific collector. This can be used by the collector to view their own transaction processing history.
def get_transactions_by_collector(collector_employee_id):
    res = f"""
        SELECT 
            t.transactionID,
            t.transactionDate,
            t.transactionAmount,
            tt.transactionName AS transactionType,
            CONCAT(c.firstName, ' ', c.lastName) AS customerName,
            CONCAT(e.firstName, ' ', e.lastName) AS collectorName
        FROM Transaction t
        JOIN TransactionType tt ON t.transactionTypeID = tt.transactionTypeID
        JOIN SavingsAccount sa ON t.savingsAccountID = sa.savingsAccountID
        JOIN Customer c ON sa.customerID = c.customerID
        LEFT JOIN Employee e ON t.processedBy = e.employeeID
        WHERE t.processedBy = '{collector_employee_id}';

    """
    return res

# Query that validates a balance before a withdrawal
def is_balance_sufficient_for_withdrawal(customer_id, amount):
    res = f"""
        SELECT 
            CONCAT(c.firstName, ' ', c.lastName) AS customerName,
            CASE 
                WHEN sa.currentBalance >= {amount} THEN 'SUFFICIENT'
                ELSE 'INSUFFICIENT'
            END AS balanceStatus
        FROM SavingsAccount sa
        JOIN Customer c ON sa.customerID = c.customerID
        WHERE c.customerID = '{customer_id}' AND sa.accountStatus = 'ACTIVE';

    """
    return res

# A Query that performs deposit transaction by a collector
def perform_deposit(collector_employee_id, customer_id, amount):
    transaction_id = str(uuid.uuid4()).replace("-", '_')
    date = get_current_date()
    
    res = f"""
        START TRANSACTION;

        -- Insert transaction
        INSERT INTO Transaction (
            transactionID, transactionDate, transactionAmount, transactionTypeID, savingsAccountID, processedBy
        )
        VALUES (
            '{transaction_id}', '{date}', {amount},
            (SELECT transactionTypeID FROM TransactionType WHERE transactionName = 'Deposit'),
            (SELECT savingsAccountID FROM SavingsAccount WHERE customerID = '{customer_id}' AND accountStatus = 'ACTIVE'),
            '{collector_employee_id}'
        );

        -- Update account balance
        UPDATE SavingsAccount
        SET currentBalance = currentBalance + {amount}
        WHERE customerID = '{customer_id}' AND accountStatus = 'ACTIVE';

        COMMIT;

    """
    return res

# Query for withdrawal transaction by a collector
def perform_withdrawal(collector_employee_id, customer_id, amount):
    transaction_id = str(uuid.uuid4()).replace("-", '_')
    date = get_current_date()

    res = f"""
        START TRANSACTION;

        -- Ensure balance is sufficient and perform withdrawal
        WITH ActiveAccount AS (
            SELECT savingsAccountID, currentBalance
            FROM SavingsAccount
            WHERE customerID = '{customer_id}' AND accountStatus = 'ACTIVE'
        )
        -- Insert withdrawal transaction
        INSERT INTO Transaction (
            transactionID, transactionDate, transactionAmount, transactionTypeID, savingsAccountID, processedBy
        )
        SELECT
            '{transaction_id}', '{date}', {amount},
            (SELECT transactionTypeID FROM TransactionType WHERE transactionName = 'Withdrawal'),
            aa.savingsAccountID,
            '{collector_employee_id}'
        FROM ActiveAccount aa
        WHERE aa.currentBalance >= {amount};

        -- Deduct balance
        UPDATE SavingsAccount
        SET currentBalance = currentBalance - {amount}
        WHERE customerID = '{customer_id}' AND accountStatus = 'ACTIVE';

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
        CONCAT(e.firstName, ' ', e.lastName) AS collectorName,
        CONCAT(c.firstName, ' ', c.lastName) AS customerName,
        t.status
    FROM TransactionHistory t
    INNER JOIN Customer c ON t.customerID = c.customerID
    LEFT JOIN Employee e ON t.collectorEmployeeID = e.employeeID
    WHERE c.zoneID = '{zone_id}';
    """
    return res



