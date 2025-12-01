import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { KPIPage } from './KPIPage';
import { AccessLevel } from '../types';

interface ExecutionPageProps {
  accessLevel: AccessLevel;
  userDepartment?: string;
}

export const ExecutionPage: React.FC<ExecutionPageProps> = ({ accessLevel, userDepartment }) => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Исполнение (Кри главы)
      </Typography>
      <KPIPage accessLevel={accessLevel} userDepartment={userDepartment} />
    </Box>
  );
};

