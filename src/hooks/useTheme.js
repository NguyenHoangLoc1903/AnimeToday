import { useEffect, useState } from "react";
const THEME_KEY = "theme";
const useTheme = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme =
      localStorage.getItem(THEME_KEY);
    return savedTheme === "dark";
  });
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add(
        "dark"
      );
      localStorage.setItem(
        THEME_KEY,
        "dark"
      );
    }
    else {
      document.body.classList.remove(
        "dark"
      );
      localStorage.setItem(
        THEME_KEY,
        "light"
      );
    }
  }, [darkMode]);
  const toggleTheme = () => {
    setDarkMode(
      previous => !previous
    );
  };

  return {
    darkMode,
    toggleTheme,
  };
};

export default useTheme;