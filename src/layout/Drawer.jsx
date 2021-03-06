import * as React from 'react';
import { useToggle } from 'hooks';
import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Box, Drawer, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DRAWER_ROUTES from './constants/drawerRoutes';

const DRAWER_WIDTH = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, toggle }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${DRAWER_WIDTH}px`,
        ...(toggle && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const PersistentDrawerLeft = ({ children }) => {
    const router = useNavigate();

    const theme = useTheme();
    const [toggle, setToggle] = useToggle();
    const handleToggle = () => {
        setToggle(!toggle)
    }

    const handleNavigation = (route) => {
        router(route);
    }
    return (
        <>
            <Box onClick={handleToggle} variant="contained" position="absolute" left={0}>
                <IconButton sx={{
                    ':hover': {
                        background: '#b8cad6'
                    }
                }}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>
            <Box display="flex">
                <Drawer
                    sx={{
                        width: DRAWER_WIDTH,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: DRAWER_WIDTH,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant={"persistent"}
                    anchor="left"
                    ModalProps={{
                        keepMounted: true,
                    }}
                    open={toggle}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleToggle}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {DRAWER_ROUTES.map(({ name, icon, path }) => (
                            <ListItem key={name} disablePadding onClick={() => handleNavigation(path)}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText primary={name} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <Main open={toggle}>
                    <DrawerHeader />
                    {children}
                </Main>
            </Box></>

    );
}

export default PersistentDrawerLeft