# Модальные окна (Modals)

Эта папка содержит компоненты модальных окон для отображения дополнительной информации.

## Компоненты

### IncidentLogModal
Модальное окно для отображения журнала учета нештатных ситуаций.

**Использование:**
```tsx
import { IncidentLogModal } from '../components/modals/IncidentLogModal';
import { incidentLogData } from '../data/incidentLogData';

const [open, setOpen] = useState(false);

<IncidentLogModal
  open={open}
  onClose={() => setOpen(false)}
  data={incidentLogData}
/>
```

**Параметры:**
- `open: boolean` - Открыто ли модальное окно
- `onClose: () => void` - Функция закрытия модального окна
- `data: IncidentLogData[]` - Массив данных для таблицы

**Структура данных:**
```typescript
interface IncidentLogData {
  parameter: string;
  january: number | null;
  february: number | null;
  // ... остальные месяцы
  november: number | null;
}
```

## Отключение модального окна

Если нужно временно отключить или удалить модальное окно:

1. **Временное отключение:**
   - Закомментировать импорт и использование в странице
   - Данные и компонент останутся в проекте

2. **Полное удаление:**
   - Удалить файл `IncidentLogModal.tsx`
   - Удалить файл `src/data/incidentLogData.ts`
   - Удалить импорты и использование в страницах

## Данные

Данные для модального окна находятся в `src/data/incidentLogData.ts`.

Для обновления данных редактируйте массив `incidentLogData`.

