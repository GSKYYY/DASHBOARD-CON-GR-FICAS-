import React, { useState } from 'react';
import { GlassCard } from '../GlassCard';
import { NotificationItem } from '../../types';
import { Bell, Check, Trash2, Info, AlertTriangle, CheckCircle } from 'lucide-react';

const initialNotifications: NotificationItem[] = [
  { id: '1', title: 'Pago Recibido', message: 'Has recibido un pago de $450.00 de Ana García.', time: 'Hace 2 min', type: 'success', read: false },
  { id: '2', title: 'Alerta de Seguridad', message: 'Nuevo inicio de sesión detectado en San Francisco, CA.', time: 'Hace 1 hora', type: 'warning', read: false },
  { id: '3', title: 'Mantenimiento Programado', message: 'El sistema estará inactivo el Domingo a las 3 AM.', time: 'Hace 5 horas', type: 'info', read: true },
  { id: '4', title: 'Límite de Presupuesto', message: 'Has alcanzado el 90% de tu presupuesto de marketing.', time: 'Hace 1 día', type: 'alert', read: true },
];

export const NotificationsView: React.FC<{ loaded: boolean }> = ({ loaded }) => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-emerald-400" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-amber-400" />;
      case 'alert': return <AlertTriangle className="h-5 w-5 text-red-400" />;
      default: return <Info className="h-5 w-5 text-cyan-400" />;
    }
  };

  return (
    <div className={`transition-all duration-700 max-w-3xl mx-auto ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="flex justify-between items-center mb-6">
         <h2 className="text-xl font-bold text-white flex items-center gap-2"><Bell className="h-6 w-6" /> Centro de Notificaciones</h2>
         <button onClick={markAllAsRead} className="text-xs text-cyan-400 hover:text-cyan-300 font-medium px-3 py-1 rounded-full border border-cyan-500/30 hover:bg-cyan-500/10 transition-colors">
            Marcar todas como leídas
         </button>
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
           <GlassCard className="text-center py-12">
              <Bell className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No tienes notificaciones nuevas</p>
           </GlassCard>
        ) : (
          notifications.map((n) => (
            <div key={n.id} className={`relative overflow-hidden rounded-xl border p-4 transition-all duration-300 ${n.read ? 'bg-white/5 border-white/5' : 'bg-white/10 border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.05)]'}`}>
              <div className="flex gap-4">
                <div className={`mt-1 p-2 rounded-full h-fit ${n.read ? 'bg-white/5' : 'bg-white/10'}`}>
                   {getIcon(n.type)}
                </div>
                <div className="flex-1">
                   <div className="flex justify-between items-start">
                      <h4 className={`font-semibold ${n.read ? 'text-slate-300' : 'text-white'}`}>{n.title}</h4>
                      <span className="text-xs text-slate-500">{n.time}</span>
                   </div>
                   <p className="text-sm text-slate-400 mt-1 leading-relaxed">{n.message}</p>
                   
                   <div className="flex gap-3 mt-3">
                      {!n.read && (
                        <button onClick={() => markAsRead(n.id)} className="flex items-center gap-1 text-xs text-cyan-400 hover:text-white transition-colors">
                          <Check className="h-3 w-3" /> Marcar leída
                        </button>
                      )}
                      <button onClick={() => deleteNotification(n.id)} className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-400 transition-colors">
                        <Trash2 className="h-3 w-3" /> Eliminar
                      </button>
                   </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};