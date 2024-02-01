import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const initialState = {
  isDarkMode: false,
  toggle: () => {},
  enableDarkMode: (_) => {},
  disableDarkMode: (_) => {},
};

const ThemeContext = createContext(initialState);

export default function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(
    typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("darkMode") || "true")
      ? true
      : false
  );

  const toggle = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  const enableDarkMode = useCallback(() => {
    setIsDarkMode(true);
  }, []);

  const disableDarkMode = useCallback(() => {
    setIsDarkMode(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider
      value={{ isDarkMode, toggle, enableDarkMode, disableDarkMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
