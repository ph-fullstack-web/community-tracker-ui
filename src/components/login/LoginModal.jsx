import React, { useState, } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FormTextField } from "components";
import { useAuthContext } from "contexts/auth/AuthContext";
import { useSwitchThemeContext } from "hooks";

const CREDENTIALS = [
  {
    id: 2140402,
    password: "password",
    firstName: "Vincent",
    lastName: "Dizon",
    role: "admin",
  },
  {
    id: 2181978,
    password: "password",
    firstName: "Arvin Kenn",
    lastName: "De Los Santos",
    role: "admin",
  },
  {
    id: 123456,
    password: "password",
    firstName: "John",
    lastName: "Doe",
    role: "employee",
  },
];

const LoginModal = ({ open, handleClose }) => {
  const { currentTheme, currentThemePalette } = useSwitchThemeContext();

  const [credentials, setCredentials] = useState({ id: "", password: "" });
  const { dispatch, state } = useAuthContext();

  const handleCredentials = (e) => {
    const value = e.target.value;
    setCredentials({ ...credentials, [e.target.name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const ID = parseInt(credentials.id);
    const PASSWORD = credentials.password;
    dispatch({ type: "AUTH_LOADING" });

    Object.values(CREDENTIALS).forEach((data) => {
      if (data.id === ID && data.password === PASSWORD) {
        dispatch({
          type: "LOGIN",
          payload: { success: "success", data },
        });
        handleClose()
      }
    });
  };
  return (
    <Dialog 
      open={open}
      onClose={handleClose}
      fullWidth
      PaperProps={{
        sx:{
          backgroundColor: currentThemePalette.bgPrimary,
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
          />
          <FormTextField
            name="password"
            onChange={handleCredentials}
            label="Password"
            required
            type="password"
            value={credentials.password}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Login</Button>
      </DialogActions>
    </Dialog>
  );
};

LoginModal.propTypes = {};

export default LoginModal;
