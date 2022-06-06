import { useContext } from 'react';
import { Container } from '@mui/material';
import { SwitchThemeContext } from 'contexts/Theme/SwitchThemeContext';

const PageContainer = ({ children }) => {
  const { currentTheme, currentThemePalette } = useContext(SwitchThemeContext);
  return (
    <Container
      maxWidth="xl"
      sx={{
        borderRadius: '15px',
        backgroundColor:
          currentTheme === 'dark' ? currentThemePalette.dark : '#F3F6F8',
        border:
          currentTheme === 'dark'
            ? `1px solid ${currentThemePalette.light}`
            : null,
        padding: '1px',
        marginTop: '2rem',
      }}>
      {children}
    </Container>
  );
};

export default PageContainer;
