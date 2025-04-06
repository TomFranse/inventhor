import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

interface HeaderProps {
  title: string;
}

/**
 * Header component for the application.
 * @param props - Component props
 * @returns A React component
 */
const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <Box>
          <Button color="inherit">Home</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Contact</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 