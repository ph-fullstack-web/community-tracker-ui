import createTheme from '@mui/material/styles/createTheme';

const theme = createTheme({
  palette: {
    dark: {
      light: '#B0B0FF',
      medium: '#00007b',
      main: '#000048',
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
