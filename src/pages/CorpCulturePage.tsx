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
import { corpCultureCriteria } from '../data/mockData';

export const CorpCulturePage: React.FC = () => {
  return (
    <Box>
      {/* <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
        I уровень информационного центра
      </Typography> */}

      <Card
        sx={{
          mb: 2,
          bgcolor: '#9c27b0',
          color: 'white',
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Корпоративная культура
          </Typography>
        </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.100' }}>
              <TableCell sx={{ fontWeight: 600, width: '60px' }}>п/п</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Критерий</TableCell>
              <TableCell sx={{ fontWeight: 600, width: '150px' }}>Периодичность</TableCell>
              <TableCell sx={{ fontWeight: 600, width: '250px' }}>Ответственный</TableCell>
              <TableCell sx={{ fontWeight: 600, width: '120px' }} align="center">
                Исполнение
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {corpCultureCriteria.map((criterion) => (
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
  );
};

