// contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token is present in local storage on component mount
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token) => {
    // Set token in local storage
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};