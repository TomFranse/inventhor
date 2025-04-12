import { ThemeOptions } from '@mui/material/styles';

// Print-specific constants
const PRINT_SPACING = {
  small: '4mm',
  medium: '8mm',
  large: '1cm',
  xlarge: '1.5cm'
};

const PRINT_COLORS = {
  background: {
    default: '#FFFFFF',
    light: '#F5F5F5',
    paper: 'transparent'
  },
  text: {
    primary: '#070614',
    secondary: '#616166'
  },
  accent: {
    primary: '#E6196B'
  },
  border: '#333333'
};

const PRINT_TYPOGRAPHY = {
  h1: '18pt',
  h2: '14pt',
  h3: '12pt',
  body: '11pt',
  small: '10pt'
};

export const printThemeOptions: ThemeOptions = {
  typography: {
    // Base typography settings for print
    fontFamily: 'Montserrat, Arial, sans-serif',
    
    h1: {
      '@media print': {
        fontSize: PRINT_TYPOGRAPHY.h1,
        fontWeight: 700,
        color: PRINT_COLORS.text.primary,
        marginBottom: PRINT_SPACING.medium,
        pageBreakAfter: 'avoid',
        pageBreakInside: 'avoid'
      }
    },
    h2: {
      '@media print': {
        fontSize: PRINT_TYPOGRAPHY.h2,
        fontWeight: 500,
        color: PRINT_COLORS.text.primary,
        marginTop: PRINT_SPACING.large,
        marginBottom: PRINT_SPACING.medium,
        pageBreakAfter: 'avoid'
      }
    },
    h3: {
      '@media print': {
        fontSize: PRINT_TYPOGRAPHY.h3,
        fontWeight: 500,
        color: PRINT_COLORS.text.primary,
        marginTop: PRINT_SPACING.medium,
        marginBottom: PRINT_SPACING.small,
        pageBreakAfter: 'avoid'
      }
    },
    body1: {
      '@media print': {
        fontSize: PRINT_TYPOGRAPHY.body,
        lineHeight: 1.5,
        color: PRINT_COLORS.text.secondary,
        marginBottom: PRINT_SPACING.small
      }
    },
    body2: {
      '@media print': {
        fontSize: PRINT_TYPOGRAPHY.small,
        lineHeight: 1.4,
        color: PRINT_COLORS.text.secondary
      }
    }
  },
  
  components: {
    // Paper components (base for most printed elements)
    MuiPaper: {
      styleOverrides: {
        root: {
          '@media print': {
            backgroundColor: PRINT_COLORS.background.paper,
            boxShadow: 'none',
            margin: 0,
            padding: 0
          }
        }
      }
    },

    // Container modifications for print
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media print': {
            padding: 0,
            margin: 0,
            maxWidth: 'none'
          }
        }
      }
    },

    // Table styles for print
    MuiTable: {
      styleOverrides: {
        root: {
          '@media print': {
            pageBreakInside: 'avoid',
            borderCollapse: 'collapse',
            width: '100%',
            marginBottom: PRINT_SPACING.large
          }
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '@media print': {
            display: 'table-header-group'
          }
        }
      }
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '@media print': {
            pageBreakInside: 'auto'
          }
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '@media print': {
            pageBreakInside: 'avoid',
            pageBreakAfter: 'auto'
          }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          '@media print': {
            border: `1px solid ${PRINT_COLORS.border}`,
            padding: PRINT_SPACING.medium,
            fontSize: PRINT_TYPOGRAPHY.body
          }
        },
        head: {
          '@media print': {
            backgroundColor: PRINT_COLORS.background.light,
            fontWeight: 500,
            color: PRINT_COLORS.text.primary
          }
        }
      }
    },

    // Card modifications for print
    MuiCard: {
      styleOverrides: {
        root: {
          '@media print': {
            boxShadow: 'none',
            border: 'none',
            borderRadius: 0
          }
        }
      }
    },

    // Button modifications for print
    MuiButton: {
      styleOverrides: {
        root: {
          '@media print': {
            display: 'none'
          }
        }
      }
    },

    // Icon modifications for print
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          '@media print': {
            // Ensure icons print well in black and white
            '@media print and (monochrome)': {
              fill: PRINT_COLORS.text.primary
            }
          }
        }
      }
    },

    // Divider modifications for print
    MuiDivider: {
      styleOverrides: {
        root: {
          '@media print': {
            borderColor: PRINT_COLORS.border,
            margin: `${PRINT_SPACING.medium} 0`
          }
        }
      }
    }
  },

  // Print-specific palette overrides
  palette: {
    background: {
      default: PRINT_COLORS.background.default,
      paper: PRINT_COLORS.background.paper
    },
    text: {
      primary: PRINT_COLORS.text.primary,
      secondary: PRINT_COLORS.text.secondary
    }
  }
}; 