import React, { createContext, useContext, useState, useEffect } from "react";
import type { User, AuthContextType, LoginPayload } from "../types/auth.types";
import {
  loginUserApi,
  registerUserApi,
  getSessionUserApi,
  logoutUserApi,
  verifyOtpApi,
} from "../services/auth.service";
import api, { restoreSession } from "../services/api";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check existing session on first load
  useEffect(() => {
    let cancelled = false;

    async function initializeSession() {
      try {
        // Step 1: Get a new access token using the refresh cookie.
        const restored = await restoreSession();

        if (!restored) {
          return;
        }
        const response = await api.get("/auth/me");

        if (!cancelled) {
          setUser(response.data.user);
        }
      } catch {
        if (!cancelled) {
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }
    initializeSession();

    return () => {
      cancelled = true;
    };
  }, []);

  // Inside src/context/AuthContext.tsx
  const login = async (credentials: LoginPayload) => {
    const data = await loginUserApi(credentials);
    if (!data.requiresOtp && data.user) {
      setUser(data.user);
    }
    return data; // Return the response to the caller for further handling
  };

  const verifyOtp = async (tempToken: string, otp: string) => {
    const data = await verifyOtpApi({ tempToken, otp });
    setUser(data.user);
  };

  const register = async (formData: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    const data = await registerUserApi(formData);
    setUser(data.user);
  };

  const logout = async () => {
    await logoutUserApi();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, verifyOtp, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
