import { Container } from "@mui/material";
import { useSwitchThemeContext } from "hooks";
import PersistentDrawerLeft from "./Drawer";

const PageContainer = ({ children }) => {
  const { currentTheme, currentThemePalette } = useSwitchThemeContext();

  return (
    <Container
      maxWidth="xl"
      sx={{
        borderRadius: "15px",
        backgroundColor:
          currentTheme === "dark" ? currentThemePalette.dark : "#F3F6F8",
        border:
          currentTheme === "dark"
            ? `1px solid ${currentThemePalette.light}`
            : null,
        padding: "1px",
        marginTop: "2rem",
      }}>
      <PersistentDrawerLeft>
        {children}
      </PersistentDrawerLeft>
    </Container>
  );
};

export default PageContainer;
