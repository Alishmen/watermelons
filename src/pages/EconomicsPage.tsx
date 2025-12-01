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
import { economicData } from '../data/mockData';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
  }).format(value);
};

export const EconomicsPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Экономические показатели
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.100' }}>
              <TableCell sx={{ fontWeight: 600 }}>Период</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Общие затраты</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>Статус</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Медикаменты</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Персонал</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Прочие</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>Продажи</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>Рентабельность</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>Бюджет</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {economicData.map((economic) => (
              <TableRow key={economic.id} hover>
                <TableCell>{economic.period}</TableCell>
                <TableCell align="right">{formatCurrency(economic.totalCosts)}</TableCell>
                <TableCell align="center">
                  <StatusBadge status={economic.status} />
                </TableCell>
                <TableCell align="right">{formatCurrency(economic.medicationCosts)}</TableCell>
                <TableCell align="right">{formatCurrency(economic.personnelCosts)}</TableCell>
                <TableCell align="right">{formatCurrency(economic.otherCosts)}</TableCell>
                <TableCell align="center">{economic.sales}</TableCell>
                <TableCell align="center">{economic.profitability}%</TableCell>
                <TableCell align="center">{economic.budgetCompletion}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 3, p: 2, backgroundColor: 'info.light', borderRadius: 1 }}>
        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
          Здесь разместить график из Yandex DataLens по экономическим показателям
        </Typography>
      </Box>
    </Box>
  );
};



