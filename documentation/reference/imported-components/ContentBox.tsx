import { Box, Theme } from '@mui/material';
import { styled } from '@mui/material/styles';

const ContentBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  padding: theme.spacing(6),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(4),
  width: '100%',
  boxSizing: 'border-box',

  // Responsive padding
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    gap: theme.spacing(2),
  },

  // Full width at mobile breakpoint
  [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
    width: '100%',
    padding: theme.spacing(4),
    borderRadius: 0,
  },

  // Style nested typography elements
  '& .MuiTypography-h4': {
    textAlign: 'center',
    maxWidth: '800px',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
  },

  // Style nested button groups
  '& .MuiButtonGroup-root': {
    width: '100%',
    maxWidth: '600px',
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(2),
  },

  // Allow grids to take full width
  '& .MuiGrid-container': {
    width: '100%',
    margin: 0,
    padding: 0,
  },
}));

export default ContentBox;