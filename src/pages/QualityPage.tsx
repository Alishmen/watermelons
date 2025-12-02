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
import { performanceParameters } from '../data/mockData';

export const QualityPage: React.FC = () => {
  const childrenParams = performanceParameters.filter(p => p.category === 'Детское население');
  const adultParams = performanceParameters.filter(p => p.category === 'Взрослое население');

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
        I уровень информационного центра
      </Typography>
      <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
        Параметры результативности МО
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', lg: 'row' } }}>
        {/* Детское население */}
        <Box sx={{ flex: 1 }}>
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
                Параметры результативности деятельности медицинских организаций. Детское население (от 0 до 17 лет включительно)
              </Typography>
            </CardContent>
          </Card>

          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: 'grey.100' }}>
                  <TableCell sx={{ fontWeight: 600, width: '60px' }}>п/п</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '80px' }}>И9</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Критерий</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '150px' }}>Периодичность</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '250px' }}>Ответственный</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '120px' }} align="center">
                    Исполнение
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {childrenParams.map((param) => (
                  <TableRow key={param.id} hover>
                    <TableCell>{param.number}</TableCell>
                    <TableCell>{param.i9 || '-'}</TableCell>
                    <TableCell>
                      <Typography variant="body2">{param.criterion}</Typography>
                    </TableCell>
                    <TableCell>{param.periodicity}</TableCell>
                    <TableCell>{param.responsible}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <MonthlyProgressChart
                          months={completionToMonths(param.completion, param.status)}
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

        {/* Взрослое население */}
        <Box sx={{ flex: 1 }}>
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
                Параметры результативности деятельности медицинских организаций. Взрослое население (в возрасте 18 лет и старше)
              </Typography>
            </CardContent>
          </Card>

          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: 'grey.100' }}>
                  <TableCell sx={{ fontWeight: 600, width: '60px' }}>п/п</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '80px' }}>И9</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Критерий</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '150px' }}>Периодичность</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '250px' }}>Ответственный</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '120px' }} align="center">
                    Исполнение
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {adultParams.map((param) => (
                  <TableRow key={param.id} hover>
                    <TableCell>{param.number}</TableCell>
                    <TableCell>{param.i9 || '-'}</TableCell>
                    <TableCell>
                      <Typography variant="body2">{param.criterion}</Typography>
                    </TableCell>
                    <TableCell>{param.periodicity}</TableCell>
                    <TableCell>{param.responsible}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <MonthlyProgressChart
                          months={completionToMonths(param.completion, param.status)}
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
      </Box>
    </Box>
  );
};

