import createTheme from '@mui/material/styles/createTheme';
import grey from '@mui/material/colors/grey';

const theme = createTheme({
  palette: {
    dark: {
      main: grey[900],
      light: grey[500],
      medium: grey[700],
    },
    plum: {
      light: '#85A0F9',
      medium: '#7373D8',
      dark: '#2E308E',
    },
    blue: {
      light: '#92BBE6',
      medium: '#6AA2DC',
      dark: '#2F78C4',
    },
    teal: {
      light: '#97F5F7',
      medium: '#26EFE9',
      dark: '#06C7CC',
    },
  },
});

export default theme;
