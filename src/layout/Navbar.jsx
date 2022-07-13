import { Box } from '@mui/material';
import Logo from './Logo';
import { useToggle } from 'hooks';
import { LoginModal } from 'components';

const Navbar = () => {

  // const { state: authState } = useAuthContext();

  // const {currentTheme, currentThemePalette} = useSwitchThemeContext();

  const [toggle, setToggle] = useToggle();

  const handleToggle = () => {
    setToggle(!toggle);
  };

  // const loggedInName = useMemo(() => {
  //   const { role, firstName, lastName } = authState;
  //   return `${role} | ${firstName} ${lastName}`
  // }, [authState])

  return (
    <Box display="flex" justifyContent="space-between" flex={1}>
      <Logo />
      {/* <Box display="flex" alignSelf="center" marginLeft="auto">
        {authState.role 
          ? <Typography>{loggedInName}</Typography> 
          : (
          <Box 
            component={Button}
            onClick={handleToggle}
            sx={{color: currentTheme === "dark" ? currentThemePalette.light : currentThemePalette.dark}}
          >
            Signin as Admin
          </Box>
        )}
      </Box>

      <Box display="flex" alignSelf="center">
        <ThemeSwitchButton />
      </Box> */}

      <LoginModal open={toggle} handleClose={handleToggle} />
    </Box>
  );
};

Navbar.propTypes = {};

export default Navbar;
