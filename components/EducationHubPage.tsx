import React, { useState, useEffect } from 'react';
import { 
  Home, 
  ChevronRight, 
  BookOpen, 
  MessageSquare, 
  Calendar, 
  Building, 
  PlayCircle, 
  CheckCircle2, 
  Lock, 
  ArrowLeft, 
  Paperclip, 
  Send, 
  Smile, 
  Heart, 
  Share2, 
  MoreHorizontal, 
  Pin, 
  Trophy, 
  Search,
  User,
  Check
} from 'lucide-react';

// --- Mock Data ---
const MOCK_COURSES = [
  { id: 1, title: 'The Godfather Offer', author: 'Mike Sherry', progress: 60, modules: 12, image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800' },
  { id: 2, title: 'Direct Response Mastery', author: 'Admin', progress: 25, modules: 8, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800' },
  { id: 3, title: 'AI Content Engine', author: 'Admin', progress: 0, modules: 15, image: 'https://images.unsplash.com/photo-1620712943543-285f7266c8ca?q=80&w=800' },
];

const MOCK_LESSONS = [
  { id: 1, title: 'Module 1: The Core Concept', duration: '8:12', completed: true },
  { id: 2, title: 'Module 2: Identifying Pain Points', duration: '12:45', completed: true },
  { id: 3, title: 'Module 3: Crafting The Hook', duration: '10:30', completed: false, isCurrent: true },
  { id: 4, title: 'Module 4: The Stack', duration: '15:00', completed: false, isLocked: true },
  { id: 5, title: 'Module 5: Objection Handling', duration: '18:20', completed: false, isLocked: true },
];

const MOCK_ACTION_ITEMS = [
  { id: 1, text: 'Download the "Hook" worksheet.' },
  { id: 2, text: 'Write 3 variations of your main headline.' },
  { id: 3, text: 'Post your best headline in the community for feedback.' },
];

const MOCK_COMMUNITY_POSTS = [
    { id: 'p1', author: { name: 'Mike Sherry', avatar: 'bg-slate-900', level: 'Admin' }, timestamp: '2 hours ago', title: 'Welcome to the Education Hub!', content: "This is where you'll find all your courses, community discussions, and event schedules. Start with the 'Godfather Offer' course to get going.", isPinned: true },
    { id: 'p2', author: { name: 'Sarah Jenkins', avatar: 'bg-purple-500', level: 'Lvl 6' }, timestamp: '45 mins ago', title: 'Just closed a $15k deal!', content: "The objection handling scripts in Module 5 are pure gold. Used the 'price reframe' and they signed on the spot.", likes: 89, comments: 22 },
];

const MOCK_LEADERBOARD = [
  { name: 'Sarah Jenkins', points: 1250, level: 6, avatar: 'bg-purple-500' },
  { name: 'Tom Ford', points: 980, level: 5, avatar: 'bg-orange-500' },
  { name: 'David Chen', points: 850, level: 4, avatar: 'bg-blue-500' },
];

const MOCK_STUDENTS = [
    { id: 1, name: 'Nguyen Van A', status: 'Present', lastReport: '2h ago' },
    { id: 2, name: 'Tran Thi B', status: 'Absent', lastReport: '1d ago' },
    { id: 3, name: 'Le Van C', status: 'Late', lastReport: '3h ago' },
    { id: 4, name: 'Pham Thi D', status: 'Present', lastReport: '1h ago' },
];

// --- Main Component ---
export const EducationHubPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'classroom' | 'community' | 'calendar' | 'management'>('classroom');

  return (
    <div className="p-8 max-w-[1400px] mx-auto font-sans h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col items-center mb-8 text-center shrink-0">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold">
            Education Hub
          </span>
        </div>
        <h1 className="text-[26px] font-bold text-slate-900 mb-3 tracking-tight">
          Your Learning & Community Platform
        </h1>
        <p className="text-slate-500 text-[13px] leading-relaxed mb-8 max-w-2xl mx-auto">
          Access courses, connect with peers, and track your progress all in one place.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-slate-100/50 rounded-xl border border-slate-200 p-1.5 flex mb-8 gap-1 max-w-4xl mx-auto shrink-0">
        <TabButton active={activeTab === 'classroom'} onClick={() => setActiveTab('classroom')} icon={BookOpen} label="Classroom" />
        <TabButton active={activeTab === 'community'} onClick={() => setActiveTab('community')} icon={MessageSquare} label="Community" />
        <TabButton active={activeTab === 'calendar'} onClick={() => setActiveTab('calendar')} icon={Calendar} label="Calendar" />
        <TabButton active={activeTab === 'management'} onClick={() => setActiveTab('management')} icon={Building} label="Center Management" />
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0">
        {activeTab === 'classroom' && <ClassroomView />}
        {activeTab === 'community' && <CommunityView />}
        {activeTab === 'calendar' && <CalendarView />}
        {activeTab === 'management' && <CenterManagementView />}
      </div>
    </div>
  );
};

// --- Tab Views ---

const ClassroomView: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);

  if (selectedCourse) {
    return <CoursePlayerView course={selectedCourse} onBack={() => setSelectedCourse(null)} />;
  }
  return <CourseGridView onSelectCourse={setSelectedCourse} />;
};

