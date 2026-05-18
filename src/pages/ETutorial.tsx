import BasePage from '../components/BasePage';
import { Video, Calendar, Users, ExternalLink, ShieldCheck, Globe } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function ETutorial() {
  const { role } = useAppContext();
  return (
    <BasePage 
      title="Consultation" 
      subtitle="Lecturer Support" 
      description="The official synchronization hub for postgraduate consultation. Access faculty-led MS Teams meetings and private briefing sessions."
    >
      <div className="max-w-4xl mx-auto">
        <div className="border-4 border-black bg-white shadow-[12px_12px_0px_rgba(0,0,0,1)] overflow-hidden">
          <div className="bg-primary text-white p-12 flex items-center gap-8 border-b-4 border-black">
            <Video className="w-16 h-16" />
            <div>
              <h3 className="text-4xl font-black uppercase tracking-tighter">Microsoft Teams Consultation</h3>
              <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80">Synchronous Academic Support</p>
            </div>
          </div>
          <div className="p-12 space-y-10">
            <div className="bg-gray-50 p-10 border-4 border-black border-dashed flex flex-col gap-8">
              <div className="flex justify-between items-center">
                <span className="text-sm font-black uppercase tracking-widest text-primary">Live Session Status</span>
                <span className="bg-black text-white px-4 py-2 text-xs font-black uppercase animate-pulse">Waiting for host</span>
              </div>
              <div className="space-y-4">
                <h4 className="text-2xl font-black uppercase tracking-tight border-l-8 border-primary pl-8">TRS6023: Weekly Research Sync</h4>
                <div className="flex flex-col sm:flex-row gap-8 text-xs font-black uppercase tracking-[0.2em] text-secondary pl-8 mt-4">
                  <span className="flex items-center gap-3"><Calendar className="w-5 h-5 text-primary" /> Every Friday</span>
                  <span className="flex items-center gap-3"><Globe className="w-5 h-5 text-primary" /> 09:00 PM (GMT+8)</span>
                </div>
              </div>
              <button className="btn-primary w-full flex items-center justify-center gap-6 py-6 text-sm">
                <ExternalLink className="w-6 h-6" /> {role === 'lecturer' ? 'Host Teams Meeting' : 'Join MS Teams Meeting'}
              </button>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest border-b-2 border-black pb-3">Consultation Protocols</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                  <p className="text-[10px] font-bold uppercase leading-relaxed text-secondary italic">MSU authenticated credentials required for digital room ingress.</p>
                </div>
                <div className="flex items-start gap-4">
                  <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                  <p className="text-[10px] font-bold uppercase leading-relaxed text-secondary italic">All postgraduate consultations are archived for analytical review.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BasePage>
  );
}
