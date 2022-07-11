import * as React from 'react';
import { useSwitchThemeContext, useToggle } from 'hooks';
import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Box, Drawer, List, Divider, ListItemButton, ListItemIcon, ListItemText, Collapse, Container, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import DRAWER_ROUTES from './constants/drawerRoutes';
import { useState } from 'react';
import useGetCommunities from "hooks/communities/useGetCommunities";
import Scrollbars from 'react-custom-scrollbars-2';

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
    const { isLoading, data: communityData, isError, error } = useGetCommunities();
    const router = useNavigate();

    const theme = useTheme();
    const [toggle, setToggle] = useToggle();
    const handleToggle = () => {
        setToggle(!toggle)
    }

    const { currentTheme, currentThemePalette } = useSwitchThemeContext();
    const themeForDarkOnly = (color) => currentTheme === "dark" ? color : null

    const handleNavigation = (route) => {
        router(route);
    }

    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
      };

    return (
        <>
            <Box onClick={handleToggle} variant="contained" position="absolute" left={0}>
                <IconButton sx={{
                    ':hover': {
                        background: '#b8cad6'
                    }
                }}>
                    <ArrowForwardIosIcon style={{color: currentThemePalette.main}}/>
                </IconButton>
            </Box>
            <Box display="flex">
            {isError && (
                <Container
                style={{
                    display: "flex",
                    justifyContent: "center",
                    justifyItems: "center",
                    marginTop: "3rem",
                }}
                >
                <label>{`Error: ${error.message}`}</label>
                </Container>
            )}
                <Drawer
                    sx={{
                        width: DRAWER_WIDTH,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: DRAWER_WIDTH,
                            boxSizing: 'border-box',
                        },
                    }}
                    PaperProps={{
                        sx: {backgroundColor: themeForDarkOnly("#202124")}
                    }}
                    variant={"persistent"}
                    anchor="left"
                    ModalProps={{
                        keepMounted: true,
                    }}
                    open={toggle}
                >
                    <DrawerHeader>
                        <Box 
                            sx={{color: themeForDarkOnly(currentThemePalette.light),
                                display: 'flex',
                                margin: 'auto'}}
                        >
                            <Box sx={{
                                paddingRight: '1rem',
                                alignSelf: 'center',
                                borderRight: `5px solid  ${currentThemePalette.main}`}}
                            >
                                922557
                            </Box>
                            <Box 
                                component={Button}
                                onClick={handleToggle}
                                sx={{color: currentTheme === "dark" ? currentThemePalette.light : currentThemePalette.dark}}
                            >
                                Sign out
                            </Box>
                        </Box>
                        <IconButton 
                            onClick={handleToggle}
                            sx={{
                                color: currentThemePalette.main,
                                '&:hover': {
                                    backgroundColor: themeForDarkOnly("#293A46")
                                }
                            }}
                        >
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider sx={{ border: `1px solid ${themeForDarkOnly(currentThemePalette.light)}` }}/>
                    <Scrollbars>
                    	<List>
                    	    {DRAWER_ROUTES.map(({ name, icon, path }) => (
                    	        name !== 'Members' ? (
                    	            <div>
                    	                <ListItemButton key={name} disablePadding onClick={() => handleNavigation(path)} sx={{
                    	                        color: themeForDarkOnly(currentThemePalette.light),
                    	                        '&:hover': {
                    	                            backgroundColor: themeForDarkOnly("#293A46")
                    	                        }
                    	                    }}
                    	                >
                    	                    <ListItemIcon sx={{color: themeForDarkOnly(currentThemePalette.light)}}>
                    	                        {icon}
                    	                    </ListItemIcon>
                    	                    <ListItemText primary={name} />
                    	                </ListItemButton>
                    	            </div>
                    	        ) : (
                    	            <div>
                    	                <ListItemButton key={'name'} sx={{
                    	                        color: themeForDarkOnly(currentThemePalette.light),
                    	                        '&:hover': {
                    	                            backgroundColor: themeForDarkOnly("#293A46")
                    	                        }
                    	                    }}
                    	                    onClick={handleClick}
                    	                >
                    	                    <ListItemIcon sx={{color: themeForDarkOnly(currentThemePalette.light)}}>
                    	                        {icon}
                    	                    </ListItemIcon>
                    	                    <ListItemText primary={name} />
                    	                    {open ? <ExpandLess /> : <ExpandMore />}
                    	                </ListItemButton>
                    	                {!isLoading && communityData && (
                    	                    <Collapse in={open} timeout="auto" unmountOnExit sx={{color: themeForDarkOnly(currentThemePalette.light)}}>
                    	                        {(communityData || []).map((community) => (
                    	                            <List key={community.community_id} component="div" disablePadding onClick={() => handleNavigation(`/resources/${community.community_id}`)}>
                    	                                <ListItemButton sx={{ pl: 4 }}>
                    	                                    <ListItemIcon>
                    	                                        <SubdirectoryArrowRightIcon  sx={{color: themeForDarkOnly(currentThemePalette.light)}}/>
                    	                                    </ListItemIcon>
                    	                                    <ListItemText primary={community.community_name} />
                    	                                </ListItemButton>
                    	                            </List>
                    	                        ))}
                    	                    </Collapse>
                    	                )}
                    	            </div>
                    	        ) 
                    	    ))}
                    	</List>
                    </Scrollbars>
                </Drawer>
                <Main open={toggle}>
                    <DrawerHeader />
                    {children}
                </Main>
            </Box></>

    );
}

export default PersistentDrawerLeft