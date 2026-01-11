export type ViewType = 'dashboard' | 'finanzas' | 'analiticas' | 'notificaciones' | 'configuracion';

export interface RevenueData {
  name: string;
  ingresos: number;
  gastos: number;
}

export interface UserData {
  name: string;
  value: number;
  color: string;
}

export interface Transaction {
  id: string;
  user: string;
  email: string; // Added email for context
  date: string;
  amount: string;
  status: 'Completado' | 'Pendiente' | 'Fallido';
  img: string;
}

export interface KPIData {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  data: { value: number }[];
  color: string; // Hex for the sparkline
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  read: boolean;
}