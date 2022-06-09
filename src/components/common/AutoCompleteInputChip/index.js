import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AutocompleteInputChip(props) {
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
      sx={{ width: '100%' }}
      renderInput={(params) => (
        <TextField
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
