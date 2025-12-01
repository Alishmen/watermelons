import React from 'react';
import { Box } from '@mui/material';
import { StatusType } from '../types';

interface PieChartProps {
  completion: number; // 0-100
  status?: StatusType;
  size?: number;
}

export const PieChart: React.FC<PieChartProps> = ({ 
  completion, 
  status, 
  size = 60
}) => {
  const radius = size / 2;
  const totalSegments = 12; // Фиксированное количество сегментов

  // Определение цвета на основе статуса или completion
  const getColor = () => {
    if (status) {
      switch (status) {
        case 'green':
          return '#4caf50';
        case 'yellow':
          return '#ff9800';
        case 'red':
          return '#f44336';
      }
    }
    // Автоматическое определение по completion
    if (completion >= 90) return '#4caf50';
    if (completion >= 70) return '#ff9800';
    return '#f44336';
  };

  const color = getColor();
  
  // Вычисляем количество заполненных сегментов (группами по 3)
  // Каждые 3 сегмента составляют группу, всего 4 группы (12 сегментов)
  const totalFilledSegments = Math.round((completion / 100) * totalSegments);
  // Округляем до ближайшей группы из 3 сегментов
  const filledGroups = Math.floor(totalFilledSegments / 3);
  const filledSegments = filledGroups * 3;
  
  const segmentAngle = 360 / totalSegments; // 30 градусов для каждого сегмента

  // Визуализация сегментами - всегда 12 сегментов, заполняются группами по 3
  return (
    <Box sx={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Сегменты - всегда 12 треугольников, четко разделенных */}
        {Array.from({ length: totalSegments }).map((_, index) => {
          const isFilled = index < filledSegments;
          
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
            <path
              key={index}
              d={`M ${radius} ${radius} L ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
              fill={isFilled ? color : '#e0e0e0'}
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          );
        })}
      </svg>
    </Box>
  );
};

