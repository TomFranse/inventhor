import React, { useState, useEffect } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  Collapse,
  CircularProgress
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SaveIcon from '@mui/icons-material/Save';
import { getUserInstructions, saveUserInstructions } from '../firebase-config';

interface UserInstructionsFormProps {
  userId: string;
  onInstructionsChange: (instructions: string) => void;
}

/**
 * Form component for setting custom AI instructions
 */
const UserInstructionsForm: React.FC<UserInstructionsFormProps> = ({ 
  userId, 
  onInstructionsChange 
}) => {
  const [instructions, setInstructions] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Load existing instructions on component mount
  useEffect(() => {
    const loadInstructions = async () => {
      setIsLoading(true);
      try {
        const savedInstructions = await getUserInstructions(userId);
        if (savedInstructions) {
          setInstructions(savedInstructions);
          onInstructionsChange(savedInstructions);
        }
      } catch (error) {
        console.error('Error loading instructions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInstructions();
  }, [userId, onInstructionsChange]);

  // Handle saving instructions
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveUserInstructions(userId, instructions);
      onInstructionsChange(instructions);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000); // Reset saved status after 3 seconds
    } catch (error) {
      console.error('Error saving instructions:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Toggle expanded state
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Paper 
      elevation={1} 
      sx={{ 
        p: 2, 
        mb: 2
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer'
        }}
        onClick={toggleExpanded}
      >
        <Typography variant="subtitle1" fontWeight="medium">
          AI Custom Instructions
        </Typography>
        <IconButton size="small">
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      
      <Collapse in={expanded}>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" paragraph>
            Set custom instructions for the AI assistant. These instructions will be applied to all your conversations.
          </Typography>
          
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress size={24} />
            </Box>
          ) : (
            <>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                placeholder="E.g., You are a helpful assistant for Inventhor. Always provide concise answers and focus on business and innovation topics."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
              
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography 
                  variant="caption" 
                  color={saved ? 'success.main' : 'text.secondary'}
                >
                  {saved ? 'Instructions saved successfully!' : 'Instructions will be applied to all conversations'}
                </Typography>
                
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Instructions'}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Collapse>
    </Paper>
  );
};

export default UserInstructionsForm; 