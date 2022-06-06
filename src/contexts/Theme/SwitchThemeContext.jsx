import { createContext, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import systemTheme from 'theme'

const SwitchThemeContext = createContext(null);

const SwitchThemeContextProvider = ({ children }) => {
  let theme;

  const localStorageTheme = window.localStorage.getItem('theme');

  theme = localStorageTheme

  if (!localStorageTheme) {
    const darkThemeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );

    theme = 'blue';

    if (darkThemeMediaQuery.matches) {
      theme = 'dark';
    }
  }

  const [currentTheme, setCurrentTheme] = useState(theme);
  const currentThemePalette = systemTheme.palette[currentTheme];
  
  const setAndStoreCurrentTheme = theme => {
    localStorage.setItem('theme', theme);
    setCurrentTheme(theme);
  };

  return (
    <SwitchThemeContext.Provider
      value={{ currentTheme, currentThemePalette, setAndStoreCurrentTheme }}>
      <ThemeProvider theme={systemTheme}>{children}</ThemeProvider>
    </SwitchThemeContext.Provider>
  );
};

export { SwitchThemeContext, SwitchThemeContextProvider };
