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
  Card,
  CardContent,
} from '@mui/material';
import { MonthlyProgressChart, completionToMonths } from '../components/charts';
import { safetyCriteria } from '../data/mockData';

export const SafetyLekPage: React.FC = () => {
  // Фильтруем только лекарственную и эпидемиологическую безопасность
  const filteredCriteria = safetyCriteria.filter(
    c => c.category === 'Лекарственная безопасность' || c.category === 'Эпидемиологическая безопасность'
  );

  const groupedCriteria = filteredCriteria.reduce((acc, criterion) => {
    if (!acc[criterion.category]) {
      acc[criterion.category] = [];
    }
    acc[criterion.category].push(criterion);
    return acc;
  }, {} as Record<string, typeof safetyCriteria>);

  const getCategoryColor = () => {
    return '#f44336'; // Красный для лекарственной безопасности
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
        I уровень информационного центра
      </Typography>

      {Object.entries(groupedCriteria).map(([category, criteria]) => (
        <Box key={category} sx={{ mb: 4 }}>
          <Card
            sx={{
              mb: 2,
              bgcolor: getCategoryColor(),
              color: 'white',
              borderRadius: 2,
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {category}
              </Typography>
            </CardContent>
          </Card>

          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: 'grey.100' }}>
                  <TableCell sx={{ fontWeight: 600, width: '60px' }}>№</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Критерий</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '150px' }}>Периодичность</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '200px' }}>Ответственный</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '120px' }} align="center">
                    Исполнение
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {criteria.map((criterion) => (
                  <TableRow key={criterion.id} hover>
                    <TableCell>{criterion.number}</TableCell>
                    <TableCell>
                      <Typography variant="body2">{criterion.criterion}</Typography>
                    </TableCell>
                    <TableCell>{criterion.periodicity}</TableCell>
                    <TableCell>{criterion.responsible}</TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <MonthlyProgressChart
                            months={completionToMonths(criterion.completion, criterion.status)}
                            size={80}
                            year={new Date().getFullYear()}
                          />
                        </Box>
                      </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}
    </Box>
  );
};

