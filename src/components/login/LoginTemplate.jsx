import React from "react";
import { styled } from "@mui/system";
import {
  Alert,
  AlertTitle,
  Box,
  DialogActions,
  DialogContent,
  Stack,
} from "@mui/material";
import { FormTextField, GoogleLoginButton } from "components";
import { useSwitchThemeContext } from "hooks";
import AppButton from "components/common/AppButton";
import darkBackground from 'lib/assets/cognizant_background_right_dark.png';
import lightBackground from 'lib/assets/cognizant_background_right.png';
import logo from 'lib/assets/softvision_teal.png';

const googleButtonStyle = {
  margin: 'auto',
  padding: '1rem'
};

const LoginTemplate = ({ handleCredentials, handleGoogleLogin, handleSubmit, error }) => {
  const { currentTheme, currentThemePalette } = useSwitchThemeContext();
    
  const Wrapper = styled('div')({
    minHeight: '100vh',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
    backgroundImage: `url(${currentTheme === 'dark' ? darkBackground : lightBackground})`,
    backgroundColor: 'white',
  });

  const FormContainer = styled('div')({
    borderRight: `1px solid ${currentThemePalette.loginBorder}`,
    minHeight: 'inherit',
    maxWidth: 450,
    paddingTop: 80,
    backgroundColor: `${currentThemePalette.loginBackground}`,
    [`@media (max-width: 800px)`]: {
      maxWidth: '100%',
    },
  });

  return (
    <Wrapper>
      <FormContainer>
        <Stack alignItems="center">
          <img src={logo} height={128} width={350} />
          {/* <DialogContent>
          {error && (
              <Alert severity="error" sx={{
                  marginTop: "1rem", 
                  backgroundColor: currentTheme === "dark" ? "#202124" : null,
                  border: currentTheme === "dark" ? `2px solid ${currentThemePalette.light}` : null,
                  color: currentTheme === "dark" ? currentThemePalette.light : currentThemePalette.dark
                }}
              >
                <AlertTitle>Error</AlertTitle>
                {error}
              </Alert>
            )}
            <Box
              display="flex"
              sx={{ height: "20vh" }}
              flexDirection="column"
              justifyContent="space-evenly"
            >
              <FormTextField
                onChange={handleCredentials}
                name="id"
                label="Cognizant ID"
                required
                type="number"
                sx={{marginTop: "1.5rem"}}
              />
              <FormTextField
                onChange={handleCredentials}
                name="password"
                label="Password"
                required
                type="password"
                sx={{marginTop: "1rem"}}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <AppButton onClick={handleSubmit}>Login</AppButton>
          </DialogActions> */}
          <GoogleLoginButton
            style={googleButtonStyle}
            onCallbackResponse={handleGoogleLogin}
          />
        </Stack>
      </FormContainer>
    </Wrapper>
  );
};

LoginTemplate.propTypes = {};

export default LoginTemplate;
