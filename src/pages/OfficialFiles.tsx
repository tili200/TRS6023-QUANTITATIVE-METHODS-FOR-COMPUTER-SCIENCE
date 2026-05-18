import BasePage from '../components/BasePage';
import { Download, FileText } from 'lucide-react';

export default function OfficialFiles() {
  const files = [
    { name: 'CIS FILE', size: '2.1 MB', date: 'Nov 18, 2024' },
    { name: 'COURSE OBJECTIVE FILE', size: '1.4 MB', date: 'Nov 18, 2024' },
    { name: 'COURSE OUTCOME FILE', size: '1.1 MB', date: 'Nov 18, 2024' },
    { name: 'COURSE OUTLINE FILE', size: '1.8 MB', date: 'Nov 18, 2024' },
    { name: 'COURSE GUIDE FILE', size: '3.5 MB', date: 'Nov 18, 2024' },
    { name: 'LECTURES.zip', size: '42.6 MB', date: 'Nov 18, 2024' },
    { name: 'SELF-CHECK FILE', size: '0.9 MB', date: 'Nov 18, 2024' },
    { name: 'TASK.zip', size: '15.2 MB', date: 'Nov 18, 2024' },
  ];

  return (
    <BasePage 
      title="Official Files" 
      subtitle="Verified Resources" 
      description="The definitive repository for course documentation, templates, and administrative forms."
    >
      <div className="border-4 border-black overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,1)]">
        <table className="w-full text-left">
          <thead className="bg-black text-[10px] font-black uppercase tracking-[0.2em] text-white">
            <tr>
              <th className="px-10 py-6">Academic Asset</th>
              <th className="px-10 py-6">Capacity</th>
              <th className="px-10 py-6">Verification Date</th>
              <th className="px-10 py-6 text-right">Download</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-black bg-white">
            {files.map((file) => (
              <tr key={file.name} className="hover:bg-primary/5 transition-colors group">
                <td className="px-10 py-8">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-black flex items-center justify-center group-hover:bg-primary transition-colors">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-black uppercase tracking-tight">{file.name}</span>
                  </div>
                </td>
                <td className="px-10 py-8 text-xs font-bold text-secondary uppercase italic">{file.size}</td>
                <td className="px-10 py-8 text-xs font-bold text-secondary uppercase">{file.date}</td>
                <td className="px-10 py-8 text-right">
                  <button className="btn-secondary py-2 px-4 text-[10px]">
                    <Download className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </BasePage>
  );
}
