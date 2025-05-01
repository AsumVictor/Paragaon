import React from "react";
import { motion } from "framer-motion";
import { ReviewInfoProps } from "@/types/components";

const ReviewInfo: React.FC<ReviewInfoProps> = ({
  formData,
  prevStep,
  submitForm,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Review Your Information
      </h2>
      <p className="text-gray-600 mb-8">
        Please review all information before submitting your account request.
      </p>

      <div className="space-y-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-emerald-50 rounded-xl p-6"
        >
          <motion.h3
            variants={itemVariants}
            className="text-lg font-semibold text-emerald-800 mb-4 border-b border-emerald-200 pb-2"
          >
            Personal Information
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div variants={itemVariants}>
              <p className="text-sm text-gray-500">Customer Full Name</p>
              <p className="font-medium">
                {formData.firstName} {formData.lastName}
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-sm text-gray-500">Customer Ocupation</p>
              <p className="font-medium">{formData.occupation}</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-sm text-gray-500">Customer Phone Number</p>
              <p className="font-medium">{formData.phone || "Not provided"}</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-sm text-gray-500">Customer Zone Location</p>
              <p className="font-medium">{formData.zone || "Not provided"}</p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-emerald-50 rounded-xl p-6"
        >
          <motion.h3
            variants={itemVariants}
            className="text-lg font-semibold text-emerald-800 mb-4 border-b border-emerald-200 pb-2"
          >
            Customer Account Information
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div variants={itemVariants}>
              <p className="text-sm text-gray-500">Customer Initial Deposit</p>
              <p className="font-medium">
                GHC {Number(formData.initial_deposit).toFixed(2)}
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-sm text-gray-500">
                Customer Suggest Current Balance
              </p>
              <p className="font-medium">
                GHC {Number(formData.currentBalance).toFixed(2)}
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-emerald-50 rounded-xl p-6"
        >
          <motion.h3
            variants={itemVariants}
            className="text-lg font-semibold text-emerald-800 mb-4 border-b border-emerald-200 pb-2"
          >
            Customer Agreement
          </motion.h3>

          <motion.div variants={itemVariants} className="mb-2">
            <p className="text-sm text-gray-500">Terms and Conditions</p>
            <p className="font- py-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
              fugit amet quae! Qui itaque aliquam doloribus. Porro explicabo
              earum, quis obcaecati corrupti dolorum neque atque autem,
              accusantium error labore. Veniam?
            </p>
          </motion.div>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.5 } }}
        className="mt-6 text-sm text-gray-500 italic"
      >
        By submitting this form, you confirm that all the information provided
        is accurate and complete.
      </motion.p>

      <motion.div
        className="mt-10 flex justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
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
          type="button"
          onClick={submitForm}
          className="px-6 py-3 bg-emerald-800 text-white rounded-lg shadow-md hover:bg-emerald-700 transition-colors duration-300 flex items-center group"
        >
          Submit
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
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
    </div>
  );
};

export default ReviewInfo;
