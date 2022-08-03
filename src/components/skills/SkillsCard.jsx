import {
  Typography,
  Card,
  CardContent,
  Grid,
  CardActions,
} from "@mui/material";
import { useSwitchThemeContext } from "hooks";
import { PieChartDashBoard } from "components";

const SkillsCard = ({ id, name, chartData, percentage }) => {
  const { currentTheme, currentThemePalette } = useSwitchThemeContext();
  const label = "Members";
  return (
    <Grid
      key={id}
      item
      xs={11}
      sm={5}
      md={3}
      lg={2}
      xl={2}
      style={{
        display: "flex",
        justifyContent: "center",
        justifyItems: "center",
        marginBottom: "7px",
      }}
    >
      <Card
        elevation={2}
        className="member-skills-list-item"
        sx={{
          width: "100%",
          display: "block",
          flexDirection: "column",
          marginTop: "1rem",
          backgroundColor: `${
            currentTheme === "dark" ? "rgba(20, 20, 20, .4)" : "#ffffff"
          }!important`,
          paddingTop: "0px",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0px !important",
            backgroundColor: currentThemePalette.opacityBackground,
          }}
        >
          <PieChartDashBoard
            chartData={chartData}
            percentage={percentage}
            label={label}
          ></PieChartDashBoard>
        </CardContent>
        <CardActions>
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: 700,
              color: `${
                currentTheme === "dark" ? "#ffffff" : "#141414"
              }!important`,
            }}
          >
            {name}
          </Typography>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default SkillsCard;
