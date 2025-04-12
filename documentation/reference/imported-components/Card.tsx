import React, { useMemo } from 'react';
import { Card as MuiCard, CardContent, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { FadeInImage } from './FadeInImage';

export interface CardProps {
  title: string;
  subtitle?: string;
  icon?: string;
  link: string;
  isActive?: boolean;
  onImageError?: () => void;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  subtitle = '', 
  icon, 
  link, 
  isActive = true,
  onImageError 
}) => {
  // Memoize the truncated text to prevent unnecessary recalculations
  const truncatedSubtitle = useMemo(() => {
    if (!subtitle || typeof subtitle !== 'string') return '';
    const plainText = subtitle.replace(/[#*`]/g, '').trim();
    if (plainText.length <= 150) return plainText;
    return plainText.substring(0, 150) + '...';
  }, [subtitle]);

  const cardStyles = useMemo(() => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    textDecoration: 'none',
    transition: 'all 0.2s ease-in-out',
    opacity: isActive ? 1 : 0.6,
    filter: isActive ? 'none' : 'grayscale(40%)',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: (theme: Theme) => theme.shadows[8],
      opacity: isActive ? 1 : 0.8,
      filter: isActive ? 'none' : 'grayscale(20%)',
    },
  }), [isActive]);

  return (
    <MuiCard
      component={Link}
      to={link}
      sx={cardStyles}
    >
      {icon && (
        <FadeInImage
          src={icon}
          alt={title}
          containerHeight="140px"
          objectFit="cover"
          objectPosition="center"
          onImageError={onImageError}
        />
      )}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', pt: icon ? 2 : 3 }}>
        <Typography 
          gutterBottom 
          variant="h3"
          component="h2" 
          color={isActive ? 'text.primary' : 'text.secondary'}
          sx={{ mb: subtitle ? 1 : 0 }}
        >
          {title}
        </Typography>
        {truncatedSubtitle && (
          <Typography 
            variant="body2" 
            color={isActive ? 'text.secondary' : 'text.disabled'}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {truncatedSubtitle}
          </Typography>
        )}
      </CardContent>
    </MuiCard>
  );
};

export default React.memo(Card); 