import {useContext} from 'react';
import {SwitchThemeContext} from 'contexts/theme/SwitchThemeContext';

const useSwitchThemeContext = () => {
  const {currentTheme, currentThemePalette, setAndStoreCurrentTheme} =
    useContext(SwitchThemeContext);

  return {currentTheme, currentThemePalette, setAndStoreCurrentTheme};
};

export default useSwitchThemeContext;
