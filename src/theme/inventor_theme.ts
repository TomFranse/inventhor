import { createTheme, ThemeOptions } from '@mui/material/styles';
import inventhorThemeData from './Inventhor-material-theme.json';

// Define the structure for the theme schemes
interface InventhorScheme {
  primary: string;
  surfaceTint: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  outline: string;
  outlineVariant: string;
  shadow: string;
  scrim: string;
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
  [key: string]: string;
}

// Access the scheme data from the imported JSON
const lightScheme = (inventhorThemeData.schemes.light as InventhorScheme);
const darkScheme = (inventhorThemeData.schemes.dark as InventhorScheme);

// Helper function to create theme options for both light and dark mode
const createInventhorThemeOptions = (scheme: InventhorScheme, mode: 'light' | 'dark'): ThemeOptions => {
  return {
    palette: {
      mode,
      primary: {
        main: scheme.primary,
        light: mode === 'light' ? scheme.primaryContainer : scheme.inversePrimary,
        dark: mode === 'light' ? scheme.inversePrimary : scheme.primaryContainer,
        contrastText: scheme.onPrimary,
      },
      secondary: {
        main: scheme.secondary,
        light: scheme.secondaryContainer,
        dark: scheme.onSecondaryContainer,
        contrastText: scheme.onSecondary,
      },
      error: {
        main: scheme.error,
        light: scheme.errorContainer,
        dark: scheme.onErrorContainer,
        contrastText: scheme.onError,
      },
      background: {
        default: scheme.background,
        paper: scheme.surfaceContainer,
      },
      text: {
        primary: scheme.onSurface,
        secondary: scheme.onSurfaceVariant,
      },
      divider: scheme.outline,
      action: {
        active: scheme.onSurfaceVariant,
        hover: `${scheme.onSurface}14`, // 8% opacity
        selected: `${scheme.onSurface}29`, // 16% opacity
        disabled: `${scheme.onSurface}42`, // 26% opacity
        disabledBackground: `${scheme.onSurface}1F`, // 12% opacity
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
      },
      h2: {
        fontSize: '2.618rem',
        fontWeight: 700,
        lineHeight: 1.6,
      },
      h3: {
        fontSize: '1.25rem',
        fontWeight: 700,
        lineHeight: 1.6,
      },
      h4: {
        fontSize: '1.125rem',
        fontWeight: 700,
        lineHeight: 1.6,
      },
      h5: {
        fontSize: '1rem',
        fontWeight: 700,
        lineHeight: 1.6,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 700,
        lineHeight: 1.6,
      },
      body1: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.5,
      },
      body2: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.43,
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
            backgroundColor: scheme.background,
            color: scheme.onBackground,
          },
          '#root': {
            width: '100%',
            height: '100%',
          },
          a: {
            color: scheme.primary,
            textDecoration: 'none',
            '&:hover': {
              color: mode === 'light' ? scheme.inversePrimary : scheme.primaryContainer,
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
            background: scheme.surfaceContainer,
          },
          '::-webkit-scrollbar-thumb': {
            background: scheme.outline,
            borderRadius: '4px',
          },
          '::-webkit-scrollbar-thumb:hover': {
            background: scheme.onSurfaceVariant,
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
              boxShadow: 'none',
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
            backgroundColor: scheme.surface,
            backgroundImage: 'none',
            boxShadow: 'none',
          },
          elevation0: {
            boxShadow: 'none',
          },
          elevation1: {
            boxShadow: 'none',
          },
          elevation2: {
            boxShadow: 'none',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            overflow: 'hidden',
            transition: 'all 0.2s ease-in-out',
            boxShadow: 'none',
            backgroundColor: scheme.surfaceContainerHigh,
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: 'none',
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
            backgroundColor: scheme.outline,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: scheme.surface,
            boxShadow: 'none',
          },
        },
        defaultProps: {
          color: 'transparent',
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: scheme.primary,
            textDecoration: 'none',
            '&:hover': {
              color: mode === 'light' ? scheme.inversePrimary : scheme.primaryContainer,
              textDecoration: 'none',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderColor: scheme.outline,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: scheme.primary,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: scheme.primary,
            },
          },
          notchedOutline: {
            borderColor: scheme.outline,
          },
        },
      },
    },
  };
};

// Create the light theme
const lightThemeOptions = createInventhorThemeOptions(lightScheme, 'light');
export const lightTheme = createTheme(lightThemeOptions);

// Create the dark theme
const darkThemeOptions = createInventhorThemeOptions(darkScheme, 'dark');
export const darkTheme = createTheme(darkThemeOptions);

// Default to the dark theme
const theme = darkTheme;
export default theme; 