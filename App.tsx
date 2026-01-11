import React, { useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/views/DashboardView';
import { FinanceView } from './components/views/FinanceView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { NotificationsView } from './components/views/NotificationsView';
import { SettingsView } from './components/views/SettingsView';
import { KPIData, RevenueData, UserData, Transaction, ViewType } from './types';

// -- Mock Data Configuration for Production Demo --
// CONTEXT: YEARLY (YTD Jan - Jul)

const kpiData: KPIData[] = [
  {
    title: 'Ventas Anuales (YTD)',
    value: '$423,500', // Matches approx sum of revenueData below
    change: '+18.2% vs 2023',
    isPositive: true,
    data: [{ value: 45 }, { value: 52 }, { value: 48 }, { value: 61 }, { value: 58 }, { value: 75 }, { value: 84 }],
    color: '#22d3ee', // Cyan
  },
  {
    title: 'Pedidos Totales',
    value: '6,245',
    change: '+5.4%',
    isPositive: true,
    data: [{ value: 800 }, { value: 850 }, { value: 820 }, { value: 900 }, { value: 880 }, { value: 950 }, { value: 1045 }],
    color: '#8b5cf6', // Violet
  },
  {
    title: 'Ticket Promedio (AOV)',
    value: '$67.81',
    change: '+2.1%',
    isPositive: true,
    data: [{ value: 65 }, { value: 66 }, { value: 65 }, { value: 67 }, { value: 68 }, { value: 69 }, { value: 68 }],
    color: '#f472b6', // Pink
  },
  {
    title: 'Tasa de Conversión Global',
    value: '3.5%',
    change: '-0.2%',
    isPositive: false,
    data: [{ value: 3.8 }, { value: 3.7 }, { value: 3.6 }, { value: 3.5 }, { value: 3.6 }, { value: 3.5 }, { value: 3.5 }],
    color: '#10b981', // Emerald
  },
];

// Monthly breakdown for the Year View
const revenueData: RevenueData[] = [
  { name: 'Ene', ingresos: 45000, gastos: 28000 },
  { name: 'Feb', ingresos: 52000, gastos: 31000 },
  { name: 'Mar', ingresos: 48000, gastos: 35000 },
  { name: 'Abr', ingresos: 61000, gastos: 32000 },
  { name: 'May', ingresos: 58000, gastos: 34000 },
  { name: 'Jun', ingresos: 75000, gastos: 38000 },
  { name: 'Jul', ingresos: 84000, gastos: 41000 }, // Last month peak
];

const userData: UserData[] = [
  { name: 'Móvil (App)', value: 55, color: '#22d3ee' },
  { name: 'Desktop (Web)', value: 35, color: '#8b5cf6' },
  { name: 'Tablet', value: 10, color: '#10b981' },
];

const recentTransactions: Transaction[] = [
  { id: 'ORD-7821', user: 'Laura Méndez', email: 'laura.m@gmail.com', date: '15 Jul, 2024', amount: '$129.99', status: 'Completado', img: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
  { id: 'ORD-7822', user: 'Roberto Diaz', email: 'rob.d@outlook.com', date: '14 Jul, 2024', amount: '$45.50', status: 'Completado', img: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
  { id: 'ORD-7823', user: 'Sofia Chen', email: 'sofia.design@studio.com', date: '14 Jul, 2024', amount: '$299.00', status: 'Pendiente', img: 'https://i.pravatar.cc/150?u=a04258114e29026302d' },
  { id: 'ORD-7824', user: 'Miguel Angel', email: 'miguel.dev@tech.io', date: '13 Jul, 2024', amount: '$85.00', status: 'Fallido', img: 'https://i.pravatar.cc/150?u=a042581f4e29026701d' },
];

const App: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  useEffect(() => {
    // Initial splash screen timer
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
      setTimeout(() => setLoaded(true), 500);
    }, 2500);

    return () => clearTimeout(splashTimer);
  }, []);

  const handleNavigate = (view: ViewType) => {
    if (view !== currentView) {
      setLoaded(false);
      setTimeout(() => {
        setCurrentView(view);
        setLoaded(true);
      }, 300);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <DashboardView 
            kpiData={kpiData}
            revenueData={revenueData}
            userData={userData}
            recentTransactions={recentTransactions}
            loaded={loaded}
          />
        );
      case 'finanzas':
        return <FinanceView loaded={loaded} />;
      case 'analiticas':
        return <AnalyticsView loaded={loaded} />;
      case 'notificaciones':
        return <NotificationsView loaded={loaded} />;
      case 'configuracion':
        return <SettingsView loaded={loaded} />;
      default:
        return <DashboardView kpiData={kpiData} revenueData={revenueData} userData={userData} recentTransactions={recentTransactions} loaded={loaded} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0f172a] font-sans text-slate-300 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      
      {/* Intro Splash Screen */}
      <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0f172a] transition-all duration-1000 ease-in-out ${showSplash ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="flex flex-col items-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 animate-ping rounded-full bg-cyan-500/20 blur-xl"></div>
            <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_50px_rgba(34,211,238,0.4)]">
              <span className="text-4xl font-bold text-white">N</span>
            </div>
          </div>
          <div className="text-center space-y-2">
            <p className="text-sm font-medium tracking-[0.3em] text-cyan-400 uppercase opacity-80">Created By</p>
            <h1 className="text-5xl font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] scale-100 animate-pulse">
              KVR
            </h1>
          </div>
        </div>
      </div>

      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute bottom-[0%] right-[-10%] h-[600px] w-[600px] rounded-full bg-cyan-600/10 blur-[120px]" />
        <div className="absolute top-[20%] right-[30%] h-[300px] w-[300px] rounded-full bg-emerald-500/10 blur-[100px]" />
      </div>

      <Sidebar currentView={currentView} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main className="relative z-10 flex flex-col min-h-screen p-4 sm:p-6 ml-20 md:ml-64 transition-all duration-300 ease-out">
        
        <div className="mx-auto w-full max-w-7xl">
          {/* Global Header */}
          <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight capitalize">
                {currentView === 'analiticas' ? 'Analíticas de Conversión' : currentView === 'configuracion' ? 'Configuración de Tienda' : currentView}
              </h1>
              <p className="text-slate-400 mt-1 text-sm sm:text-base">
                {currentView === 'dashboard' ? 'Resumen de rendimiento de tu tienda en tiempo real.' : 
                 currentView === 'finanzas' ? 'Flujo de caja, pasarelas de pago y costos operativos.' :
                 currentView === 'analiticas' ? 'Fuentes de tráfico y comportamiento del comprador.' :
                 currentView === 'notificaciones' ? 'Alertas de stock y actualizaciones de pedidos.' :
                 'Ajustes de cuenta y preferencias de visualización.'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-white">Store Admin</p>
                  <p className="text-xs text-slate-400">Pro Plan</p>
              </div>
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl border-2 border-white/10 shadow-lg cursor-pointer hover:border-cyan-500/50 transition-colors" onClick={() => handleNavigate('configuracion')} />
            </div>
          </header>

          {/* View Container */}
          <div className="min-h-[600px]">
             {renderContent()}
          </div>

          {/* Global Footer */}
          <footer className="mt-auto border-t border-white/5 pt-6 text-center text-sm text-slate-500">
            <p>&copy; 2024 Enterprise Analytics. Todos los derechos reservados.</p>
            <div className="mt-2 flex justify-center gap-4">
              <button className="hover:text-cyan-400 transition-colors">Soporte</button>
              <button className="hover:text-cyan-400 transition-colors">API</button>
              <button className="hover:text-cyan-400 transition-colors">Estado</button>
            </div>
          </footer>
        </div>

      </main>
    </div>
  );
};

export default App;