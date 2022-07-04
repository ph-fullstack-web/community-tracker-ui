import createTheme from '@mui/material/styles/createTheme';

const DARK_LIGHT = '#BDBDBD';
const DARK_MEDIUM = "#212121";

const PLUM_LIGHT = '#85A0F9';
const PLUM_MEDIUM = '#7373D8';

const BLUE_LIGHT = '#92BBE6';
const BLUE_MEDIUM = '#6AA2DC';

const TEAL_LIGHT = '#6be4e8';
//const TEAL_MEDIUM = '#26EFE9';
const TEAL_DARK = '#06C7CC';
const BLACK = '#000000';

export const DARK_DARK = "#141414";
export const WHITE = '#FFFFFF';

const theme = createTheme({
  palette: {
    dark: {
      main: DARK_LIGHT,
      light: DARK_LIGHT,
      medium: DARK_MEDIUM,
      dark: DARK_DARK,
      bgPrimary: DARK_DARK,
      bgSecondary: DARK_MEDIUM,
      text: DARK_LIGHT,
      card: DARK_MEDIUM
    },
    plum: {
      main: PLUM_MEDIUM,
      light: PLUM_LIGHT,
      medium: PLUM_MEDIUM,
      dark: '#2E308E',
      bgPrimary: WHITE,
      bgSecondary: PLUM_MEDIUM,
      text: BLACK,
      card: PLUM_LIGHT
    },
    blue: {
      main: BLUE_MEDIUM,
      light: BLUE_LIGHT,
      medium: BLUE_MEDIUM,
      dark: '#2F78C4',
      bgPrimary: WHITE,
      bgSecondary: BLUE_MEDIUM,
      text: BLACK,
      card: BLUE_LIGHT
    },
    teal: {
      main: TEAL_DARK,
      light: TEAL_LIGHT,
      medium: TEAL_DARK,
      dark: TEAL_DARK,
      bgPrimary: WHITE,
      bgSecondary: TEAL_DARK,
      text: BLACK,
      card: TEAL_LIGHT
    },
  },
});

export default theme;
