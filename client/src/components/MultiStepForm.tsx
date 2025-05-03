import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProgressBar from "./MultiProgress";

interface MultiStepFormProps<T> {
  steps: React.ReactNode[];
  initialData: T;
  onSubmit: (data: T) => Promise<void>;
  onComplete?: () => void;
  renderSuccess?: () => React.ReactNode;
  stepLabels: string[]
}

export function MultiStepForm<T>({
  steps,
  initialData,
  onSubmit,
  onComplete,
  renderSuccess,
  stepLabels
}: MultiStepFormProps<T>) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const updateFormData = (newData: Partial<T>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await onSubmit(formData);
      setIsCompleted(true);
      onComplete?.();
    } catch (err) {
      console.error(err);
    } finally {
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
      <ProgressBar currentStep={step + 1} totalSteps={steps.length} stepLabels={stepLabels} />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={formVariants}
          className="px-6 py-8 md:p-10"
        >
          {isCompleted && renderSuccess
            ? renderSuccess()
            : React.cloneElement(steps[step] as React.ReactElement<any>, {
                formData,
                updateFormData,
                nextStep,
                prevStep,
                handleSubmit,
                isLoading,
              })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
