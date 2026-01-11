import React, { useState } from 'react';
import { KPICard } from '../KPICard';
import { RevenueChart } from '../RevenueChart';
import { UserDistributionChart } from '../UserDistributionChart';
import { TransactionsTable } from '../TransactionsTable';
import { KPIData, RevenueData, UserData, Transaction } from '../../types';
import { Calendar } from 'lucide-react';

interface DashboardViewProps {
  kpiData: KPIData[];
  revenueData: RevenueData[];
  userData: UserData[];
  recentTransactions: Transaction[];
  loaded: boolean;
}

// Simulated data for "Last Month" view to demonstrate interactivity
const revenueDataMonth: RevenueData[] = [
  { name: 'Sem 1', ingresos: 12000, gastos: 8400 },
  { name: 'Sem 2', ingresos: 15000, gastos: 9000 },
  { name: 'Sem 3', ingresos: 11000, gastos: 10500 },
  { name: 'Sem 4', ingresos: 18000, gastos: 11000 },
];

export const DashboardView: React.FC<DashboardViewProps> = ({ 
  kpiData, 
  revenueData, 
  userData, 
  recentTransactions, 
  loaded 
}) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d'>('7d');

  // Dynamic data based on selection
  const currentRevenueData = timeRange === '7d' ? revenueData : revenueDataMonth;

  return (
    <>
      {/* Interaction Controls */}
      <div className={`flex justify-end mb-6 transition-all duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-white/5 p-1 rounded-xl border border-white/10 flex gap-1">
          <button 
            onClick={() => setTimeRange('7d')}
            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${timeRange === '7d' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            Últimos 7 Días
          </button>
          <button 
            onClick={() => setTimeRange('30d')}
            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${timeRange === '30d' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            Este Mes
          </button>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {kpiData.map((data, index) => (
          <div key={index} style={{ transitionDelay: `${index * 100}ms` }} className={`transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <KPICard data={data} />
          </div>
        ))}
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 transition-all duration-700 delay-300" style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)' }}>
          {/* Key change: Passing dynamic data based on state */}
          <RevenueChart data={currentRevenueData} />
        </div>
        <div className="lg:col-span-1 transition-all duration-700 delay-500" style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)' }}>
          <UserDistributionChart data={userData} />
        </div>
      </div>

      <div className="mb-8 transition-all duration-700 delay-700" style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)' }}>
        <TransactionsTable transactions={recentTransactions} />
      </div>
    </>
  );
};