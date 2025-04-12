
import { createTheme, ThemeOptions } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

// Base Inventor dark theme
const baseThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#2979FF', // Inventor Blue
    },
    secondary: {
      main: '#FF9100', // Spark Orange
    },
    background: {
      default: '#121212', // Main dark background
      paper: '#1E1E1E', // Slightly lighter for surfaces
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255,255,255,0.7)',
    },
    divider: 'rgba(255,255,255,0.12)',
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeightRegular: 400,
    fontWeightBold: 700,
    h1: {
      fontSize: '4.236rem',
      fontWeight: 700,
      lineHeight: 1.6,
      color: '#FFFFFF',
    },
    h2: {
      fontSize: '2.618rem',
      fontWeight: 700,
      lineHeight: 1.6,
      color: '#FFFFFF',
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 700,
      lineHeight: 1.6,
      color: '#FFFFFF',
    },
    h4: {
      fontSize: '1.125rem',
      fontWeight: 700,
      lineHeight: 1.6,
      color: '#FFFFFF',
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 700,
      lineHeight: 1.6,
      color: '#FFFFFF',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 700,
      lineHeight: 1.6,
      color: '#FFFFFF',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#FFFFFF',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.43,
      color: 'rgba(255,255,255,0.7)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 6,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E',
        },
      },
    },
  },
};

const theme = createTheme(baseThemeOptions);
export default theme;
