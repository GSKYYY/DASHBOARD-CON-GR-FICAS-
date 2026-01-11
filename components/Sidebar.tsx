import React from 'react';
import { LayoutDashboard, PieChart, Wallet, Settings, LogOut, Bell } from 'lucide-react';
import { ViewType } from '../types';

interface SidebarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const menuItems: { id: ViewType; icon: any; label: string }[] = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'finanzas', icon: Wallet, label: 'Finanzas' },
    { id: 'analiticas', icon: PieChart, label: 'Analíticas' },
    { id: 'notificaciones', icon: Bell, label: 'Notificaciones' },
    { id: 'configuracion', icon: Settings, label: 'Configuración' },
  ];

  const handleLogout = () => {
    // In a real app, this would clear auth tokens
    alert("Sesión cerrada correctamente (Simulación)");
    window.location.reload();
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-20 flex-col items-center border-r border-white/10 bg-[#0f172a]/95 backdrop-blur-xl py-8 transition-all duration-300 md:w-64 md:items-start md:px-6 shadow-2xl">
      {/* Logo Area */}
      <div className="mb-10 flex w-full items-center justify-center md:justify-start cursor-pointer" onClick={() => onNavigate('dashboard')}>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-shadow">
          <span className="text-xl font-bold text-white">N</span>
        </div>
        <span className="ml-3 hidden text-xl font-bold tracking-tight text-white md:block">
          Neon<span className="text-cyan-400">Dash</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex w-full flex-1 flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`group relative flex w-full items-center rounded-xl p-3 transition-all duration-200 outline-none focus:ring-2 focus:ring-cyan-500/50 ${
                isActive
                  ? 'bg-white/10 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon 
                className={`h-6 w-6 transition-colors duration-200 ${isActive ? 'text-cyan-400' : 'group-hover:text-white'}`} 
                strokeWidth={1.5} 
              />
              <span className={`ml-3 hidden font-medium md:block transition-colors ${isActive ? 'text-white' : ''}`}>
                {item.label}
              </span>
              
              {/* Active Indicator Line (Mobile) */}
              {isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-l-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] md:hidden" />
              )}
              
              {/* Active Indicator Glow (Desktop) */}
              {isActive && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/10 to-transparent opacity-0 md:opacity-100 pointer-events-none" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <button 
        onClick={handleLogout}
        className="group flex w-full items-center justify-center rounded-xl p-3 text-slate-400 transition-all hover:bg-red-500/10 hover:text-red-400 md:justify-start outline-none focus:ring-2 focus:ring-red-500/50"
      >
        <LogOut className="h-6 w-6 transition-transform group-hover:-translate-x-1" strokeWidth={1.5} />
        <span className="ml-3 hidden font-medium md:block">Cerrar Sesión</span>
      </button>
    </aside>
  );
};