import uuid
from utils.utils import get_current_date


# Query to create a collateral for a customer 
def apply_collateral(customer_id, collateral_type_id, value, description, added_by):
    collateral_id = str(uuid.uuid4()).replace("-", "_")

    res = f"""
    INSERT INTO Collateral (
        collateralID, customerID, collateralTypeID, value, description, addedBy, addedOn
    ) VALUES (
        '{collateral_id}', '{customer_id}', '{collateral_type_id}', {value}, '{description}', '{added_by}', '{get_current_date()}'
    );
    """
    return res

# Query to create a new loan application
def apply_for_loan(customer_id, loan_type_id, amount, collateral_id, applied_by, issued_by):
    loan_id = str(uuid.uuid4()).replace("-", "_")

    res = f"""
    START TRANSACTION;

    -- Check if customer has unsettled loans
    SELECT COUNT(*) AS activeLoans
    FROM Loan
    WHERE customerID = '{customer_id}' AND loanStatus != 'SETTLED';

    -- Check if collateral value is at least 70% of the requested loan
    SELECT value
    FROM Collateral
    WHERE collateralID = '{collateral_id}' AND value >= 0.7 * {amount};

    -- If checks pass, insert the loan
    INSERT INTO Loan (
        loanID, loanTypeID, approvalDate, approvedBy, loanAmount, loanStatus,
        customerID, collateralID, amountSettled, outstandingAmount, issuedBy, applicationDate
    )
    VALUES (
        '{loan_id}', '{loan_type_id}', '{get_current_date()}', '{applied_by}', {amount},
        'PENDING', '{customer_id}', '{collateral_id}', 0.0, {amount}, '{issued_by}', '{get_current_date()}'
    );

    COMMIT;
    """
    return res

# Query to get all people who owe loans with their details for a specific zone
def owing_customers_by_zone(zone_id):
    res = f"""
    SELECT 
        c.customerID,
        CONCAT(c.firstName, ' ', c.lastName) AS fullName,
        l.loanAmount,
        l.outstandingAmount,
        l.loanStatus,
        z.zoneName
    FROM Loan l
    INNER JOIN Customer c ON l.customerID = c.customerID
    INNER JOIN Zone z ON c.zoneID = z.zoneID
    WHERE l.loanStatus != 'SETTLED' AND c.zoneID = '{zone_id}'
    ORDER BY l.outstandingAmount DESC;
    """
    return res

# Query to process loan repayment
def process_loan_repayment(loan_id, amount_paid, penalty_paid, employee_id):
    repayment_id = str(uuid.uuid4()).replace("-", "_")

    res = f"""
    START TRANSACTION;

    -- Insert repayment
    INSERT INTO LoanRepayment (
        repaymentID, amountPaid, paymentDate, penaltyPaid, loanID, employeeID
    ) VALUES (
        '{repayment_id}', {amount_paid}, '{get_current_date()}', {penalty_paid}, '{loan_id}', '{employee_id}'
    );

    -- Update outstanding and settled amount
    UPDATE Loan
    SET 
        amountSettled = amountSettled + {amount_paid},
        outstandingAmount = outstandingAmount - {amount_paid},
        loanStatus = CASE 
            WHEN outstandingAmount - {amount_paid} <= 0 THEN 'SETTLED'
            ELSE loanStatus
        END
    WHERE loanID = '{loan_id}';

    COMMIT;
    """
    return res

# Query to get all loans for a specific customer We can use it for the credit managers if they want to see all loans for a specific customer
def get_loans_by_customer(customer_id):
    res = f"""
    SELECT 
        l.loanID,
        lt.loanTypeName,
        l.loanAmount,
        l.amountSettled,
        l.outstandingAmount,
        l.loanStatus,
        l.applicationDate
    FROM Loan l
    INNER JOIN LoanType lt ON l.loanTypeID = lt.loanTypeID
    WHERE l.customerID = '{customer_id}'
    ORDER BY l.applicationDate DESC;
    """
    return res

# Query to get all disbursed loans with their details and the employee who issued them It is a VIEW in the database

def get_all_disbursed_loans():
    return "SELECT * FROM DisbursedLoans ORDER BY approvalDate DESC;"


# Similar to the above but for all loans in a specific zone settled or not
def get_all_loans_by_zone(zone_id):
    res = f"""
    SELECT 
        l.loanID,
        CONCAT(c.firstName, ' ', c.lastName) AS customerName,
        l.loanAmount,
        l.amountSettled,
        l.outstandingAmount,
        l.loanStatus,
        lt.loanTypeName,
        z.zoneName,
        l.approvalDate
    FROM Loan l
    INNER JOIN Customer c ON l.customerID = c.customerID
    INNER JOIN Zone z ON c.zoneID = z.zoneID
    WHERE c.zoneID = '{zone_id}'
    ORDER BY l.approvalDate DESC;
    """
    return res
