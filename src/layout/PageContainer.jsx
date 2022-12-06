import { Container } from "@mui/material";
import { useSwitchThemeContext } from "hooks";
import PersistentDrawerLeft from "./Drawer";
import SnackBar from "components/notification/SnackBar";
import Navbar from "./Navbar";
import Header from "./Header";

const PageContainer = ({ children }) => {
  const { currentTheme, currentThemePalette } = useSwitchThemeContext();

  return (
    <>
      <Header />
      <Container
        maxWidth="xl"
        sx={{
          borderRadius: "15px",
          backgroundColor: currentTheme === "dark" ? "#3C4043" : "#F3F6F8",
          border:
            currentTheme === "dark"
              ? `1px solid ${currentThemePalette.light}`
              : null,
          padding: "1px",
        }}
      >
        <Navbar />
        <PersistentDrawerLeft>{children}</PersistentDrawerLeft>
        <SnackBar />
      </Container>
    </>    
  );
};

export default PageContainer;
