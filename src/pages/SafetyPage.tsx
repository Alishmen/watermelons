import React, { useState } from 'react';
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
  Tabs,
  Tab,
} from '@mui/material';
import { PieChart } from '../components/PieChart';
import { safetyCriteria } from '../data/mockData';

type SafetyCategory = 'Лекарственная безопасность' | 'Эпидемиологическая безопасность' | 'Информационная безопасность' | 'all';

export const SafetyPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SafetyCategory>('all');

  const filteredCriteria = selectedCategory === 'all'
    ? safetyCriteria
    : safetyCriteria.filter(c => c.category === selectedCategory);

  const groupedCriteria = filteredCriteria.reduce((acc, criterion) => {
    if (!acc[criterion.category]) {
      acc[criterion.category] = [];
    }
    acc[criterion.category].push(criterion);
    return acc;
  }, {} as Record<string, typeof safetyCriteria>);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Лекарственная безопасность':
        return '#f44336';
      case 'Эпидемиологическая безопасность':
        return '#f44336';
      case 'Информационная безопасность':
        return '#4caf50';
      default:
        return '#1976d2';
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
        I уровень информационного центра
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Tabs
          value={selectedCategory}
          onChange={(_, newValue) => setSelectedCategory(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Все" value="all" />
          <Tab label="Лекарственная" value="Лекарственная безопасность" />
          <Tab label="Эпидемиологическая" value="Эпидемиологическая безопасность" />
          <Tab label="Информационная" value="Информационная безопасность" />
        </Tabs>
      </Box>

      {Object.entries(groupedCriteria).map(([category, criteria]) => (
        <Box key={category} sx={{ mb: 4 }}>
          <Card
            sx={{
              mb: 2,
              bgcolor: getCategoryColor(category),
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
      ))}
    </Box>
  );
};
