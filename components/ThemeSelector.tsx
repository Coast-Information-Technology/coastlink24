"use client";

import React from "react";
import { useTheme } from "./Context/ThemeContext";
import { Button } from "./ui/button";

const themes = [
  {
    primaryColor: "#0070f3",
    secondaryColor: "#1a202c",
    backgroundColor: "#ffffff",
    textColor: "#000000",
  },
  {
    primaryColor: "#ff6347",
    secondaryColor: "#2f4f4f",
    backgroundColor: "#f0f8ff",
    textColor: "#333333",
  },
  {
    primaryColor: "#4caf50",
    secondaryColor: "#f44336",
    backgroundColor: "#f9f9f9",
    textColor: "#222222",
  },
];

const ThemeSelector = () => {
  const { setTheme } = useTheme();

  const handleThemeChange = (themeIndex: number) => {
    setTheme(themes[themeIndex]);
  };

  return (
    <div>
      <h2>Select a Theme</h2>
      {themes.map((theme, index) => (
        <Button
          key={index}
          onClick={() => handleThemeChange(index)}
          style={{
            backgroundColor: theme.primaryColor,
            color: theme.textColor,
            margin: "0.5rem",
            padding: "0.5rem 1rem",
          }}
        >
          Theme {index + 1}
        </Button>
      ))}
    </div>
  );
};

export default ThemeSelector;
