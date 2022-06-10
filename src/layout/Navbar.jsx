import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Logo from './Logo';
import { useLocalStorage, useToggle } from 'hooks';
import { ThemeSwitchButton, LoginModal } from 'components';
import { useAuth } from "contexts/auth/AuthContext";

const Navbar = ({ firstName, lastName, role }) => {

  const { state } = useAuth();

  const [name, setName] = useLocalStorage("authKey", {});
  const [toggle, setToggle] = useToggle();

  const handleToggle = () => {
    setToggle(!toggle);
  };


  useEffect(() => {
    if (state.success === "success") {
      setName({ ...state.credentials })
    }
  }, [state.credentials, state.success,])



  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Logo />
        <Box display="flex" alignSelf="center" sx={{ ml: 'auto' }}>
          {role ? <Typography>{role} | {firstName} {lastName}</Typography> : <Button onClick={handleToggle}>Signin as Admin</Button>}
        </Box>
        <Box display="flex" alignSelf="center">
          <ThemeSwitchButton />
        </Box>
      </Box>

      <LoginModal open={toggle} handleClose={handleToggle} />
    </>
  );
};

Navbar.propTypes = {};

export default Navbar;
