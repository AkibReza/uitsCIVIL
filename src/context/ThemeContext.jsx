import { createContext, useContext, useEffect } from "react";
import { themes } from "../constants/theme";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Always use dark theme
  const isDark = true;
  const currentTheme = themes.dark;

  // Apply dark theme to document root for global styles
  useEffect(() => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, []);

  const value = {
    isDark,
    theme: currentTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
