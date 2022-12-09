import {FormControl, InputLabel, Select} from '@mui/material';
import {useSwitchThemeContext} from 'hooks';

const FormSelect = ({
  children,
  FormControlProps,
  InputLabelProps,
  InputLabelChildren,
  SelectProps,
}) => {
  const {currentTheme, currentThemePalette} = useSwitchThemeContext();
  const themeForDarkOnly = color => (currentTheme === 'dark' ? color : null);

  return (
    <FormControl {...FormControlProps}>
      <InputLabel
        sx={{
          color: themeForDarkOnly(currentThemePalette.light),
          '&.Mui-focused': {
            color:
              currentTheme === 'dark' ? '#FFFFFF' : currentThemePalette.dark,
          },
        }}
        {...InputLabelProps}
      >
        {InputLabelChildren}
      </InputLabel>
      <Select
        MenuProps={{
          sx: {
            '& .MuiPaper-root': {
              borderRadius: themeForDarkOnly(1),
              border: themeForDarkOnly(
                `1px solid ${currentThemePalette.light}`
              ),
              backgroundColor: currentThemePalette.bgPrimary,
              color: currentThemePalette.text,
              '& .MuiMenuItem-root:hover': {
                backgroundColor: themeForDarkOnly('#293A46'),
              },
            },
          },
        }}
        sx={{
          color: themeForDarkOnly('#FFFFFF'),
          backgroundColor: themeForDarkOnly(currentThemePalette.medium),
          '& .MuiSvgIcon-root': {
            color:
              currentTheme === 'dark' || currentTheme === 'teal'
                ? '#0a7578 !important'
                : currentThemePalette.dark,
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor:
              currentTheme === 'dark' ? '#FFFFFF' : currentThemePalette.medium,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor:
              currentTheme === 'dark' ? '#FFFFFF' : currentThemePalette.dark,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: `2px solid ${
              currentTheme === 'dark'
                ? currentThemePalette.light
                : currentThemePalette.dark
            }`,
          },
        }}
        {...SelectProps}
      >
        {children}
      </Select>
    </FormControl>
  );
};

export default FormSelect;
