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
    action: {
      active: 'rgba(255, 255, 255, 0.7)',
      hover: 'rgba(255, 255, 255, 0.1)',
      selected: 'rgba(255, 255, 255, 0.2)',
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
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
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },
        html: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          height: '100%',
          width: '100%',
        },
        body: {
          height: '100%',
          width: '100%',
          backgroundColor: '#121212',
          color: '#FFFFFF',
        },
        '#root': {
          width: '100%',
          height: '100%',
        },
        a: {
          color: '#2979FF',
          textDecoration: 'none',
          '&:hover': {
            color: '#5393FF',
          },
        },
        'img': {
          maxWidth: '100%',
          height: 'auto',
          display: 'block',
        },
        '::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '::-webkit-scrollbar-track': {
          background: '#1E1E1E',
        },
        '::-webkit-scrollbar-thumb': {
          background: '#444',
          borderRadius: '4px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: '#555',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 6,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E',
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
        },
        elevation2: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          overflow: 'hidden',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '16px',
          '&:last-child': {
            paddingBottom: '16px',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1A1A1A',
          boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)',
        },
      },
      defaultProps: {
        color: 'transparent',
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#2979FF',
          textDecoration: 'none',
          '&:hover': {
            color: '#5393FF',
            textDecoration: 'none',
          },
        },
      },
    },
  },
};

const theme = createTheme(baseThemeOptions);
export default theme;
