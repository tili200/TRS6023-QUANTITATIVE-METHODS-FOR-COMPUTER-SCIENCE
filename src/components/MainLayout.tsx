import { Outlet } from 'react-router-dom';
import SideNavBar from './SideNavBar';
import TopNavBar from './TopNavBar';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-on-background flex">
      <SideNavBar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <TopNavBar />
        <main className="flex-1 pt-24 px-12 pb-16 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="max-w-7xl mx-auto h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
        
        <footer className="px-12 py-10 border-t-8 border-primary ml-0 bg-black text-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col gap-1">
              <p className="text-[10px] font-black tracking-[0.2em] uppercase opacity-60">
                © 2024 FACULTY OF COMPUTER SCIENCE
              </p>
              <p className="text-[10px] font-black tracking-[0.2em] uppercase opacity-40">
                ACCREDITED POST GRADUATE PROGRAM
              </p>
            </div>
            <div className="flex gap-10">
              <a href="#" className="text-white hover:text-primary transition-colors text-[10px] font-black uppercase tracking-[0.2em]">Privacy</a>
              <a href="#" className="text-white hover:text-primary transition-colors text-[10px] font-black uppercase tracking-[0.2em]">Terms</a>
              <a href="#" className="text-white hover:text-primary transition-colors text-[10px] font-black uppercase tracking-[0.2em]">Integrity</a>
              <div className="w-px h-4 bg-white/20 hidden md:block"></div>
              <span className="text-primary font-black text-[10px] uppercase tracking-[0.2em]">STUDENT PORTAL</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
