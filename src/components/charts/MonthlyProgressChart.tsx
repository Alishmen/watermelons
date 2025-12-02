import React from 'react';
import { Box } from '@mui/material';
import { StatusType } from '../../types';

export type MonthStatus = StatusType | 'empty' | 'pending';

interface MonthlyProgressChartProps {
  months: MonthStatus[]; // Массив из 12 элементов, каждый элемент - статус месяца
  size?: number;
  showLabels?: boolean; // Показывать ли подписи месяцев
  year?: number; // Год для отображения
}

const MONTH_NAMES = [
  'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
  'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
];

export const MonthlyProgressChart: React.FC<MonthlyProgressChartProps> = ({
  months,
  size = 100,
  showLabels = false,
  year = new Date().getFullYear(),
}) => {
  const radius = size / 2;
  const totalSegments = 12;
  const segmentAngle = 360 / totalSegments; // 30 градусов для каждого сегмента

  // Функция для получения цвета по статусу месяца
  const getMonthColor = (status: MonthStatus): string => {
    switch (status) {
      case 'green':
        return '#4caf50';
      case 'yellow':
        return '#ff9800';
      case 'red':
        return '#f44336';
      case 'pending':
        return '#9e9e9e'; // Серый для ожидающих месяцев
      case 'empty':
      default:
        return '#e0e0e0'; // Светло-серый для пустых/незаполненных
    }
  };

  // Функция для получения текста подсказки
  const getMonthTooltip = (monthIndex: number, status: MonthStatus): string => {
    const monthName = MONTH_NAMES[monthIndex];
    const fullMonthName = new Date(year, monthIndex, 1).toLocaleString('ru-RU', { month: 'long' });
    
    switch (status) {
      case 'green':
        return `${fullMonthName} ${year}: Выполнено`;
      case 'yellow':
        return `${fullMonthName} ${year}: Частично выполнено`;
      case 'red':
        return `${fullMonthName} ${year}: Не выполнено`;
      case 'pending':
        return `${fullMonthName} ${year}: Ожидается`;
      case 'empty':
      default:
        return `${fullMonthName} ${year}: Нет данных`;
    }
  };

  return (
    <Box sx={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Сегменты - 12 месяцев */}
        {Array.from({ length: totalSegments }).map((_, index) => {
          const monthStatus = months[index] || 'empty';
          const color = getMonthColor(monthStatus);
          
          // Углы в радианах, начиная с 0 (верхняя точка после поворота на -90 градусов)
          const startAngleRad = (index * segmentAngle) * (Math.PI / 180);
          const endAngleRad = ((index + 1) * segmentAngle) * (Math.PI / 180);
          
          // Координаты для внешнего края круга
          const outerRadius = radius - 2;
          const x1 = radius + outerRadius * Math.cos(startAngleRad);
          const y1 = radius + outerRadius * Math.sin(startAngleRad);
          const x2 = radius + outerRadius * Math.cos(endAngleRad);
          const y2 = radius + outerRadius * Math.sin(endAngleRad);
          
          // Для сегментов меньше 180 градусов (наш случай - 30 градусов) largeArcFlag всегда 0
          const largeArcFlag = 0;
          
          return (
            <g key={index}>
              <title>{getMonthTooltip(index, monthStatus)}</title>
              <path
                d={`M ${radius} ${radius} L ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                fill={color}
                stroke="#ffffff"
                strokeWidth="1.5"
                style={{ cursor: 'pointer' }}
              />
            </g>
          );
        })}
      </svg>
      
      {/* Подписи месяцев (опционально) */}
      {showLabels && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <Box sx={{ fontSize: '0.7rem', fontWeight: 600, color: 'text.secondary' }}>
            {year}
          </Box>
        </Box>
      )}
    </Box>
  );
};

