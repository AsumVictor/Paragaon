import uuid
from utils.utils import get_current_date



# This is a query to create a new loan application that will be used by collectors
def apply_for_loan(customer_id, loan_type_id, loan_amount, collateral_id, issued_by):
    loan_id = str(uuid.uuid4()).replace("-", '_')
    res = f"""
    START TRANSACTION;

    INSERT INTO Loan (
        loanID, loanTypeID, approvalDate, approvedBy, loanAmount,
        loanStatus, customerID, collateralID, amountSettled,
        outstandingAmount, issuedBy, applicationDate
    ) VALUES (
        '{loan_id}', '{loan_type_id}', NULL, NULL, {loan_amount},
        'PENDING', '{customer_id}', '{collateral_id}', 0,
        {loan_amount}, '{issued_by}', '{get_current_date()}'
    );

    COMMIT;
    """
    return res

# This is a  query that checks to see if a customer has any unsettled loans before applying for a new one
def is_customer_eligible_for_loan(customer_id):
    res = f"""
    SELECT 
        CASE 
            WHEN EXISTS (
                SELECT 1 
                FROM Loan 
                WHERE customerID = '{customer_id}' 
                AND loanStatus IN ('APPROVED', 'DISBURSED')
                AND outstandingAmount > 0
            ) 
            THEN 'INELIGIBLE'
            ELSE 'ELIGIBLE'
        END AS eligibilityStatus;
    """
    return res


# This is a query that sets a loan's satus to be Approved when the customer is eligible for a loan

def approve_loan(loan_id, employee_id):
    res = f"""
    UPDATE Loan
    SET loanStatus = 'APPROVED',
        approvedBy = '{employee_id}',
        approvalDate = '{get_current_date()}'
    WHERE loanID = '{loan_id}' AND loanStatus = 'PENDING';
    """
    return res

# This is a query that actually disburses the loan to the customer's account
def disburse_loan(loan_id, employee_id):
    res = f"""
    START TRANSACTION;

    -- Update loan status
    UPDATE Loan
    SET loanStatus = 'DISBURSED',
        issuedBy = '{employee_id}',
        applicationDate = '{get_current_date()}'
    WHERE loanID = '{loan_id}' AND loanStatus = 'APPROVED';

    -- Update customer's savings account balance
    UPDATE SavingsAccount
    SET currentBalance = currentBalance + (
        SELECT loanAmount FROM Loan WHERE loanID = '{loan_id}'
    )
    WHERE customerID = (
        SELECT customerID FROM Loan WHERE loanID = '{loan_id}'
    );

    COMMIT;
    """
    return res

# This is a query to be used by collectors when processing loan repayments
def loan_repayment(loan_id, amount_paid, penalty_paid, employee_id):
    repayment_id = str(uuid.uuid4()).replace("-", '_')
    res = f"""
    START TRANSACTION;

    -- Insert repayment record
    INSERT INTO LoanRepayment (repaymentID, amountPaid, paymentDate, penaltyPaid, loanID, employeeID)
    VALUES ('{repayment_id}', {amount_paid}, '{get_current_date()}', {penalty_paid}, '{loan_id}', '{employee_id}');

    -- Update settled and outstanding amounts
    UPDATE Loan
    SET amountSettled = amountSettled + {amount_paid},
        outstandingAmount = outstandingAmount - {amount_paid}
    WHERE loanID = '{loan_id}';

    -- Mark as SETTLED if outstanding is zero or less
    UPDATE Loan
    SET loanStatus = 'SETTLED'
    WHERE loanID = '{loan_id}' AND outstandingAmount <= 0;

    COMMIT;
    """
    return res


# Query to get all people who owe loans with their details for a specific zone - This will be used by the collectors
def get_loan_defaulters_by_zone(zone_id):
    res = f"""
    SELECT
        c.customerID,
        CONCAT(c.firstName, ' ', c.lastName) AS fullName,
        c.phoneNumber,
        z.zoneName,
        l.loanID,
        l.loanAmount,
        l.amountSettled,
        l.outstandingAmount,
        l.loanStatus,
        lt.loanTypeName,
        l.approvalDate,
        DATE_ADD(l.approvalDate, INTERVAL lt.loanLifespan MONTH) AS dueDate
    FROM Customer c
    JOIN Loan l ON c.customerID = l.customerID
    JOIN Zone z ON c.zoneID = z.zoneID
    JOIN LoanType lt ON l.loanTypeID = lt.loanTypeID
    WHERE c.zoneID = '{zone_id}'
      AND l.outstandingAmount > 0
      AND l.loanStatus IN ('DISBURSED', 'APPROVED');
    """
    return res

# Query to get all loans a specific customer has applied for
def get_customer_loans(customer_id):
    res = f"""
    SELECT
        l.loanID,
        lt.loanTypeName,
        l.loanAmount,
        l.amountSettled,
        l.outstandingAmount,
        l.loanStatus,
        l.approvalDate,
        l.applicationDate,
        l.collateralID,
        c.firstName AS customerFirstName,
        c.lastName AS customerLastName,
        c.phoneNumber AS customerPhone,
        c.occupation AS customerOccupation
    FROM Loan l
    JOIN LoanType lt ON l.loanTypeID = lt.loanTypeID
    JOIN Customer c ON l.customerID = c.customerID
    WHERE l.customerID = '{customer_id}';
    """
    return res

# Query to get all disbursed loans with their details and the employee who issued them It is a VIEW in the database

def get_all_disbursed_loans():
    return "SELECT * FROM DisbursedLoans ORDER BY approvalDate DESC;"


# This is a query to be used by the credit manahager to get all loans that are unsettled and their details for all zones
def get_all_defaulters():
    res = f"""
    SELECT
        c.customerID,
        CONCAT(c.firstName, ' ', c.lastName) AS fullName,
        c.phoneNumber,
        c.occupation,
        z.zoneName,
        l.loanID,
        l.loanAmount,
        l.amountSettled,
        l.outstandingAmount,
        l.loanStatus,
        lt.loanTypeName,
        DATE_ADD(l.approvalDate, INTERVAL lt.loanLifespan MONTH) AS dueDate
    FROM Loan l
    JOIN Customer c ON l.customerID = c.customerID
    JOIN Zone z ON c.zoneID = z.zoneID
    JOIN LoanType lt ON l.loanTypeID = lt.loanTypeID
    WHERE l.outstandingAmount > 0
    ORDER BY z.zoneName;
    """
    return res



