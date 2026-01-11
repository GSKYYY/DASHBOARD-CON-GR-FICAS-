import React from 'react';
import { GlassCard } from './GlassCard';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { UserData } from '../types';
import { PieChart as PieIcon } from 'lucide-react';

interface UserDistributionChartProps {
  data: UserData[];
}

export const UserDistributionChart: React.FC<UserDistributionChartProps> = ({ data }) => {
  const hasData = data && data.length > 0;

  return (
    <GlassCard title="Ventas por Dispositivo" className="h-full min-h-[420px] flex flex-col">
      <div className="relative flex-1 min-h-[220px] w-full mt-2">
        {hasData ? (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={6}
                  dataKey="value"
                  stroke="none"
                  animationDuration={1500}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} className="outline-none" />
                  ))}
                </Pie>
                <Tooltip 
                    contentStyle={{ 
                        backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        color: '#fff'
                    }}
                    itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center Text - Centered absolutely relative to the container */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <p className="text-3xl font-bold text-white">100%</p>
              <p className="text-xs text-slate-400">Ventas</p>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
             <PieIcon className="h-10 w-10 mb-2 opacity-50" />
             <p>Sin datos</p>
          </div>
        )}
      </div>

      {/* Custom Legend */}
      <div className="mt-4 space-y-4 pb-2">
        {hasData && data.map((item, index) => (
          <div key={index} className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div 
                className="h-3 w-3 rounded-full transition-shadow duration-300 group-hover:shadow-[0_0_8px]" 
                style={{ backgroundColor: item.color, boxShadow: `0 0 2px ${item.color}` }} 
              />
              <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{item.name}</span>
            </div>
            <span className="font-semibold text-white">{item.value}%</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};