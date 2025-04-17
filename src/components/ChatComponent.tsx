import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  CircularProgress, 
  Alert, 
  IconButton,
  Snackbar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HistoryIcon from '@mui/icons-material/History';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';
import firebaseApp, { 
  db, 
  saveConversation, 
  getConversation,
  getRecentConversations 
} from '../firebase-config';
import UserInstructionsForm from './UserInstructionsForm';
import { v4 as uuidv4 } from 'uuid';

// Define message interface
interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

/**
 * Custom AI Chat component that directly uses the OpenAI API.
 * @returns A React component containing a custom chat interface
 */
const ChatComponent: React.FC = () => {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [currentConversationId, setCurrentConversationId] = useState(() => uuidv4());
  const [userInstructions, setUserInstructions] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Menu state
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [historyAnchorEl, setHistoryAnchorEl] = useState<null | HTMLElement>(null);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [recentConversations, setRecentConversations] = useState<any[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  
  // Check if the OpenAI API key is set
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const projectId = import.meta.env.VITE_OPENAI_PROJECT_ID;
  
  // API key validation
  const isApiKeyValid = apiKey && 
    apiKey !== 'your_openai_api_key_here' && 
    (apiKey.startsWith('sk-') || apiKey.startsWith('sk-proj-') || apiKey.startsWith('sk-svcacct-'));
  
  // Configuration for Firebase integration
  const firebaseEnabled = !!firebaseApp && !!db;
  
  // Generate a temporary user ID (in a real app, this would come from authentication)
  const userId = 'user-' + (firebaseEnabled ? import.meta.env.VITE_FIREBASE_PROJECT_ID : 'local');
  
  // Debug logs only in development
  if (import.meta.env.DEV) {
    console.log("API Key valid:", isApiKeyValid);
    console.log("API Key format:", apiKey?.substring(0, 12) + "...");
    console.log("Firebase enabled:", firebaseEnabled);
  }
  
  // Handle API key validation on component mount
  useEffect(() => {
    if (!isApiKeyValid) {
      setError('OpenAI API key is not set or invalid. Please add a valid API key to your .env.local file.');
    } else {
      setError(null);
    }
  }, [isApiKeyValid]);
  
  // Save conversation to Firestore when messages change
  useEffect(() => {
    const saveMessages = async () => {
      if (firebaseEnabled && messages.length > 0) {
        await saveConversation(currentConversationId, messages);
      }
    };
    
    saveMessages();
  }, [firebaseEnabled, messages, currentConversationId]);

  // Handle effect for showing Firebase status
  useEffect(() => {
    if (firebaseEnabled) {
      setSnackbarMessage('Firebase connected: Chat persistence enabled');
      setIsSnackbarOpen(true);
    }
  }, [firebaseEnabled]);

  // Function to call OpenAI API directly
  const callOpenAI = async (userMessage: string) => {
    if (!isApiKeyValid) return;
    
    setIsLoading(true);
    
    try {
      // Prepare conversation history in the format OpenAI expects
      const messageHistory = [
        // Add system message if user instructions exist
        ...(userInstructions ? [{ role: "system", content: userInstructions }] : []),
        
        // Add previous messages from the conversation
        ...messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        
        // Add the new user message
        { role: "user", content: userMessage }
      ];
      
      // Prepare headers based on API key type
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      };
      
      // Only add the OpenAI-Organization header if using a standard API key
      // Special keys (project-based, service account) already have org info embedded
      const isSpecialKey = apiKey?.startsWith('sk-proj-') || apiKey?.startsWith('sk-svcacct-');
      if (projectId && !isSpecialKey) {
        headers['OpenAI-Organization'] = projectId;
      }
      
      // Call OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: messageHistory,
          temperature: 0.7,
          max_tokens: 2048
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
      
      // Add user message to the conversation
      const userMsg: Message = {
        id: uuidv4(),
        role: 'user',
        content: userMessage,
        timestamp: new Date()
      };
      
      // Add AI response to the conversation
      const aiMsg: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };
      
      // Update messages state
      setMessages(prevMessages => [...prevMessages, userMsg, aiMsg]);
      
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      setError(error instanceof Error ? error.message : 'Failed to communicate with OpenAI API');
      setIsSnackbarOpen(true);
      
      // Still add the user message even if there's an error
      const userMsg: Message = {
        id: uuidv4(),
        role: 'user',
        content: userMessage,
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, userMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sending messages
  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      callOpenAI(inputValue.trim());
      setInputValue('');
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  // Handle snackbar close
  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };
  
  // Handle menu open
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  
  // Handle menu close
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  
  // Handle history button click
  const handleHistoryClick = async () => {
    handleMenuClose();
    
    try {
      setIsLoadingHistory(true);
      const conversations = await getRecentConversations(10);
      setRecentConversations(conversations);
      setIsHistoryDialogOpen(true);
    } catch (error) {
      console.error('Error loading conversation history:', error);
      setSnackbarMessage('Error loading conversation history');
      setIsSnackbarOpen(true);
    } finally {
      setIsLoadingHistory(false);
    }
  };
  
  // Handle opening a conversation from history
  const handleOpenConversation = async (conversationId: string) => {
    try {
      const conversation = await getConversation(conversationId);
      
      if (conversation && conversation.messages) {
        setMessages(conversation.messages);
        setCurrentConversationId(conversationId);
        setIsHistoryDialogOpen(false);
        setSnackbarMessage('Conversation loaded');
        setIsSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error loading conversation:', error);
      setSnackbarMessage('Error loading conversation');
      setIsSnackbarOpen(true);
    }
  };
  
  // Handle creating a new chat
  const handleNewChat = () => {
    setMessages([]);
    setCurrentConversationId(uuidv4());
  };
  
  // Handle user instructions change
  const handleInstructionsChange = (instructions: string) => {
    setUserInstructions(instructions);
  };

  return (
    <>
      {/* User instructions form */}
      {firebaseEnabled && (
        <UserInstructionsForm 
          userId={userId} 
          onInstructionsChange={handleInstructionsChange} 
        />
      )}

      {/* Error banner */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      
      <Paper 
        elevation={0} 
        sx={{ 
          overflow: 'hidden',
          height: 400,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Menu button - aligned with theme's transparent/minimalist header style */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          p: 1
        }}>
          <IconButton 
            size="small" 
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>
        
        {/* Messages container */}
        <Box sx={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {/* Welcome message if no messages and no error */}
          {messages.length === 0 && !error && (
            <Box sx={{ 
              padding: '20px', 
              textAlign: 'center',
              color: 'text.secondary',
              mt: 2
            }}>
              <Typography variant="body1">
                Welcome to Inventhor! Ask me anything to get started.
              </Typography>
              {firebaseEnabled && (
                <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'success.main' }}>
                  Conversation persistence is enabled via Firebase
                </Typography>
              )}
              {userInstructions && (
                <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'info.main' }}>
                  Custom instructions are active
                </Typography>
              )}
            </Box>
          )}
          
          {/* Message bubbles */}
          {messages.map((msg) => (
            <Box 
              key={msg.id} 
              sx={{
                padding: '12px 16px',
                maxWidth: '80%',
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                bgcolor: msg.role === 'user' ? 'primary.main' : 'surfaceContainerHigh',
                color: msg.role === 'user' ? 'primary.contrastText' : 'text.primary',
                borderRadius: '12px',
                borderTopRightRadius: msg.role === 'user' ? 0 : '12px',
                borderTopLeftRadius: msg.role === 'user' ? '12px' : 0,
              }}
            >
              <Typography variant="body1">
                {msg.content}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  display: 'block', 
                  mt: 0.5, 
                  textAlign: msg.role === 'user' ? 'right' : 'left',
                  color: msg.role === 'user' ? 'rgba(255,255,255,0.8)' : 'text.secondary'
                }}
              >
                {msg.role === 'user' ? 'You' : 'AI'} • {new Date(msg.timestamp).toLocaleTimeString()}
              </Typography>
            </Box>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <Box sx={{ 
              padding: '12px 16px',
              maxWidth: '80%',
              alignSelf: 'flex-start',
              bgcolor: 'surfaceContainerHigh',
              borderRadius: '12px',
              borderTopLeftRadius: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <CircularProgress size={16} />
              <Typography variant="body2">Thinking...</Typography>
            </Box>
          )}
        </Box>
        
        {/* Input area */}
        <Box sx={{ 
          display: 'flex', 
          padding: '12px 16px'
        }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder={isApiKeyValid ? "Type your message..." : "API key not configured"}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            multiline
            maxRows={3}
            sx={{ mr: 1 }}
            disabled={!isApiKeyValid || isLoading}
          />
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleSend}
            disabled={!isApiKeyValid || isLoading || inputValue.trim() === ''}
            sx={{ minWidth: '100px' }}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </Box>
      </Paper>
      
      {/* Status notifications */}
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message={snackbarMessage}
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
      
      {/* Menu for additional options */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleHistoryClick}>
          <ListItemIcon>
            <HistoryIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Conversation History</ListItemText>
        </MenuItem>
      </Menu>
      
      {/* Conversation History Dialog */}
      <Dialog
        open={isHistoryDialogOpen}
        onClose={() => setIsHistoryDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Conversation History</DialogTitle>
        <DialogContent dividers>
          {isLoadingHistory ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : recentConversations.length > 0 ? (
            <List>
              {recentConversations.map((conv) => {
                const firstMessage = conv.messages?.[0]?.content || 'Empty conversation';
                const date = conv.updatedAt ? new Date(conv.updatedAt.seconds * 1000).toLocaleString() : 'Unknown date';
                
                return (
                  <ListItem
                    key={conv.id}
                    divider
                    onClick={() => handleOpenConversation(conv.id)}
                  >
                    <ListItemText 
                      primary={firstMessage.substring(0, 60) + (firstMessage.length > 60 ? '...' : '')} 
                      secondary={date}
                    />
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
              No conversation history found
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsHistoryDialogOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChatComponent; 