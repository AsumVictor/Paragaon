import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomerInfo from "./CustomerInfo";
import AccountInfo from "./AccountInfo";
import { FormData } from "@/types/inputs";
import ReviewInfo from "./ReviewInfo";
import ProgressBar from "./ProgressBar";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "@/config/config";
import { toast } from "sonner";

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    // Customer info
    firstName: "",
    lastName: "",
    phone: "",
    zone: "",
    occupation: "",

    // Account info
    initial_deposit: 0,
    currentBalance: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <CustomerInfo
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <AccountInfo
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <ReviewInfo
            formData={formData}
            prevStep={prevStep}
            submitForm={submitForm}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  const submitForm = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/customer/create`,
        formData
      );

      const { success } = data;
      if (success) {
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          zone: "",
          occupation: "",

          initial_deposit: 0,
          currentBalance: 0,
        });

        // Show success message
        setStep(4);
        setIsLoading(false);
      } else {
        throw new Error("Something Expected occured!");
      }
    } catch (error) {
      toast.error("Error Acocount", {

      });
      setIsLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="px-8 w-full bg-white overflow-hidden pb-10">
      <h1 className="text-black text-2xl md:text-3xl font-bold flex gap-5 items-center">
        <Link
          to=".."
          relative="path"
          className=" text-3xl bg-emerald-800 py-2 px-5 text-white font-[900] rounded-2xl"
        >
          <ArrowLeft />
        </Link>
        <span>Create a new customer account</span>
      </h1>
      <div className="mt-5">
        <ProgressBar currentStep={step} totalSteps={3} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={formVariants}
          className="px-6 py-8 md:p-10"
        >
          {step === 4 ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-emerald-100 rounded-full mx-auto flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Account Created Successfully!
              </h2>
              <p className="text-gray-600 mb-8">
                Thank you for creating an account with us.
              </p>
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 bg-emerald-800 text-white rounded-lg shadow-md hover:bg-emerald-700 transition-colors duration-300"
              >
                Return to Home
              </button>
            </div>
          ) : (
            renderStep()
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MultiStepForm;
