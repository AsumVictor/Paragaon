import { MOCK_USERS } from "@/data/demoUsers";
import { AuthContextType, User } from "@/types/auth";
import React, { createContext, useContext, useState, useEffect } from "react";


const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes

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
