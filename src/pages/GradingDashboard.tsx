import React, { useState } from 'react';
import BasePage from '../components/BasePage';
import { useAppContext } from '../context/AppContext';
import { Users, BarChart, CheckCircle, Clock, AlertCircle, Video, PlusCircle, Settings, Calendar, X, FileText, ChevronRight, MessageSquare, Download, Zap } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

// Detailed mock data for student submissions
const studentSubmissions: Record<string, any[]> = {
  'PG2024001': [
    { id: 1, title: 'Literature Review: SEM in CS', status: 'Graded', date: 'Oct 12, 2024', grade: 'A', feedback: 'Excellent depth of research and clear structural modeling.' },
    { id: 2, title: 'R Programming Workshop', status: 'Graded', date: 'Oct 28, 2024', grade: 'B+', feedback: 'Strong logic, but needs more detailed commenting in the code.' },
    { id: 3, title: 'Final Research Proposal', status: 'Pending', date: 'Nov 15, 2024', grade: '-', feedback: 'Waiting for preliminary review.' },
  ],
  'PG2024002': [
    { id: 1, title: 'Literature Review: SEM in CS', status: 'Graded', date: 'Oct 14, 2024', grade: 'B', feedback: 'Good conceptual framework, but several citations were missing.' },
    { id: 2, title: 'R Programming Workshop', status: 'Pending', date: 'Nov 02, 2024', grade: '-', feedback: 'Processing submission.' },
  ],
  'PG2024003': [
    { id: 1, title: 'Literature Review: SEM in CS', status: 'Graded', date: 'Oct 10, 2024', grade: 'A+', feedback: 'Masterful integration of quantitative theories.' },
    { id: 2, title: 'R Programming Workshop', status: 'Graded', date: 'Oct 25, 2024', grade: 'A', feedback: 'Clean code and efficient data visualization.' },
    { id: 3, title: 'Final Research Proposal', status: 'Graded', date: 'Nov 10, 2024', grade: 'A', feedback: 'Solid methodology and clear hypothesis.' },
  ],
  'PG2024004': [
    { id: 1, title: 'Literature Review: SEM in CS', status: 'No Submission', date: '-', grade: 'F', feedback: 'Non-submission notice sent on Nov 01.' },
  ],
};

