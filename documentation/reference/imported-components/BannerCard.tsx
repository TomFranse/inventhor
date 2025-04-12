import React from 'react';
import { Box, Card as MuiCard, CardContent, Typography, CardActionArea, Radio } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelectedProject } from '../../hooks/useSelectedProject';
import { useProjects } from '../../hooks/useProjects';
import { FadeInImage } from '../common/FadeInImage';

export interface BannerCardData {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  link: string;
}

interface BannerCardProps {
  data: BannerCardData;
}

const BannerCard: React.FC<BannerCardProps> = ({ data }) => {
  const { id, title, subtitle, imageUrl, link } = data;
  const { projects } = useProjects();
  const { selectedProjectId, setSelectedProject } = useSelectedProject();
  const isSelected = selectedProjectId === id;

  const handleRadioClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const project = projects.find(p => p.id === id);
    setSelectedProject(project || null);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box
        onClick={handleRadioClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          borderRadius: '50%',
          transition: 'background-color 0.2s',
          '&:hover': { 
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            cursor: 'pointer'
          }
        }}
      >
        <Radio
          checked={isSelected}
          onClick={handleRadioClick}
          sx={{
            padding: 0,
            '&:hover': { 
              backgroundColor: 'transparent'
            }
          }}
        />
      </Box>
      <MuiCard 
        sx={{ 
          height: '150px',
          display: 'flex',
          width: '100%',
          bgcolor: 'background.paper',
        }}
      >
        <CardActionArea component={Link} to={link} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <FadeInImage
            src={imageUrl}
            alt={title}
            containerWidth="150px"
            containerHeight="150px"
            objectFit="cover"
            sx={{
              flexShrink: 0,
            }}
          />
          <CardContent sx={{ flex: 1, p: 3 }}>
            <Typography 
              variant="h3"
              gutterBottom
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography 
                variant="subtitle2"
                color="text.secondary"
              >
                {subtitle}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
      </MuiCard>
    </Box>
  );
};

export default BannerCard; 