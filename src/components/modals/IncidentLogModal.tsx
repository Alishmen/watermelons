import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';

export interface IncidentLogData {
  parameter: string;
  january: number | null;
  february: number | null;
  march: number | null;
  april: number | null;
  may: number | null;
  june: number | null;
  july: number | null;
  august: number | null;
  september: number | null;
  october: number | null;
  november: number | null;
}

interface IncidentLogModalProps {
  open: boolean;
  onClose: () => void;
  data: IncidentLogData[];
}

const MONTH_NAMES = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
];

export const IncidentLogModal: React.FC<IncidentLogModalProps> = ({
  open,
  onClose,
  data,
}) => {
  const formatValue = (value: number | null): string => {
    return value === null || value === 0 ? '-' : value.toString();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Ведение журнала учета нештатных ситуаций
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <TableContainer component={Paper} sx={{ maxHeight: '60vh' }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    backgroundColor: 'grey.100',
                    position: 'sticky',
                    left: 0,
                    zIndex: 3,
                    minWidth: 250,
                  }}
                >
                  Параметр
                </TableCell>
                {MONTH_NAMES.map((month) => (
                  <TableCell
                    key={month}
                    align="center"
                    sx={{
                      fontWeight: 600,
                      backgroundColor: 'grey.100',
                      minWidth: 100,
                    }}
                  >
                    {month}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index} hover>
                  <TableCell
                    sx={{
                      fontWeight: row.parameter === 'Всего' ? 600 : 400,
                      position: 'sticky',
                      left: 0,
                      backgroundColor: 'white',
                      zIndex: 2,
                    }}
                  >
                    {row.parameter}
                  </TableCell>
                  <TableCell align="center">{formatValue(row.january)}</TableCell>
                  <TableCell align="center">{formatValue(row.february)}</TableCell>
                  <TableCell align="center">{formatValue(row.march)}</TableCell>
                  <TableCell align="center">{formatValue(row.april)}</TableCell>
                  <TableCell align="center">{formatValue(row.may)}</TableCell>
                  <TableCell align="center">{formatValue(row.june)}</TableCell>
                  <TableCell align="center">{formatValue(row.july)}</TableCell>
                  <TableCell align="center">{formatValue(row.august)}</TableCell>
                  <TableCell align="center">{formatValue(row.september)}</TableCell>
                  <TableCell align="center">{formatValue(row.october)}</TableCell>
                  <TableCell align="center">{formatValue(row.november)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};

