import Stack from '@mui/material/Stack';

import Logo from './Logo';
import ThemeSwitchButton from 'components/themeSwitcher/ThemeSwitchButton';

const Navbar = () => {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Logo /> <ThemeSwitchButton />
      </Stack>
    </>
  );
};

export default Navbar;
