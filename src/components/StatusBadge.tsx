import React from 'react';
import { Chip } from '@mui/material';
import { StatusType } from '../types';

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
}

const getStatusColor = (status: StatusType): 'success' | 'warning' | 'error' => {
  if (status === 'green') return 'success';
  if (status === 'yellow') return 'warning';
  return 'error';
};

const getStatusLabel = (status: StatusType): string => {
  if (status === 'green') return 'Норма';
  if (status === 'yellow') return 'Требует внимания';
  return 'Проблемный';
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  const color = getStatusColor(status);
  const displayLabel = label || getStatusLabel(status);

  return (
    <Chip
      label={displayLabel}
      color={color}
      size="small"
      sx={{
        fontWeight: 500,
      }}
    />
  );
};

