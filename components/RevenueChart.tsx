import React from 'react';
import { GlassCard } from './GlassCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RevenueData } from '../types';
import { AlertCircle } from 'lucide-react';

interface RevenueChartProps {
  data: RevenueData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-white/10 bg-[#0f172a]/95 p-3 shadow-xl backdrop-blur-md z-50">
        <p className="mb-2 text-sm font-semibold text-white">{label}</p>
        <p className="text-xs font-medium text-cyan-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          Ventas: ${payload[0].value.toLocaleString()}
        </p>
        <p className="text-xs font-medium text-violet-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-violet-400"></span>
          Costos Operativos: ${payload[1].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  const hasData = data && data.length > 0;

  return (
    <GlassCard title="Rendimiento de Ventas vs Costos" className="h-full min-h-[420px] flex flex-col">
      <div className="flex-1 w-full min-h-[300px]">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
              <XAxis 
                  dataKey="name" 
                  stroke="#64748b" 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
              />
              <YAxis 
                  stroke="#64748b" 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                  tickLine={false} 
                  axisLine={false} 
                  width={45}
                  tickFormatter={(value) => `$${value/1000}k`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Area 
                  type="monotone" 
                  dataKey="ingresos" 
                  stroke="#22d3ee" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorIngresos)" 
                  animationDuration={2000}
                  activeDot={{ r: 6, strokeWidth: 0, fill: '#fff' }}
              />
              <Area 
                  type="monotone" 
                  dataKey="gastos" 
                  stroke="#8b5cf6" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorGastos)" 
                  animationDuration={2000}
                  activeDot={{ r: 6, strokeWidth: 0, fill: '#fff' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-500">
             <AlertCircle className="h-10 w-10 mb-2 opacity-50" />
             <p>No hay datos disponibles para mostrar</p>
          </div>
        )}
      </div>
    </GlassCard>
  );
};