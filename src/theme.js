import createTheme from '@mui/material/styles/createTheme';

const DARK_LIGHT = '#CACAFF';
const DARK_MEDIUM = '#000048';
const PLUM_MEDIUM = '#7373D8';
const BLUE_MEDIUM = '#6AA2DC';
const TEAL_MEDIUM = '#26EFE9';
const BLACK = '#000000';

export const DARK_DARK = '#00002F';
export const WHITE = '#FFFFFF';

const theme = createTheme({
  palette: {
    dark: {
      light: DARK_LIGHT,
      medium: DARK_MEDIUM,
      dark: DARK_DARK,
      bgPrimary: DARK_DARK,
      bgSecondary: DARK_MEDIUM,
      text: DARK_LIGHT,
    },
    plum: {
      light: '#85A0F9',
      medium: PLUM_MEDIUM,
      dark: '#2E308E',
      bgPrimary: WHITE,
      bgSecondary: PLUM_MEDIUM,
      text: BLACK,
    },
    blue: {
      light: '#92BBE6',
      medium: BLUE_MEDIUM,
      dark: '#2F78C4',
      bgPrimary: WHITE,
      bgSecondary: BLUE_MEDIUM,
      text: BLACK,
    },
    teal: {
      light: '#97F5F7',
      medium: TEAL_MEDIUM,
      dark: '#06C7CC',
      bgPrimary: WHITE,
      bgSecondary: TEAL_MEDIUM,
      text: BLACK,
    },
  },
});

export default theme;
