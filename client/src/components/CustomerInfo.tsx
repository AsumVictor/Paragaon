import React, { useState } from "react";
import { motion } from "framer-motion";
import FormInput from "./FormInput";
import { CustomerInfoProps } from "@/types/inputs";

const CustomerInfo: React.FC<CustomerInfoProps> = ({
  formData,
  updateFormData,
  nextStep,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "firstName":
      case "lastName":
        return value.trim() === "" ? "This field is required" : "";
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value)
          ? "Please enter a valid email address"
          : "";
      case "phone":
        const phoneRegex = /^\d{10}$/;
        return value.trim() !== "" && !phoneRegex.test(value.replace(/\D/g, ""))
          ? "Please enter a valid 10-digit phone number"
          : "";
      case "zipCode":
        const zipRegex = /^\d{5}(-\d{4})?$/;
        return value.trim() !== "" && !zipRegex.test(value)
          ? "Please enter a valid ZIP code"
          : "";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });

    // Validate field and update errors
    const errorMessage = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all required fields
    const newErrors: Record<string, string> = {};
    let hasErrors = false;

    ["firstName", "lastName", "email"].forEach((field) => {
      const error = validateField(
        field,
        formData[field as keyof FormData] as string
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
        Customer Information
      </h2>
      <p className="text-gray-600 mb-8">
        Please provide your personal details so we can get to know you better.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          variants={inputVariants}
          custom={0}
          initial="hidden"
          animate="visible"
        >
          <FormInput
            label="First Name"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
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
            label="Last Name"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            required
          />
        </motion.div>

        <motion.div
          variants={inputVariants}
          custom={2}
          initial="hidden"
          animate="visible"
          className="md:col-span-2"
        >
          <FormInput
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
        </motion.div>

        <motion.div
          variants={inputVariants}
          custom={3}
          initial="hidden"
          animate="visible"
        >
          <FormInput
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            placeholder="(123) 456-7890"
          />
        </motion.div>

        <motion.div
          variants={inputVariants}
          custom={4}
          initial="hidden"
          animate="visible"
          className="md:col-span-2"
        >
          <FormInput
            label="Address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
          />
        </motion.div>

        <motion.div
          variants={inputVariants}
          custom={5}
          initial="hidden"
          animate="visible"
        >
          <FormInput
            label="City"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
          />
        </motion.div>

        <motion.div
          variants={inputVariants}
          custom={6}
          initial="hidden"
          animate="visible"
        >
          <FormInput
            label="State"
            name="state"
            type="text"
            value={formData.state}
            onChange={handleChange}
          />
        </motion.div>

        <motion.div
          variants={inputVariants}
          custom={7}
          initial="hidden"
          animate="visible"
        >
          <FormInput
            label="ZIP Code"
            name="zipCode"
            type="text"
            value={formData.zipCode}
            onChange={handleChange}
            error={errors.zipCode}
          />
        </motion.div>
      </div>

      <motion.div
        className="mt-10 flex justify-end"
        variants={inputVariants}
        custom={8}
        initial="hidden"
        animate="visible"
      >
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

export default CustomerInfo;
