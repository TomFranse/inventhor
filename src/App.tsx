import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Box, Typography, Grid, Divider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import theme from './theme';
import Header from './components/Header';
import ChatComponent from './components/ChatComponent';
import Card from './components/Card';

// Dummy data for cards
const cardData = [
  {
    title: 'Idea Generator',
    subtitle: 'Generate innovative ideas based on market trends and user needs.',
    icon: 'https://images.unsplash.com/photo-1586892477838-2b96e85e0f96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    link: '/idea-generator',
    isActive: true,
  },
  {
    title: 'Market Research',
    subtitle: 'Analyze market trends and competition to validate your ideas.',
    icon: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    link: '/market-research',
    isActive: true,
  },
  {
    title: 'Business Model Canvas',
    subtitle: 'Develop your business model with our interactive canvas tool.',
    icon: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    link: '/business-model',
    isActive: true,
  },
  {
    title: 'Prototyping Tools',
    subtitle: 'Create quick prototypes to test your ideas with real users.',
    icon: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    link: '/prototyping',
    isActive: false,
  },
];

/**
 * Main application component.
 * @returns A React component
 */
function App() {
  return (
    <BrowserRouter>
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
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Innovation Tools
              </Typography>
              <Typography variant="body1" paragraph>
                Explore our tools to accelerate your innovation process.
              </Typography>
              
              <Grid container spacing={3}>
                {cardData.map((card, index) => (
                  <Grid item xs={12} sm={6} md={6} key={index}>
                    <Card
                      title={card.title}
                      subtitle={card.subtitle}
                      icon={card.icon}
                      link={card.link}
                      isActive={card.isActive}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
