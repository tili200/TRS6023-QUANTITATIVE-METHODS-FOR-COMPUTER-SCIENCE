import BasePage from '../components/BasePage';
import { Mail, Shield, GraduationCap, Hash } from 'lucide-react';

export default function MyProfile() {
  const studentInfo = {
    name: 'Muhammad Abu bin Muhammad Ali',
    id: '012022091224',
    program: 'Postgraduate Studies (PGS)',
    email: 'muhdnizam_ashraffi@msu.edu.my',
    status: 'Active',
    semester: 'Autumn 2024',
  };

  return (
    <BasePage 
      title="My Academic Profile" 
      subtitle="Identity" 
      description="My profile"
    >
      <div className="max-w-xl mx-auto">
        {/* Profile Card */}
        <div className="border-4 border-black bg-white shadow-[12px_12px_0px_rgba(0,0,0,1)] overflow-hidden">
          <div className="bg-black p-12 flex flex-col items-center gap-6">
            <div className="w-32 h-32 bg-white p-1 border-4 border-primary shadow-[8px_8px_0px_rgba(255,255,255,0.2)]">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWhC_26rpoQ_vA9cIXE3AAmpGtqc-FfVz7PCb-Tmx2d4Lta0Spr7kLBfaw0dol2fFzV1t0wGUQSk3XvHLUUOsVYnWMRF16BSv1LMSsmXQl5GlnmNjT9G6F0SS0GJOUDVRPBm2Z-aEKf5XbuLAVFsVpMfM_pkyqDs9H74kb5mIIFGzoXh9GF4Tj952Zo3wP4qY4IyPDwr_fZlDNoOrJbKuDSJ5tndJyXcNB8cAURA0qNmwRfmdsyvb1cKkzSrFhZjbEBQFbquwDgNyY" 
                alt="Student Profile" 
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-black uppercase text-white tracking-tighter leading-tight mb-2">
                {studentInfo.name.split(' ').slice(0, 2).join(' ')} <br/>
                {studentInfo.name.split(' ').slice(2).join(' ')}
              </h3>
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">TRS6023 Candidate</span>
            </div>
          </div>
          <div className="p-10 space-y-6 bg-gray-50 border-t-4 border-black">
            <div className="flex items-center gap-4">
              <Hash className="w-5 h-5 text-primary" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Student ID</span>
                <span className="text-sm font-black tracking-widest">{studentInfo.id}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-primary" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-black/40">MSU Email</span>
                <span className="text-sm font-black lowercase break-all">{studentInfo.email}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <GraduationCap className="w-5 h-5 text-primary" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Program</span>
                <span className="text-sm font-black uppercase mb-1">{studentInfo.program}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
               <Shield className="w-5 h-5 text-primary" />
               <div className="flex flex-col">
                 <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Status</span>
                 <span className="text-xs font-black uppercase py-0.5 px-2 bg-black text-white inline-block w-fit">ACTIVE</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </BasePage>
  );
}
