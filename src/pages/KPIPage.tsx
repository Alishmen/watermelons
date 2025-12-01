import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { StatusBadge } from '../components/StatusBadge';
import { kpiData } from '../data/mockData';
import { AccessLevel } from '../types';

interface KPIPageProps {
  accessLevel: AccessLevel;
  userDepartment?: string;
}

export const KPIPage: React.FC<KPIPageProps> = ({ accessLevel, userDepartment }) => {
  const filteredKPI = accessLevel === 'I' 
    ? kpiData 
    : kpiData.filter(kpi => kpi.department === userDepartment);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Ключевые показатели эффективности (KPI)
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Формула расчета KPI администраций:
        </Typography>
        <Box
          component="pre"
          sx={{
            backgroundColor: 'grey.100',
            p: 2,
            borderRadius: 1,
            fontFamily: 'monospace',
            fontSize: '0.9rem',
          }}
        >
          {`KPI = (Показатель выполнения плана × 0.4) + 
      (Показатель качества × 0.3) + 
      (Показатель экономической эффективности × 0.2) + 
      (Показатель безопасности × 0.1)`}
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.100' }}>
              <TableCell sx={{ fontWeight: 600 }}>Подразделение</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>KPI</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>Статус</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>Выполнение плана</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>Качество</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>Экономика</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>Безопасность</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredKPI.map((kpi) => (
              <TableRow key={kpi.id} hover>
                <TableCell>{kpi.department}</TableCell>
                <TableCell align="center">
                  <Typography variant="h6">{kpi.value.toFixed(1)}</Typography>
                </TableCell>
                <TableCell align="center">
                  <StatusBadge status={kpi.status} />
                </TableCell>
                <TableCell align="center">{kpi.planCompletion}%</TableCell>
                <TableCell align="center">{kpi.quality}%</TableCell>
                <TableCell align="center">{kpi.economy}%</TableCell>
                <TableCell align="center">{kpi.safety}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 3, p: 2, backgroundColor: 'info.light', borderRadius: 1 }}>
        <Typography variant="body2">
          <strong>Интерпретация:</strong>
        </Typography>
        <Typography variant="body2">• KPI &gt; 85 — зеленый статус (норма)</Typography>
        <Typography variant="body2">• KPI 70-85 — желтый статус (требует внимания)</Typography>
        <Typography variant="body2">• KPI &lt; 70 — красный статус (проблемный)</Typography>
      </Box>
    </Box>
  );
};

