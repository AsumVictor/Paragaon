import React from "react";
// import { formatDate, formatAmount } from '../utils/dateUtils';
import { motion } from "framer-motion";
import { Transaction } from "@/types/components";

interface TransactionItemProps {
  transaction: Transaction;
  index: number;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  index,
}) => {
  const isPositive = transaction.type == "Deposit";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, translateX: 10 }}
      className="bg-white rounded-lg shadow-sm p-4 mb-3 transition-all duration-200 hover:shadow-md border-l-4 border-transparent hover:border-l-emerald-500"
    >
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex-1">
          <div className="flex items-center flex-wrap gap-2">
            <motion.span
              whileHover={{ scale: 1.1 }}
              className={`text-sm font-medium px-3 py-1 rounded-full ${
                transaction.type === "Deposit"
                  ? "bg-emerald-100 text-emerald-800"
                  : transaction.type === "Withdrawal"
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {transaction.type}
            </motion.span>
            <span className="font-medium text-gray-800">
              {transaction.accountHolder}
            </span>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            ID: {transaction.transactionID.slice(0.2)} •{" "}
            {transaction.transactionDate}
          </div>
          <div className="mt-1 text-xs text-gray-400">
            Processed by: Me
          </div>
        </div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="mt-2 md:mt-0 md:ml-4 flex items-center"
        >
          <span
            className={`text-lg font-bold ${
              isPositive ? "text-emerald-600" : "text-red-600"
            }`}
          >
            GHC{" "}
            {isPositive
              ? `${Number(transaction.transactionAmount).toFixed(2)}`
              : `-${Number(transaction.transactionAmount).toFixed(2)}`}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TransactionItem;
