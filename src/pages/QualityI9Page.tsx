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

export const QualityI9Page: React.FC = () => {
  // Фильтруем только параметры с И9
  const filteredParams = performanceParameters.filter(p => p.i9);

  // Группируем по подкатегориям
  const subcategories: Array<'Анализ уровня внедрения ЕЦП.МИС' | 'Показатели по БСК'> = [
    'Анализ уровня внедрения ЕЦП.МИС',
    'Показатели по БСК',
  ];

  const groupedBySubcategory = subcategories.map(subcategory => ({
    subcategory,
    criteria: filteredParams.filter(p => p.subcategory === subcategory),
  }));

  return (
    <Box>
      {/* <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
        I уровень информационного центра
      </Typography> */}
      {/* <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
        Параметры результативности МО (И9)
      </Typography> */}

      <Card
        sx={{
          mb: 2,
          bgcolor: '#2196f3',
          color: 'white',
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Параметры результативности
          </Typography>
        </CardContent>
      </Card>

      {groupedBySubcategory.map(({ subcategory, criteria }) => (
        <Box key={subcategory} sx={{ mb: 4 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2, 
              fontWeight: 600,
              color: '#1976d2',
              borderBottom: '2px solid #1976d2',
              pb: 1,
            }}
          >
            {subcategory}
          </Typography>

          {criteria.length > 0 ? (
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
                  {criteria.map((param) => (
                    <TableRow key={param.id} hover>
                      <TableCell>{param.number}</TableCell>
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
          ) : (
            <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic', mb: 2 }}>
              Нет данных для отображения
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};



