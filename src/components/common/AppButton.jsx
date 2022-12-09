import {Button} from '@mui/material';
import {useSwitchThemeContext} from 'hooks';

const AppButton = ({children, variant, sx: restOfSxProp, ...otherProps}) => {
  const {currentTheme, currentThemePalette} = useSwitchThemeContext();

  return (
    <Button
      variant={variant ? variant : 'contained'}
      sx={{
        backgroundColor:
          currentTheme === 'dark'
            ? 'rgba(20, 20, 20, .6)'
            : currentThemePalette.medium,
        '&:hover': {
          backgroundColor: currentThemePalette.dark,
        },
        ...restOfSxProp,
      }}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default AppButton;
