import React from 'react';
import { GlassCard } from './GlassCard';
import { ResponsiveContainer, LineChart, Line } from 'recharts';
import { KPIData } from '../types';

interface KPICardProps {
  data: KPIData;
}

export const KPICard: React.FC<KPICardProps> = ({ data }) => {
  return (
    <GlassCard className="flex flex-col justify-between min-h-[180px] group">
      <div className="flex justify-between items-start gap-4">
        <div>
          <p className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider truncate">{data.title}</p>
          <h4 className="mt-1 text-2xl sm:text-3xl font-bold text-white">{data.value}</h4>
        </div>
        <div className={`flex-shrink-0 flex items-center rounded-full px-2 py-1 text-xs font-bold ${data.isPositive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
          {data.isPositive ? '+' : ''}{data.change}
        </div>
      </div>

      {/* Increased height for sparkline and proper padding */}
      <div className="h-16 w-full mt-6 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.data}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={data.color}
              strokeWidth={3}
              dot={false}
              isAnimationActive={true}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};