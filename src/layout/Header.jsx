import React from 'react';
import {Container, Typography} from '@mui/material';
import {useAuthContext} from 'contexts/auth/AuthContext';
import {useSwitchThemeContext} from 'hooks';

const Header = () => {
  const {
    state: {
      credentials: {
        data: {email},
      },
    },
  } = useAuthContext();
  const {currentTheme} = useSwitchThemeContext();

  const pageHeaderStyle = {
    textAlign: 'right',
    marginTop: '1rem',
    paddingRight: '1rem',
    position: 'relative',
    right: '-50%',
    width: '50%',
    wordBreak: 'break-all',
    color: currentTheme === 'dark' ? '#FFFFFF' : null,
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        padding: '1px',
      }}
    >
      <Typography variant="subtitle2" component="div" sx={{...pageHeaderStyle}}>
        {email}
      </Typography>
    </Container>
  );
};

export default Header;
