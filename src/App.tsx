import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Box, Typography, Grid, Divider, CircularProgress } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import theme from './theme';
import Header from './components/Header';
import ChatComponent from './components/ChatComponent';
import Card from './components/Card';
import { airtableService } from './services/airtableService';
import { CardData } from './types/airtable';

// Fallback data for cards in case of API failure
const fallbackCardData = [
  {
    id: 'fallback1',
    title: 'Narcom',
    subtitle: 'Construction of a new bridge over the river',
    icon: 'https://images.unsplash.com/photo-1586892477838-2b96e85e0f96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    link: '/projects/fallback1',
    isActive: true,
  },
  {
    id: 'fallback2',
    title: 'Bedrijfsbreed',
    subtitle: 'Al het werk gerelateerd aan de platform-ondersteuning van Inventhor.',
    icon: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    link: '/projects/fallback2',
    isActive: true,
  },
  {
    id: 'fallback3',
    title: 'Evolver',
    subtitle: 'Evolution AI powered',
    icon: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    link: '/projects/fallback3',
    isActive: true,
  },
];

/**
 * Main application component.
 * @returns A React component
 */
function App() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAirtableProjects = async () => {
      try {
        setLoading(true);
        const projectsResponse = await airtableService.fetchProjects();
        const projectCards = airtableService.mapProjectsToCards(projectsResponse);
        
        // If we have projects from Airtable, use them
        if (projectCards.length > 0) {
          setCards(projectCards);
        } else {
          // Otherwise use fallback data
          setCards(fallbackCardData);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Using default data instead.');
        setCards(fallbackCardData);
      } finally {
        setLoading(false);
      }
    };

    fetchAirtableProjects();
  }, []);

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
                Projects
              </Typography>
              <Typography variant="body1" paragraph>
                View and manage your current projects from Airtable.
              </Typography>
              
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  {error && (
                    <Typography color="error" sx={{ mb: 2 }}>
                      {error}
                    </Typography>
                  )}
                  <Grid container spacing={3}>
                    {cards.map((card) => (
                      <Grid item xs={12} sm={6} md={6} key={card.id}>
                        <Card
                          title={card.title}
                          subtitle={card.subtitle}
                          icon={card.icon || 'https://images.unsplash.com/photo-1586892477838-2b96e85e0f96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                          link={card.link}
                          isActive={card.isActive}
                          onImageError={() => {
                            // Replace failed image URL with a default one
                            setCards(prevCards => 
                              prevCards.map(c => 
                                c.id === card.id 
                                  ? { ...c, icon: 'https://images.unsplash.com/photo-1586892477838-2b96e85e0f96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' } 
                                  : c
                              )
                            );
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
