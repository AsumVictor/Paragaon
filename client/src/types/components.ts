import { FormData } from "./inputs";

export interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export interface ReviewInfoProps {
    formData: FormData;
    prevStep: () => void;
    submitForm: () => void;
  }