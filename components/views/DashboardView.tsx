import React, { useState } from 'react';
import { KPICard } from '../KPICard';
import { RevenueChart } from '../RevenueChart';
import { UserDistributionChart } from '../UserDistributionChart';
import { TransactionsTable } from '../TransactionsTable';
import { KPIData, RevenueData, UserData, Transaction } from '../../types';

interface DashboardViewProps {
  kpiData: KPIData[]; // Represents Annual Data
  revenueData: RevenueData[]; // Represents Annual Data
  userData: UserData[]; // Represents Annual Data
  recentTransactions: Transaction[]; // Represents Annual Data
  loaded: boolean;
}

// -- MONTHLY CONTEXT MOCK DATA (High Coherence) --
// Total Revenue target: ~$84,000 (Matches July entry in Annual Data)
const kpiDataMonth: KPIData[] = [
  {
    title: 'Ventas Totales (Julio)',
    value: '$84,250',
    change: '+12% vs Jun',
    isPositive: true,
    data: [{ value: 15 }, { value: 18 }, { value: 22 }, { value: 20 }, { value: 24 }, { value: 22 }, { value: 25 }],
    color: '#22d3ee',
  },
  {
    title: 'Pedidos (Julio)',
    value: '1,240',
    change: '+5% vs Jun',
    isPositive: true,
    data: [{ value: 30 }, { value: 35 }, { value: 40 }, { value: 38 }, { value: 42 }, { value: 45 }, { value: 48 }],
    color: '#8b5cf6',
  },
  {
    title: 'Ticket Promedio',
    value: '$67.90',
    change: '+1.5%',
    isPositive: true,
    data: [{ value: 65 }, { value: 66 }, { value: 67 }, { value: 67 }, { value: 68 }, { value: 68 }, { value: 68 }],
    color: '#f472b6',
  },
  {
    title: 'Conversión Mes',
    value: '4.1%',
    change: '+0.3%',
    isPositive: true,
    data: [{ value: 3.8 }, { value: 3.9 }, { value: 4.0 }, { value: 4.1 }, { value: 4.1 }, { value: 4.2 }, { value: 4.1 }],
    color: '#10b981',
  },
];

// Weekly breakdown of the ~$84k
const revenueDataMonth: RevenueData[] = [
  { name: 'Sem 1', ingresos: 18500, gastos: 12000 },
  { name: 'Sem 2', ingresos: 21200, gastos: 13500 },
  { name: 'Sem 3', ingresos: 19800, gastos: 12800 },
  { name: 'Sem 4', ingresos: 24750, gastos: 15000 },
];

// Mobile usage tends to be higher in current month context
const userDataMonth: UserData[] = [
  { name: 'Móvil (App)', value: 65, color: '#22d3ee' },
  { name: 'Desktop (Web)', value: 25, color: '#8b5cf6' },
  { name: 'Tablet', value: 10, color: '#10b981' },
];

// Transactions relevant to "Now"
const recentTransactionsMonth: Transaction[] = [
  { id: 'ORD-7901', user: 'Carlos Ruiz', email: 'carlos.r@gmail.com', date: 'Hace 2 min', amount: '$150.00', status: 'Completado', img: 'https://i.pravatar.cc/150?u=1' },
  { id: 'ORD-7902', user: 'Maria Lopez', email: 'm.lopez@yahoo.com', date: 'Hace 15 min', amount: '$32.50', status: 'Completado', img: 'https://i.pravatar.cc/150?u=2' },
  { id: 'ORD-7903', user: 'Kevin Tech', email: 'kevin@dev.io', date: 'Hace 30 min', amount: '$450.00', status: 'Pendiente', img: 'https://i.pravatar.cc/150?u=3' },
  { id: 'ORD-7904', user: 'Lucia Fer', email: 'lucia.f@hotmail.com', date: 'Hace 1 hora', amount: '$25.00', status: 'Fallido', img: 'https://i.pravatar.cc/150?u=4' },
];

export const DashboardView: React.FC<DashboardViewProps> = ({ 
  kpiData, 
  revenueData, 
  userData, 
  recentTransactions, 
  loaded 
}) => {
  const [viewMode, setViewMode] = useState<'year' | 'month'>('year');

  // Dynamic data selection based on viewMode
  const currentKPIs = viewMode === 'year' ? kpiData : kpiDataMonth;
  const currentRevenue = viewMode === 'year' ? revenueData : revenueDataMonth;
  const currentUserData = viewMode === 'year' ? userData : userDataMonth;
  const currentTransactions = viewMode === 'year' ? recentTransactions : recentTransactionsMonth;

  return (
    <>
      {/* Interaction Controls */}
      <div className={`flex justify-end mb-6 transition-all duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-white/5 p-1 rounded-xl border border-white/10 flex gap-1">
          <button 
            onClick={() => setViewMode('year')}
            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${viewMode === 'year' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            Anual (2024)
          </button>
          <button 
            onClick={() => setViewMode('month')}
            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${viewMode === 'month' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            Este Mes (Julio)
          </button>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {currentKPIs.map((data, index) => (
          <div key={`${viewMode}-${index}`} style={{ transitionDelay: `${index * 100}ms` }} className={`transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <KPICard data={data} />
          </div>
        ))}
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 transition-all duration-700 delay-300" style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)' }}>
          <RevenueChart data={currentRevenue} />
        </div>
        <div className="lg:col-span-1 transition-all duration-700 delay-500" style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)' }}>
          <UserDistributionChart data={currentUserData} />
        </div>
      </div>

      <div className="mb-8 transition-all duration-700 delay-700" style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)' }}>
        <TransactionsTable transactions={currentTransactions} />
      </div>
    </>
  );
};