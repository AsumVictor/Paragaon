import { Toaster as Sonner, toast } from "sonner"

export type ToasterProps = React.ComponentProps<typeof Sonner>

export interface FormData {
    // Customer info
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    
    // Account info
    username: string;
    password: string;
    confirmPassword: string;
    securityQuestion: string;
    securityAnswer: string;
    agreeToTerms: boolean;
    marketingEmails: boolean;
  }

  export interface FormInputProps {
    label: string;
    name: string;
    type: string;
    value: string | boolean;
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

