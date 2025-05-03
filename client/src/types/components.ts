import { FormData } from "./inputs";

export interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export interface ReviewInfoProps {
    formData: FormData;
    prevStep: () => void;
    submitForm: () => void;
    isLoading: boolean
  }


  export interface Transaction {
    transactionID: string;
    type: string;
    transactionDate: string;
    transactionAmount: number;
    accountHolder: string;
    processedBy: string;
  }

  export type TransactionFilterPeriod = 'all' | 'today' | 'week' | 'month';