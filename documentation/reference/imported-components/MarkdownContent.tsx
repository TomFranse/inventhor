import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, useTheme } from '@mui/material';

interface MarkdownContentProps {
  content: string | unknown;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  const theme = useTheme();

  const markdownContent = (() => {
    if (!content) return '';
    if (content === 'false') return '';
    if (typeof content === 'string') {
      // First move any spaces that are inside the bold markers to outside
      return content.replace(/\*\*(.*?)\*\*/g, (_, p1) => {
        // Split the content into the text and trailing spaces
        const [, text, spaces] = p1.match(/^(.*?)([\s]*)$/);
        return `**${text}**${spaces}`;
      });
    }
    if (typeof content === 'object' && content !== null) {
      try {
        return JSON.stringify(content);
      } catch {
        return '';
      }
    }
    return String(content);
  })();

  if (!markdownContent) return null;

  return (
    <Box sx={{ 
      '& p': { 
        ...theme.typography.body1,
        mb: 2 
      },
      '& h1': {
        ...theme.typography.h2,
        mb: 2,
        mt: 3
      },
      '& h2': {
        ...theme.typography.h3,
        mb: 2,
        mt: 3
      },
      '& h3': {
        ...theme.typography.h4,
        mb: 2,
        mt: 3
      },
      '& ul, & ol': {
        pl: 3,
        mb: 2,
        listStylePosition: 'outside',
      },
      '& li': {
        ...theme.typography.body1,
        mb: 1,
        pl: 1,
      },
      '& a': {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline'
        }
      }
    }}>
      <ReactMarkdown
        components={{
          a: ({ node, ...props }) => (
            <a 
              {...props} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {props.children || props.href}
            </a>
          )
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </Box>
  );
};

export default MarkdownContent; 