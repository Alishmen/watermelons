import React from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { AccessLevel } from '../types';

interface SettingsPageProps {
  accessLevel: AccessLevel;
  userDepartment?: string;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ accessLevel, userDepartment }) => {
  const getAccessLevelName = (level: AccessLevel) => {
    switch (level) {
      case 'I':
        return 'I уровень - Главный врач, Заместители';
      case 'II':
        return 'II уровень - Заведующий отделением';
      case 'III':
        return 'III уровень - Врач, Персонал';
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Настройки и информация
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Текущий уровень доступа
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {getAccessLevelName(accessLevel)}
        </Typography>
        {userDepartment && (
          <Typography variant="body2" color="text.secondary">
            Отделение: {userDepartment}
          </Typography>
        )}
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Уровни доступа к информации
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="I уровень"
              secondary="Главный врач, Заместитель главного врача - Полный доступ ко всем показателям, агрегированные данные по всем подразделениям, сводные отчеты и аналитика"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="II уровень"
              secondary="Заведующий отделением - Показатели своего отделения, сравнительные данные по другим отделениям, детализация по подразделениям"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="III уровень"
              secondary="Врач, Средний медицинский персонал, Административный персонал - Индивидуальные показатели работы, показатели пациентов, оперативные данные для работы"
            />
          </ListItem>
        </List>
      </Paper>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Контакты для вопросов и предложений
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Главный врач" secondary="[контакты]" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Заместитель главного врача" secondary="[контакты]" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Отдел информатизации" secondary="[контакты]" />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};



