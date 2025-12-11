import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  MessageCircle, 
  Heart, 
  MessageSquare, 
  Share2, 
  MoreHorizontal, 
  Image as ImageIcon, 
  Paperclip, 
  Smile, 
  Send, 
  Trophy, 
  Pin, 
  Flame, 
  Calendar, 
  Search, 
  Filter,
  CheckCircle2,
  User,
  Zap
} from 'lucide-react';

// --- Types & Mock Data ---

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string; // Color code or image url
    level: string;
  };
  timestamp: string;
  title: string;
  content: string;
  type: 'standard' | 'announcement' | 'success' | 'question';
  likes: number;
  comments: number;
  isPinned?: boolean;
  images?: string[];
}

const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    author: { name: 'Mike Sherry', avatar: 'bg-slate-900', level: 'Admin' },
    timestamp: '2 hours ago',
    title: 'Town Hall: Q4 Roadmap & New Feature Drop 🚀',
    content: "Team, we just deployed the new 'Unlimited Content' engine. This is a game changer for those running volume outreach. Please watch the breakdown video below and let me know your thoughts!",
    type: 'announcement',
    likes: 142,
    comments: 45,
    isPinned: true
  },
  {
    id: 'p2',
    author: { name: 'Sarah Jenkins', avatar: 'bg-purple-500', level: 'Lvl 6' },
    timestamp: '45 mins ago',
    title: 'Closed a $15k Deal using the Samurai Script! 🏆',
    content: "I was skeptical about the objection handling module, but I used the 'Price Reframe' exactly as written today and the client didn't even blink. Contract signed!",
    type: 'success',
    likes: 89,
    comments: 22
  },
  {
    id: 'p3',
    author: { name: 'David Chen', avatar: 'bg-blue-500', level: 'Lvl 3' },
    timestamp: '3 hours ago',
    title: 'Question about Facebook Ad Attribution',
    content: "Is anyone else seeing a delay in lead reporting on the dashboard vs Ads Manager? I'm seeing a ~20% discrepancy.",
    type: 'question',
    likes: 12,
    comments: 8
  },
  {
    id: 'p4',
    author: { name: 'Jessica Bloom', avatar: 'bg-emerald-500', level: 'Lvl 4' },
    timestamp: '5 hours ago',
    title: 'My First 1,000 Leads Generated',
    content: "It took me 3 weeks to dial in the creative, but the 'Pattern Interrupt' templates finally clicked. Cost per lead is down to $4.50.",
    type: 'success',
    likes: 56,
    comments: 14
  }
];

const LEADERBOARD = [
  { name: 'Sarah Jenkins', points: 1250, level: 6, avatar: 'bg-purple-500' },
  { name: 'Tom Ford', points: 980, level: 5, avatar: 'bg-orange-500' },
  { name: 'David Chen', points: 850, level: 4, avatar: 'bg-blue-500' },
];

const EVENTS = [
  { title: 'Weekly Q&A Call', time: 'Thursday, 2:00 PM EST' },
  { title: 'Copywriting Masterclass', time: 'Oct 28, 10:00 AM EST' },
];

