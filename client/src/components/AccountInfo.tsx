import React, { useState } from "react";
import { motion } from "framer-motion";
import FormInput from "./FormInput";

import { FormData } from "../types/inputs";

interface AccountInfoProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const AccountInfo: React.FC<AccountInfoProps> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: number): string => {
    switch (name) {
      case "initial_deposit":
        return value <= 0 ? "Initial deposit should be more than 50GHC" : "";
      case "currentBalance":
        return value <= 0 || value - formData.initial_deposit > 0
          ? "The Initial deposit should be from the initial deposit and must not be zero "
          : "";
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    updateFormData({ [name]: newValue });

    // Validate field and update errors
    if (type !== "checkbox") {
      const errorMessage = validateField(name, Number(value));
      setErrors((prev) => ({
        ...prev,
        [name]: errorMessage,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all required fields
    const newErrors: Record<string, string> = {};
    let hasErrors = false;

    ["initial_deposit", "currentBalance"].forEach((field) => {
      const error = validateField(
        field,
        formData[field as keyof FormData] as number
      );
      if (error) {
        newErrors[field] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);

    if (!hasErrors) {
      nextStep();
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Account Information
      </h2>
      <p className="text-gray-600 mb-8">
        Create your account credentials and security settings.
      </p>

      <div className="space-y-6">
        <motion.div
          variants={inputVariants}
          custom={0}
          initial="hidden"
          animate="visible"
        >
          <FormInput
            label="Customer Initial deposit"
            name="initial_deposit"
            type="number"
            value={formData.initial_deposit}
            onChange={handleChange}
            error={errors.initial_deposit}
            required
          />
        </motion.div>

        <motion.div
          variants={inputVariants}
          custom={1}
          initial="hidden"
          animate="visible"
        >
          <FormInput
            label="How much has customer reverse to saved as current balance"
            name="currentBalance"
            type="number"
            value={formData.currentBalance}
            onChange={handleChange}
            error={errors.currentBalance}
            required
          />
        </motion.div>
      </div>

      <motion.div
        className="mt-10 flex justify-between"
        variants={inputVariants}
        custom={7}
        initial="hidden"
        animate="visible"
      >
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-300 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Previous
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-emerald-800 text-white rounded-lg shadow-md hover:bg-emerald-700 transition-colors duration-300 flex items-center"
        >
          Next Step
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </motion.div>
    </form>
  );
};

export default AccountInfo;
