export interface AuthFormData {
    email: string;
    password: string;
    rememberMe?: boolean;
  }
  
  export interface FormErrors {
    email?: string;
    password?: string;
    general?: string;
  }
  
  export interface AuthProps {
    onSubmit: (data: AuthFormData) => void;
  }