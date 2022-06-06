import { createContext, useState } from 'react';

const SwitchThemeContext = createContext(null);

const SwitchThemeContextProvider = ({ children }) => {
  let theme;

  const localStorageTheme = window.localStorage.getItem('theme');

  if (localStorageTheme) {
    theme = localStorageTheme;
  } else {
    const darkThemeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );

    if (darkThemeMediaQuery.matches) {
      theme = 'dark';
    } else {
      theme = 'blue';
    }
  }

  const [currentTheme, setCurrentTheme] = useState(theme);

  const setAndStoreCurrentTheme = theme => {
    localStorage.setItem('theme', theme);
    setCurrentTheme(theme);
  };

  return (
    <SwitchThemeContext.Provider
      value={{ currentTheme, setAndStoreCurrentTheme }}>
      {children}
    </SwitchThemeContext.Provider>
  );
};

export { SwitchThemeContext, SwitchThemeContextProvider };
