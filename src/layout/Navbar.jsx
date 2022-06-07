import React from 'react';
import { Box, Button } from '@mui/material';
import Logo from './Logo';
import { useToggle } from 'hooks';
import LoginModal from 'components/login/LoginModal';
import ThemeSwitchButton from 'components/themeSwitcher/ThemeSwitchButton';

const Navbar = () => {
  const [toggle, setToggle] = useToggle();

  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Logo />
        <Box display="flex" alignSelf="center">
          <Button onClick={handleToggle}>Signin as Admin</Button>
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
