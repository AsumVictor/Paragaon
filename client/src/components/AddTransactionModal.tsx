import React, { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Input from "./Input";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (transaction: {
    type: string;
    transactionDate: string;
    transactionAmount: number;
    accountHolder: string;
    processedBy: string;
  }) => void;
}

const transactionTypes = [
  "To Fund Account",
  "To Withdrawal",
  "To Re-Pay Loan",
  "To Disburse Loan",
];

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  onAddTransaction,
}) => {
  const [formData, setFormData] = useState({
    type: "",
    transactionDate: new Date().toISOString().split("T")[0],
    transactionAmount: "",
    accountHolder: "",
    processedBy: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.type) {
      newErrors.type = "Transaction type is required";
    }

    if (!formData.transactionDate) {
      newErrors.transactionDate = "Transaction date is required";
    }

    if (!formData.transactionAmount) {
      newErrors.transactionAmount = "Transaction amount is required";
    } else if (isNaN(Number(formData.transactionAmount))) {
      newErrors.transactionAmount = "Amount must be a valid number";
    }

    if (!formData.accountHolder) {
      newErrors.accountHolder = "Account holder is required";
    }

    if (!formData.processedBy) {
      newErrors.processedBy = "Processor information is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form
      setFormData({
        type: "",
        transactionDate: new Date().toISOString().split("T")[0],
        transactionAmount: "",
        accountHolder: "",
        processedBy: "",
      });

      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-md transform overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                Add New Transaction
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Transaction Type */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  This Transaction is to?
                </label>
                <div className="flex flex-wrap gap-2">
                  {transactionTypes.map((type) => (
                    <motion.button
                      key={type}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFormData((prev) => ({ ...prev, type }))}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        formData.type === type
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
                {errors.type && (
                  <p className="text-sm text-red-500">{errors.type}</p>
                )}
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <label
                  htmlFor="transactionAmount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Amount
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  id="transactionAmount"
                  name="transactionAmount"
                  value={formData.transactionAmount}
                  onChange={handleChange}
                  placeholder="0.00"
                  className={`w-full p-2 border ${
                    errors.transactionAmount
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition-shadow`}
                />
                {errors.transactionAmount && (
                  <p className="text-sm text-red-500">
                    {errors.transactionAmount}
                  </p>
                )}
              </div>

              {/* Account Holder */}
              <div className="space-y-2">
                <label
                  htmlFor="accountHolder"
                  className="block text-sm font-medium text-gray-700"
                >
                  Account Holder
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  id="accountHolder"
                  name="accountHolder"
                  value={formData.accountHolder}
                  onChange={handleChange}
                  placeholder="Account holder name"
                  className={`w-full p-2 border ${
                    errors.accountHolder ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition-shadow`}
                />
                {errors.accountHolder && (
                  <p className="text-sm text-red-500">{errors.accountHolder}</p>
                )}
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="relative px-4 py-2 bg-emerald-800 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="opacity-0">Add Transaction</span>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    </>
                  ) : (
                    "Add Transaction"
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddTransactionModal;
