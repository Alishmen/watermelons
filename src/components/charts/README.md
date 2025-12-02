# Компоненты графиков и визуализаций

Эта папка содержит компоненты для отображения различных графиков и индикаторов прогресса.

## Компоненты

### MonthlyProgressChart
**Рекомендуемый компонент** для отображения прогресса по месяцам года.

Каждый из 12 сегментов представляет один месяц года (Январь - Декабрь).

**Использование:**
```tsx
import { MonthlyProgressChart } from '../components/charts';

// С массивом статусов месяцев
<MonthlyProgressChart
  months={['green', 'green', 'yellow', 'red', 'empty', 'empty', ...]}
  size={80}
  year={2024}
/>

// Или с использованием утилиты для конвертации
import { completionToMonths } from '../components/charts';

<MonthlyProgressChart
  months={completionToMonths(criterion.completion, criterion.status)}
  size={80}
/>
```

**Параметры:**
- `months: MonthStatus[]` - Массив из 12 элементов со статусами месяцев
- `size?: number` - Размер компонента (по умолчанию 100)
- `showLabels?: boolean` - Показывать ли подписи (по умолчанию false)
- `year?: number` - Год для отображения (по умолчанию текущий год)

**Статусы месяцев:**
- `'green'` - Выполнено (зеленый)
- `'yellow'` - Частично выполнено (желтый)
- `'red'` - Не выполнено (красный)
- `'pending'` - Ожидается (серый)
- `'empty'` - Нет данных (светло-серый)

### PieChart
**Устаревший компонент** - оставлен для обратной совместимости.

Отображает процент выполнения в виде круговой диаграммы с 12 сегментами.

**Использование:**
```tsx
import { PieChart } from '../components/charts';

<PieChart
  completion={85}
  status="green"
  size={80}
/>
```

## Утилиты

### completionToMonths
Конвертирует процент выполнения в массив статусов месяцев.

```tsx
import { completionToMonths } from '../components/charts';

const months = completionToMonths(85, 'green', 5); // 85% выполнено, статус green, текущий месяц - июнь
// Результат: ['green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'pending', 'pending']
```

### monthlyDataToMonths
Создает массив месяцев из объекта с данными по месяцам.

```tsx
import { monthlyDataToMonths } from '../components/charts';

const months = monthlyDataToMonths({
  0: 'green',  // Январь
  1: 'green',  // Февраль
  2: 'yellow', // Март
  3: 'red',    // Апрель
});
// Остальные месяцы будут 'empty'
```

## Миграция со старого PieChart

Если у вас есть данные с полем `completion` и `status`, вы можете легко мигрировать:

**Было:**
```tsx
<PieChart completion={85} status="green" size={80} />
```

**Стало:**
```tsx
import { MonthlyProgressChart, completionToMonths } from '../components/charts';

<MonthlyProgressChart
  months={completionToMonths(85, 'green')}
  size={80}
/>
```

## Структура данных

Рекомендуется добавлять в типы данных поле `monthlyData`:

```typescript
interface SafetyCriterion {
  // ... другие поля
  monthlyData?: Record<number, StatusType>; // { 0: 'green', 1: 'yellow', ... }
}
```

Тогда использование будет:
```tsx
import { MonthlyProgressChart, monthlyDataToMonths } from '../components/charts';

<MonthlyProgressChart
  months={criterion.monthlyData 
    ? monthlyDataToMonths(criterion.monthlyData)
    : completionToMonths(criterion.completion, criterion.status)
  }
  size={80}
/>
```

