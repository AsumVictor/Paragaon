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
  export type UserRole = "admin" | "Collector" | "risk";
  
  // Define user type
  export interface User {
    employeeID: string;
    fullName: string;
    role: UserRole;
    zoneId: string
    zoneName: string
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

export interface Customer {
    id: string;
    name: string;
    status: string;
    occupation: string;
    phone: string;
    zone: string;
}[]