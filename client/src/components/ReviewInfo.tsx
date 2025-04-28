import React from 'react';
import { motion } from 'framer-motion';
import { ReviewInfoProps } from '@/types/components';

const ReviewInfo: React.FC<ReviewInfoProps> = ({ formData, prevStep, submitForm }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Review Your Information</h2>
      <p className="text-gray-600 mb-8">Please review all information before submitting your account request.</p>
      
      <div className="space-y-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-emerald-50 rounded-xl p-6"
        >
          <motion.h3 variants={itemVariants} className="text-lg font-semibold text-emerald-800 mb-4 border-b border-emerald-200 pb-2">
            Personal Information
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div variants={itemVariants}>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">{formData.firstName} {formData.lastName}</p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="font-medium">{formData.email}</p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-medium">{formData.phone || 'Not provided'}</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="md:col-span-2">
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">
                {formData.address ? 
                  `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}` : 
                  'Not provided'}
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
          <motion.h3 variants={itemVariants} className="text-lg font-semibold text-emerald-800 mb-4 border-b border-emerald-200 pb-2">
            Account Information
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div variants={itemVariants}>
              <p className="text-sm text-gray-500">Username</p>
              <p className="font-medium">{formData.username}</p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <p className="text-sm text-gray-500">Password</p>
              <p className="font-medium">••••••••</p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <p className="text-sm text-gray-500">Security Question</p>
              <p className="font-medium">{formData.securityQuestion}</p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <p className="text-sm text-gray-500">Security Answer</p>
              <p className="font-medium">••••••••</p>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-emerald-50 rounded-xl p-6"
        >
          <motion.h3 variants={itemVariants} className="text-lg font-semibold text-emerald-800 mb-4 border-b border-emerald-200 pb-2">
            Preferences
          </motion.h3>
          
          <motion.div variants={itemVariants} className="mb-2">
            <p className="text-sm text-gray-500">Terms and Conditions</p>
            <p className="font-medium">
              {formData.agreeToTerms ? 'Agreed' : 'Not agreed'}
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <p className="text-sm text-gray-500">Marketing Communications</p>
            <p className="font-medium">
              {formData.marketingEmails ? 'Subscribed' : 'Not subscribed'}
            </p>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.5 } }}
        className="mt-6 text-sm text-gray-500 italic"
      >
        By submitting this form, you confirm that all the information provided is accurate and complete.
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
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
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
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </motion.div>
    </div>
  );
};

export default ReviewInfo;