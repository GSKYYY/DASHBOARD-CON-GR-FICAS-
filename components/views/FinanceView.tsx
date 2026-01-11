import React from 'react';
import { GlassCard } from '../GlassCard';
import { CreditCard, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight, Truck, Package } from 'lucide-react';

export const FinanceView: React.FC<{ loaded: boolean }> = ({ loaded }) => {
  
  const handleAction = (action: string) => {
    // Simple mock action feedback
    const originalText = action;
    alert(`Iniciando proceso: ${action}...`);
  };

  return (
    <div className={`transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Credit Card - Visa (Operational) */}
        <div className="relative h-56 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 p-6 shadow-2xl transition-transform hover:scale-[1.02] cursor-pointer group">
           <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/10 blur-3xl group-hover:bg-white/20 transition-colors"></div>
           <div className="relative z-10 flex flex-col justify-between h-full text-white">
             <div className="flex justify-between items-start">
               <div>
                  <p className="text-xs font-medium opacity-75">Cuenta Operativa (Stripe)</p>
                  <p className="text-3xl font-bold tracking-tight">$84,500.00</p>
               </div>
               <CreditCard className="h-8 w-8 opacity-80" />
             </div>
             <div>
                <div className="flex gap-4 mb-4">
                  <span className="text-lg tracking-widest font-mono">****</span>
                  <span className="text-lg tracking-widest font-mono">****</span>
                  <span className="text-lg tracking-widest font-mono">****</span>
                  <span className="text-lg tracking-widest font-mono">4288</span>
                </div>
                <div className="flex justify-between items-end">
                   <div>
                      <p className="text-[10px] font-bold uppercase opacity-75">Empresa</p>
                      <p className="font-medium tracking-wide">MY STORE LLC</p>
                   </div>
                   <div>
                      <p className="text-[10px] font-bold uppercase opacity-75">Expira</p>
                      <p className="font-medium tracking-wide">12/25</p>
                   </div>
                   <div className="text-xl font-bold italic">VISA</div>
                </div>
             </div>
           </div>
        </div>

        {/* Credit Card - Mastercard (Marketing) */}
        <div className="relative h-56 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 p-6 shadow-2xl transition-transform hover:scale-[1.02] cursor-pointer group">
           <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl group-hover:bg-cyan-500/20 transition-colors"></div>
           <div className="relative z-10 flex flex-col justify-between h-full text-white">
             <div className="flex justify-between items-start">
               <div>
                  <p className="text-xs font-medium opacity-75">Presupuesto Ads</p>
                  <p className="text-3xl font-bold tracking-tight">$12,250.50</p>
               </div>
               <div className="flex -space-x-2">
                 <div className="h-8 w-8 rounded-full bg-red-500/80"></div>
                 <div className="h-8 w-8 rounded-full bg-amber-500/80"></div>
               </div>
             </div>
             <div>
                <div className="flex gap-4 mb-4">
                  <span className="text-lg tracking-widest font-mono">****</span>
                  <span className="text-lg tracking-widest font-mono">****</span>
                  <span className="text-lg tracking-widest font-mono">****</span>
                  <span className="text-lg tracking-widest font-mono">9012</span>
                </div>
                <div className="flex justify-between items-end">
                   <div>
                      <p className="text-[10px] font-bold uppercase opacity-75">Titular</p>
                      <p className="font-medium tracking-wide">MARKETING</p>
                   </div>
                   <div>
                      <p className="text-[10px] font-bold uppercase opacity-75">Expira</p>
                      <p className="font-medium tracking-wide">09/26</p>
                   </div>
                </div>
             </div>
           </div>
        </div>

        {/* Quick Actions */}
        <GlassCard title="Gestión de Tienda" className="flex flex-col justify-center">
           <div className="grid grid-cols-2 gap-4">
             <button onClick={() => handleAction('Transferir')} className="flex flex-col items-center justify-center p-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-all hover:scale-105 active:scale-95">
                <ArrowUpRight className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">Retirar Fondos</span>
             </button>
             <button onClick={() => handleAction('Pagar Proveedor')} className="flex flex-col items-center justify-center p-4 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 transition-all hover:scale-105 active:scale-95">
                <Truck className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">Pagar Proveedor</span>
             </button>
             <button onClick={() => handleAction('Reembolsar')} className="flex flex-col items-center justify-center p-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 transition-all hover:scale-105 active:scale-95">
                <DollarSign className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">Emitir Reembolso</span>
             </button>
             <button onClick={() => handleAction('Stock')} className="flex flex-col items-center justify-center p-4 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 transition-all hover:scale-105 active:scale-95">
                <Package className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">Comprar Stock</span>
             </button>
           </div>
        </GlassCard>
      </div>

      <GlassCard title="Movimientos Recientes" className="min-h-[300px]">
        <div className="space-y-4">
           {[1,2,3,4,5].map((i) => (
             <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 group cursor-default">
               <div className="flex items-center gap-4">
                 <div className={`h-10 w-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${i % 2 === 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {i % 2 === 0 ? <ArrowDownRight className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                 </div>
                 <div>
                   <p className="text-white font-medium">{i % 2 === 0 ? 'Pago de Pasarela (Stripe)' : i % 3 === 0 ? 'Pago a DHL Express' : 'Gasto en Google Ads'}</p>
                   <p className="text-xs text-slate-400">Hace {i * 2} horas</p>
                 </div>
               </div>
               <div className="text-right">
                 <p className={`font-bold ${i % 2 === 0 ? 'text-emerald-400' : 'text-white'}`}>{i % 2 === 0 ? '+' : '-'}${Math.floor(Math.random() * 2000) + 100}.00</p>
                 <p className="text-xs text-slate-500">Completado</p>
               </div>
             </div>
           ))}
        </div>
      </GlassCard>
    </div>
  );
};