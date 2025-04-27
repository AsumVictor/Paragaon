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

  
  // Define user roles
  export type UserRole = "admin" | "collector" | "risk";
  
  // Define user type
  export interface User {
    id: string;
    name: string;
    role: UserRole;
  }
  
  // Define auth context type
  export interface AuthContextType {
    user: User | null;
    login: (
      email: string,
      password: string
    ) => Promise<{ success: boolean; message: string }>;
    logout: () => void;
    isLoading: boolean;
  }