import React from 'react';
import { motion } from 'motion/react';

interface BasePageProps {
  title: string;
  subtitle?: string;
  description: string;
  children?: React.ReactNode;
}

export default function BasePage({ title, subtitle, description, children }: BasePageProps) {
  return (
    <div className="space-y-16 pb-16">
      <header className="space-y-6">
        <div className="flex items-center gap-4">
          {subtitle && (
            <span className="text-[10px] font-black text-white px-3 py-1 bg-black tracking-[0.2em] uppercase">
              {subtitle}
            </span>
          )}
          <div className="h-1 flex-1 bg-black/5"></div>
        </div>
        <h1 className="text-6xl font-black tracking-tighter text-black uppercase leading-none">{title}</h1>
        <div className="max-w-2xl border-l-4 border-primary pl-8 py-2">
          <p className="text-secondary text-sm font-bold uppercase tracking-widest leading-relaxed">{description}</p>
        </div>
      </header>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="space-y-12"
      >
        {children || (
          <div className="academic-card min-h-[500px] flex flex-col items-center justify-center p-20 bg-gray-50 text-center border-2 border-black border-dashed">
            <div className="w-24 h-24 bg-black flex items-center justify-center my-8 shadow-[8px_8px_0px_rgba(185,28,28,1)]">
              <span className="material-symbols-outlined text-white text-5xl">verified_user</span>
            </div>
            <h3 className="text-3xl font-black uppercase mb-4 tracking-tighter">Academic Verification Pending</h3>
            <p className="text-secondary text-xs font-black uppercase tracking-widest max-w-sm leading-loose">This module section is currently undergoing secondary verification by the faculty lead. verified assets will be available shortly.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
