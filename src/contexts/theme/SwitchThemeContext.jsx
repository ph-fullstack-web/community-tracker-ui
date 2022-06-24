import { createContext, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import createTheme from "@mui/material/styles/createTheme";

import systemTheme, { DARK_DARK, WHITE } from "theme";

const SwitchThemeContext = createContext(null);

const SwitchThemeContextProvider = ({ children }) => {
  let theme;

  const localStorageTheme = window.localStorage.getItem("theme");

  theme = localStorageTheme;

  if (!localStorageTheme) {
    const darkThemeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    theme = "blue";

    if (darkThemeMediaQuery.matches) {
      theme = "dark";
    }
  }

  const [currentTheme, setCurrentTheme] = useState(theme);
  const currentThemePalette = systemTheme.palette[currentTheme];

  const setAndStoreCurrentTheme = (theme) => {
    localStorage.setItem("theme", theme);
    setCurrentTheme(theme);
  };

  const defaultBackground = currentTheme === "dark" ? DARK_DARK : WHITE;

  const extendedTheme = (theme) =>
    createTheme({
      ...systemTheme,
      palette: {
        ...systemTheme.palette,
        background: { default: defaultBackground },
      },
    });

  return (
    <SwitchThemeContext.Provider
      value={{ currentTheme, currentThemePalette, setAndStoreCurrentTheme }}>
      <ThemeProvider theme={systemTheme}>
        <ThemeProvider theme={extendedTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeProvider>
    </SwitchThemeContext.Provider>
  );
};

export { SwitchThemeContext, SwitchThemeContextProvider };
