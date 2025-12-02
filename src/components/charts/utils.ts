import { StatusType } from '../../types';
import { MonthStatus } from './MonthlyProgressChart';

/**
 * Конвертирует процент выполнения (0-100) в массив статусов месяцев
 * Полезно для обратной совместимости со старым PieChart
 * 
 * @param completion - Процент выполнения (0-100)
 * @param status - Общий статус
 * @param currentMonth - Текущий месяц (0-11), по умолчанию текущий месяц года
 * @returns Массив из 12 элементов со статусами месяцев
 */
export const completionToMonths = (
  completion: number,
  status?: StatusType,
  currentMonth: number = new Date().getMonth()
): MonthStatus[] => {
  const months: MonthStatus[] = new Array(12).fill('empty');
  
  // Определяем цвет на основе статуса или completion
  let monthStatus: StatusType = status || 'red';
  if (!status) {
    if (completion >= 90) monthStatus = 'green';
    else if (completion >= 70) monthStatus = 'yellow';
    else monthStatus = 'red';
  }
  
  // Вычисляем количество заполненных месяцев
  const filledMonths = Math.round((completion / 100) * 12);
  
  // Заполняем месяцы начиная с января
  for (let i = 0; i < filledMonths && i < 12; i++) {
    months[i] = monthStatus;
  }
  
  // Месяцы после текущего помечаем как pending
  for (let i = currentMonth + 1; i < 12; i++) {
    if (months[i] === 'empty') {
      months[i] = 'pending';
    }
  }
  
  return months;
};

/**
 * Создает массив месяцев на основе данных выполнения по месяцам
 * 
 * @param monthlyData - Объект с данными по месяцам { [monthIndex]: StatusType }
 * @returns Массив из 12 элементов со статусами месяцев
 */
export const monthlyDataToMonths = (
  monthlyData: Record<number, StatusType>
): MonthStatus[] => {
  const months: MonthStatus[] = new Array(12).fill('empty');
  
  for (let i = 0; i < 12; i++) {
    if (monthlyData[i] !== undefined) {
      months[i] = monthlyData[i];
    }
  }
  
  return months;
};

