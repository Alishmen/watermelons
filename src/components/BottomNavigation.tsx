import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';

interface NavigationButton {
  id: string;
  label: string;
  color: string;
  bgColor: string;
}

interface BottomNavigationProps {
  currentCategory: string;
  onCategoryChange: (category: string) => void;
}

const navigationButtons: NavigationButton[] = [
  { id: 'safety-lek', label: 'S Безопасность (Лек)', color: '#fff', bgColor: '#f44336' },
  { id: 'safety-info', label: 'S Безопасность (Информ)', color: '#fff', bgColor: '#f44336' },
  { id: 'quality-tfoms', label: 'Q Качество (Пар МО)(ТФОМС)', color: '#fff', bgColor: '#2196f3' },
  { id: 'quality-i9', label: 'Q Качество (И9)', color: '#fff', bgColor: '#2196f3' },
  { id: 'quality-eck', label: 'Q Качество (ЕЦК)', color: '#fff', bgColor: '#2196f3' },
  { id: 'execution', label: 'D Исполнение (Кри главы)', color: '#fff', bgColor: '#4caf50' },
  { id: 'costs', label: 'С Затраты', color: '#000', bgColor: '#ffc107' },
  { id: 'corpculture', label: 'М КорпКультура', color: '#fff', bgColor: '#9c27b0' },
];

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentCategory,
  onCategoryChange,
}) => {
  return (
    <Paper
      elevation={4}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        p: 1,
        zIndex: 1000,
        borderRadius: 0,
      }}
    >
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
        {navigationButtons.map((button) => (
          <Button
            key={button.id}
            onClick={() => onCategoryChange(button.id)}
            variant={currentCategory === button.id ? 'contained' : 'outlined'}
            sx={{
              bgcolor: currentCategory === button.id ? button.bgColor : 'transparent',
              color: currentCategory === button.id ? button.color : button.bgColor,
              borderColor: button.bgColor,
              borderWidth: 2,
              borderStyle: 'solid',
              '&:hover': {
                bgcolor: button.bgColor,
                color: button.color,
                borderColor: button.bgColor,
              },
              fontSize: '0.75rem',
              px: 1.5,
              py: 0.5,
            }}
          >
            {button.label}
          </Button>
        ))}
      </Box>
      <Box sx={{ textAlign: 'center', mt: 1 }}>
        <Typography variant="caption" color="text.secondary">
          • Визуальный вид основных показателей
        </Typography>
      </Box>
    </Paper>
  );
};



