import { List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useSwitchThemeContext } from 'hooks';
import PaletteIcon from '@mui/icons-material/Palette';
import { useState } from 'react';

const ThemeSubMenu = () => {
    const { currentTheme, currentThemePalette, setAndStoreCurrentTheme } =
    useSwitchThemeContext();
    const themeForDarkOnly = (color) => currentTheme === "dark" ? color : null;

    const themeColor = ["blue", "plum", "teal", "dark"];
    
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
      };

    const handleMenuItemClick = (option) => {
    setAndStoreCurrentTheme(option);
    };

    return (
        <div>
            <ListItemButton sx={{
                    color: themeForDarkOnly(currentThemePalette.light),
                    '&:hover': {
                        backgroundColor: themeForDarkOnly("#293A46")
                    }
                }}
                onClick={handleClick}
            >
                <ListItemIcon sx={{color: themeForDarkOnly(currentThemePalette.light)}}>
                    <PaletteIcon/>
                </ListItemIcon>
                <ListItemText primary={'Themes'} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit sx={{color: themeForDarkOnly(currentThemePalette.light)}}>
                {(themeColor || []).map((color) => (
                    <List key={themeColor.indexOf(color)} component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}
                        selected={color === currentTheme}
                        onClick={() => handleMenuItemClick(color)}>
                            <ListItemIcon>
                                <PaletteIcon  sx={{color: themeForDarkOnly(currentThemePalette.light)}}/>
                            </ListItemIcon>
                            <ListItemText primary={color} />
                        </ListItemButton>
                    </List>
                ))}
            </Collapse>
        </div>
    )
}

export default ThemeSubMenu;