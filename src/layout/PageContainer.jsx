import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { useLocalStorage, useSwitchThemeContext } from "hooks";
import Navbar from "./Navbar";

const PageContainer = ({ children }) => {
  const { currentTheme, currentThemePalette } = useSwitchThemeContext();
  const localStoredValues = JSON.parse(window.localStorage.getItem('authKey'))

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
      <Navbar role={localStoredValues?.role} firstName={localStoredValues?.firstName} lastName={localStoredValues?.lastName} />
      {children}
    </Container>
  );
};

export default PageContainer;
