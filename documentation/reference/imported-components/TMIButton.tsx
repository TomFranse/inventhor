import React from 'react';
import { Button, styled, SvgIconTypeMap, ButtonProps } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

// Create a union type that includes both button and anchor properties
type TMIButtonBaseProps = ButtonProps & {
  target?: string;
  rel?: string;
};

interface TMIButtonProps extends TMIButtonBaseProps {
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  children?: React.ReactNode;
}

const StyledButton = styled(Button)(({ theme, variant }) => ({
  borderRadius: '999px',
  padding: '8px 32px',
  fontWeight: 700,
  textTransform: 'none',

  ...(variant === 'contained' && {
    background: `linear-gradient(240deg, 
      var(--gradient-end),
      var(--gradient-center), 
      var(--gradient-start))`,
    '&:hover': {
      background: `linear-gradient(240deg, 
        var(--gradient-end),
        var(--gradient-center), 
        var(--gradient-start))`,
      opacity: 0.9,
    },
  }),

  ...(variant === 'outlined' && {
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.secondary.main,
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
      borderColor: theme.palette.secondary.main,
      opacity: 0.8,
    },
  }),
}));

const TMIButton: React.FC<TMIButtonProps> = ({ 
  icon: Icon,
  children,
  variant = 'contained',
  ...props 
}) => {
  return (
    <StyledButton
      variant={variant}
      startIcon={Icon ? <Icon /> : undefined}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default TMIButton;