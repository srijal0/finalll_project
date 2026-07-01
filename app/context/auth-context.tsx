"use client";


import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { authAPI, User } from "../lib/api";

const TOKEN_KEY = "ecohaven_token";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (
    data: Partial<User>
  ) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount: if token exists, fetch current user from backend
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }
    authAPI
      .getMe()
      .then((res) => setUser(res.user))
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setLoading(false));
  }, []);


  const login = async (email: string, password: string) => {
    try {
      const res = await authAPI.login(email, password);
      localStorage.setItem(TOKEN_KEY, res.token);
      setUser(res.user);
      return { success: true };
    } catch (err: unknown) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Login failed.",
      };
    }
  };

 
  const signup = async (name: string, email: string, password: string) => {
    try {
      const res = await authAPI.signup(name, email, password);
      localStorage.setItem(TOKEN_KEY, res.token);
      setUser(res.user);
      return { success: true };
    } catch (err: unknown) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Signup failed.",
      };
    }
  };

  
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

 
  const updateProfile = async (data: Partial<User>) => {
    try {
      const res = await authAPI.updateProfile(data);
      setUser(res.user);
      return { success: true };
    } catch (err: unknown) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Update failed.",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}