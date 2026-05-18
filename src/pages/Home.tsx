import { ArrowRight, BookOpen, LayoutList, FolderOpen, FileText, Video, MessageSquare, Library, User, Trophy, Zap, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const navigate = useNavigate();
  const { role, progress, badges, lastVisitedPage } = useAppContext();

  const mainCards = [
    { name: 'Course Summary', icon: FileText, path: '/summary', color: 'bg-primary', description: 'Explore module objectives, outcomes, and syllabus structure.' },
    { name: 'Course Guide', icon: BookOpen, path: '/guide', color: 'bg-zinc-800', description: 'Access weekly exercises, workbooks, and study guides.' },
    { name: 'Syllabus', icon: LayoutList, path: '/syllabus', color: 'bg-zinc-800', description: 'Interactive lectures, slides, and knowledge self-checks.' },
    { name: 'Official Files', icon: FolderOpen, path: '/files', color: 'bg-zinc-800', description: 'Official repository for verified academic resources.' },
  ];

  const ecosystemLinks = [
    { name: 'Faculty Consultation', icon: Video, path: '/tutorial' },
    { name: 'Course Reading List', icon: Library, path: '/reading-list' },
    { name: 'Forum', icon: MessageSquare, path: '/forum' },
    { name: 'My Profile', icon: User, path: '/profile' },
  ];

  const completedCount = Object.values(progress).filter(Boolean).length;
  const totalTopics = 8; // Simplified total
  const progressPercent = Math.min(Math.round((completedCount / totalTopics) * 100), 100);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-black text-white px-12 py-20 flex flex-col justify-center relative border-b-8 border-primary overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none pr-12 hidden lg:block">
          <svg width="300" height="300" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="1" fill="none" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="white" strokeWidth="0.5" />
            <line x1="10" y1="50" x2="90" y2="50" stroke="white" strokeWidth="0.5" />
          </svg>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-primary font-black text-xl block tracking-[0.2em] uppercase">TRS6023 | Core Module</span>
            <span className="h-0.5 w-12 bg-white/20"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{role === 'student' ? 'Student View' : 'Lecturer View'}</span>
          </div>
          <h2 className="text-7xl font-black leading-[1] max-w-3xl uppercase tracking-tighter mb-10">
            Quantitative Methods <br/>
            <span className="text-primary">For Computer Science</span>
          </h2>
          
          <div className="flex flex-wrap gap-12 mb-12">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black uppercase text-primary tracking-[0.3em]">Lecturers</span>
              <span className="text-2xl font-black uppercase tracking-tight">Dr Asif & Dr Asma</span>
            </div>
          </div>
          
          {role === 'student' && (
            <div className="flex flex-wrap gap-8 items-center">
              <div className="bg-white/10 border-l-4 border-primary px-8 py-4 backdrop-blur-sm">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">My Progression</p>
                <div className="flex items-center gap-6">
                   <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden">
                     <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>
                   </div>
                   <span className="text-xl font-black">{progressPercent}%</span>
                </div>
              </div>
              <div className="flex gap-4">
                {badges.map((badge, idx) => (
                  <div key={idx} className="w-12 h-12 bg-white flex items-center justify-center border-2 border-primary rotate-3 hover:rotate-0 transition-transform">
                    <Trophy className="w-6 h-6 text-black" title={badge} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </section>

      {/* Continue Learning - Where they left off */}
      {role === 'student' && lastVisitedPage && lastVisitedPage !== '/' && (
        <section className="px-12">
          <div 
            onClick={() => navigate(lastVisitedPage)}
            className="flex flex-col md:flex-row items-center justify-between p-10 bg-white border-4 border-black shadow-[10px_10px_0px_rgba(0,0,0,1)] cursor-pointer hover:border-primary transition-all group"
          >
            <div className="flex items-center gap-8 mb-6 md:mb-0">
              <div className="w-16 h-16 bg-primary flex items-center justify-center animate-pulse">
                <Clock className="w-8 h-8 text-black" />
              </div>
              <div>
                <h3 className="text-3xl font-black uppercase tracking-tighter text-black">Continue Your Session</h3>
                <p className="text-sm font-black uppercase tracking-widest text-primary">Resume from: {lastVisitedPage.replace('/', '').replace('-', ' ') || 'Dashboard'}</p>
              </div>
            </div>
            <button className="btn-primary flex items-center gap-4 px-10 py-5">
              Launch Portal <Zap className="w-5 h-5 group-hover:scale-125 transition-transform" />
            </button>
          </div>
        </section>
      )}

      {/* Main Navigation Grid */}
      <section className="px-12">
        <div className="flex flex-col mb-12">
          <h2 className="text-4xl font-black uppercase tracking-tighter border-b-4 border-black pb-4 inline-block">Curriculum Structure</h2>
          <p className="text-secondary font-bold text-sm mt-4 uppercase tracking-widest opacity-60 italic">Select a module to explore academic resources</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {mainCards.map((card, idx) => (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => navigate(card.path)}
              className="group academic-card cursor-pointer p-10 flex flex-col justify-between h-80 bg-white hover:bg-black hover:text-white transition-all duration-300"
            >
              <div>
                <div className={cn("w-16 h-16 flex items-center justify-center mb-8 border-2 border-black group-hover:border-white transition-colors", idx % 2 === 0 ? "bg-black text-white group-hover:bg-primary" : "bg-primary text-white group-hover:bg-white group-hover:text-black")}>
                  <card.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black uppercase mb-4 tracking-tighter group-hover:text-white transition-colors">{card.name}</h3>
                <p className="text-secondary group-hover:text-white/60 text-xs font-bold leading-relaxed uppercase tracking-widest">{card.description}</p>
              </div>
              <div className="flex items-center font-black text-[10px] uppercase tracking-[0.3em] group-hover:text-white transition-colors mt-6 pt-6 border-t border-black/10 group-hover:border-white/10">
                Explore Portal <ArrowRight className="w-4 h-4 ml-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="bg-gray-50 p-16 border-t-8 border-black">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter">Student Ecosystem</h2>
            <p className="text-secondary font-bold text-sm mt-2 uppercase tracking-widest opacity-60">Integrated academic services & support</p>
          </div>
          <button className="btn-secondary text-sm">View All Services</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {ecosystemLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => navigate(link.path)}
              className="flex flex-col items-center gap-6 p-10 academic-card bg-white hover:bg-primary group transition-all"
            >
              <div className="w-16 h-16 flex items-center justify-center border-4 border-black text-black bg-white group-hover:bg-black group-hover:text-white transition-all">
                <link.icon className="w-8 h-8" />
              </div>
              <span className="text-xs font-black text-black uppercase tracking-[0.2em] group-hover:text-white">{link.name}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
