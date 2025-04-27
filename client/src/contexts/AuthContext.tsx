import React, { createContext, useContext, useState, useEffect } from "react";

// Define user roles
export type UserRole = "admin" | "collector" | "risk";

// Define user type
export interface User {
  id: string;
  name: string;
  role: UserRole;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const MOCK_USERS = [
  {
    id: "1",
    email: "admin@paragon.com",
    password: "admin123",
    name: "Shaun E. B.",
    role: "admin" as UserRole,
  },
  {
    id: "2",
    email: "collector@paragon.com",
    password: "collector123",
    name: "Maame Serwaah",
    role: "collector" as UserRole,
  },
  {
    id: "2",
    email: "risk@paragon.com",
    password: "risk123",
    name: "Eldad Opare",
    role: "risk" as UserRole,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);

    //
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = MOCK_USERS.find(
          (u) => u.email === email && u.password === password
        );

        if (foundUser) {
          const userInfo = {
            id: foundUser.id,
            name: foundUser.name,
            role: foundUser.role,
          };
          setUser(userInfo);
          localStorage.setItem("user", JSON.stringify(userInfo));
          resolve({ success: true, message: "Login Sucessfull" });
        } else {
          resolve({
            success: false,
            message: "Email or Password may be wrong",
          });
        }
        setIsLoading(false);
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
