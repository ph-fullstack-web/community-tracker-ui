import * as React from 'react';
import {useSwitchThemeContext, useToggle} from 'hooks';
import {styled, useTheme} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Container,
  Button,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import {DRAWER_ROUTES, GUEST_DRAWER_ROUTES} from './constants/drawerRoutes';
import {useState} from 'react';
import useGetCommunities from 'hooks/communities/useGetCommunities';
import Scrollbars from 'react-custom-scrollbars-2';
import ThemeSubMenu from 'components/theme-switcher/ThemeSubMenu';
import ChangePasswordModal from 'components/change-password/ChangePasswordModal';
import LoginIcon from '@mui/icons-material/Login';
import {LoginModal} from 'components';
import {useAuthContext} from 'contexts/auth/AuthContext';

const DRAWER_WIDTH = 240;

const Main = styled('main', {shouldForwardProp: prop => prop !== 'open'})(
  ({theme, toggle}) => ({
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
  })
);

const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const PersistentDrawerLeft = ({children}) => {
  const {isLoading, data: communityData, isError, error} = useGetCommunities();
  const router = useNavigate();
  const {
    state: {
      isAuthenticated,
      credentials: {isMember},
    },
    dispatch: authDispatch,
  } = useAuthContext();

  const theme = useTheme();
  const [toggle, setToggle] = useToggle();
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleChangePasswordClick = () => setOpenChangePasswordModal(true);
  const handleCancelUpdate = () => setOpenChangePasswordModal(false);
  const handleConfirmUpdate = () => setOpenChangePasswordModal(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleLogin = () => {
    setOpenLoginModal(true);
  };

  const handleLogout = () => {
    authDispatch({
      type: 'LOGOUT',
    });
    router('/login');
  };

  const {currentTheme, currentThemePalette} = useSwitchThemeContext();
  const themeForDarkOnly = color => (currentTheme === 'dark' ? color : null);

  const handleNavigation = route => {
    router(route);
  };

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const ROUTES =
    isAuthenticated && !isMember ? DRAWER_ROUTES : GUEST_DRAWER_ROUTES;

  return (
    <>
      <Box
        onClick={handleToggle}
        variant="contained"
        position="absolute"
        left={0}
      >
        <IconButton
          sx={{
            ':hover': {
              background: '#b8cad6',
            },
          }}
        >
          <ArrowForwardIosIcon style={{color: currentThemePalette.main}} />
        </IconButton>
      </Box>
      <Box display="flex">
        {isError && (
          <Container
            style={{
              display: 'flex',
              justifyContent: 'center',
              justifyItems: 'center',
              marginTop: '3rem',
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
            sx: {backgroundColor: themeForDarkOnly('#202124')},
          }}
          variant={'persistent'}
          anchor="left"
          ModalProps={{
            keepMounted: true,
          }}
          open={toggle}
        >
          <DrawerHeader>
            {isAuthenticated && (
              <Box
                sx={{
                  color: themeForDarkOnly(currentThemePalette.light),
                  display: 'flex',
                  margin: 'auto',
                }}
              >
                <Box
                  component={Button}
                  onClick={handleLogout}
                  sx={{
                    color:
                      currentTheme === 'dark'
                        ? currentThemePalette.light
                        : currentThemePalette.dark,
                  }}
                >
                  Sign out
                </Box>
              </Box>
            )}
            {!isAuthenticated && (
              <Box
                sx={{
                  color: themeForDarkOnly(currentThemePalette.light),
                  display: 'flex',
                  margin: 'auto',
                }}
              >
                <Box
                  component={Button}
                  onClick={handleLogin}
                  sx={{
                    color:
                      currentTheme === 'dark'
                        ? currentThemePalette.light
                        : currentThemePalette.dark,
                  }}
                  endIcon={
                    <LoginIcon
                      fontSize="large"
                      style={{
                        color: currentThemePalette.main,
                        fontWeight: '700',
                      }}
                    />
                  }
                >
                  Sign in
                </Box>
              </Box>
            )}
            <IconButton
              onClick={handleToggle}
              sx={{
                color: currentThemePalette.main,
                '&:hover': {
                  backgroundColor: themeForDarkOnly('#293A46'),
                },
              }}
            >
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider
            sx={{
              border: `1px solid ${themeForDarkOnly(
                currentThemePalette.light
              )}`,
            }}
          />
          <Scrollbars>
            <List>
              {ROUTES.map(({name, icon, path}) =>
                name !== 'Members' ? (
                  name === 'Themes' ? (
                    <div key={name}>
                      <ThemeSubMenu />
                    </div>
                  ) : name === 'Change Password' ? (
                    <div key={name}>
                      {isAuthenticated && (
                        <ListItemButton
                          onClick={handleChangePasswordClick}
                          sx={{
                            color: themeForDarkOnly(currentThemePalette.light),
                            '&:hover': {
                              backgroundColor: themeForDarkOnly('#293A46'),
                            },
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              color: themeForDarkOnly(
                                currentThemePalette.light
                              ),
                            }}
                          >
                            {icon}
                          </ListItemIcon>
                          <ListItemText primary={name} />
                        </ListItemButton>
                      )}
                    </div>
                  ) : (
                    <div key={name}>
                      <ListItemButton
                        onClick={() => handleNavigation(path)}
                        sx={{
                          color: themeForDarkOnly(currentThemePalette.light),
                          '&:hover': {
                            backgroundColor: themeForDarkOnly('#293A46'),
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            color: themeForDarkOnly(currentThemePalette.light),
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText primary={name} />
                      </ListItemButton>
                    </div>
                  )
                ) : (
                  <div key={name}>
                    <ListItemButton
                      sx={{
                        color: themeForDarkOnly(currentThemePalette.light),
                        '&:hover': {
                          backgroundColor: themeForDarkOnly('#293A46'),
                        },
                      }}
                      onClick={handleClick}
                    >
                      <ListItemIcon
                        sx={{
                          color: themeForDarkOnly(currentThemePalette.light),
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={name} />
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    {!isLoading && communityData && (
                      <Collapse
                        in={open}
                        timeout="auto"
                        unmountOnExit
                        sx={{
                          color: themeForDarkOnly(currentThemePalette.light),
                        }}
                      >
                        {(communityData || []).map(community => (
                          <List
                            key={community.community_id}
                            component="div"
                            disablePadding
                            onClick={() =>
                              handleNavigation(
                                `/members/${community.community_id}`
                              )
                            }
                          >
                            <ListItemButton sx={{pl: 4}}>
                              <ListItemIcon>
                                <SubdirectoryArrowRightIcon
                                  sx={{
                                    color: themeForDarkOnly(
                                      currentThemePalette.light
                                    ),
                                  }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={community.community_name}
                              />
                            </ListItemButton>
                          </List>
                        ))}
                      </Collapse>
                    )}
                  </div>
                )
              )}
            </List>
          </Scrollbars>
        </Drawer>
        <Main open={toggle}>{children}</Main>
      </Box>
      <ChangePasswordModal
        open={openChangePasswordModal}
        onCancel={handleCancelUpdate}
        onConfirm={handleConfirmUpdate}
      />
      <LoginModal
        open={openLoginModal}
        handleClose={() => setOpenLoginModal(false)}
      />
    </>
  );
};

export default PersistentDrawerLeft;
