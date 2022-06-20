import Button from "@mui/material/Button";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CircularProgress from "@mui/material/CircularProgress";
import { useSwitchThemeContext } from "hooks";

const ExportButton = ({ isLoading, rowData }) => {
  const { currentTheme, currentThemePalette } = useSwitchThemeContext();
  const contrastingColors =
    currentTheme === "dark"
      ? currentThemePalette.light
      : currentThemePalette.medium;
  return (
    <Button
      variant="outlined"
      disabled={!(!isLoading && rowData && rowData.length > 0)}
      startIcon={
        isLoading ? (
          <CircularProgress size="1rem" sx={{ color: "#0000001f" }} />
        ) : (
          <SaveAltIcon />
        )
      }
      sx={{
        borderWidth: 2,
        borderColor: contrastingColors,
        backgroundColor: currentThemePalette.bgPrimary,
        color:
          currentTheme === "dark"
            ? currentThemePalette.light
            : currentThemePalette.dark,
        "&:hover": {
          borderWidth: 2,
          borderColor: contrastingColors,
          backgroundColor:
            currentTheme === "dark" ? "#293A46 !important" : null,
        },
        "&:disabled": {
          borderWidth: 2,
          borderColor:
            currentTheme === "dark" ? currentThemePalette.medium : null,
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
