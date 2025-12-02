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

export const SafetyInfoPage: React.FC = () => {
  // Фильтруем только информационную безопасность
  const filteredCriteria = safetyCriteria.filter(
    c => c.category === 'Информационная безопасность'
  );

  // Группируем по подкатегориям
  const subcategories: Array<'Антитеррористическая безопасность' | 'Противопожарная безопасность' | 'Информационная безопасность' | 'Травматизм'> = [
    'Антитеррористическая безопасность',
    'Противопожарная безопасность',
    'Информационная безопасность',
    'Травматизм',
  ];

  const groupedBySubcategory = subcategories.map(subcategory => ({
    subcategory,
    criteria: filteredCriteria.filter(c => c.subcategory === subcategory),
  }));

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



