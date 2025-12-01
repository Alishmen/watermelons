import React from 'react';
import { Box, Button, IconButton, Paper } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight, Home } from '@mui/icons-material';

interface NavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  onGoToSlide: (index: number) => void;
  onHome: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentSlide,
  totalSlides,
  onPrevious,
  onNext,
  onGoToSlide,
  onHome,
}) => {
  return (
    <Paper
      elevation={4}
      sx={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        p: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        zIndex: 1000,
      }}
    >
      <IconButton onClick={onHome} size="small" title="На главную">
        <Home />
      </IconButton>

      <IconButton
        onClick={onPrevious}
        disabled={currentSlide === 1}
        size="small"
        title="Предыдущий слайд"
      >
        <KeyboardArrowLeft />
      </IconButton>

      <Box sx={{ minWidth: 100, textAlign: 'center' }}>
        <Button
          variant="text"
          size="small"
          onClick={() => onGoToSlide(currentSlide)}
          sx={{ minWidth: 'auto' }}
        >
          {currentSlide} / {totalSlides}
        </Button>
      </Box>

      <IconButton
        onClick={onNext}
        disabled={currentSlide === totalSlides}
        size="small"
        title="Следующий слайд"
      >
        <KeyboardArrowRight />
      </IconButton>
    </Paper>
  );
};



