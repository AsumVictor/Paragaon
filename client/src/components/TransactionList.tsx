import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Transaction } from '@/types/components';
import TransactionItem from './TransactionItem';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white rounded-lg shadow-sm p-8 text-center"
      >
        <p className="text-gray-500">No transactions found matching your criteria.</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-semibold text-gray-800 mb-4"
      >
        Transactions ({transactions.length})
      </motion.h2>
      <AnimatePresence>
        <div className="space-y-2">
          {transactions.map((transaction, index) => (
            <TransactionItem 
              key={transaction.transactionID} 
              transaction={transaction}
              index={index}
            />
          ))}
        </div>
      </AnimatePresence>
    </motion.div>
  );
};

export default TransactionList;