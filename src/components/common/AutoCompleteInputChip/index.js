import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import FormTextField from "../form-controls/FormTextField";
import { useSwitchThemeContext } from "hooks";
import { Paper } from "@mui/material";

export default function AutocompleteInputChip(props) {
  const { currentTheme, currentThemePalette } = useSwitchThemeContext();

  const themeForDarkOnly = (color) => (currentTheme === "dark" ? color : null);

  const { 
    options, 
    setOptions, 
    setSelectedValue, 
    setNewValues, 
    newValues, 
    allowAdd, 
    selectedValue,
  } = props;

  const getMaxId = () => {
    return Math.max(...options.map((opt) => opt.id)) + 1;
  };

  const handlePressEnter = (value) => {
    if (!allowAdd) return;
    const labels = options.map((opt) => opt.label);
    const included = labels.includes(value);
    const newId = getMaxId();
    if (!included) {
      setOptions([...options, { id: newId, label: value }]);
      setNewValues([...newValues, { id: newId, label: value }]);
    }
  };

  const CustomPaper = (props) => {
    return (
      <Paper
        style={{
          borderRadius: themeForDarkOnly(1),
          border: themeForDarkOnly(`1px solid ${currentThemePalette.light}`),
          backgroundColor: currentThemePalette.bgPrimary,
          color: currentThemePalette.text,
        }}
        elevation={8}
        {...props}
      />
    );
  };

  const values = options
    .filter(opt => selectedValue.some(value => value.id === opt.id))
    .map((opt) => ({id: opt.id, label: opt.label}));

  return (
    <Autocomplete
      multiple
      id="auto-complete-chip"
      onChange={(event, newValue) => {
        setSelectedValue([...newValue.filter((option) => option)]);
      }}
      options={options}
      getOptionLabel={(option) => option.label}
      filterSelectedOptions
      PaperComponent={CustomPaper}
      value={values}
      sx={{
        width: "100%",
        "& .MuiChip-root": {
          border: `2px solid ${currentThemePalette.medium}`,
          backgroundColor:
            currentTheme === "dark"
              ? "rgba(250, 250, 250, .07)"
              : currentThemePalette.bgSecondary,
          color: "#FFFFFF",
          fontWeight: 550,
        },
        "& .MuiSvgIcon-root": {
          color:
            currentTheme === "dark" || currentTheme === "teal"
              ? "#0a7578 !important"
              : currentThemePalette.dark,
        },
      }}
      renderInput={(params) => (
        <FormTextField
          {...params}
          label="Skills"
          placeholder="Skills"
          key={params.id}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handlePressEnter(e.target.value);
            }
          }}
        />
      )}
    />
  );
}
