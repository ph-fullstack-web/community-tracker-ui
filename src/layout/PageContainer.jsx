import { useContext } from 'react';
import { Container } from '@mui/material';
import { SwitchThemeContext } from 'contexts/Theme/SwitchThemeContext';

const PageContainer = ({ children }) => {
  const { currentTheme } = useContext(SwitchThemeContext);
  return (
    <Container
      maxWidth="xl"
      sx={{
        borderRadius: '15px',
        backgroundColor: currentTheme === 'dark' ? 'dark.dark' : '#F3F6F8',
        padding: '1px',
        marginTop: '2rem',
      }}>
      {children}
    </Container>
  );
};

export default PageContainer;
