import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { StatusBadge } from './StatusBadge';
import { kpiData, safetyData, economicData, incidentsData } from '../data/mockData';
import { AccessLevel } from '../types';

interface DashboardProps {
  accessLevel: AccessLevel;
  userDepartment?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ accessLevel, userDepartment }) => {
  // Фильтрация данных по уровню доступа
  const filteredKPI = accessLevel === 'I' 
    ? kpiData 
    : kpiData.filter(kpi => kpi.department === userDepartment);
  
  const totalIncidents = incidentsData.length;
  const criticalIncidents = incidentsData.filter(i => i.status === 'red').length;
  const activeIncidents = incidentsData.filter(i => i.status !== 'green').length;

  const avgKPI = filteredKPI.reduce((sum, kpi) => sum + kpi.value, 0) / filteredKPI.length;
  const kpiStatus: 'green' | 'yellow' | 'red' = avgKPI > 85 ? 'green' : avgKPI > 70 ? 'yellow' : 'red';

  const latestEconomic = economicData[economicData.length - 1];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Информационный центр и основные показатели эффективности
      </Typography>

      <Grid container spacing={3}>
        {/* KPI Карточка */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Средний KPI
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                <Typography variant="h3" component="div">
                  {avgKPI.toFixed(1)}
                </Typography>
                <StatusBadge status={kpiStatus} />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Подразделений: {filteredKPI.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Безопасность */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Показатели безопасности
              </Typography>
              <Box sx={{ mt: 2 }}>
                {safetyData.map((safety) => (
                  <Box key={safety.id} sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">{safety.type}</Typography>
                    <StatusBadge status={safety.status} />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Инциденты */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Инциденты
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="h4">{totalIncidents}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Всего инцидентов
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                  <Box>
                    <Typography variant="h6" color="error">
                      {criticalIncidents}
                    </Typography>
                    <Typography variant="caption">Критических</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" color="warning.main">
                      {activeIncidents}
                    </Typography>
                    <Typography variant="caption">Требуют внимания</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Экономические показатели */}
        {accessLevel === 'I' && (
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Экономические показатели ({latestEconomic.period})
                </Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Продажи
                    </Typography>
                    <Typography variant="h6">{latestEconomic.sales}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Рентабельность
                    </Typography>
                    <Typography variant="h6">{latestEconomic.profitability}%</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Бюджетное выполнение
                    </Typography>
                    <Typography variant="h6">{latestEconomic.budgetCompletion}%</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Статус
                      </Typography>
                      <StatusBadge status={latestEconomic.status} />
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* KPI по подразделениям */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              KPI по подразделениям
            </Typography>
            <Grid container spacing={2}>
              {filteredKPI.map((kpi) => (
                <Grid item xs={12} sm={6} md={4} key={kpi.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle2" gutterBottom>
                        {kpi.department}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                        <Typography variant="h5">{kpi.value.toFixed(1)}</Typography>
                        <StatusBadge status={kpi.status} />
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        Выполнение плана: {kpi.planCompletion}%
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};



