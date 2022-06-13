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
    const {role, firstName, lastName} = authState.credentials;
    return `${role} | ${firstName} ${lastName}`
  }, [authState])

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Logo />
        <Box display="flex" alignSelf="center" sx={{ ml: 'auto' }}>
          {authState.credentials.role ? <Typography>{loggedInName}</Typography> : <Button onClick={handleToggle}>Signin as Admin</Button>}
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
