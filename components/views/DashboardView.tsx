import React from 'react';
import { KPICard } from '../KPICard';
import { RevenueChart } from '../RevenueChart';
import { UserDistributionChart } from '../UserDistributionChart';
import { TransactionsTable } from '../TransactionsTable';
import { KPIData, RevenueData, UserData, Transaction } from '../../types';

interface DashboardViewProps {
  kpiData: KPIData[];
  revenueData: RevenueData[];
  userData: UserData[];
  recentTransactions: Transaction[];
  loaded: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ 
  kpiData, 
  revenueData, 
  userData, 
  recentTransactions, 
  loaded 
}) => {
  return (
    <>
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {kpiData.map((data, index) => (
          <div key={index} style={{ transitionDelay: `${index * 100}ms` }} className={`transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <KPICard data={data} />
          </div>
        ))}
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 transition-all duration-700 delay-300" style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)' }}>
          <RevenueChart data={revenueData} />
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