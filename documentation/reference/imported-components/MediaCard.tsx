import React from 'react';
import { Card, CardContent, Typography, Box, IconButton, CardActionArea, Tooltip } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Media } from '../../types/airtable';
import { FadeInImage } from './FadeInImage';

interface MediaCardProps {
  media: Media;
}

const MediaCard: React.FC<MediaCardProps> = ({ media }) => {
  const { fields } = media;
  const imageUrl = fields.Afbeelding?.[0]?.url;

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(fields.URL, '_blank', 'noopener,noreferrer');
  };

  if (!fields.URL) return null;

  const handleCardClick = () => {
    window.open(fields.URL, '_blank', 'noopener,noreferrer');
  };

  const tooltipContent = (
    <Box sx={{ p: 1, maxWidth: 300 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 500, color: 'common.white', mb: 0.5 }}>
        {fields.Titel}
      </Typography>
      {fields.Beschrijving && (
        <Typography variant="body2" sx={{ color: 'common.white', opacity: 0.9 }}>
          {fields.Beschrijving}
        </Typography>
      )}
    </Box>
  );

  return (
    <Tooltip 
      title={tooltipContent}
      placement="top"
      arrow
      enterDelay={500}
      enterNextDelay={500}
      sx={{
        bgcolor: 'background.paper',
        '& .MuiTooltip-tooltip': {
          bgcolor: 'primary.main',
          maxWidth: 300,
        },
        '& .MuiTooltip-arrow': {
          color: 'primary.main',
        }
      }}
    >
      <Card 
        sx={{ 
          display: 'flex',
          height: '80px',
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '40px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: (theme) => theme.shadows[4],
          }
        }}
      >
        <CardActionArea 
          onClick={handleCardClick}
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            height: '100%'
          }}
        >
          {imageUrl && (
            <Box sx={{ flexShrink: 0 }}>
              <FadeInImage
                src={imageUrl}
                alt={fields.Titel}
                containerWidth="80px"
                containerHeight="80px"
                objectFit="cover"
              />
            </Box>
          )}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            flex: 1,
            minWidth: 0,
            justifyContent: 'center',
          }}>
            <CardContent sx={{ 
              flex: 1,
              py: 1,
              px: 2,
              '&:last-child': { pb: 1 },
              pr: fields.URL ? 6 : 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <Typography 
                variant="subtitle2"
                component="h3"
                sx={{ 
                  fontWeight: 500,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {fields.Titel}
              </Typography>
              {fields.Beschrijving && (
                <Typography 
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    lineHeight: 1.4,
                    mt: 0.5
                  }}
                >
                  {fields.Beschrijving}
                </Typography>
              )}
            </CardContent>
          </Box>
        </CardActionArea>
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            pr: 1.5,
            zIndex: 1
          }}
        >
          <IconButton
            onClick={handleIconClick}
            size="medium"
            sx={{
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <OpenInNewIcon />
          </IconButton>
        </Box>
      </Card>
    </Tooltip>
  );
};

export default MediaCard; 