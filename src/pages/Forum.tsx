import { useState } from 'react';
import BasePage from '../components/BasePage';
import { MessageSquare, ThumbsUp, Send, User, MoreHorizontal, Hash, Bell, PlusCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAppContext } from '../context/AppContext';

export default function Forum() {
  const { role } = useAppContext();
  const [filter, setFilter] = useState<'all' | 'announcements' | 'general'>('all');
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Ahmad Fazli',
      role: 'Candidate',
      topic: 'Topic 01: SEM Validation',
      content: 'Can someone clarify if the Root Mean Square Error of Approximation (RMSEA) should be below 0.05 or 0.08 for "good" fit in system modeling?',
      likes: 12,
      replies: 4,
      time: '2 hours ago',
      isAnnouncement: false
    },
    {
      id: 2,
      author: 'Dr. Asma',
      role: 'Faculty',
      topic: 'Research Ethics',
      content: 'Reminder to all postgraduate candidates: The Ethics Approval Form must be submitted alongside your preliminary data analysis draft.',
      likes: 45,
      replies: 0,
      time: '5 hours ago',
      isAnnouncement: true
    }
  ]);

  const filteredPosts = posts.filter(post => {
    if (filter === 'announcements') return post.isAnnouncement;
    if (filter === 'general') return !post.isAnnouncement;
    return true;
  });

  return (
    <BasePage 
      title="Scholarly Forum" 
      subtitle="Peer Discourse" 
      description="The official digital arena for peer-to-peer discourse, faculty announcements, and collaborative troubleshooting for quantitative research challenges."
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Actions */}
        <div className="flex justify-end">
           {role === 'lecturer' ? (
             <button className="btn-primary !py-4 px-8 font-black text-sm flex items-center justify-center gap-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all">
               <PlusCircle className="w-5 h-5" /> Post Announcement
             </button>
           ) : (
             <button className="btn-primary !py-4 px-8 font-black text-sm shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all">Create New Inquiry</button>
           )}
        </div>

        {/* Feed */}
        <div className="space-y-8">
          {filteredPosts.map((post) => (
            <div key={post.id} className={cn(
              "border-4 border-black bg-white shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col",
              post.isAnnouncement && "border-primary"
            )}>
              <div className="p-8 border-b-2 border-black flex justify-between items-start">
                <div className="flex gap-4">
                  <div className={cn("w-12 h-12 flex items-center justify-center shrink-0 text-white", post.isAnnouncement ? "bg-primary" : "bg-black")}>
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-black uppercase tracking-tight">{post.author}</h5>
                    <div className="flex items-center gap-3">
                      <span className={cn("text-[8px] font-black uppercase px-2 py-0.5 rounded-none", post.role === 'Faculty' ? 'bg-primary text-white' : 'bg-black text-white')}>
                        {post.role}
                      </span>
                      <span className="text-[10px] text-secondary font-bold uppercase">{post.time}</span>
                    </div>
                  </div>
                </div>
                {post.isAnnouncement && (
                  <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase animate-pulse">
                    <Bell className="w-4 h-4" /> Priority
                  </div>
                )}
              </div>
              <div className="p-10 space-y-6">
                <span className="text-[10px] font-black text-primary tracking-widest uppercase border-b border-primary pb-1">CATEGORY: {post.topic}</span>
                <p className="text-lg font-bold leading-relaxed">{post.content}</p>
              </div>
              <div className="px-10 py-6 bg-gray-50 border-t-2 border-black flex items-center gap-8">
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors text-black">
                  <ThumbsUp className="w-4 h-4" /> {post.likes} LIKES
                </button>
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors text-black">
                  <MessageSquare className="w-4 h-4" /> {post.replies} REPLIES
                </button>
                <div className="flex-1"></div>
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                  <Send className="w-4 h-4" /> POST REPLY
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BasePage>
  );
}
