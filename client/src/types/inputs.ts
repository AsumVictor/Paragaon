import { Toaster as Sonner, toast } from "sonner"

export type ToasterProps = React.ComponentProps<typeof Sonner>

export interface FormData {
    // Customer info
    firstName: string;
    lastName: string;
    phone: string;
    zone: string;
    occupation: string;
    
    // Account info
    initial_deposit: number;
    currentBalance: number;
  }

  export interface FormInputProps {
    label: string;
    name: string;
    type: string;
    value: string | boolean | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
    placeholder?: string;
  }

  export interface CustomerInfoProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
    nextStep: () => void;
  }


  export interface Option {
    value: string;
    label: string;
  }
  
  export interface CustomSelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    label: string;
    error?: string;
    required?: boolean;
  }
  