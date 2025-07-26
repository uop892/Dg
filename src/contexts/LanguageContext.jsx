// src/contexts/LanguageContext.jsx
import React, { createContext, useContext, useState } from "react";

// Create the context
const LanguageContext = createContext();

// Create a provider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "am" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Export the context and the custom hook
export const useLanguage = () => {
  return useContext(LanguageContext);
};

export { LanguageContext }; // Ensure this line is included
