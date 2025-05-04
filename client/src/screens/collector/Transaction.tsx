import React, { useState, useEffect } from "react";
import { Transaction as t, TransactionFilterPeriod } from "@/types/components";
import TransactionFilters from "@/components/TransactionFilters";
import TransactionList from "@/components/TransactionList";
import AddTransactionModal from "@/components/AddTransactionModal";
import Button from "@/components/Button";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { API_BASE_URL } from "@/config/config";

const SAMPLE_TRANSACTIONS: t[] = [
  {
    transactionID: "txn-001",
    type: "Deposit",
    transactionDate: "2025-04-13T10:30:00",
    transactionAmount: 2500.0,
    accountHolder: "John Smith",
    processedBy: "ATM #1243",
  },
  {
    transactionID: "txn-002",
    type: "Withdrawal",
    transactionDate: "2025-04-12T14:15:00",
    transactionAmount: -350.0,
    accountHolder: "John Smith",
    processedBy: "Mobile App",
  },
  {
    transactionID: "txn-003",
    type: "Transfer",
    transactionDate: "2025-04-10T09:45:00",
    transactionAmount: -1200.0,
    accountHolder: "John Smith",
    processedBy: "Online Banking",
  },
  {
    transactionID: "txn-004",
    type: "Bill Payment",
    transactionDate: "2025-04-05T16:20:00",
    transactionAmount: -89.99,
    accountHolder: "Sarah Johnson",
    processedBy: "Automatic Payment",
  },
  {
    transactionID: "txn-005",
    type: "Deposit",
    transactionDate: "2025-04-01T11:00:00",
    transactionAmount: 1800.0,
    accountHolder: "Sarah Johnson",
    processedBy: "Bank Teller",
  },
  {
    transactionID: "txn-006",
    type: "Refund",
    transactionDate: "2025-03-28T13:40:00",
    transactionAmount: 34.99,
    accountHolder: "Michael Brown",
    processedBy: "Merchant",
  },
];

function Transaction() {
  const [transactions, setTransactions] = useState<t[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<t[]>([]);
  const [transactionTypes, setTransactionTypes] = useState<string[]>([]);
  const [periodFilter, setPeriodFilter] =
    useState<TransactionFilterPeriod>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // check type
    let all_transactions = transactions;
    if (typeFilter != "all") {
      all_transactions = all_transactions.filter((t) => t.type == typeFilter);
    }

    // // Will handle this properly when i'm done
    // if (periodFilter != "all") {
    //   all_transactions = all_transactions.filter((t) => t.type == periodFilter);
    // }

    setFilteredTransactions(all_transactions);
  }, [transactions, periodFilter, typeFilter, setTypeFilter, setPeriodFilter]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/transaction/zone/${user.zoneId}`
      );
      const {
        success,
        data: transactions,
      }: {
        success: boolean;
        data: t[];
      } = data;

      console.log(data);

      if (!success) {
        throw new Error("Unable to fetch customers");
      }

      setLoading(false);
      setTransactions(transactions);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" flex justify-between">
        <p className=" text-black font-extrabold text-2xl pl-4">
          All Transaction
        </p>
        <Button className=" text-2xl" onClick={() => setIsModalOpen(true)}>
          Make a Transaction
        </Button>
      </div>
      {isLoading ? (
        <>
          <p>LOADING TRANSACTIONS..</p>
        </>
      ) : (
        <main className=" py-8">
          <div className="">
            <TransactionFilters
              periodFilter={periodFilter}
              typeFilter={typeFilter}
              transactionTypes={transactionTypes}
              onPeriodChange={setPeriodFilter}
              onTypeChange={setTypeFilter}
            />

            <TransactionList transactions={filteredTransactions} />
          </div>
        </main>
      )}

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          fetchTransactions();
        }}
        onAddTransaction={() => console.log("object")}
      />
    </div>
  );
}

export default Transaction;
