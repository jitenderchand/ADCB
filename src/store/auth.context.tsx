import { createContext, useState, useEffect } from "react";
import { storeData, getData, removeData, STORAGE_KEYS } from "@/utils/storage";
import { User } from "@supabase/supabase-js";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  setUser: async () => {},
  logout: async () => {},
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from storage on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await getData<User>(STORAGE_KEYS.USER);
        if (storedUser) {
          setUserState(storedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error loading user from storage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const setUser = async (userData: User | null) => {
    console.log("user", userData);
    if (userData) {
      try {
        await storeData(STORAGE_KEYS.USER, userData);
        setUserState(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error storing user:", error);
        throw error;
      }
    } else {
      setUserState(null);
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    try {
      await removeData(STORAGE_KEYS.USER);
      setUserState(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, setUser, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
