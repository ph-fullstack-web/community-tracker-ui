import {
  Typography,
  Card,
  Divider,
  CardContent,
  Grid,
  styled,
  CardActions,
  Button,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSwitchThemeContext } from "hooks";

const CommunityCard = ({ id, image, name, description }) => {
  const { currentTheme, currentThemePalette } = useSwitchThemeContext();

  const contrastingColors =
    currentTheme === "dark"
      ? currentThemePalette.light
      : currentThemePalette.medium;

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#ffffff",
      maxWidth: 300,
      border: "1px solid #dadde9",
    },
  }));

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
          backgroundColor: currentThemePalette.bgSecondary,
          border:
            currentTheme === "dark"
              ? `2px solid ${currentThemePalette.light}`
              : null,
        }}
      >
        <HtmlTooltip
          title={
            <>
              <Card
                sx={{
                  maxWidth: 345,
                  backgroundColor: currentThemePalette.card,
                }}
              >
                <CardContent>
                  <Typography
                    sx={{ color: "#FFFFFF", fontWeight: "300" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    {description}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    marginBottom: "8px",
                    paddingLeft: "15px",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    startIcon={<VisibilityIcon />}
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
                          currentTheme === "dark"
                            ? currentThemePalette.medium
                            : null,
                        backgroundColor:
                          currentTheme === "dark" ? "#293A46 !important" : null,
                      },
                    }}
                    component={Link}
                    to={`/members/${id}`}
                  >
                    View Members
                  </Button>
                </CardActions>
              </Card>
              <div style={{ marginBottom: "5px" }}></div>
            </>
          }
        >
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "1em",
              cursor: "pointer",
              textDecoration: "none",
            }}
            component={Link}
            to={`/communities/update/${id}`}
          >
            <SettingsIcon />
            <img width='25' height='25' src={image} alt='icon' />
            <Typography
              component="label"
              align="center"
              sx={{
                color: "#FFFFFF",
                padding: "0.75rem",
                paddingTop: "0",
                fontWeight: "600",
                display: "block",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              {name}
            </Typography>
          </CardContent>
        </HtmlTooltip>
        <Divider style={{ borderColor: "#FFFFFF" }} />
      </Card>
    </Grid>
  );
};

export default CommunityCard;
