import React from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import { StatusBadge } from './StatusBadge';
import { DataTable, TableColumn } from './DataTable';

export interface SlideContent {
  title: string;
  subtitle?: string;
  sections?: Array<{
    title?: string;
    type: 'text' | 'list' | 'table' | 'formula' | 'note';
    content: any;
  }>;
}

interface SlideProps {
  content: SlideContent;
  slideNumber: number;
  totalSlides: number;
}

const parseMarkdownTable = (tableText: string): { columns: TableColumn[]; rows: any[]; statusColumn?: string } => {
  const lines = tableText.trim().split('\n').filter(line => line.trim());
  if (lines.length < 2) return { columns: [], rows: [] };

  // Парсинг заголовков
  const headerLine = lines[0];
  const headers = headerLine.split('|').map(h => h.trim()).filter(h => h && !h.match(/^-+$/));
  
  const columns: TableColumn[] = headers.map((header, index) => ({
    id: `col${index}`,
    label: header.replace(/\*\*/g, '').trim(),
    align: index === 0 ? 'left' : 'center' as const,
  }));

  // Парсинг строк (пропускаем строку с разделителями)
  const rows: any[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    // Пропускаем строки-разделители
    if (line.match(/^[\s|:-]+$/)) continue;
    
    const cells = line.split('|').map(c => c.trim()).filter((c, idx, arr) => {
      // Убираем пустые ячейки в начале и конце
      return c || (idx > 0 && idx < arr.length - 1);
    });
    
    if (cells.length >= headers.length) {
      const row: any = {};
      cells.forEach((cell, index) => {
        if (index < headers.length) {
          row[`col${index}`] = cell.replace(/\*\*/g, '').replace(/<br>/g, '\n').trim();
        }
      });
      rows.push(row);
    }
  }

  // Определение колонки со статусом
  const statusColumnIndex = headers.findIndex(h => 
    h.toLowerCase().includes('статус') || h.toLowerCase().includes('status')
  );
  const statusColumn = statusColumnIndex >= 0 ? `col${statusColumnIndex}` : undefined;

  return { columns, rows, statusColumn };
};

const renderContent = (section: NonNullable<SlideContent['sections']>[0]) => {
  switch (section.type) {
    case 'list':
      return (
        <List>
          {Array.isArray(section.content) && section.content.map((item: string, index: number) => {
            // Обработка вложенных списков (строки с отступами)
            const lines = item.split('\n');
            const mainLine = lines[0];
            const nestedLines = lines.slice(1).filter(l => l.trim());
            
            return (
              <ListItem key={index} sx={{ py: 0.5, display: 'block' }}>
                <ListItemText
                  primary={
                    <Box>
                      <Typography variant="body1" component="span">
                        {mainLine.includes('статус —') || mainLine.includes('статус -') ? (
                          <>
                            {mainLine.split(/статус[—\s-]+(зеленый|желтый|красный)/i)[0]}
                            <StatusBadge 
                              status={
                                mainLine.toLowerCase().includes('зеленый') ? 'green' :
                                mainLine.toLowerCase().includes('желтый') ? 'yellow' : 'red'
                              }
                            />
                          </>
                        ) : (
                          mainLine
                        )}
                      </Typography>
                      {nestedLines.length > 0 && (
                        <Box component="ul" sx={{ ml: 4, mt: 0.5, mb: 0 }}>
                          {nestedLines.map((nested, nestedIndex) => (
                            <li key={nestedIndex}>
                              <Typography variant="body2" component="span">
                                {nested.trim().replace(/^[-•]\s*/, '')}
                              </Typography>
                            </li>
                          ))}
                        </Box>
                      )}
                    </Box>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      );

    case 'table':
      const tableData = parseMarkdownTable(section.content);
      return (
        <DataTable
          columns={tableData.columns}
          rows={tableData.rows}
          statusColumn={tableData.statusColumn}
        />
      );

    case 'formula':
      return (
        <Box
          component="pre"
          sx={{
            backgroundColor: 'grey.100',
            p: 2,
            borderRadius: 1,
            overflow: 'auto',
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {section.content}
        </Box>
      );

    case 'note':
      return (
        <Box
          sx={{
            backgroundColor: 'info.light',
            p: 2,
            borderRadius: 1,
            mt: 2,
            fontStyle: 'italic',
          }}
        >
          <Typography variant="body2">{section.content}</Typography>
        </Box>
      );

    default:
      return (
        <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
          {section.content}
        </Typography>
      );
  }
};

export const Slide: React.FC<SlideProps> = ({ content, slideNumber, totalSlides }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
        <Chip label={`${slideNumber} / ${totalSlides}`} size="small" />
      </Box>

      <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
        {content.title}
      </Typography>

      {content.subtitle && (
        <Typography variant="h3" component="h2" color="text.secondary" sx={{ mb: 3 }}>
          {content.subtitle}
        </Typography>
      )}

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ flexGrow: 1 }}>
        {content.sections?.map((section, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            {section.title && (
              <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
                {section.title}
              </Typography>
            )}
            {renderContent(section)}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

