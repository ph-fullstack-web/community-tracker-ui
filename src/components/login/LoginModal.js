import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const LoginModal = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Login Modal</DialogTitle>
      <DialogContent>
        <Box
          sx={{ height: "20vh" }}
          component="form"
          display="flex"
          flexDirection="column"
          justifyContent="space-evenly"
        >
          <TextField label="Cognizant ID" required />
          <TextField label="Password" required />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button autoFocus type="submit">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

LoginModal.propTypes = {};

export default LoginModal;
