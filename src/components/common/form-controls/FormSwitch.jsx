import { Switch } from "@mui/material";
import { useSwitchThemeContext } from "hooks";

const FormSwitch = ({ sx: restOfSxProp, ...otherProps }) => {
  const { currentTheme, currentThemePalette } = useSwitchThemeContext();
  const themeForDarkOnly = (color) => (currentTheme === "dark" ? color : null);
  
  return (
    <Switch
      sx={{
        input: {
          color: themeForDarkOnly("#FFFFFF"),
        },
        textarea: {
          color: themeForDarkOnly("#FFFFFF"),
        },
        backgroundColor: themeForDarkOnly(currentThemePalette.medium),
        label: {
          color: themeForDarkOnly(currentThemePalette.light),
          borderBottomColor: themeForDarkOnly(currentThemePalette.light),
        },
        '&.Mui-checked': {
          color: currentThemePalette.main
        },
        '&.Mui-disabled': {
            pointerEvents: 'auto',
            cursor: 'not-allowed',
            '& .MuiSvgIcon-root': {
                color: themeForDarkOnly("#FFFFFF")
            }
        },
        color: currentThemePalette.main,
        ...restOfSxProp,
      }}
      {...otherProps}
    />
  );
};

export default FormSwitch;
