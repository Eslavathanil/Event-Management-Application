import { createContext, useContext, useState, useEffect } from "react";
import { mockEvents, mockRegistrations } from "@/lib/mockData";

const AuthContext = createContext(null);

// Set to false when your Express backend is running
const MOCK_MODE = true;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("bellcorp_user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    if (MOCK_MODE) {
      const mockUser = { _id: "u1", name: "Demo User", email, token: "mock-jwt-token" };
      localStorage.setItem("bellcorp_user", JSON.stringify(mockUser));
      setUser(mockUser);
      return mockUser;
    }
    const { authApi } = await import("@/lib/api");
    const data = await authApi.login(email, password);
    localStorage.setItem("bellcorp_user", JSON.stringify(data));
    setUser(data);
    return data;
  };

  const register = async (name, email, password) => {
    if (MOCK_MODE) {
      const mockUser = { _id: "u1", name, email, token: "mock-jwt-token" };
      localStorage.setItem("bellcorp_user", JSON.stringify(mockUser));
      setUser(mockUser);
      return mockUser;
    }
    const { authApi } = await import("@/lib/api");
    const data = await authApi.register(name, email, password);
    localStorage.setItem("bellcorp_user", JSON.stringify(data));
    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("bellcorp_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, MOCK_MODE }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export { MOCK_MODE };