const FeedPost: React.FC<{ post: Post }> = ({ post }) => {
  const isSuccess = post.type === 'success';
  const isAnnouncement = post.type === 'announcement';

  return (
    <div className={`
      bg-white rounded-xl p-6 mb-4 shadow-sm border transition-all hover:shadow-md
      ${isSuccess ? 'border-amber-200 bg-amber-50/30' : 
        isAnnouncement ? 'border-blue-200 bg-blue-50/30' : 'border-slate-200'}
    `}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${post.author.avatar}`}>
            {post.author.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm">{post.author.name}</span>
              {isAnnouncement ? (
                <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide flex items-center gap-1">
                  <Pin size={10} fill="currentColor" /> Admin
                </span>
              ) : (
                <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {post.author.level}
                </span>
              )}
            </div>
            <div className="text-xs text-slate-400">{post.timestamp}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
           {isSuccess && (
               <div className="flex items-center gap-1 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold border border-amber-200">
                   <Trophy size={12} fill="currentColor" /> Success Story
               </div>
           )}
           <button className="text-slate-300 hover:text-slate-500">
               <MoreHorizontal size={18} />
           </button>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
          <h3 className="font-bold text-lg text-slate-900 mb-2 leading-tight">{post.title}</h3>
          <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{post.content}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6 border-t border-slate-100/50 pt-3">
          <button className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors group">
              <div className="p-1.5 rounded-full group-hover:bg-red-50 transition-colors">
                  <Heart size={18} className="group-hover:fill-red-500" />
              </div>
              <span className="text-xs font-bold">{post.likes}</span>
          </button>
          <button className="flex items-center gap-2 text-slate-500 hover:text-[#0EB869] transition-colors group">
              <div className="p-1.5 rounded-full group-hover:bg-[#E8FCF3] transition-colors">
                  <MessageSquare size={18} />
              </div>
              <span className="text-xs font-bold">{post.comments} Comments</span>
          </button>
      </div>
    </div>
  );
};

export const CommunityPage: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [postContent, setPostContent] = useState('');

  // --- Components ---
  // FeedPost moved outside

  return (
    <div className="p-4 lg:p-8 max-w-[1200px] mx-auto font-sans h-full flex flex-col">
      
      {/* Page Header (Minimal) */}
      <div className="flex flex-col mb-6">
        <div className="flex items-center gap-2 mb-2 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold">
            Community
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">KP3 Neighborhood</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start h-full min-h-0">
        
        {/* --- LEFT COLUMN: Main Feed (70%) --- */}
        <div className="flex-1 w-full min-w-0">
            
            {/* Composer */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm mb-6 relative group focus-within:ring-2 focus-within:ring-[#0EB869]/20 focus-within:border-[#0EB869] transition-all">
                <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold shrink-0">M</div>
                    <div className="flex-1">
                        <textarea 
                            value={postContent}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPostContent(e.target.value)}
                            placeholder="Share your win or ask the neighborhood..." 
                            className="w-full text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none resize-none min-h-[60px] py-2"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50">
                    <div className="flex gap-2">
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
                            <ImageIcon size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
                            <Paperclip size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
                            <Smile size={18} />
                        </button>
                    </div>
                    <button className="bg-[#0EB869] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#0B9655] transition-colors flex items-center gap-2">
                        Post <Send size={12} />
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-1 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                {['All', 'Announcements', 'Success Stories', 'Q&A'].map(f => (
                    <button 
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all
                            ${filter === f 
                                ? 'bg-slate-800 text-white shadow-sm' 
                                : 'bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-700'}
                        `}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Feed Stream */}
            <div className="space-y-4 pb-10">
                {/* Town Hall (Pinned) */}
                {filter === 'All' || filter === 'Announcements' ? (
                    MOCK_POSTS.filter(p => p.type === 'announcement').map(post => (
                        <FeedPost key={post.id} post={post as Post} />
                    ))
                ) : null}

                {/* Win Wall & Standard Feed */}
                {MOCK_POSTS.filter(p => p.type !== 'announcement').map(post => {
                    if (filter === 'Success Stories' && post.type !== 'success') return null;
                    if (filter === 'Q&A' && post.type !== 'question') return null;
                    return <FeedPost key={post.id} post={post as Post} />;
                })}
            </div>

        </div>

        {/* --- RIGHT COLUMN: Gamification & Utility (30%) --- */}
        <div className="w-full lg:w-[340px] shrink-0 flex flex-col gap-6 sticky top-6">
            
            {/* Profile Snippet */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="h-16 bg-gradient-to-r from-slate-800 to-slate-900"></div>
                <div className="px-6 pb-6 -mt-8">
                    <div className="flex justify-between items-end mb-4">
                        <div className="w-16 h-16 rounded-full bg-slate-900 border-4 border-white flex items-center justify-center text-white text-xl font-bold shadow-sm">
                            M
                        </div>
                        <div className="text-right mb-1">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Level</div>
                            <div className="text-xl font-black text-[#0EB869]">Lvl 3</div>
                        </div>
                    </div>
                    
                    <div className="mb-2 flex justify-between items-center">
                        <h3 className="font-bold text-slate-900">Mike Sherry</h3>
                        <span className="text-xs text-slate-500 font-medium">320 / 500 XP</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
                        <div className="h-full bg-[#0EB869] w-[64%] rounded-full"></div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center gap-3">
                        <div className="p-1.5 bg-yellow-100 text-yellow-600 rounded">
                            <Zap size={16} fill="currentColor" />
                        </div>
                        <div className="text-xs text-slate-600 leading-tight">
                            <span className="font-bold text-slate-900">Next Reward:</span> Access to "Advanced Copywriting" Module.
                        </div>
                    </div>
                </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <Trophy size={16} className="text-amber-500" /> Top Contributors
                    </h3>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">This Week</span>
                </div>
                
                <div className="space-y-3">
                    {LEADERBOARD.map((user, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="text-xs font-bold text-slate-400 w-2">{idx + 1}</div>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${user.avatar}`}>
                                    {user.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-900">{user.name}</div>
                                    <div className="text-[10px] text-slate-500">Lvl {user.level} Resident</div>
                                </div>
                            </div>
                            <div className="text-xs font-bold text-[#0EB869] bg-[#E8FCF3] px-2 py-0.5 rounded">
                                {user.points} XP
                            </div>
                        </div>
                    ))}
                </div>
                <button className="w-full text-center text-xs font-bold text-slate-500 mt-4 hover:text-slate-800">
                    View Full Leaderboard
                </button>
            </div>

            {/* Events */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <Calendar size={16} className="text-blue-500" /> Upcoming Events
                    </h3>
                </div>
                <div className="space-y-3">
                    {EVENTS.map((evt, idx) => (
                        <div key={idx} className="flex gap-3 items-start">
                            <div className="flex flex-col items-center bg-slate-50 border border-slate-200 rounded p-1 min-w-[40px]">
                                <span className="text-[9px] text-slate-500 font-bold uppercase">Oct</span>
                                <span className="text-sm font-bold text-slate-900">28</span>
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-900 leading-tight mb-0.5">{evt.title}</div>
                                <div className="text-[10px] text-slate-500">{evt.time}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                    Add to Calendar
                </button>
            </div>

        </div>

      </div>
    </div>
  );
};