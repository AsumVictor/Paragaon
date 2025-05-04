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
            tt.transactionName,
            CONCAT(c.firstName, ' ', c.lastName) AS customerFullName
        FROM 
            Transaction t
        JOIN 
            SavingsAccount sa ON t.savingsAccountID = sa.savingsAccountID
        JOIN 
            Customer c ON sa.customerID = c.customerID
        JOIN 
            TransactionType tt ON t.transactionTypeID = tt.transactionTypeID
        WHERE 
            t.processedBy = "{collector_employee_id}";
        """
    return res

# Query that validates a balance before a withdrawal


def is_balance_sufficient_for_withdrawal(customer_id, amount):
    res = f"""
        SELECT 
        CASE 
            WHEN sa.availableBalance >= {amount} THEN 'SUFFICIENT'
            ELSE 'INSUFFICIENT'
        END AS balanceStatus
        FROM SavingsAccount sa
        WHERE sa.customerID = '{customer_id}' 
            AND sa.accountStatus = 'ACTIVE'
        LIMIT 1;
    """
    return res

# A Query that performs deposit transaction by a collector


def perform_deposit(collector_employee_id, customer_id, amount):
    transaction_id = str(uuid.uuid4()).replace("-", '_')
    date = get_current_date()

    res = f"""
        
        START TRANSACTION;

-- Find savings account ID for the customer
SET @account_id = (
    SELECT savingsAccountID
    FROM SavingsAccount
    WHERE customerID = '{customer_id}'
    LIMIT 1
);

-- Insert the transaction
INSERT INTO Transaction (
    transactionID,
    transactionTypeID,
    transactionDate,
    transactionAmount,
    savingsAccountID,
    processedBy
) VALUES ('{transaction_id}', 'TT001', "{date}", {amount}, @account_id, '{collector_employee_id}');

-- Update the savings account balances
UPDATE SavingsAccount
SET currentBalance = currentBalance + {amount},
    availableBalance = availableBalance + {amount}
WHERE savingsAccountID = @account_id;

COMMIT;


    """
    return res

# Query for withdrawal transaction by a collector


def perform_withdrawal(collector_employee_id, customer_id, amount):
    transaction_id = str(uuid.uuid4()).replace("-", '_')
    date = get_current_date()

    res = f"""
        START TRANSACTION;


    SET @account_id = (
        SELECT savingsAccountID
        FROM SavingsAccount
        WHERE customerID = '{customer_id}'
        LIMIT 1
    );

    INSERT INTO Transaction (
        transactionID,
        transactionTypeID,
        transactionDate,
        transactionAmount,
        savingsAccountID,
        processedBy
    ) VALUES ('{transaction_id}', 'TT002', "{date}", {amount}, @account_id, '{collector_employee_id}');

    UPDATE SavingsAccount
    SET currentBalance = currentBalance - {amount},
        availableBalance = availableBalance - {amount}
    WHERE savingsAccountID = @account_id;

    COMMIT;

    """
    return res


# Retrieve all transactions made by a specific zone. This can be used by the admin to view all transactions made in a specific zone.
def get_transactions_by_zone(zone_id):

    query = f"""
    SELECT
        t.transactionID,
        t.transactionDate,
        t.transactionAmount,
        tt.transactionName,
        t.processedBy,
        CONCAT(c.firstName, ' ', c.lastName) AS customerFullName,
        z.zoneName
    FROM Transaction t
    JOIN SavingsAccount sa ON t.savingsAccountID = sa.savingsAccountID
    JOIN Customer c ON sa.customerID = c.customerID
    JOIN Zone z ON c.zoneID = z.zoneID
    JOIN TransactionType tt ON t.transactionTypeID = tt.transactionTypeID
    WHERE z.zoneID = '{zone_id}';
    """
    return query


# Transaction that involes payment of loan
def transaction_loan_repayment_query(
    amount_paid, savings_account_id, employee_id,
    penalty_paid, loan_id
):
    transaction_id = str(uuid.uuid4()).replace("-", '_')
    repayment_id = str(uuid.uuid4()).replace("-", '_')
    date = get_current_date()

    query = f"""
        START TRANSACTION;

        INSERT INTO `Transaction` (
            transactionID, transactionTypeID, transactionDate, transactionAmount,
            savingsAccountID, processedBy
        )
        VALUES (
            '{transaction_id}', 'TT001', '{date}', {amount_paid}, '{savings_account_id}', '{employee_id}'
        );

        INSERT INTO LoanRepayment (
            repaymentID, amountPaid, paymentDate, penaltyPaid, loanID, employeeID
        )
        VALUES (
            '{repayment_id}', {amount_paid}, '{date}', {penalty_paid}, '{loan_id}', '{employee_id}'
        );

        UPDATE Loan
        SET amountSettled = amountSettled + {amount_paid},
            outstandingAmount = outstandingAmount - {amount_paid}
        WHERE loanID = '{loan_id}';

        UPDATE Loan
        SET loanStatus = 'SETTLED'
        WHERE loanID = '{loan_id}' AND outstandingAmount <= 0;

        COMMIT;
    """
    return query


def disbursed_transaction(loan_amount, savings_account_id, employee_id, loan_id
                          ):
    transaction_id = str(uuid.uuid4()).replace("-", '_')
    date = get_current_date()

    query = f"""
        START TRANSACTION;

            INSERT INTO `Transaction` (
                transactionID, transactionTypeID, transactionDate, transactionAmount,
                savingsAccountID, processedBy
            )
            VALUES (
                '{transaction_id}', 'TT001', '{date}', {loan_amount},
                '{savings_account_id}', '{employee_id}'
            );

            UPDATE SavingsAccount
            SET currentBalance = currentBalance + {loan_amount},
                availableBalance = availableBalance + {loan_amount}
            WHERE savingsAccountID = '{savings_account_id}';

            UPDATE Loan
            SET loanStatus = 'DISBURSED'
            WHERE loanID = '{loan_id}';

        COMMIT;
    """
    return query
