import Button from "@mui/material/Button";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { useSwitchThemeContext } from "hooks";

const ExportButton = ({ isLoading, rowData, isError, error }) => {
  const { currentTheme, currentThemePalette } = useSwitchThemeContext();
  const contrastingColors =
    currentTheme === "dark"
      ? currentThemePalette.light
      : currentThemePalette.dark;
  return (
    <Button
      variant="outlined"
      startIcon={
        <SaveAltIcon
          sx={{
            color: contrastingColors,
          }}
        />
      }
      sx={{
        borderWidth: 2,
        borderColor: contrastingColors,
        backgroundColor: currentThemePalette.bgPrimary,
        color: currentThemePalette.text,
        "&:hover": {
          borderWidth: 2,
          borderColor: contrastingColors,
          backgroundColor:
            currentTheme === "dark" ? "#293A46 !important" : null,
        },
      }}
      // onClick={handleClick}
    >
      Export
    </Button>
  );
};

export default ExportButton;
