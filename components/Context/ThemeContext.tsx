"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of a theme
interface Theme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use the theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemesProps {
  children: ReactNode;
}

export const Themes: React.FC<ThemesProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>({
    primaryColor: "#0070f3",
    secondaryColor: "#1a202c",
    backgroundColor: "#ff4f59",
    textColor: "#000000",
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
