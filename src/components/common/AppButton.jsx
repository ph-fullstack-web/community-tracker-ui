import { Button } from "@mui/material";
import { useSwitchThemeContext } from "hooks";

const AppButton = ({ children, sx: restOfSxProp, ...otherProps }) => {
  const { currentTheme, currentThemePalette } = useSwitchThemeContext();

  return (
    <Button
      sx={{
        backgroundColor: currentThemePalette.medium,
        border: currentTheme === "dark" ? `1px solid ${currentThemePalette.light}` : null,
        "&:hover": {
          backgroundColor: currentThemePalette.dark
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
