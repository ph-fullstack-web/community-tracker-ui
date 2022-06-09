import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const AutocompleteInputChip = (props) => {
  const { options, setOptions } = props;
  const [value, setValue] = useState([]);

  const handlePressEnter = (value) => {
    setOptions([...options, { key: options.length, label: value }]);
  };

  return (
    <Autocomplete
      multiple
      id="auto-complete-chip"
      value={value}
      onChange={(event, newValue) => {
        setValue([...newValue.filter((option) => option)]);
      }}
      options={options}
      getOptionLabel={(option) => option.label}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip label={option.label} {...getTagProps({ index })} />
        ))
      }
      sx={{ width: "100%" }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Skills"
          placeholder="Skills"
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

export default AutocompleteInputChip;
