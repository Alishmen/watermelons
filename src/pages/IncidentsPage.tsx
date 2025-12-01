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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { StatusBadge } from '../components/StatusBadge';
import { incidentsData } from '../data/mockData';

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'Критическая':
      return 'error';
    case 'Высокая':
      return 'warning';
    case 'Средняя':
      return 'info';
    default:
      return 'default';
  }
};

export const IncidentsPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Мониторинг инцидентов
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.100' }}>
              <TableCell sx={{ fontWeight: 600 }}>№</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Тип</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Дата</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Статус</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Серьезность</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Ответственный</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incidentsData.map((incident) => (
              <TableRow key={incident.id} hover>
                <TableCell>#{incident.number}</TableCell>
                <TableCell>{incident.type}</TableCell>
                <TableCell>{incident.date}</TableCell>
                <TableCell>
                  <StatusBadge status={incident.status} />
                </TableCell>
                <TableCell>
                  <Chip
                    label={incident.severity}
                    color={getSeverityColor(incident.severity) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>{incident.responsible}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Детализация инцидентов
      </Typography>

      {incidentsData.map((incident) => (
        <Accordion key={incident.id} sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
              <Typography variant="subtitle1">
                Инцидент №{incident.number} - {incident.type}
              </Typography>
              <StatusBadge status={incident.status} />
              <Chip
                label={incident.severity}
                color={getSeverityColor(incident.severity) as any}
                size="small"
              />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Дата:
                </Typography>
                <Typography variant="body1">{incident.date}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Описание:
                </Typography>
                <Typography variant="body1">{incident.description}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Причина:
                </Typography>
                <Typography variant="body1">{incident.cause}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Принятые меры:
                </Typography>
                <Typography variant="body1">{incident.actions}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Ответственный:
                </Typography>
                <Typography variant="body1">{incident.responsible}</Typography>
              </Box>
              {incident.resolutionDate && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Дата устранения:
                  </Typography>
                  <Typography variant="body1">{incident.resolutionDate}</Typography>
                </Box>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}

      <Box sx={{ mt: 3, p: 2, backgroundColor: 'info.light', borderRadius: 1 }}>
        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
          Здесь разместить график из Yandex DataLens по безопасности и инцидентам
        </Typography>
      </Box>
    </Box>
  );
};



