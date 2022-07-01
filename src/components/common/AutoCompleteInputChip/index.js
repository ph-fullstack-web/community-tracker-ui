import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import FormTextField from '../form-controls/FormTextField';
import { useSwitchThemeContext } from 'hooks';

export default function AutocompleteInputChip(props) {
  const { currentTheme, currentThemePalette }  = useSwitchThemeContext();
  const themeForDarkOnly = (color) => (currentTheme === "dark" ? color : null);

  const { options, setOptions, setSelectedValue, setNewValues, newValues } =
    props;
  //const [value, setValue] = useState(options[0]);

  const getMaxId = () => {
    return Math.max(...options.map((opt) => opt.id)) + 1;
  };

  const handlePressEnter = (value) => {
    const labels = options.map((opt) => opt.label);
    const included = labels.includes(value);
    const newId = getMaxId();
    if (!included) {
      setOptions([...options, { id: newId, label: value }]);
      setNewValues([...newValues, { id: newId, label: value }]);
    }
  };

  return (
    <Autocomplete
      multiple
      id="auto-complete-chip"
      //value={value}
      onChange={(event, newValue) => {
        setSelectedValue([...newValue.filter((option) => option)]);
      }}
      options={options}
      getOptionLabel={(option) => option.label}
      filterSelectedOptions
      sx={{ 
        width: '100%',
        "& .MuiChip-root": {
          border: `1px solid ${themeForDarkOnly(currentThemePalette.light)}`,
          backgroundColor: themeForDarkOnly("#3C4043"),
          color: themeForDarkOnly("#FFFFFF")
        },
        "& .MuiChip-deleteIcon": {
          color: themeForDarkOnly(currentThemePalette.light)
        },
        "& .MuiSvgIcon-root": {
          color: themeForDarkOnly(currentThemePalette.light),
        },
        // (Targets the dropdown part but does not work):
        // "& .MuiAutocomplete-paper": {
        //   borderRadius: themeForDarkOnly(1),
        //   border: themeForDarkOnly(
        //     `1px solid ${currentThemePalette.light}`
        //   ),
        //   backgroundColor: currentThemePalette.bgPrimary,
        //   color: currentThemePalette.text,
        //   "& .MuiMenuItem-root:hover": {
        //     backgroundColor: themeForDarkOnly("#293A46"),
        //   },
        // },
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
};
