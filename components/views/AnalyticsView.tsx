import React from 'react';
import { GlassCard } from '../GlassCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUp, Users, ShoppingBag, MousePointer, BarChart2 } from 'lucide-react';

// Static mock data defined internally for the view
const trafficData = [
  { name: '00:00', visitors: 120, sales: 5 },
  { name: '04:00', visitors: 80, sales: 2 },
  { name: '08:00', visitors: 450, sales: 25 },
  { name: '12:00', visitors: 1200, sales: 85 },
  { name: '16:00', visitors: 950, sales: 60 },
  { name: '20:00', visitors: 1500, sales: 110 },
  { name: '23:59', visitors: 500, sales: 30 },
];

const sourceData = [
  { name: 'Google Ads', value: 45, color: '#22d3ee' },
  { name: 'Instagram/TikTok', value: 30, color: '#8b5cf6' },
  { name: 'Email Marketing', value: 15, color: '#10b981' },
  { name: 'Directo/SEO', value: 10, color: '#f472b6' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-white/10 bg-[#0f172a]/95 p-3 shadow-xl backdrop-blur-md">
        <p className="mb-2 text-sm font-semibold text-white">{label}</p>
        <div className="space-y-1">
          <p className="text-xs font-medium text-cyan-400 flex justify-between gap-4">
            <span>Visitantes:</span>
            <span className="font-bold">{payload[0].value}</span>
          </p>
          <p className="text-xs font-medium text-violet-400 flex justify-between gap-4">
            <span>Ventas:</span>
            <span className="font-bold">{payload[1].value}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export const AnalyticsView: React.FC<{ loaded: boolean }> = ({ loaded }) => {
  return (
    <div className={`transition-all duration-700 space-y-6 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wider">Tráfico Web Hoy</p>
            <h4 className="text-2xl font-bold text-white flex items-center gap-2">
              4,800 <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center"><ArrowUp className="h-3 w-3 mr-1" /> 12%</span>
            </h4>
          </div>
        </GlassCard>
        <GlassCard className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-violet-500/10 text-violet-400">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wider">Productos Vistos</p>
            <h4 className="text-2xl font-bold text-white flex items-center gap-2">
              15.2k <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center"><ArrowUp className="h-3 w-3 mr-1" /> 8%</span>
            </h4>
          </div>
        </GlassCard>
        <GlassCard className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
            <MousePointer className="h-6 w-6" />
          </div>
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wider">Click-Through Rate</p>
            <h4 className="text-2xl font-bold text-white flex items-center gap-2">
              4.2% <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full flex items-center">-0.5%</span>
            </h4>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Traffic Chart */}
        <GlassCard title="Tráfico vs Conversiones (24h)" className="lg:col-span-2 h-[400px]">
          {trafficData && trafficData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="visitors" stroke="#22d3ee" strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" />
                <Area type="monotone" dataKey="sales" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500">
               <BarChart2 className="h-10 w-10 mb-2 opacity-50" />
               <p>No hay datos de tráfico</p>
            </div>
          )}
        </GlassCard>

        {/* Traffic Sources */}
        <GlassCard title="Canales de Adquisición" className="h-[400px] flex flex-col justify-center">
          <div className="space-y-6">
            {sourceData && sourceData.map((source, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white font-medium">{source.name}</span>
                  <span className="text-slate-400">{source.value}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${source.value}%`, 
                      backgroundColor: source.color,
                      boxShadow: `0 0 10px ${source.color}40`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-white/5">
             <p className="text-xs text-slate-500 text-center">Datos basados en atribución de último click</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};