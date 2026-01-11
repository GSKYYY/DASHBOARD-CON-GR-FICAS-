import React, { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:border-white/20 ${className}`}>
      {/* Subtle gradient overlay for depth */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-white/5 blur-3xl" />
      
      {title && (
        <h3 className="mb-4 text-lg font-semibold tracking-wide text-white/90">
          {title}
        </h3>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};