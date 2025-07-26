// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";

// Create the Auth Context
const AuthContext = createContext();

// Create a Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold user data

  const login = (email, password) => {
    // Implement your login logic here
    setUser({ email }); // Replace with actual user data
  };

  const logout = () => {
    // Implement your logout logic here
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook for easier access to the context
export const useAuth = () => {
  return useContext(AuthContext);
};
