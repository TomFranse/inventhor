import { createTheme, ThemeOptions } from '@mui/material/styles';
import { printThemeOptions } from './printTheme';
import { deepmerge } from '@mui/utils';

const baseThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeightRegular: 400,
    fontWeightBold: 700,
    h1: {
      fontSize: '4.236rem',
      fontWeight: 700,
      lineHeight: 1.6,
      color: '#070614',
    },
    h2: {
      fontSize: '2.618rem',
      fontWeight: 700,
      lineHeight: 1.6,
      color: '#070614',
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 700,
      lineHeight: 1.6,
      color: '#070614',
    },
    h4: {
      fontSize: '1.125rem',
      fontWeight: 700,
      lineHeight: 1.6,
      color: '#070614',
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 700,
      lineHeight: 1.6,
      color: '#070614',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 700,
      lineHeight: 1.6,
      color: '#070614',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#616166',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
      color: '#616166',
    },
  },
  palette: {
    primary: {
      main: '#CF13B3',
      light: '#E6196B',
      dark: '#8D0BD1',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#616166',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F5F7',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#070614',
      secondary: '#616166',
    },
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '999px',
          textTransform: 'none',
          padding: '8px 32px',
          fontWeight: 700,
          minWidth: '120px',
          '&.button-primary': {
            background: 'linear-gradient(45deg, var(--gradient-start), var(--gradient-center), var(--gradient-end))',
            color: '#FFFFFF',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          backgroundColor: '#FFFFFF',
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            paddingBottom: '24px',
          },
        }
      }
    },
    MuiLink: {
      defaultProps: {
        underline: 'none'
      }
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          '& .MuiStep-root': {
            position: 'relative',
            padding: '8px 0',
            minHeight: '2.618rem'
          },
          '& .MuiStepLabel-root': {
            position: 'relative',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            minHeight: '2.618rem'
          },
          '& .MuiStepLabel-iconContainer': {
            position: 'relative',
            paddingRight: 0,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center'
          },
          '& .MuiStepIcon-root': {
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            position: 'relative',
            transition: 'transform 0.3s cubic-bezier(0.2, 0, 0, 1)',
            '&:not(.Mui-completed)': {
              color: 'transparent',
              background: 'linear-gradient(45deg, #E6196B, #CF13B3)'
            },
            '&.Mui-completed': {
              animation: 'popCheck 0.3s cubic-bezier(0.2, 0, 0, 1)',
              fill: 'url(#stepGradient)'
            },
            '& circle': {
              display: 'none'
            },
            '& text': {
              fill: '#FFFFFF',
              fontFamily: 'Montserrat',
              fontWeight: 500,
              dominantBaseline: 'central'
            }
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            width: 0,
            height: 0,
          },
          '@global': {
            'svg defs': {
              position: 'absolute',
              height: 0,
              width: 0
            },
            'svg defs linearGradient#gradient': {
              'stop:first-child': {
                stopColor: '#E6196B'
              },
              'stop:last-child': {
                stopColor: '#CF13B3'
              }
            }
          },
          '@keyframes popCheck': {
            '0%': {
              transform: 'scale(1)'
            },
            '50%': {
              transform: 'scale(1.2)'
            },
            '100%': {
              transform: 'scale(1)'
            }
          },
          '& .MuiStepLabel-label': {
            fontSize: '1.2rem',
            lineHeight: 1.618,
            fontWeight: 500,
            color: '#616166'
          }
        }
      }
    }
  },
};

// Merge base theme with print theme
const mergedThemeOptions = deepmerge(baseThemeOptions, printThemeOptions);

export const theme = createTheme(mergedThemeOptions);