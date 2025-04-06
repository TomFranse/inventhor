import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Box, Typography, Button, Paper } from '@mui/material';
import theme from './theme';
import Header from './components/Header';

/**
 * Main application component.
 * @returns A React component
 */
function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header title="MUI Cursor Boilerplate" />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome to Your MUI Application
            </Typography>
            <Typography variant="body1" paragraph>
              This is a boilerplate for React applications using TypeScript, Vite, and Material UI.
              It follows the Google TypeScript Style Guide and includes ESLint and Prettier for code quality.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => setCount((prevCount) => prevCount + 1)}
            >
              Count is: {count}
            </Button>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
