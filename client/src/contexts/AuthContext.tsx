import { API_BASE_URL } from "@/config/config";
import { MOCK_USERS } from "@/data/demoUsers";
import { AuthContextType, User } from "@/types/auth";
import axios from "axios";
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
    console.log(email, password);
    try {
      const { data } = await axios.post(`${API_BASE_URL}/customer/login`, {
        email,
        password,
      });
      const {
        data: user,
        success,
      }: {
        data: User;
        success: boolean;
      } = data;

      if (!success) {
        throw new Error("Error occured! Try again");
      }

      setIsLoading(false);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      return { success: true, message: "Login sucess" };
    } catch (error) {
      const errMEssage = error.response
        ? error.response?.data?.message
        : error.message;
      setIsLoading(false);
      return { success: false, message: errMEssage };
    }

    
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