const CommunityView: React.FC = () => (
  <div className="flex flex-col lg:flex-row gap-8 h-full animate-in fade-in duration-300">
    {/* Main Feed */}
    <div className="flex-1">
      <PostComposer />
      {MOCK_COMMUNITY_POSTS.filter(p => p.isPinned).map(post => <FeedPost key={post.id} post={post} />)}
      <div className="h-px bg-slate-200 my-6"></div>
      {MOCK_COMMUNITY_POSTS.filter(p => !p.isPinned).map(post => <FeedPost key={post.id} post={post} />)}
    </div>
    {/* Right Sidebar */}
    <div className="w-full lg:w-80 shrink-0 space-y-6">
      <Leaderboard />
      <UpcomingEvents />
    </div>
  </div>
);

const CalendarView: React.FC = () => (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 animate-in fade-in duration-300">
        <h2 className="text-lg font-bold text-slate-900 mb-4">October 2024 Events</h2>
        <div className="grid grid-cols-7 gap-px bg-slate-200 border border-slate-200 rounded-lg overflow-hidden">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <div key={d} className="bg-slate-50 p-2 text-center text-xs font-bold text-slate-500 uppercase">{d}</div>
            ))}
            {Array.from({ length: 35 }).map((_, i) => {
                const day = i - 2;
                const isEventDay = day === 24 || day === 31;
                return (
                    <div key={i} className={`bg-white min-h-[100px] p-2 relative ${day <= 0 || day > 31 ? 'bg-slate-50/50' : ''}`}>
                        {day > 0 && day <= 31 && (
                            <>
                                <span className={`text-sm font-medium ${isEventDay ? 'bg-[#0EB869] text-white w-6 h-6 flex items-center justify-center rounded-full' : 'text-slate-700'}`}>{day}</span>
                                {day === 24 && <div className="mt-2 bg-blue-50 border border-blue-100 p-1.5 rounded text-[11px] text-blue-600 font-bold truncate">Q&A Call</div>}
                                {day === 31 && <div className="mt-2 bg-purple-50 border border-purple-100 p-1.5 rounded text-[11px] text-purple-600 font-bold truncate">Masterclass</div>}
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    </div>
);

const CenterManagementView: React.FC = () => (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-300">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-900">Student Attendance - Oct 26, 2024</h3>
            <div className="flex items-center gap-2">
                <Search size={16} className="text-slate-400" />
                <input type="text" placeholder="Search students..." className="text-sm p-1 border-b focus:outline-none focus:border-b-2 focus:border-[#0EB869]" />
            </div>
        </div>
        <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
                <tr>
                    <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Student Name</th>
                    <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Status</th>
                    <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Last Report</th>
                    <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {MOCK_STUDENTS.map(s => (
                    <tr key={s.id}>
                        <td className="px-6 py-4 font-medium text-slate-800">{s.name}</td>
                        <td className="px-6 py-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                s.status === 'Present' ? 'bg-green-100 text-green-700' :
                                s.status === 'Absent' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                            }`}>{s.status}</span>
                        </td>
                        <td className="px-6 py-4 text-slate-500">{s.lastReport}</td>
                        <td className="px-6 py-4 text-right">
                            <button className="bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-blue-600 flex items-center gap-1.5 ml-auto">
                                <Send size={12} /> Send Zalo Report
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);


// --- Sub-Components ---

const TabButton: React.FC<{ active: boolean, onClick: () => void, icon: React.ElementType, label: string }> = ({ active, onClick, icon: Icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex-1 min-w-[120px] py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-[13px] font-bold transition-all duration-200 whitespace-nowrap
      ${active 
        ? 'bg-white text-[#0EB869] shadow-sm ring-1 ring-slate-200' 
        : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'
      }`}
  >
    <Icon size={18} />
    {label}
  </button>
);

const CourseGridView: React.FC<{ onSelectCourse: (course: any) => void }> = ({ onSelectCourse }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
    {MOCK_COURSES.map(course => (
      <div key={course.id} onClick={() => onSelectCourse(course)} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden group cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="h-40 bg-slate-200">
            <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-5">
          <h3 className="font-bold text-slate-900 mb-2 group-hover:text-[#0EB869] transition-colors">{course.title}</h3>
          <p className="text-xs text-slate-500 mb-4">By {course.author} • {course.modules} Modules</p>
          <div className="w-full bg-slate-100 h-2 rounded-full mb-1">
            <div className="bg-[#0EB869] h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
          </div>
          <span className="text-xs font-medium text-slate-400">{course.progress}% Complete</span>
        </div>
      </div>
    ))}
  </div>
);

const CoursePlayerView: React.FC<{ course: any, onBack: () => void }> = ({ course, onBack }) => {
    const [actionItems, setActionItems] = useState(MOCK_ACTION_ITEMS.map(item => ({ ...item, completed: false })));
    const allActionsCompleted = actionItems.every(item => item.completed);

    const toggleActionItem = (id: number) => {
        setActionItems(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-full animate-in fade-in duration-300">
            {/* Left: Lesson Sidebar */}
            <div className="w-full lg:w-80 shrink-0 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col">
                <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                    <button onClick={onBack} className="p-1.5 hover:bg-slate-100 rounded-full text-slate-400"><ArrowLeft size={16} /></button>
                    <h3 className="font-bold text-slate-900 text-sm truncate">{course.title}</h3>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {MOCK_LESSONS.map(lesson => (
                        <div key={lesson.id} className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                            lesson.isCurrent ? 'bg-[#E8F5E9] text-[#16A349]' : lesson.isLocked ? 'bg-slate-50 text-slate-400' : 'hover:bg-slate-50 text-slate-700'
                        }`}>
                            <div className="flex items-center gap-3">
                                {lesson.completed ? <CheckCircle2 size={18} className="text-[#16A349]" /> : lesson.isLocked ? <Lock size={18} /> : <PlayCircle size={18} />}
                                <span className={`font-medium text-sm ${lesson.isCurrent && 'font-bold'}`}>{lesson.title}</span>
                            </div>
                            <span className="text-xs font-mono">{lesson.duration}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: Video & Actions */}
            <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col">
                <div className="aspect-video bg-black rounded-t-xl">
                    {/* In a real app, this would be a real video player */}
                    <div className="w-full h-full flex items-center justify-center text-white">
                        <PlayCircle size={64} className="text-white/50" />
                    </div>
                </div>
                <div className="p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Module 3: Crafting The Hook</h2>
                    <p className="text-sm text-slate-500 mb-6">Learn how to grab attention in the first 3 seconds of your ad.</p>
                    
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
                        <h4 className="text-sm font-bold text-slate-900 mb-4">Action Items (Required to Proceed)</h4>
                        <div className="space-y-3">
                            {actionItems.map(item => (
                                <label key={item.id} className="flex items-start gap-3 cursor-pointer">
                                    <input type="checkbox" checked={item.completed} onChange={() => toggleActionItem(item.id)} className="h-5 w-5 rounded border-slate-300 text-[#16A349] focus:ring-[#16A349]/50 mt-0.5" />
                                    <span className={`text-sm ${item.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{item.text}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button disabled={!allActionsCompleted} className="w-full py-3 mt-6 rounded-lg text-white font-bold text-sm shadow-md transition-all disabled:bg-slate-300 disabled:cursor-not-allowed bg-[#16A349] hover:bg-[#149641]">
                        {allActionsCompleted ? 'Mark as Complete & Continue' : 'Complete All Actions to Continue'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const PostComposer: React.FC = () => (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm mb-6">
        <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold shrink-0">M</div>
            <textarea placeholder="Share your win or ask a question..." className="w-full text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none resize-none py-2" />
        </div>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50">
            <div className="flex gap-1">
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full"><Paperclip size={18} /></button>
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full"><Smile size={18} /></button>
            </div>
            <button className="bg-[#0EB869] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#0B9655]"><Send size={12} /></button>
        </div>
    </div>
);

const FeedPost: React.FC<{ post: any }> = ({ post }) => (
    <div className={`bg-white rounded-xl p-6 border shadow-sm ${post.isPinned ? 'border-blue-200 bg-blue-50/30' : 'border-slate-200'}`}>
        <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${post.author.avatar}`}>{post.author.name.charAt(0)}</div>
                <div>
                    <span className="font-bold text-slate-900 text-sm">{post.author.name}</span>
                    <div className="text-xs text-slate-400">{post.timestamp}</div>
                </div>
            </div>
            {post.isPinned && <Pin size={16} className="text-blue-500" />}
        </div>
        <h3 className="font-bold text-lg text-slate-900 mb-2">{post.title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed">{post.content}</p>
        <div className="flex items-center gap-6 border-t border-slate-100 pt-3 mt-4">
            <button className="flex items-center gap-2 text-slate-500 hover:text-red-500 group"><Heart size={18} className="group-hover:fill-red-500" /> <span className="text-xs font-bold">{post.likes}</span></button>
            <button className="flex items-center gap-2 text-slate-500 hover:text-[#0EB869]"><MessageSquare size={18} /> <span className="text-xs font-bold">{post.comments} Comments</span></button>
        </div>
    </div>
);

const Leaderboard: React.FC = () => (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-4"><Trophy size={16} className="text-amber-500" /> Leaderboard</h3>
        <div className="space-y-3">
            {MOCK_LEADERBOARD.map((user, idx) => (
                <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="w-6 text-center font-bold text-sm text-slate-400">{idx + 1}</span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${user.avatar}`}>{user.name.charAt(0)}</div>
                        <span className="text-xs font-bold text-slate-900">{user.name}</span>
                    </div>
                    <div className="text-xs font-bold text-[#0EB869] bg-[#E8FCF3] px-2 py-0.5 rounded">{user.points} XP</div>
                </div>
            ))}
        </div>
    </div>
);

const UpcomingEvents: React.FC = () => (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-4"><Calendar size={16} className="text-blue-500" /> Upcoming Events</h3>
        <div className="space-y-3">
            <div className="flex gap-3 items-start"><div className="flex flex-col items-center bg-slate-50 border rounded p-1 min-w-[40px]"><span className="text-[9px] font-bold uppercase">Oct</span><span className="text-sm font-bold">28</span></div><div><div className="text-xs font-bold">Weekly Q&A Call</div><div className="text-[10px] text-slate-500">Thursday, 2:00 PM EST</div></div></div>
        </div>
    </div>
);