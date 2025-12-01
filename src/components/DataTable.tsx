import React from 'react';
import {
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
import { StatusBadge } from './StatusBadge';

export interface TableColumn {
  id: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  title?: string;
  columns: TableColumn[];
  rows: any[];
  statusColumn?: string;
}

export const DataTable: React.FC<DataTableProps> = ({
  title,
  columns,
  rows,
  statusColumn,
}) => {
  const renderCell = (column: TableColumn, value: any, row: any) => {
    if (column.render) {
      return column.render(value, row);
    }

    if (!value) return '';

    // Автоматическое определение статуса в колонке статуса
    if (statusColumn && column.id === statusColumn) {
      const status = String(value).toLowerCase();
      if (status.includes('зелен') || status.includes('green')) {
        return <StatusBadge status="green" label={String(value)} />;
      }
      if (status.includes('желт') || status.includes('yellow')) {
        return <StatusBadge status="yellow" label={String(value)} />;
      }
      if (status.includes('красн') || status.includes('red')) {
        return <StatusBadge status="red" label={String(value)} />;
      }
      // Если статус не определен, показываем как есть
      return <StatusBadge status="green" label={String(value)} />;
    }

    // Проверка на статус в тексте других колонок
    if (typeof value === 'string') {
      const lowerValue = value.toLowerCase();
      const statusMatch = lowerValue.match(/статус[—\s-]+(зеленый|желтый|красный|green|yellow|red)/i);
      if (statusMatch) {
        const statusText = statusMatch[1].toLowerCase();
        const textBefore = value.substring(0, statusMatch.index);
        let status: 'green' | 'yellow' | 'red' = 'green';
        if (statusText.includes('желт') || statusText.includes('yellow')) {
          status = 'yellow';
        } else if (statusText.includes('красн') || statusText.includes('red')) {
          status = 'red';
        }
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            {textBefore && <span>{textBefore.trim()}</span>}
            <StatusBadge status={status} />
          </Box>
        );
      }
    }

    // Обработка переносов строк в ячейках
    const stringValue = String(value);
    if (stringValue.includes('\n') || stringValue.includes('<br>')) {
      const lines = stringValue.replace(/<br>/g, '\n').split('\n');
      return (
        <Box>
          {lines.map((line, idx) => (
            <Box key={idx}>{line || '\u00A0'}</Box>
          ))}
        </Box>
      );
    }

    return stringValue;
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2, mb: 3 }}>
      {title && (
        <Typography variant="h6" sx={{ p: 2, pb: 1 }}>
          {title}
        </Typography>
      )}
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align || 'left'}
                sx={{ fontWeight: 600, backgroundColor: 'grey.100' }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}
            >
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align || 'left'}>
                  {renderCell(column, row[column.id], row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

