import { useContext, useState, useRef } from 'react';
import {
  IconButton,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuItem,
  MenuList,
} from '@mui/material';
import Brightness6Icon from '@mui/icons-material/Brightness6';

import { SwitchThemeContext } from 'contexts/Theme/SwitchThemeContext';

const options = ['blue', 'plum', 'teal', 'dark'];

const ThemeSwitchButton = () => {
  const { currentTheme, setAndStoreCurrentTheme } =
    useContext(SwitchThemeContext);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleMenuItemClick = option => {
    setAndStoreCurrentTheme(option);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <IconButton variant="outlined" onClick={handleToggle} ref={anchorRef}>
        <Brightness6Icon />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map(option => (
                    <MenuItem
                      key={option}
                      selected={option === currentTheme}
                      onClick={_ => handleMenuItemClick(option)}>
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default ThemeSwitchButton;