export default function GradingDashboard() {
  const { role } = useAppContext();
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

  if (role !== 'lecturer') {
    return (
      <BasePage title="Access Denied" description="You do not have permission to view this page.">
        <div className="flex flex-col items-center justify-center p-20 py-40 border-4 border-black bg-white">
          <AlertCircle className="w-20 h-20 text-red-600 mb-6" />
          <h2 className="text-4xl font-black uppercase tracking-tighter text-black">Lecturer Status Required</h2>
        </div>
      </BasePage>
    );
  }

  const students = [
    { name: 'Adam Harris', id: 'PG2024001', progress: 85, submissions: 2, status: 'Active' },
    { name: 'Sarah Wong', id: 'PG2024002', progress: 60, submissions: 1, status: 'Pending' },
    { name: 'Michael Chen', id: 'PG2024003', progress: 100, submissions: 3, status: 'Completed' },
    { name: 'Elena Petrova', id: 'PG2024004', progress: 40, submissions: 0, status: 'At Risk' },
  ];

  const upcomingConsultations = [
    { date: 'Nov 24', time: '10:00 AM', topic: 'Hypothesis Testing Review', attendees: 15 },
    { date: 'Nov 26', time: '02:00 PM', topic: 'Linear Regression Q&A', attendees: 8 },
  ];

  return (
    <BasePage 
      title="Grading & Progression" 
      subtitle="Lecturer Dashboard" 
      description="Track student engagement, grade submissions, and monitor overall module performance."
    >
      <div className="space-y-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="border-4 border-black p-8 bg-white shadow-[8px_8px_0px_rgba(0,0,0,1)] text-black">
            <Users className="w-8 h-8 mb-4 text-primary" />
            <h4 className="text-3xl font-black">42</h4>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Total Students</p>
          </div>
          <div className="border-4 border-black p-8 bg-primary text-white shadow-[8px_8px_0px_rgba(0,0,0,1)]">
            <CheckCircle className="w-8 h-8 mb-4 " />
            <h4 className="text-3xl font-black">18</h4>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Graded Reviews</p>
          </div>
          <div className="border-4 border-black p-8 bg-white shadow-[8px_8px_0px_rgba(0,0,0,1)] text-black">
            <Clock className="w-8 h-8 mb-4 text-primary" />
            <h4 className="text-3xl font-black">12</h4>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Pending Files</p>
          </div>
          <div className="border-4 border-black p-8 bg-black text-white shadow-[8px_8px_0px_rgba(185,28,28,1)]">
            <BarChart className="w-8 h-8 mb-4 text-primary" />
            <h4 className="text-3xl font-black">74%</h4>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Avg. Progression</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Table - Spans 2 cols */}
          <div className="lg:col-span-2 space-y-8">
            <div className="border-4 border-black bg-white overflow-hidden shadow-[12px_12px_0px_rgba(0,0,0,1)]">
              <div className="bg-black p-6 text-white flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Users className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-black uppercase tracking-widest">Progression Tracker</h3>
                </div>
                <button className="text-[10px] font-black uppercase tracking-widest bg-primary px-4 py-2 hover:bg-white hover:text-black transition-colors">Export CSV</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-4 border-black">
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest">Student Info</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-center">Engagement</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-center">Submissions</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-center">Status</th>
                      <th className="p-6 text-[10px] font-black uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="border-b-2 border-black hover:bg-gray-50 transition-colors">
                        <td className="p-6">
                          <p className="font-black uppercase text-sm tracking-tight">{student.name}</p>
                          <p className="text-[10px] font-black uppercase opacity-40">{student.id}</p>
                        </td>
                        <td className="p-6">
                          <div className="w-full max-w-[150px] mx-auto bg-gray-100 h-4 border-2 border-black relative overflow-hidden">
                            <div className="absolute top-0 left-0 h-full bg-primary" style={{ width: `${student.progress}%` }}></div>
                            <span className="absolute inset-0 flex items-center justify-center text-[8px] font-black text-black mix-blend-difference">
                              {student.progress}%
                            </span>
                          </div>
                        </td>
                        <td className="p-6 text-center">
                          <span className="font-black text-lg">{student.submissions}/3</span>
                        </td>
                        <td className="p-6 text-center">
                          <span className={cn(
                            "px-3 py-1 text-[10px] font-black uppercase border-2 border-black",
                            student.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            student.status === 'At Risk' ? 'bg-red-500 text-white border-red-500' :
                            'bg-blue-100 text-blue-800'
                          )}>
                            {student.status}
                          </span>
                        </td>
                        <td className="p-6 text-right">
                          <button 
                            onClick={() => setSelectedStudent(student)}
                            className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline"
                          >
                            Grade Responses
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {selectedStudent && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedStudent(null)}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  className="relative w-full max-w-4xl bg-white border-4 border-black overflow-hidden shadow-[20px_20px_0px_rgba(0,0,0,1)]"
                >
                  {/* Modal Header */}
                  <div className="bg-black text-white p-8 border-b-4 border-primary flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Student Dossier</span>
                        <span className="h-px w-8 bg-white/20"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">{selectedStudent.id}</span>
                      </div>
                      <h2 className="text-4xl font-black uppercase tracking-tighter">{selectedStudent.name}</h2>
                    </div>
                    <button 
                      onClick={() => setSelectedStudent(null)}
                      className="w-12 h-12 bg-white/10 hover:bg-primary hover:text-black flex items-center justify-center transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Modal Content */}
                  <div className="p-10 space-y-10 max-h-[70vh] overflow-y-auto no-scrollbar">
                    {/* Performance Overview */}
                    <div className="grid grid-cols-3 gap-6">
                      <div className="p-6 border-2 border-black bg-gray-50">
                        <p className="text-[10px] font-black uppercase opacity-40 mb-2">Engagement Rate</p>
                        <span className="text-3xl font-black">{selectedStudent.progress}%</span>
                      </div>
                      <div className="p-6 border-2 border-black bg-black text-white">
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Status</p>
                        <span className="text-xl font-black uppercase">{selectedStudent.status}</span>
                      </div>
                      <div className="p-6 border-2 border-black bg-gray-50">
                        <p className="text-[10px] font-black uppercase opacity-40 mb-2">Submissions</p>
                        <span className="text-3xl font-black">{selectedStudent.submissions}/3</span>
                      </div>
                    </div>

                    {/* Assignments List */}
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-[0.1em] border-b-2 border-black pb-4 mb-6 flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        Cumulative Assessments
                      </h3>
                      <div className="space-y-4">
                        {studentSubmissions[selectedStudent.id]?.map((sub) => (
                          <div key={sub.id} className="group border-2 border-black p-6 hover:bg-black transition-all">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                              <div className="flex items-center gap-4">
                                <div className={cn(
                                  "w-12 h-12 flex items-center justify-center border-2 border-black group-hover:border-white transition-colors",
                                  sub.status === 'Graded' ? 'bg-primary text-black' : 'bg-gray-100 group-hover:bg-white/10 group-hover:text-white'
                                )}>
                                  <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                  <h4 className="font-black uppercase text-sm tracking-tight group-hover:text-white">{sub.title}</h4>
                                  <p className="text-[10px] font-bold uppercase opacity-40 group-hover:text-white/60">Submitted: {sub.date}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-6">
                                <div className="text-center">
                                  <p className="text-[8px] font-black uppercase opacity-40 group-hover:text-white/40 mb-1">Score</p>
                                  <span className={cn("text-xl font-black", sub.grade === '-' ? 'text-gray-400' : 'text-black group-hover:text-primary')}>{sub.grade}</span>
                                </div>
                                <div className={cn(
                                  "px-3 py-1 text-[8px] font-black uppercase border group-hover:border-white transition-colors",
                                  sub.status === 'Graded' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                )}>
                                  {sub.status}
                                </div>
                              </div>
                            </div>
                            
                            {/* Feedback Block */}
                            <div className="mt-6 pt-6 border-t-2 border-black/5 group-hover:border-white/10">
                              <div className="flex items-start gap-4">
                                <MessageSquare className="w-4 h-4 text-primary shrink-0" />
                                <p className="text-xs font-medium italic group-hover:text-white/80 leading-relaxed">
                                  "{sub.feedback}"
                                </p>
                              </div>
                            </div>

                            <div className="mt-6 flex justify-end gap-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                              <button className="flex items-center gap-2 bg-white text-black text-[8px] font-black uppercase tracking-widest px-4 py-2 hover:bg-primary">
                                <Download className="w-3 h-3" /> Get Files
                              </button>
                              <button className="flex items-center gap-2 bg-primary text-white text-[8px] font-black uppercase tracking-widest px-4 py-2 hover:bg-white hover:text-black">
                                Edit Feedback
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="bg-gray-50 p-8 border-t-4 border-black flex flex-col md:flex-row justify-between items-center gap-6">
                     <p className="text-[10px] font-black uppercase tracking-widest text-black/40">Last activity detected: 2 hours ago from London, UK</p>
                     <div className="flex gap-4">
                       <button className="btn-secondary text-[10px] px-8 py-3 uppercase">Print Academic Record</button>
                       <button className="btn-primary text-[10px] px-8 py-3 uppercase">Email Student</button>
                     </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Sidebar Area */}
          <div className="lg:col-span-1 space-y-8">
            {/* Consultation Panel */}
            <div className="border-4 border-black bg-white p-10 shadow-[10px_10px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-4 mb-8 border-b-4 border-black pb-6">
                <Video className="w-8 h-8 text-primary" />
                <h4 className="text-2xl font-black uppercase tracking-tighter">Synchronous Consultation</h4>
              </div>
              <div className="space-y-6">
                {upcomingConsultations.map((session, idx) => (
                  <div key={idx} className="flex gap-6 items-start pb-6 border-b border-black/10 last:border-0 last:pb-0">
                    <div className="bg-black text-white p-3 text-center min-w-[70px] border-2 border-primary">
                      <span className="block text-[8px] font-black uppercase tracking-widest">{session.date.split(' ')[0]}</span>
                      <span className="block text-lg font-black">{session.date.split(' ')[1]}</span>
                    </div>
                    <div>
                      <h5 className="font-black uppercase text-xs tracking-tight mb-1">{session.topic}</h5>
                      <div className="flex items-center gap-4 text-[10px] font-black uppercase opacity-40">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {session.time}</span>
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {session.attendees}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full btn-primary flex items-center justify-center gap-3 py-4 text-xs">
                  <PlusCircle className="w-5 h-5" /> Schedule Live Session
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-8 bg-black border-4 border-primary text-white space-y-6">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <Settings className="w-6 h-6 text-primary" />
                <h4 className="text-lg font-black uppercase tracking-widest">Global Controls</h4>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors">
                  <PlusCircle className="w-4 h-4" /> Bulk Upload Students
                </button>
                <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors">
                  <Calendar className="w-4 h-4" /> Manage Deadlines
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* System Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="p-10 border-4 border-black bg-white space-y-6 group hover:border-primary transition-colors transition-all duration-300">
            <div className="flex justify-between items-start">
              <h4 className="text-2xl font-black uppercase tracking-tighter border-b-4 border-black pb-4 group-hover:border-primary transition-colors">Customize SIMS Lab</h4>
              <Zap className="w-6 h-6 text-primary animate-pulse" />
            </div>
            <p className="text-sm font-medium italic opacity-60">Update scenario variables, adjust difficulty curves, or add new decision nodes to the Interactive Lab environment.</p>
            <button className="btn-primary w-full py-5 text-xs">Launch SIMS Designer</button>
          </div>
          <div className="p-10 border-4 border-black bg-white space-y-6 group hover:border-primary transition-colors transition-all duration-300">
            <h4 className="text-2xl font-black uppercase tracking-tighter border-b-4 border-black pb-4 group-hover:border-primary transition-colors">Resource Repository</h4>
            <p className="text-sm font-medium italic opacity-60">Upload new syllabus materials, assignment briefs, or supplementary reading assets for the verified academic repository.</p>
            <div className="flex gap-4">
              <button className="flex-1 btn-secondary py-5 text-xs">Upload New Asset</button>
              <button className="flex-1 btn-secondary py-5 text-xs">Manage Files</button>
            </div>
          </div>
        </div>
      </div>
    </BasePage>
  );
}
