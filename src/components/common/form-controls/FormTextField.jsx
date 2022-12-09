import TextField from '@mui/material/TextField';
import {useSwitchThemeContext} from 'hooks';

const FormTextField = ({sx: restOfSxProp, ...otherProps}) => {
  const {currentTheme, currentThemePalette} = useSwitchThemeContext();
  const themeForDarkOnly = color => (currentTheme === 'dark' ? color : null);

  return (
    <TextField
      sx={{
        input: {
          color: themeForDarkOnly('#FFFFFF'),
          // For input[type=date]'s calendar icon and calendar UI
          colorScheme: themeForDarkOnly('dark'),
        },
        textarea: {
          color: themeForDarkOnly('#FFFFFF'),
        },
        backgroundColor: themeForDarkOnly('rgba(20, 20, 20)'),
        label: {
          color: themeForDarkOnly(currentThemePalette.light),
          borderBottomColor: themeForDarkOnly(currentThemePalette.light),
        },
        '& label.Mui-focused': {
          color: currentTheme === 'dark' ? '#FFFFFF' : currentThemePalette.dark,
        },
        '& .MuiInput-underline:after': {
          borderBottomColor:
            currentTheme === 'dark' ? '#141414' : currentThemePalette.dark,
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor:
              currentTheme === 'dark' ? '#141414' : currentThemePalette.medium,
          },
          '&:hover fieldset': {
            borderColor:
              currentTheme === 'dark' ? '#141414' : currentThemePalette.dark,
          },
          '&.Mui-focused fieldset': {
            borderColor:
              currentTheme === 'dark' ? '#141414' : currentThemePalette.dark,
          },
        },
        ...restOfSxProp,
      }}
      {...otherProps}
    />
  );
};

export default FormTextField;
