import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FormInput from './FormInput';

import { FormData } from '../types/inputs';

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
  prevStep 
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'username':
        return value.length < 4 ? 'Username must be at least 4 characters' : '';
      case 'password':
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return !passwordRegex.test(value) 
          ? 'Password must be at least 8 characters and include uppercase, lowercase, number and special character' 
          : '';
      case 'confirmPassword':
        return value !== formData.password ? 'Passwords do not match' : '';
      case 'securityQuestion':
      case 'securityAnswer':
        return value.trim() === '' ? 'This field is required' : '';
      default:
        return '';
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    updateFormData({ [name]: newValue });
    
    // Validate field and update errors
    if (type !== 'checkbox') {
      const errorMessage = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: errorMessage
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    const newErrors: Record<string, string> = {};
    let hasErrors = false;
    
    ['username', 'password', 'confirmPassword', 'securityQuestion', 'securityAnswer'].forEach(field => {
      const error = validateField(field, formData[field as keyof FormData] as string);
      if (error) {
        newErrors[field] = error;
        hasErrors = true;
      }
    });
    
    setErrors(newErrors);
    
    if (!hasErrors && formData.agreeToTerms) {
      nextStep();
    } else if (!formData.agreeToTerms) {
      setErrors(prev => ({
        ...prev,
        agreeToTerms: 'You must agree to the terms and conditions'
      }));
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { delay: i * 0.1, duration: 0.3 } 
    })
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Information</h2>
      <p className="text-gray-600 mb-8">Create your account credentials and security settings.</p>
      
      <div className="space-y-6">
        <motion.div
          variants={inputVariants}
          custom={0}
          initial="hidden"
          animate="visible"
        >
          <FormInput
            label="Username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
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
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />
          {!errors.password && formData.password && (
            <div className="mt-2 text-sm text-emerald-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Strong password
            </div>
          )}
        </motion.div>
        
        <motion.div
          variants={inputVariants}
          custom={2}
          initial="hidden"
          animate="visible"
        >
          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
          />
        </motion.div>
        
        <motion.div
          variants={inputVariants}
          custom={3}
          initial="hidden"
          animate="visible"
        >
          <label className="block text-gray-700 font-medium mb-2">
            Security Question
          </label>
          <select
          title='quesion'
            name="securityQuestion"
            value={formData.securityQuestion}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.securityQuestion ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
            required
          >
            <option value="">Select a security question</option>
            <option value="What was your first pet's name?">What was your first pet's name?</option>
            <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
            <option value="What city were you born in?">What city were you born in?</option>
            <option value="What is the name of your favorite teacher?">What is the name of your favorite teacher?</option>
          </select>
          {errors.securityQuestion && (
            <p className="mt-1 text-red-500 text-sm">{errors.securityQuestion}</p>
          )}
        </motion.div>
        
        <motion.div
          variants={inputVariants}
          custom={4}
          initial="hidden"
          animate="visible"
        >
          <FormInput
            label="Security Answer"
            name="securityAnswer"
            type="text"
            value={formData.securityAnswer}
            onChange={handleChange}
            error={errors.securityAnswer}
            required
          />
        </motion.div>
        
        <motion.div
          variants={inputVariants}
          custom={5}
          initial="hidden"
          animate="visible"
          className="flex items-start mt-6"
        >
          <div className="flex items-center h-5">
            <input
              id="agreeToTerms"
              name="agreeToTerms"
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
              I agree to the <span className="text-emerald-800 hover:underline cursor-pointer">Terms of Service</span> and <span className="text-emerald-800 hover:underline cursor-pointer">Privacy Policy</span>
            </label>
            {errors.agreeToTerms && (
              <p className="mt-1 text-red-500 text-sm">{errors.agreeToTerms}</p>
            )}
          </div>
        </motion.div>
        
        <motion.div
          variants={inputVariants}
          custom={6}
          initial="hidden"
          animate="visible"
          className="flex items-start"
        >
          <div className="flex items-center h-5">
            <input
              id="marketingEmails"
              name="marketingEmails"
              type="checkbox"
              checked={formData.marketingEmails}
              onChange={handleChange}
              className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="marketingEmails" className="text-sm text-gray-700">
              I would like to receive marketing emails and updates
            </label>
          </div>
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
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Previous
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-emerald-800 text-white rounded-lg shadow-md hover:bg-emerald-700 transition-colors duration-300 flex items-center"
        >
          Next Step
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </motion.div>
    </form>
  );
};

export default AccountInfo;