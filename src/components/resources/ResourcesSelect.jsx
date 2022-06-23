import { Grid, FormControl, InputLabel, Select } from "@mui/material";

const ResourcesSelect = ({
  children,
  value,
  name,
  onChange,
  label,
  defaultValue,
}) => {
  return (
    <Grid item xs={12} sm={12} md={5} lg={5}>
      <FormControl
        sx={{
          mt: 5,
        }}
        fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          value={value}
          name={name}
          required
          label={label}
          onChange={onChange}
          defaultValue={defaultValue}
          sx={{
            backgroundColor: "#FFFFFF",
          }}>
          {children}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default ResourcesSelect;
