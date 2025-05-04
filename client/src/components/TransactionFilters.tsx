import React from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { TransactionFilterPeriod } from "@/types/components";

interface TransactionFiltersProps {
  periodFilter: TransactionFilterPeriod;
  typeFilter: string;
  transactionTypes: string[];
  onPeriodChange: (period: TransactionFilterPeriod) => void;
  onTypeChange: (type: string) => void;
}

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  periodFilter,
  typeFilter,
  transactionTypes,
  onPeriodChange,
  onTypeChange,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow p-6 mb-6 backdrop-blur-lg bg-white/90"
    >
      <div className="flex flex-col space-y-6">
        {/* Period Filter */}
        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Period
          </label>
          <div className="flex flex-wrap gap-2">
            {(["all", "today", "week", "month"] as const).map((period) => (
              <motion.button
                key={period}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  periodFilter === period
                    ? "bg-emerald-800 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => onPeriodChange(period)}
              >
                {period === "all"
                  ? "All Time"
                  : period === "today"
                  ? "Today"
                  : period === "week"
                  ? "This Week"
                  : "This Month"}
              </motion.button>
            ))}
          </div>
        </div> */}

        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transaction Type
          </label>
          <div className="flex flex-wrap gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTypeChange("all")}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                typeFilter === "all"
                  ? "bg-emerald-800 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All Types
            </motion.button>
            {transactionTypes.map((type) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onTypeChange(type)}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  typeFilter === type
                    ? type === "Deposit"
                      ? "bg-emerald-100 text-emerald-800"
                      : type === "Withdrawal"
                      ? "bg-red-100 text-red-800"
                      : type === "Transfer"
                      ? "bg-blue-100 text-blue-800"
                      : type === "Bill Payment"
                      ? "bg-purple-100 text-purple-800"
                      : type === "Refund"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-gray-100 text-gray-800"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {type}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TransactionFilters;
