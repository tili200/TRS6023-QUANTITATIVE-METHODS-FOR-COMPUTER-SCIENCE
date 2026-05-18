import { Search, Bell, User as UserIcon, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TopNavBar() {
  return (
    <header className="fixed top-0 right-0 left-64 h-20 bg-primary text-white border-b-4 border-black flex justify-between items-center px-10 z-40">
      <div className="flex items-center gap-4">
        <div className="bg-white border-2 border-black px-3 py-1 flex items-center gap-1 font-black text-xl tracking-tighter uppercase">
          <span className="text-primary">MSU</span>
          <span className="text-black">ODL</span>
        </div>
        <div>
          <h1 className="text-xs font-black uppercase tracking-[0.2em] leading-tight">Management and Science University</h1>
          <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Quantitative Methods For Computer Science</p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="hidden lg:flex items-center bg-black/20 px-4 py-2 border border-white/20">
          <Search className="w-4 h-4 text-white/60 mr-2" />
          <input 
            type="text" 
            placeholder="Search resources..." 
            className="bg-transparent border-none focus:ring-0 text-xs w-48 placeholder:text-white/40 text-white"
          />
        </div>

        <nav className="flex items-center gap-6">
          <div className="text-white/80 font-black text-[10px] uppercase tracking-[0.2em] border-r border-white/20 pr-6 hidden md:block">TRS6023</div>
          <Link to="/profile" className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 bg-white p-0.5 border-2 border-black overflow-hidden shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWhC_26rpoQ_vA9cIXE3AAmpGtqc-FfVz7PCb-Tmx2d4Lta0Spr7kLBfaw0dol2fFzV1t0wGUQSk3XvHLUUOsVYnWMRF16BSv1LMSsmXQl5GlnmNjT9G6F0SS0GJOUDVRPBm2Z-aEKf5XbuLAVFsVpMfM_pkyqDs9H74kb5mIIFGzoXh9GF4Tj952Zo3wP4qY4IyPDwr_fZlDNoOrJbKuDSJ5tndJyXcNB8cAURA0qNmwRfmdsyvb1cKkzSrFhZjbEBQFbquwDgNyY" 
                alt="Profile" 
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest hover:underline transition-all">Profile</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
