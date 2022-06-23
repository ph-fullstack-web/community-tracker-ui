import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const ResourcesTextField = ({
  gridXs,
  gridSm,
  gridMd,
  gridLg,
  value,
  name,
  onChange,
  id,
  label,
  placeholder,
  dateType,
  ...gridOtherProps
}) => {
  return (
    <Grid
      item
      xs={gridXs ? gridXs : 12}
      sm={gridSm ? gridSm : 12}
      md={gridMd ? gridMd : 5}
      lg={gridLg ? gridLg : 5}
      {...gridOtherProps}>
      <TextField
        required
        fullWidth
        variant="outlined"
        sx={{
          mt: 5,
          backgroundColor: "#FFFFFF",
        }}
        value={value}
        name={name}
        onChange={onChange}
        id={id}
        label={label}
        placeholder={placeholder ? placeholder : null}
        type={dateType ? "date" : "text"}
      />
    </Grid>
  );
};

export default ResourcesTextField;
