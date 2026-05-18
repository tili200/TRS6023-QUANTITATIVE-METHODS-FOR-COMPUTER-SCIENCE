import { Home, FileText, BookOpen, LayoutList, FolderOpen, Video, MessageSquare, Library, User, GraduationCap, BarChart3, ShieldCheck, UserCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useAppContext } from '../context/AppContext';

export default function SideNavBar() {
  const { role, setRole } = useAppContext();

  const coreNav = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Course Summary', path: '/summary', icon: FileText },
    { name: 'Course Guide', path: '/guide', icon: BookOpen },
    { name: 'Syllabus', path: '/syllabus', icon: LayoutList },
    { name: 'Official Files', path: '/files', icon: FolderOpen },
  ];

  const ecosystemNav = [
    { name: 'Consultation', path: '/tutorial', icon: Video },
    { name: 'Forum', path: '/forum', icon: MessageSquare },
    { name: 'Course Reading List', path: '/reading-list', icon: Library },
    { name: 'My Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r-4 border-black flex flex-col z-50 transition-colors duration-300">
      <div className="p-10 pb-6 border-b-4 border-black">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-black text-2xl tracking-tighter uppercase text-primary">MSU</span>
          <span className="font-black text-2xl tracking-tighter uppercase text-black">ODL</span>
        </div>
        <div className="space-y-1">
          <div className="h-1 w-full bg-black mb-2"></div>
          <p className="text-2xl font-black text-black tracking-tighter">TRS6023</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 no-scrollbar">
        <div className="mb-8">
          <p className="px-6 mb-4 text-[10px] font-black text-black/40 uppercase tracking-[0.2em]">Academic Core</p>
          {coreNav.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => cn(
                "nav-item",
                isActive && "nav-item-active group"
              )}
            >
              <item.icon className="w-5 h-5 mr-4 transition-colors" />
              <span className="text-xs font-black uppercase tracking-widest">{item.name}</span>
            </NavLink>
          ))}
        </div>

        <div className="mb-8">
          <p className="px-6 mb-4 text-[10px] font-black text-black/40 uppercase tracking-[0.2em]">Ecosystem</p>
          {ecosystemNav.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => cn(
                "nav-item",
                isActive && "nav-item-active"
              )}
            >
              <item.icon className="w-5 h-5 mr-4" />
              <span className="text-xs font-black uppercase tracking-widest">{item.name}</span>
            </NavLink>
          ))}
          {role === 'lecturer' && (
            <NavLink
              to="/grading"
              className={({ isActive }) => cn(
                "nav-item text-primary",
                isActive && "nav-item-active group"
              )}
            >
              <BarChart3 className="w-5 h-5 mr-4" />
              <span className="text-xs font-black uppercase tracking-widest">Grading & Admin</span>
            </NavLink>
          )}
        </div>
      </div>

      <div className="p-6 border-t-4 border-black bg-gray-50 space-y-4">
        <div className="flex gap-2">
          <button 
            onClick={() => setRole(role === 'student' ? 'lecturer' : 'student')}
            className="flex-1 p-3 border-2 border-black bg-black text-white flex items-center justify-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] hover:bg-primary transition-all overflow-hidden whitespace-nowrap"
          >
            {role === 'student' ? <UserCircle className="w-3 h-3" /> : <ShieldCheck className="w-3 h-3" />}
            {role === 'student' ? 'Switch to Lecturer' : 'Switch to Student'}
          </button>
        </div>
        <button className="w-full btn-primary text-xs flex items-center justify-center gap-3 py-4">
          <GraduationCap className="w-4 h-4" /> EKLAS
        </button>
      </div>
    </div>
  );
}
