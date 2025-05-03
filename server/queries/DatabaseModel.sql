CREATE DATABASE IF NOT EXISTS paragon;
USE paragon;

-- Role table
CREATE TABLE IF NOT EXISTS Role (
    roleID VARCHAR(50) PRIMARY KEY,
    roleTitle VARCHAR(50) NOT NULL,
    roleDescription VARCHAR(255),
    salaryRate DECIMAL(10,2)
);

-- Zone table
CREATE TABLE IF NOT EXISTS Zone (
    zoneID VARCHAR(50) PRIMARY KEY,
    zoneName VARCHAR(255)
);

-- Employee table
CREATE TABLE IF NOT EXISTS Employee (
    employeeID VARCHAR(50) PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    password VARCHAR(255),
    phoneNumber VARCHAR(20),
    email VARCHAR(255) UNIQUE,
    zoneID VARCHAR(50),
    roleID VARCHAR(50),
    dataEmployed DATE,
    FOREIGN KEY (zoneID) REFERENCES Zone(zoneID),
    FOREIGN KEY (roleID) REFERENCES Role(roleID)
);

-- Customer table
CREATE TABLE IF NOT EXISTS Customer (
    customerID VARCHAR(50) PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255),
    phoneNumber VARCHAR(20),
    occupation VARCHAR(255),
    zoneID VARCHAR(50),
    registrationDate DATE,
    FOREIGN KEY (zoneID) REFERENCES Zone(zoneID)
);

-- LoanType table
CREATE TABLE IF NOT EXISTS LoanType (
    loanTypeID VARCHAR(50) PRIMARY KEY,
    loanTypeName VARCHAR(255), name VARCHAR(255),
    value DECIMAL(10,2),
    loanLifespan INT,
    minimumLoanAmount DECIMAL(10,2),
    maximumLoanAmount DECIMAL(10,2),
    loanInterestRate DECIMAL(5,2)
);

-- Collateral table
CREATE TABLE IF NOT EXISTS Collateral (
    collateralID VARCHAR(50) PRIMARY KEY,
   
);

-- Loan table
CREATE TABLE IF NOT EXISTS Loan (
    loanID VARCHAR(50) PRIMARY KEY,
    loanTypeID VARCHAR(50),
    approvalDate DATE,
    approvedBy VARCHAR(50),
    loanAmount DECIMAL(10,2),
    loanStatus ENUM('PENDING', 'APPROVED', 'REJECTED', 'DISBURSED', 'SETTLED'),
    customerID VARCHAR(50),
    collateralID VARCHAR(50),
    amountSettled DECIMAL(10,2),
    outstandingAmount DECIMAL(10,2),
    issuedBy VARCHAR(50),
    applicationDate DATE,
    FOREIGN KEY (loanTypeID) REFERENCES LoanType(loanTypeID),
    FOREIGN KEY (approvedBy) REFERENCES Employee(employeeID),
    FOREIGN KEY (issuedBy) REFERENCES Employee(employeeID),
    FOREIGN KEY (customerID) REFERENCES Customer(customerID),
    FOREIGN KEY (collateralID) REFERENCES Collateral(collateralID)
);

-- LoanRepayment table
CREATE TABLE IF NOT EXISTS LoanRepayment (
    repaymentID VARCHAR(50) PRIMARY KEY,
    amountPaid DECIMAL(10,2),
    paymentDate DATE,
    penaltyPaid DECIMAL(10,2),
    loanID VARCHAR(50),
    employeeID VARCHAR(50),
    FOREIGN KEY (loanID) REFERENCES Loan(loanID),
    FOREIGN KEY (employeeID) REFERENCES Employee(employeeID)
);

-- SavingsAccount table
CREATE TABLE IF NOT EXISTS SavingsAccount (
    savingsAccountID VARCHAR(50) PRIMARY KEY,
    currentBalance DECIMAL(10,2),
    interestRate DECIMAL(5,2),
    customerID VARCHAR(50),
    accountStatus ENUM('ACTIVE', 'FROZEN'),
    FOREIGN KEY (customerID) REFERENCES Customer(customerID)
);

-- TransactionType table
CREATE TABLE IF NOT EXISTS TransactionType (
    transactionTypeID VARCHAR(50) PRIMARY KEY,
    transactionName VARCHAR(100)
);

-- Transaction table
CREATE TABLE IF NOT EXISTS Transaction (
    transactionID VARCHAR(50) PRIMARY KEY,
    transactionTypeID VARCHAR(50),
    transactionDate DATE,
    transactionAmount DECIMAL(10,2),
    savingsAccountID VARCHAR(50),
    processedBy VARCHAR(50),
    FOREIGN KEY (transactionTypeID) REFERENCES TransactionType(transactionTypeID),
    FOREIGN KEY (savingsAccountID) REFERENCES SavingsAccount(savingsAccountID),
    FOREIGN KEY (processedBy) REFERENCES Employee(employeeID)
);
