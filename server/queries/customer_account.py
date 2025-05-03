import uuid
from utils.utils import get_current_date

base_interest = 1.1


def create_new_customer_and_account(current_balance, first_name, initial_deposit, last_name, occupation, phone, zone):
    customer_id = "".join(str(uuid.uuid4()).replace("-", '_'))
    account_id = "".join(str(uuid.uuid4()).replace("-", '_'))

    res = f"""
        START TRANSACTION;

        INSERT INTO Customer (customerID, firstName, lastName, phoneNumber, occupation, zoneID, registrationDate) 
        VALUES ('{customer_id}', '{first_name}', '{last_name}', '{phone}', '{occupation}', '{zone}', '{get_current_date()}');

        INSERT INTO SavingsAccount (savingsAccountID, currentBalance, interestRate, customerID, accountStatus, availableBalance)
        VALUES ('{account_id}', {initial_deposit}, {base_interest}, '{customer_id}', 'ACTIVE', {current_balance});

        COMMIT;
        """
    return res


def login(email, password):
    res = f"""
    SELECT 
    r.roleTitle AS jobTitle,
    e.zoneID,
    e.employeeID AS customerID,
    CONCAT(e.firstName, ' ', e.lastName) AS fullName,
    z.zoneName
    FROM Employee e
    JOIN Role r ON e.roleID = r.roleID
    LEFT JOIN Zone z ON e.zoneID = z.zoneID
    WHERE e.email = '{email}' AND e.password = '{password}';

    """

    return res


def customer_by_zone(zoneId):
    res = f"""
    
        SELECT 
        c.customerID,
        sa.accountStatus,
        c.phoneNumber,
        c.occupation,
        z.zoneName,
        CONCAT(c.firstName, ' ', c.lastName) AS fullName
        FROM Customer c
        LEFT JOIN SavingsAccount sa ON c.customerID = sa.customerID
        INNER JOIN Zone z ON c.zoneID = z.zoneID
        WHERE c.zoneID = '{zoneId}';
    """
    
    return res
