import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { GlassCard } from './GlassCard';
import { Transaction } from '../types';
import { MoreHorizontal, Eye, Download, Archive, Trash2 } from 'lucide-react';

interface TransactionsTableProps {
  transactions: Transaction[];
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions }) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  // Handle scroll to close menu
  useEffect(() => {
    const handleScroll = () => {
      if (activeMenuId) setActiveMenuId(null);
    };
    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [activeMenuId]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.action-menu') && !target.closest('.action-button')) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleActionClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (activeMenuId === id) {
      setActiveMenuId(null);
      return;
    }

    const button = buttonRefs.current[id];
    if (button) {
      const rect = button.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Calculate position
      let top = rect.bottom + scrollTop + 5;
      const left = rect.right - 192; // 192px is w-48 (width of dropdown)

      // Check if menu would go off bottom screen
      if (rect.bottom + 200 > window.innerHeight) {
          top = rect.top + scrollTop - 180; // Show above
      }

      setMenuPosition({ top, left });
      setActiveMenuId(id);
    }
  };

  const handleMenuAction = (action: string, id: string) => {
    alert(`Acción "${action}" ejecutada para la transacción ${id}`);
    setActiveMenuId(null);
  };

  return (
    <GlassCard title="Transacciones Recientes" className="overflow-hidden">
      <div className="overflow-x-auto pb-4">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
              <th className="pb-4 pl-2">Usuario</th>
              <th className="pb-4">Fecha</th>
              <th className="pb-4">Monto</th>
              <th className="pb-4">Estado</th>
              <th className="pb-4 text-right pr-4">Acción</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium">
            {transactions.map((t) => (
              <tr key={t.id} className="group border-b border-white/5 transition-colors hover:bg-white/5 relative">
                <td className="py-4 pl-2">
                  <div className="flex items-center gap-3">
                    <img src={t.img} alt={t.user} className="h-10 w-10 rounded-full border border-white/10 object-cover" />
                    <div>
                      <div className="text-white font-medium">{t.user}</div>
                      <div className="text-xs text-slate-500">{t.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-slate-400">{t.date}</td>
                <td className="py-4 font-semibold text-white tracking-wide">{t.amount}</td>
                <td className="py-4">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                    t.status === 'Completado'
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
                      : t.status === 'Pendiente'
                      ? 'border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.1)]'
                      : 'border-red-500/30 bg-red-500/10 text-red-400'
                  }`}>
                    <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                      t.status === 'Completado' ? 'bg-emerald-400' : t.status === 'Pendiente' ? 'bg-amber-400' : 'bg-red-400'
                    }`}></span>
                    {t.status}
                  </span>
                </td>
                <td className="py-4 text-right pr-2">
                  <button 
                    ref={el => buttonRefs.current[t.id] = el}
                    onClick={(e) => handleActionClick(t.id, e)}
                    className={`action-button rounded-lg p-2 transition-all duration-200 outline-none focus:ring-2 focus:ring-cyan-500/50 ${
                        activeMenuId === t.id ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Render Dropdown in Portal to avoid clipping issues with overflow-hidden containers */}
      {activeMenuId && createPortal(
        <div 
          className="action-menu fixed z-[9999] w-48 rounded-xl border border-white/10 bg-[#1e293b] p-1 shadow-[0_10px_40px_rgba(0,0,0,0.5)] ring-1 ring-black ring-opacity-5 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200"
          style={{ top: menuPosition.top, left: menuPosition.left }}
        >
          <div className="py-1">
            <button onClick={() => handleMenuAction('Ver Detalles', activeMenuId)} className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
              <Eye className="h-4 w-4 text-cyan-400" /> Ver Detalles
            </button>
            <button onClick={() => handleMenuAction('Descargar PDF', activeMenuId)} className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
              <Download className="h-4 w-4 text-emerald-400" /> Descargar Recibo
            </button>
            <button onClick={() => handleMenuAction('Archivar', activeMenuId)} className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
              <Archive className="h-4 w-4 text-amber-400" /> Archivar
            </button>
            <div className="my-1 border-t border-white/10"></div>
            <button onClick={() => handleMenuAction('Eliminar', activeMenuId)} className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors">
              <Trash2 className="h-4 w-4" /> Eliminar
            </button>
          </div>
        </div>,
        document.body
      )}
    </GlassCard>
  );
};