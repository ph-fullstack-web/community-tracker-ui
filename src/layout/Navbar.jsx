import { useMemo } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Logo from './Logo';
import { useToggle } from 'hooks';
import { ThemeSwitchButton, LoginModal } from 'components';
import { useAuthContext } from "contexts/auth/AuthContext";

const Navbar = () => {

  const { state: authState } = useAuthContext();


  const [toggle, setToggle] = useToggle();

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const loggedInName = useMemo(() => {
    const { role, firstName, lastName } = authState;
    return `${role} | ${firstName} ${lastName}`
  }, [authState])

  return (
    <Box display="flex" justifyContent="space-between" flex={1}>
      <Logo />
      <Box display="flex" alignSelf="center" marginLeft="auto">
        {authState.role ? <Typography>{loggedInName}</Typography> : <Box component={Button} onClick={handleToggle} color="white">Signin as Admin</Box>}
      </Box>

      <Box display="flex" alignSelf="center">
        <ThemeSwitchButton />
      </Box>

      <LoginModal open={toggle} handleClose={handleToggle} />
    </Box>
  );
};

Navbar.propTypes = {};

export default Navbar;
