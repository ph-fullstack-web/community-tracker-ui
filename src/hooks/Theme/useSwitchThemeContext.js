import { useContext } from 'react';
import { SwitchThemeContext } from 'contexts/Theme/SwitchThemeContext';

const useSwitchThemeContext = () => {
  const { currentTheme, currentThemePalette, setAndStoreCurrentTheme } =
    useContext(SwitchThemeContext);

  return { currentTheme, currentThemePalette, setAndStoreCurrentTheme };
};

export default useSwitchThemeContext;
