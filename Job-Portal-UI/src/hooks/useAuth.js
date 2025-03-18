import { useState, useEffect } from "react";
import { checkAuthStatus, login, logout } from "../services/apiService";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    checkAuthStatus().then(setIsAuthenticated);
  }, []);

  const handleLogin = async (email) => {
    try {
      const userData = await login(email);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("email",email);
      setUser(userData);
      setIsAuthenticated(true);
    } catch {
      throw new Error("User not found");
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    setUser(null);
  };

  return { isAuthenticated, user,setUser, handleLogin, handleLogout };
};
