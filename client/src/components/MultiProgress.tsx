import React from "react";
import { motion } from "framer-motion";

export interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

const MultiProgress: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  stepLabels,
}) => {
  const progress =
    totalSteps > 1 ? ((currentStep - 1) / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="w-full">
      <div className="relative">
        {/* Progress bar background */}
        <div className="translate-y-[2.3rem] overflow-hidden h-2 mb-4 text-xs flex rounded bg-emerald-200">
          <motion.div
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        {/* Step indicators */}
        <div className="flex justify-between">
          {stepLabels.map((label, index) => {
            const stepNumber = index + 1;
            const isCompleted = currentStep > stepNumber;
            const isActive = currentStep === stepNumber;

            return (
              <div key={stepNumber} className="relative">
                {/* Circle indicator */}
                <motion.div
                  className={`w-8 h-8 rounded-full shadow flex items-center justify-center ${
                    currentStep >= stepNumber
                      ? "bg-emerald-600 text-white"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                  initial={{ scale: 0.8 }}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    backgroundColor:
                      currentStep >= stepNumber ? "#047857" : "#DEF7EC",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {isCompleted ? (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </motion.div>

                {/* Step label */}
                <div
                  className="absolute mt-2 text-md font-[700] text-emerald-800 w-max"
                  style={{
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  {label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MultiProgress;
