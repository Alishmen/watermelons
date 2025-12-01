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
import { PieChart } from '../components/PieChart';
import { safetyCriteria } from '../data/mockData';

export const SafetyInfoPage: React.FC = () => {
  // Фильтруем только информационную безопасность
  const filteredCriteria = safetyCriteria.filter(
    c => c.category === 'Информационная безопасность'
  );

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
        I уровень информационного центра
      </Typography>

      <Card
        sx={{
          mb: 2,
          bgcolor: '#4caf50',
          color: 'white',
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Информационная безопасность
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
            {filteredCriteria.map((criterion) => (
              <TableRow key={criterion.id} hover>
                <TableCell>{criterion.number}</TableCell>
                <TableCell>
                  <Typography variant="body2">{criterion.criterion}</Typography>
                </TableCell>
                <TableCell>{criterion.periodicity}</TableCell>
                <TableCell>{criterion.responsible}</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <PieChart
                      completion={criterion.completion}
                      status={criterion.status}
                      size={50}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};



