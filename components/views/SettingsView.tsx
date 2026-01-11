import React, { useState } from 'react';
import { GlassCard } from '../GlassCard';
import { User, Lock, Bell, Moon, Shield, Save } from 'lucide-react';

export const SettingsView: React.FC<{ loaded: boolean }> = ({ loaded }) => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@neondash.com',
    bio: 'Administrador del sistema y desarrollador Frontend senior.'
  });

  const [toggles, setToggles] = useState({
    notifications: true,
    twoFactor: false,
    publicProfile: true,
    newsletter: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles({ ...toggles, [key]: !toggles[key] });
  };

  const handleSave = () => {
    const btn = document.getElementById('save-btn');
    if(btn) {
        btn.innerHTML = '¡Guardado!';
        btn.classList.add('bg-green-500', 'border-green-500', 'text-white');
        setTimeout(() => {
            btn.innerHTML = 'Guardar Cambios';
            btn.classList.remove('bg-green-500', 'border-green-500', 'text-white');
        }, 2000);
    }
  };

  return (
    <div className={`transition-all duration-700 max-w-4xl mx-auto ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Column */}
        <div className="lg:col-span-1 space-y-6">
           <GlassCard className="text-center">
              <div className="relative inline-block mb-4 group">
                 <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="h-32 w-32 rounded-full border-4 border-white/10 mx-auto object-cover group-hover:border-cyan-500/50 transition-colors" />
                 <button className="absolute bottom-0 right-0 bg-cyan-500 hover:bg-cyan-400 text-white p-2 rounded-full shadow-lg transition-transform hover:scale-110">
                   <User className="h-4 w-4" />
                 </button>
              </div>
              <h3 className="text-xl font-bold text-white">{formData.name}</h3>
              <p className="text-sm text-slate-400">Admin</p>
           </GlassCard>

           <div className="flex flex-col gap-2">
              {['Cuenta', 'Seguridad', 'Notificaciones', 'Facturación'].map((item, i) => (
                 <button key={i} className={`text-left px-4 py-3 rounded-xl transition-colors ${i === 0 ? 'bg-white/10 text-white font-medium' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                    {item}
                 </button>
              ))}
           </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-2 space-y-6">
           <GlassCard title="Información Personal">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                 <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase">Nombre Completo</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[#0f172a]/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase">Correo Electrónico</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#0f172a]/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                    />
                 </div>
                 <div className="col-span-1 md:col-span-2 space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase">Biografía</label>
                    <textarea 
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-[#0f172a]/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
                    />
                 </div>
              </div>
           </GlassCard>

           <GlassCard title="Preferencias">
              <div className="space-y-4">
                 {[
                   { key: 'notifications', label: 'Notificaciones por Email', icon: Bell, desc: 'Recibe actualizaciones diarias' },
                   { key: 'twoFactor', label: '2FA Autenticación', icon: Shield, desc: 'Añade una capa extra de seguridad' },
                   { key: 'publicProfile', label: 'Perfil Público', icon: User, desc: 'Permitir que otros te encuentren' }
                 ].map((item: any) => (
                    <div key={item.key} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                       <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-white/5 text-slate-300">
                             <item.icon className="h-5 w-5" />
                          </div>
                          <div>
                             <p className="text-white font-medium">{item.label}</p>
                             <p className="text-xs text-slate-500">{item.desc}</p>
                          </div>
                       </div>
                       <button 
                         onClick={() => handleToggle(item.key)}
                         className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${toggles[item.key as keyof typeof toggles] ? 'bg-cyan-500' : 'bg-slate-700'}`}
                       >
                          <div className={`bg-white w-4 h-4 rounded-full shadow-sm transition-transform duration-300 ${toggles[item.key as keyof typeof toggles] ? 'translate-x-6' : 'translate-x-0'}`} />
                       </button>
                    </div>
                 ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                 <button 
                   id="save-btn"
                   onClick={handleSave}
                   className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all"
                 >
                    <Save className="h-5 w-5" /> Guardar Cambios
                 </button>
              </div>
           </GlassCard>
        </div>
      </div>
    </div>
  );
};