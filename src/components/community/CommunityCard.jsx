import { Typography, Card, Divider, CardContent, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const CommunityCard = ({ id, image, name }) => {
  return (
    <Grid
      key={id}
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={3}
      style={{
        display: "flex",
        justifyContent: "center",
        justifyItems: "center",
      }}
    >
      <Card
        elevation={2}
        className="community-list-item"
        sx={{
          width: "100%",
          height: "10rem",
          display: "block",
          flexDirection: "column",
          textAlign: "center",
          marginTop: "1rem",
          color: "#FFFFFF",
          backgroundColor: `primary.main`,
        }}
      >
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "1em",
            cursor: "pointer",
            textDecoration: "none"
          }}
          component={Link}
          to={`/communities/update/${id}`}
        >
          <img src={image} height="60px" width="60px" alt="community icon" />
          <Typography
            component="label"
            align="center"
            sx={{
              color: "#FFFFFF",
              padding: "0.75rem",
              paddingTop: "0",
              fontWeight: "600",
              fontStyle: "italic",
              display: "block",
              cursor: "pointer",
            }}
          >
            {name}
          </Typography>
        </CardContent>
        <Divider style={{ borderColor: "#FFFFFF" }} />
      </Card>
    </Grid>
  );
};

export default CommunityCard;
