import React, { useEffect, useState } from "react";
import { Loader, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Input from "./Input";
import { Option } from "@/types/inputs";
import { Customer } from "@/types/auth";
import axios from "axios";
import { API_BASE_URL } from "@/config/config";
import { useAuth } from "@/contexts/AuthContext";
import CustomSelect from "./SelectInput";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (transaction: {
    type: string;
    transactionDate: string;
    transactionAmount: number;
    accountID: string;
    processedBy: string;
  }) => void;
}

const transactionTypes = ["DEPOSIT", "WITHDRAW"];

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  onAddTransaction,
}) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    type: "",
    amount: "",
    accountID: "",
    employeeID: user.employeeID,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [customerList, setCustomers] = useState<Customer[]>([]);
  const [currCustomer, setCurrCutomer] = useState<Customer>();

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

    setLoading(true);

    try {
   console.log(formData)
      const { data } = await axios.post(
        `${API_BASE_URL}/transaction/create`,
        formData
      );
      const {
        success,
        data: res,
      }: {
        success: boolean;
        data: Customer[];
      } = data;

      if (!success) {
        throw new Error("Unable to fetch customers");
      }


      setFormData({
        type: "",
        amount: "",
        accountID: "",
        employeeID: user.employeeID,
      });
      

      onClose();
    } catch (err){
console.log(err)
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/customer/collector/${user.zoneId}`
        );
        const {
          success,
          data: customers,
        }: {
          success: boolean;
          data: Customer[];
        } = data;

        if (!success) {
          throw new Error("Unable to fetch customers");
        }

        setLoading(false);
        setCustomers(customers);
        const customerOptions: Option[] = customers.map((c) => {
          return {
            value: c.id,
            label: `${c.name} (${c.phone})`,
          };
        });
        setOptions(customerOptions);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchCustomer();
  }, []);

  const handleCustomerID = (id: string) => {
    setFormData((prev) => ({ ...prev, accountID: id }));
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
                          ? type === "Deposit".toUpperCase()
                            ? "bg-emerald-100 text-emerald-800"
                            : type === "Withdraw".toUpperCase()
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
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  className={`w-full p-2 border ${
                    errors.amount
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
              {isLoading && customerList.length == 0 && (
                <div className="mt-14 flex items-center space-x-3 p-4 rounded-xl">
                  <Loader className="w-6 h-6 text-emerald-600 animate-spin" />
                  <p className="text-emerald-800">
                    Checking eligibility status…
                  </p>
                </div>
              )}

              {customerList.length > 0 && (
                <div className="mt-14">
                  <CustomSelect
                    label={"Select the Customer applying for this Loan"}
                    options={options}
                    value={formData.accountID}
                    onChange={handleCustomerID}
                    //   error={"You have to pick a applicant"}
                    required
                  />
                </div>
              )}

              {/* other */}

              <div className="flex justify-end space-x-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isLoading}
                  className="relative px-4 py-2 bg-emerald-800 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
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
