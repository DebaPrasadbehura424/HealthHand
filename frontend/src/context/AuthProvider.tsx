import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import api from "../api/api";

export interface UserData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  photo: string;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  error: string;
  fetchUser: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      // token goes in the header (api interceptor), backend finds the user by id from it
      const { data } = await api.get<UserData>("auth/me");
      setUser(data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        logout(); // token expired or invalid
      } else {
        setError(err.response?.data?.message || "Could not load profile");
      }
    } finally {
      setLoading(false);
    }
  }, [logout]);

  // load once when the app opens
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider value={{ user, loading, error, fetchUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
