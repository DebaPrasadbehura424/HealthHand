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

export interface ClinicTest {
  _id: string;
  name: string;
  testType: "Blood" | "Urine" | "Stool" | "Other";
  price: number;
  parametersCount: number;
  isPopular: boolean;
}

export interface ClinicData {
  _id: string;
  name: string;
  type: "Clinic" | "Hospital";
  image: string;
  address: string;
  phone: string;
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
  openTime: string;
  closeTime: string;
  homeCollection: boolean;
  lat: number;
  lng: number;
  tests: ClinicTest[];
}

interface AuthContextType {
  user: UserData | null;
  clinics: ClinicData[];
  loading: boolean;
  clinicsLoading: boolean;
  error: string;
  fetchUser: () => Promise<void>;
  fetchClinics: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [clinics, setClinics] = useState<ClinicData[]>([]);
  const [loading, setLoading] = useState(true);
  const [clinicsLoading, setClinicsLoading] = useState(false);
  const [error, setError] = useState("");

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setClinics([]);
  }, []);

  const fetchClinics = useCallback(async () => {
    try {
      setClinicsLoading(true);
      const { data } = await api.get<ClinicData[]>("/clinics/getall_clinics");
      setClinics(data);
    } catch (err) {
      console.error("Could not load clinics", err);
    } finally {
      setClinicsLoading(false);
    }
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
      const { data } = await api.get<UserData>("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data);

      // after the user is loaded, get the clinics
      fetchClinics();
    } catch (err: any) {
      if (err.response?.status === 401) {
        logout();
      } else {
        setError(err.response?.data?.message || "Could not load profile");
      }
    } finally {
      setLoading(false);
    }
  }, [logout, fetchClinics]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        clinics,
        loading,
        clinicsLoading,
        error,
        fetchUser,
        fetchClinics,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
