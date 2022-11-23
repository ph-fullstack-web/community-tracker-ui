import PageContainer from "layout/PageContainer";
import { Card, Paper, Typography } from "@mui/material";
import { useSwitchThemeContext } from "hooks";
import { useAuthContext } from 'contexts/auth/AuthContext';

const NotFound = () => {
  const { currentTheme, currentThemePalette } = useSwitchThemeContext();
  const {state: {isAuthenticated}} = useAuthContext();

  const renderCard = () => {
    return (
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: currentThemePalette.cardSecondary,
          borderRadius: "4px",
          height: "570px",
        }}
      >
        <Paper
          sx={{
            borderRadius: "50%",
            height: "15.6rem",
            width: "15.6rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: currentThemePalette.circle,
          }}
        >
          <Typography
            variant="h1"
            sx={{ marginBottom: "0px", color: "rgb(171, 166, 166)" }}
            gutterBottom
            component="div"
          >
            404
          </Typography>
          <Typography
            variant="h7"
            sx={{ color: "rgb(171, 166, 166)" }}
            gutterBottom
            component="div"
          >
            PAGE NOT FOUND
          </Typography>
        </Paper>
        <Typography
          variant="h1"
          gutterBottom
          component="div"
          sx={{
            marginBottom: "12px",
            color: currentThemePalette.textSecondary,
          }}
        >
          Oops!
        </Typography>
        <Typography
          sx={{
            fontWeight: "bold",
            marginBottom: "35px",
            fontSize: "1rem",
            color:
              currentTheme === "dark" ? currentThemePalette.text : "#676d79",
          }}
          variant="subtitle2"
          gutterBottom
          component="div"
        >
          PAGE NOT FOUND ON SERVER
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          sx={{
            color:
              currentTheme === "dark" ? currentThemePalette.text : "#676d79",
            fontSize: "15px",
          }}
        >
          The link you follwed is either outdated, inaccurate, or
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          sx={{
            color:
              currentTheme === "dark" ? currentThemePalette.text : "#676d79",
            fontSize: "15px",
          }}
        >
          the server has been instructed not to let you have it.
        </Typography>
      </Card>
    )
  }

  if(isAuthenticated) {
    return (
      <PageContainer>
        {renderCard()}
      </PageContainer>
    )
  }

  return renderCard()
};

export default NotFound;
