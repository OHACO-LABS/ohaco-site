import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "light" | "nebula" | "plasma" | "copper";

export const THEMES: { id: Theme; label: string; dot: string }[] = [
  { id: "dark",   label: "Dark Matter",   dot: "#7c5cff" },
  { id: "light",  label: "Light Studio",  dot: "#4f46e5" },
  { id: "nebula", label: "Nebula Bloom",  dot: "#d946ef" },
  { id: "plasma", label: "Plasma Tide",   dot: "#1de9b6" },
  { id: "copper", label: "Copper Orbit",  dot: "#ff8a4c" },
];

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem("ohaco_theme") as Theme | null;
    return stored && THEMES.some(t => t.id === stored) ? stored : defaultTheme;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    // Keep .dark class for Tailwind dark: variant compatibility
    if (theme === "dark" || theme === "nebula" || theme === "plasma" || theme === "copper") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("ohaco_theme", theme);
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);

  const cycleTheme = () => {
    const idx = THEMES.findIndex(t => t.id === theme);
    const next = THEMES[(idx + 1) % THEMES.length];
    setThemeState(next.id);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
