import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Box, Typography, Button, Paper, Divider } from '@mui/material';
import theme from './theme';
import Header from './components/Header';
import ChatComponent from './components/ChatComponent';

/**
 * Main application component.
 * @returns A React component
 */
function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header title="Inventhor" />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          {/* AI Chat Integration */}
          <Typography variant="h4" component="h1" gutterBottom>
            Inventhor AI Assistant
          </Typography>
          
          {/* Custom chat component */}
          <ChatComponent />
          
          <Divider sx={{ my: 4 }} />
          
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h5" component="h2" gutterBottom>
              About Inventhor
            </Typography>
            <Typography variant="body1" paragraph>
              Inventhor helps you innovate faster with AI-powered assistance.
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
