import React, { useEffect, useState, useCallback } from 'react';
import { Box, BoxProps, Skeleton } from '@mui/material';

// Keep track of loaded images across all instances
const loadedImages = new Set<string>();

interface FadeInImageProps extends Omit<BoxProps, 'component'> {
  src?: string;
  alt: string;
  aspectRatio?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  fadeInDuration?: number;
  containerHeight?: string | number;
  containerWidth?: string | number;
  gradient?: {
    direction: string;
    colors: string[];
  };
  onImageError?: () => void;
}

export const FadeInImage: React.FC<FadeInImageProps> = ({
  src,
  alt,
  aspectRatio,
  objectFit = 'cover',
  objectPosition = 'center',
  fadeInDuration = 0.3,
  containerHeight,
  containerWidth,
  gradient,
  onImageError,
  sx,
  ...boxProps
}) => {
  const [imageLoaded, setImageLoaded] = useState(() => src ? loadedImages.has(src) : false);
  const [isLoading, setIsLoading] = useState(() => src ? !loadedImages.has(src) : false);
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
  const [hasError, setHasError] = useState(false);

  const handleImageError = useCallback(async (e: Event) => {
    const img = e.target as HTMLImageElement;
    
    try {
      // Try to fetch the image to get the actual error
      const response = await fetch(img.src);
      
      // If we get a 410 Gone status, the URL has expired
      if (response.status === 410) {
        console.log('Image URL expired:', img.src);
        // Remove from loaded images cache
        loadedImages.delete(img.src);
        // Trigger refresh callback
        onImageError?.();
      }
    } catch (error) {
      console.error('Error checking image:', error);
    }

    if (src === currentSrc && src) {
      loadedImages.delete(src);
      setImageLoaded(false);
      setIsLoading(false);
      setHasError(true);
    }
  }, [src, currentSrc, onImageError]);

  useEffect(() => {
    if (src !== currentSrc) {
      // Reset states when src changes
      setHasError(false);
      setImageLoaded(false);
      setIsLoading(true);
      setCurrentSrc(src);
      
      // If the image is already in our cache and verified accessible, use it
      if (src && loadedImages.has(src)) {
        fetch(src).then(response => {
          if (response.ok) {
            setImageLoaded(true);
            setIsLoading(false);
          } else if (response.status === 410) {
            // URL expired, remove from cache and trigger refresh
            loadedImages.delete(src);
            onImageError?.();
          }
        }).catch(() => {
          if (src) {
            loadedImages.delete(src);
          }
          setHasError(true);
        });
      }
    }

    if (!src) return;

    const img = new Image();
    img.src = src;

    const handleLoad = () => {
      if (src === currentSrc) {
        loadedImages.add(src);
        setImageLoaded(true);
        setIsLoading(false);
        setHasError(false);
      }
    };

    // If the image is already cached by the browser, verify it's still accessible
    if (img.complete) {
      fetch(src).then(response => {
        if (response.ok) {
          handleLoad();
        } else if (response.status === 410) {
          loadedImages.delete(src);
          onImageError?.();
        }
      }).catch(() => {
        setHasError(true);
      });
    }

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleImageError);

    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleImageError);
    };
  }, [src, currentSrc, handleImageError, onImageError]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: containerWidth || '100%',
        height: containerHeight || (aspectRatio ? 0 : '100%'),
        paddingTop: aspectRatio ? `${(1 / aspectRatio) * 100}%` : undefined,
        bgcolor: '#616166',
        overflow: 'hidden',
        ...sx
      }}
      {...boxProps}
    >
      {isLoading && !hasError && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height="100%"
          sx={{
            position: aspectRatio ? 'absolute' : 'relative',
            top: 0,
            left: 0,
            bgcolor: '#616166',
            '&::after': {
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
            },
          }}
        />
      )}
      {src && !hasError && (
        <Box
          component="img"
          src={src}
          alt={alt}
          sx={{
            position: aspectRatio ? 'absolute' : 'relative',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit,
            objectPosition,
            opacity: imageLoaded ? 1 : 0,
            transition: `opacity ${fadeInDuration}s ease-in-out`,
            display: 'block',
          }}
        />
      )}
      {gradient && (
        <Box
          sx={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(${gradient.direction}, ${gradient.colors.join(', ')})`,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
}; 