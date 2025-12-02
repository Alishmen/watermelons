export type StatusType = 'green' | 'yellow' | 'red';
export type AccessLevel = 'I' | 'II' | 'III';

export interface KPI {
  id: string;
  department: string;
  value: number;
  status: StatusType;
  planCompletion: number;
  quality: number;
  economy: number;
  safety: number;
}

export interface SafetyIndicator {
  id: string;
  type: 'Лекарственная безопасность' | 'Инфекционный контроль' | 'Радиационная безопасность' | 'Информационная безопасность';
  status: StatusType;
  value: number;
  description: string;
  lastUpdate: string;
}

export interface SafetyCriterion {
  id: string;
  number: number;
  category: 'Лекарственная безопасность' | 'Эпидемиологическая безопасность' | 'Информационная безопасность';
  subcategory?: 'Антитеррористическая безопасность' | 'Противопожарная безопасность' | 'Информационная безопасность' | 'Травматизм';
  criterion: string;
  periodicity: string;
  responsible: string;
  completion: number; // 0-100
  status: StatusType;
  // Опциональные данные по месяцам (0-11 индексы месяцев)
  monthlyData?: Record<number, StatusType>; // { 0: 'green', 1: 'yellow', ... }
}

export interface PerformanceParameter {
  id: string;
  number: number;
  category: 'Детское население' | 'Взрослое население';
  criterion: string;
  periodicity: string;
  responsible: string;
  completion: number; // 0-100
  status: StatusType;
  i9?: string; // Идентификатор И9
  // Опциональные данные по месяцам (0-11 индексы месяцев)
  monthlyData?: Record<number, StatusType>; // { 0: 'green', 1: 'yellow', ... }
}

export interface EconomicIndicator {
  id: string;
  period: string;
  totalCosts: number;
  status: StatusType;
  medicationCosts: number;
  personnelCosts: number;
  otherCosts: number;
  sales: number;
  profitability: number;
  budgetCompletion: number;
}

export interface Incident {
  id: string;
  number: number;
  type: string;
  date: string;
  description: string;
  status: StatusType;
  severity: 'Низкая' | 'Средняя' | 'Высокая' | 'Критическая';
  cause: string;
  actions: string;
  responsible: string;
  resolutionDate?: string;
}

export interface DepartmentIndicator {
  id: string;
  department: string;
  kpi: number;
  status: StatusType;
  load: number;
  patients: number;
  avgStayDays: number;
  bedTurnover: number;
  patientSatisfaction: number;
  complications: number;
  mortality: number;
  treatmentResults: number;
}

export interface User {
  id: string;
  name: string;
  role: string;
  accessLevel: AccessLevel;
  department?: string;
}
