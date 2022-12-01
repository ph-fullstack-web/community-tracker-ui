import createTheme from '@mui/material/styles/createTheme';

const DARK_LIGHT = '#BDBDBD';
const DARK_MEDIUM = "#212121";
const DARK_DARK_PLUM = '#6363e0';
const DARK_DARK_TEAL = '#04dbe0';
const DARK_DARK_BLUE = '#5995d4';
const PLUM_LIGHT = '#85A0F9';
const PLUM_MEDIUM = '#7373D8';

const BLUE_LIGHT = '#92BBE6';
const BLUE_MEDIUM = '#6AA2DC';

const TEAL_LIGHT = '#6be4e8';
//const TEAL_MEDIUM = '#26EFE9';
const TEAL_DARK = '#06C7CC';
const BLACK = '#000000';
const LIGHT_GRAY = '#ebe8e8';
const DARK_PLUM = '#2c348c';
const DARK_BLUE = '#182c6e';
const DARK_TEAL = '#0eb3b8';

const OPACITY_BLUE = 'rgba(146, 187, 230, .2)';
const OPACITY_PLUM = 'rgba(133, 160, 249, .2)';
const OPACITY_TEAL = 'rgba(107, 228, 232, .2)';
const OPACITY_DARK = '#141414';

const DARK_BORDER = 'rgb(26, 27, 30)';
const LIGHT_BORDER = 'rgb(222, 226, 230)';

export const DARK_BACKGROUND = '#3C4043';
export const LIGHT_BACKGROUND = 'rgb(248, 249, 250)';

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
      card: DARK_MEDIUM,
      circle: DARK_DARK,
      textSecondary: DARK_TEAL,
      cardSecondary: DARK_MEDIUM,
      border: DARK_LIGHT,
      bgIcon: DARK_LIGHT,
      opacityBackground: OPACITY_DARK,
      loginBorder: DARK_BORDER,
      loginBackground: DARK_BACKGROUND,
    },
    plum: {
      main: PLUM_MEDIUM,
      light: PLUM_LIGHT,
      medium: PLUM_MEDIUM,
      dark: '#2E308E',
      bgPrimary: WHITE,
      bgSecondary: PLUM_MEDIUM,
      text: BLACK,
      card: PLUM_LIGHT,
      circle: LIGHT_GRAY,
      textSecondary: DARK_PLUM,
      cardSecondary: WHITE,
      border: DARK_DARK_PLUM,
      bgIcon: WHITE,
      opacityBackground: OPACITY_PLUM,
      loginBorder: LIGHT_BORDER,
      loginBackground: LIGHT_BACKGROUND
    },
    blue: {
      main: BLUE_MEDIUM,
      light: BLUE_LIGHT,
      medium: BLUE_MEDIUM,
      dark: '#2F78C4',
      bgPrimary: WHITE,
      bgSecondary: BLUE_MEDIUM,
      text: BLACK,
      card: BLUE_LIGHT,
      opacityBackground: OPACITY_BLUE,
      circle: LIGHT_GRAY,
      textSecondary: DARK_BLUE,
      cardSecondary: WHITE,
      border: DARK_DARK_BLUE,
      bgIcon: WHITE,
      loginBorder: LIGHT_BORDER,
      loginBackground: LIGHT_BACKGROUND
    },
    teal: {
      main: TEAL_DARK,
      light: TEAL_LIGHT,
      medium: TEAL_DARK,
      dark: TEAL_DARK,
      bgPrimary: WHITE,
      bgSecondary: TEAL_DARK,
      text: BLACK,
      card: TEAL_LIGHT,
      circle: LIGHT_GRAY,
      textSecondary: TEAL_DARK,
      cardSecondary: WHITE,
      border: DARK_DARK_TEAL,
      bgIcon: WHITE,
      opacityBackground: OPACITY_TEAL,
      loginBorder: LIGHT_BORDER,
      loginBackground: LIGHT_BACKGROUND
    },
  },
});

export default theme;
