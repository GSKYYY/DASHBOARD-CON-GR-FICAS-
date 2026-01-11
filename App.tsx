import React, { useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/views/DashboardView';
import { FinanceView } from './components/views/FinanceView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { NotificationsView } from './components/views/NotificationsView';
import { SettingsView } from './components/views/SettingsView';
import { KPIData, RevenueData, UserData, Transaction, ViewType } from './types';

// Updated Mock Data with Realistic Images
const kpiData: KPIData[] = [
  {
    title: 'Ingresos Totales',
    value: '$84,250',
    change: '12.5%',
    isPositive: true,
    data: [{ value: 40 }, { value: 60 }, { value: 55 }, { value: 80 }, { value: 70 }, { value: 95 }, { value: 100 }],
    color: '#22d3ee', // Cyan
  },
  {
    title: 'Usuarios Activos',
    value: '12,504',
    change: '3.2%',
    isPositive: true,
    data: [{ value: 30 }, { value: 45 }, { value: 40 }, { value: 50 }, { value: 55 }, { value: 45 }, { value: 60 }],
    color: '#8b5cf6', // Violet
  },
  {
    title: 'Tasa de Rebote',
    value: '42.3%',
    change: '2.1%',
    isPositive: false,
    data: [{ value: 60 }, { value: 55 }, { value: 40 }, { value: 50 }, { value: 30 }, { value: 25 }, { value: 30 }],
    color: '#f472b6', // Pink
  },
  {
    title: 'Nuevas Órdenes',
    value: '1,240',
    change: '8.4%',
    isPositive: true,
    data: [{ value: 20 }, { value: 30 }, { value: 50 }, { value: 40 }, { value: 60 }, { value: 80 }, { value: 90 }],
    color: '#10b981', // Emerald
  },
];

const revenueData: RevenueData[] = [
  { name: 'Ene', ingresos: 4000, gastos: 2400 },
  { name: 'Feb', ingresos: 3000, gastos: 1398 },
  { name: 'Mar', ingresos: 2000, gastos: 9800 },
  { name: 'Abr', ingresos: 2780, gastos: 3908 },
  { name: 'May', ingresos: 1890, gastos: 4800 },
  { name: 'Jun', ingresos: 2390, gastos: 3800 },
  { name: 'Jul', ingresos: 3490, gastos: 4300 },
];

const userData: UserData[] = [
  { name: 'Desktop', value: 45, color: '#22d3ee' },
  { name: 'Mobile', value: 35, color: '#8b5cf6' },
  { name: 'Tablet', value: 20, color: '#10b981' },
];

const recentTransactions: Transaction[] = [
  { id: '1', user: 'Ana García', email: 'ana.garcia@gmail.com', date: '22 Oct 2023', amount: '$450.00', status: 'Completado', img: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
  { id: '2', user: 'Carlos Ruiz', email: 'carlos.ruiz@hotmail.com', date: '22 Oct 2023', amount: '$230.50', status: 'Pendiente', img: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
  { id: '3', user: 'Sofia Lopez', email: 'sofia.desing@studio.com', date: '21 Oct 2023', amount: '$1,200.00', status: 'Completado', img: 'https://i.pravatar.cc/150?u=a04258114e29026302d' },
  { id: '4', user: 'Miguel Angel', email: 'miguel.dev@tech.io', date: '21 Oct 2023', amount: '$85.00', status: 'Fallido', img: 'https://i.pravatar.cc/150?u=a042581f4e29026701d' },
];

const App: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  useEffect(() => {
    // Splash screen duration
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
      // Trigger main content animation slightly after splash fades out
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
      }, 300); // Transition delay
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
      
      {/* KVR Loading Screen */}
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

      {/* Main Content */}
      <main className="relative z-10 flex flex-col min-h-screen p-4 sm:p-6 ml-20 md:ml-64 transition-all duration-300 ease-out">
        
        <div className="mx-auto w-full max-w-7xl">
          {/* Header */}
          <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight capitalize">
                {currentView === 'analiticas' ? 'Analíticas' : currentView === 'configuracion' ? 'Configuración' : currentView}
              </h1>
              <p className="text-slate-400 mt-1 text-sm sm:text-base">
                {currentView === 'dashboard' ? 'Bienvenido de nuevo, aquí está lo que sucede hoy.' : 
                 currentView === 'finanzas' ? 'Gestiona tus activos y tarjetas.' :
                 currentView === 'analiticas' ? 'Métricas detalladas de rendimiento.' :
                 currentView === 'notificaciones' ? 'Mantente al día con las últimas alertas.' :
                 'Personaliza tu experiencia y perfil.'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-white">John Doe</p>
                  <p className="text-xs text-slate-400">Admin</p>
              </div>
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl border-2 border-white/10 shadow-lg cursor-pointer hover:border-cyan-500/50 transition-colors" onClick={() => handleNavigate('configuracion')} />
            </div>
          </header>

          {/* Dynamic Content */}
          <div className="min-h-[600px]">
             {renderContent()}
          </div>

          {/* Footer */}
          <footer className="mt-auto border-t border-white/5 pt-6 text-center text-sm text-slate-500">
            <p>&copy; 2023 NeonDash Analytics. Todos los derechos reservados.</p>
            <div className="mt-2 flex justify-center gap-4">
              <button className="hover:text-cyan-400 transition-colors">Privacidad</button>
              <button className="hover:text-cyan-400 transition-colors">Términos</button>
              <button className="hover:text-cyan-400 transition-colors">Ayuda</button>
            </div>
          </footer>
        </div>

      </main>
    </div>
  );
};

export default App;