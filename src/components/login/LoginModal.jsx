import React, { useState, } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FormTextField } from "components";
import { useAuthContext } from "contexts/auth/AuthContext";
import { useLogin, useSwitchThemeContext } from "hooks";
import AppButton from "components/common/AppButton";
import { useEffect } from "react";

const LoginModal = ({ open, handleClose }) => {
  const { currentTheme, currentThemePalette } = useSwitchThemeContext();
  const { mutate: loginMutate } = useLogin();
  const [credentials, setCredentials] = useState({ id: "", password: "" });
  const [error, setError] = useState("");
  const { dispatch, state } = useAuthContext();

  const handleCredentials = (e) => {
    const value = e.target.value;
    setCredentials({ ...credentials, [e.target.name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "AUTH_LOADING" });

    const args = {
      cognizant_id: credentials.id,
      password: credentials.password,
    }
    
    loginMutate(args, {
      onSuccess: (data) => {
        dispatch({
          type: "LOGIN",
          payload: { success: "success", data},
        });
        handleClose();
      },
      onError: (error) => {
       setError(error.message);
      }
    });
  };

  useEffect(() => {
    setCredentials({ id: "", password: "" });
    setError("");
  }, [open])
  return (
    <Dialog 
      open={open}
      onClose={handleClose}
      fullWidth
      PaperProps={{
        sx:{
          backgroundColor: currentTheme === "dark" ? "#202124" : null,
          border: currentTheme === "dark" ? `2px solid ${currentThemePalette.light}` : null
        }
      }}
    >
      <DialogTitle onClick={() => console.log(state)} sx={{color: currentThemePalette.text}}>Login Modal</DialogTitle>
      <DialogContent>
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
            value={credentials.id}
            sx={{marginTop: "1.5rem"}}
          />
          <FormTextField
            name="password"
            onChange={handleCredentials}
            label="Password"
            required
            type="password"
            value={credentials.password}
            sx={{marginTop: "1rem"}}
          />
        </Box>
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
      </DialogContent>
      <DialogActions>
        <AppButton onClick={handleClose}>Cancel</AppButton>
        <AppButton onClick={handleSubmit}>Login</AppButton>
      </DialogActions>
    </Dialog>
  );
};

LoginModal.propTypes = {};

export default LoginModal;
