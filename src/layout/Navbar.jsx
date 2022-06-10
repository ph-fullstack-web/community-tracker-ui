import React, { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Logo from './Logo';
import { useToggle } from 'hooks';
import { ThemeSwitchButton, LoginModal } from 'components';
import { useAuth } from "contexts/auth/AuthContext";

const Navbar = () => {
  const { state } = useAuth()
  const [toggle, setToggle] = useToggle();

  const handleToggle = () => {
    setToggle(!toggle);
  };


  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Logo />
        <Box display="flex" alignSelf="center" sx={{ ml: 'auto' }}>
          {state.success === 'success' ? <Typography>{state.credentials?.role} | {state.credentials?.firstName} {state.credentials?.lastName}</Typography> : <Button onClick={handleToggle}>Signin as Admin</Button>}


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
