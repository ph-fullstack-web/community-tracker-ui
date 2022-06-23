import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const ResourcesSaveButton = ({ isProcessing }) => {
  return (
    <Grid
      item
      sx={{
        display: "flex",
        flexDirection: "row",
      }}>
      <Button
        variant="contained"
        disabled={isProcessing}
        size="large"
        sx={{
          textTransform: "uppercase",
          width: "10rem",
          height: "4rem",
        }}
        type="submit">
        save
      </Button>
    </Grid>
  );
};

export default ResourcesSaveButton;
