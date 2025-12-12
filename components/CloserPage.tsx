import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Layout, 
  BookOpen, 
  Calendar, 
  Phone,
  MoreHorizontal,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  DollarSign,
  User,
  MessageSquare,
  ShieldAlert,
  ChevronDown
} from 'lucide-react';

export const CloserPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'scripts' | 'calendar'>('pipeline');

  return (
    <div className="p-8 max-w-[1400px] mx-auto font-sans h-full flex flex-col">
      
      {/* Header Section */}
      <div className="flex flex-col items-center mb-8 text-center shrink-0">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8F5E9] text-[#16A349] px-3 py-1 rounded text-xs font-bold">
            Closer Hub
          </span>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
          Sales Command Center
        </h1>
        
        <p className="text-slate-500 text-[15px] leading-relaxed mb-8 max-w-2xl mx-auto">
          Manage your deals, master the Samurai Sword Script, and track your appointments.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-slate-100/50 rounded-xl border border-slate-200 p-1.5 flex mb-8 gap-1 max-w-3xl mx-auto shrink-0">
        <TabButton 
          isActive={activeTab === 'pipeline'} 
          onClick={() => setActiveTab('pipeline')} 
          icon={Layout} 
          label="Sales Pipeline" 
        />
        <TabButton 
          isActive={activeTab === 'scripts'} 
          onClick={() => setActiveTab('scripts')} 
          icon={BookOpen} 
          label="Script Hub" 
        />
        <TabButton 
          isActive={activeTab === 'calendar'} 
          onClick={() => setActiveTab('calendar')} 
          icon={Calendar} 
          label="Booking / Calendar" 
        />
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0 animate-in fade-in duration-300">
        {activeTab === 'pipeline' && <PipelineView />}
        {activeTab === 'scripts' && <ScriptHubView />}
        {activeTab === 'calendar' && <CalendarView />}
      </div>
    </div>
  );
};

// --- Sub-Components for Closer Page ---

const TabButton = ({ isActive, onClick, icon: Icon, label }: { isActive: boolean, onClick: () => void, icon: any, label: string }) => (
  <button 
    onClick={onClick}
    className={`flex-1 min-w-[120px] py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-[13px] font-bold transition-all duration-200 whitespace-nowrap
      ${isActive 
        ? 'bg-white text-[#16A349] shadow-sm ring-1 ring-slate-200' 
        : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'
      }`}
  >
    <Icon size={18} strokeWidth={2} />
    {label}
  </button>
);

// 1. Pipeline View
const PipelineView = () => {
    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input type="text" placeholder="Search deals..." className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#16A349]" />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#16A349] text-white rounded-lg text-sm font-bold hover:bg-[#149641] transition-colors">
                    <Plus size={16} /> Add Deal
                </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 h-full items-start">
                <PipelineColumn 
                    title="New Leads" 
                    count={12} 
                    color="bg-slate-500"
                    items={[
                        { id: 1, name: "Sarah Connor", value: "$3,000", task: "Call today", time: "2h ago" },
                        { id: 2, name: "Kyle Reese", value: "$1,500", task: "Send info", time: "5h ago" },
                        { id: 3, name: "John Doe", value: "$5,000", task: "New entry", time: "1d ago" },
                    ]} 
                />
                <PipelineColumn 
                    title="Contacted / Called" 
                    count={5} 
                    color="bg-blue-500"
                    items={[
                        { id: 4, name: "Ellen Ripley", value: "$12,000", task: "Follow up", time: "1d ago" },
                        { id: 5, name: "James Bond", value: "$4,500", task: "Sent Proposal", time: "2d ago" },
                    ]} 
                />
                 <PipelineColumn 
                    title="Closed Won" 
                    count={3} 
                    color="bg-[#16A349]"
                    items={[
                        { id: 6, name: "Tony Stark", value: "$50,000", task: "Onboarding", time: "3d ago", won: true },
                        { id: 7, name: "Bruce Wayne", value: "$25,000", task: "Paid Invoice", time: "1w ago", won: true },
                    ]} 
                />
                 <PipelineColumn 
                    title="Rejected / Lost" 
                    count={2} 
                    color="bg-red-500"
                    items={[
                        { id: 8, name: "Lex Luthor", value: "$10,000", task: "Not interested", time: "1w ago", lost: true },
                    ]} 
                />
            </div>
        </div>
    )
}

const PipelineColumn = ({ title, count, color, items }: { title: string, count: number, color: string, items: any[] }) => (
    <div className="min-w-[300px] w-[300px] bg-slate-50 rounded-xl border border-slate-200 flex flex-col h-full max-h-[600px]">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-slate-50 rounded-t-xl z-10">
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${color}`}></div>
                <h3 className="text-sm font-bold text-slate-800">{title}</h3>
            </div>
            <span className="text-xs font-bold text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded-full">{count}</span>
        </div>
        <div className="p-3 space-y-3 overflow-y-auto flex-1">
            {items.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md cursor-pointer transition-shadow group">
                    <div className="flex justify-between items-start mb-2">
                        <div className="font-bold text-slate-800 text-sm">{item.name}</div>
                        <button className="text-slate-300 hover:text-slate-500"><MoreHorizontal size={14} /></button>
                    </div>
                    <div className="flex items-center gap-1 text-[#16A349] font-bold text-xs mb-3">
                        <DollarSign size={12} />
                        {item.value}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                         <div className="flex items-center gap-1.5 text-xs text-slate-500">
                             {item.won ? <CheckCircle2 size={12} className="text-[#16A349]" /> : 
                              item.lost ? <XCircle size={12} className="text-red-500" /> :
                              <Clock size={12} />}
                             {item.task}
                         </div>
                         <span className="text-[10px] text-slate-400">{item.time}</span>
                    </div>
                </div>
            ))}
            <button className="w-full py-2 border border-dashed border-slate-300 rounded-lg text-slate-400 text-xs font-medium hover:border-[#16A349] hover:text-[#16A349] transition-colors">
                + New Deal
            </button>
        </div>
    </div>
)

// 2. Script Hub View
const ScriptHubView = () => {
    const [selectedCategory, setSelectedCategory] = useState('opener');

    return (
        <div className="flex flex-col lg:flex-row h-[600px] border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
            {/* Sidebar List */}
            <div className="w-full lg:w-64 bg-slate-50 border-r border-slate-200 flex flex-col">
                <div className="p-4 border-b border-slate-200">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <BookOpen size={16} className="text-[#16A349]" />
                        Script Modules
                    </h3>
                </div>
                <div className="overflow-y-auto flex-1 p-2 space-y-1">
                    <ScriptNavItem 
                        label="The Opener" 
                        isActive={selectedCategory === 'opener'} 
                        onClick={() => setSelectedCategory('opener')}
                    />
                    <ScriptNavItem 
                        label="Discovery Phase" 
                        isActive={selectedCategory === 'discovery'} 
                        onClick={() => setSelectedCategory('discovery')}
                    />
                    <ScriptNavItem 
                        label="The Pitch (Presentation)" 
                        isActive={selectedCategory === 'pitch'} 
                        onClick={() => setSelectedCategory('pitch')}
                    />
                    <ScriptNavItem 
                        label="The Close" 
                        isActive={selectedCategory === 'close'} 
                        onClick={() => setSelectedCategory('close')}
                    />
                    <div className="pt-4 pb-2 px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Objection Handling
                    </div>
                    <ScriptNavItem 
                        label="I need to think about it" 
                        isActive={selectedCategory === 'obj_think'} 
                        onClick={() => setSelectedCategory('obj_think')}
                        isAlert
                    />
                    <ScriptNavItem 
                        label="Price is too high" 
                        isActive={selectedCategory === 'obj_price'} 
                        onClick={() => setSelectedCategory('obj_price')}
                        isAlert
                    />
                    <ScriptNavItem 
                        label="Talk to spouse/partner" 
                        isActive={selectedCategory === 'obj_partner'} 
                        onClick={() => setSelectedCategory('obj_partner')}
                        isAlert
                    />
                </div>
            </div>

            {/* Main Script Content */}
            <div className="flex-1 overflow-y-auto p-8 bg-white relative">
                 <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-2 mb-2 text-[#16A349] font-bold text-xs uppercase tracking-wide">
                        Module 14: Samurai Sword Sales Script
                    </div>
                    
                    {selectedCategory === 'opener' && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">The Opener & Frame Setting</h2>
                            <div className="prose prose-slate max-w-none">
                                <div className="bg-[#F8F9FB] p-6 rounded-xl border border-slate-200 mb-6">
                                    <p className="font-bold text-slate-700 mb-2">Salesperson:</p>
                                    <p className="text-lg text-slate-800 leading-relaxed">
                                        "Hey [Name], it's [Your Name] from [Company]. How's your day going?"
                                    </p>
                                    <p className="text-sm text-slate-400 italic mt-2">(Wait for response)</p>
                                    <p className="text-lg text-slate-800 leading-relaxed mt-4">
                                        "Great. Look, I know you weren't expecting my call, but I saw that you [Action they took - e.g., downloaded the PDF], and I wanted to reach out personally to see if that was you looking to [Result] or if you were just browsing?"
                                    </p>
                                </div>
                                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 text-amber-800 text-sm">
                                    <strong>Goal:</strong> Establish authority immediately and determine intent. Do not sound like a robot.
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedCategory === 'obj_price' && (
                         <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                             <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <ShieldAlert className="text-red-500" />
                                Objection: "The Price is too high"
                             </h2>
                             <div className="space-y-6">
                                <div className="bg-white p-6 rounded-xl border-l-4 border-red-500 shadow-sm border border-slate-200">
                                    <p className="text-sm font-bold text-slate-500 uppercase mb-2">Reframe 1: Cost vs Investment</p>
                                    <p className="text-lg text-slate-800 leading-relaxed">
                                        "I totally understand that it's a significant investment. But let me ask you—when you say it’s too high, do you mean it’s a cash flow issue right now, or do you not see the value in how this will fix [Problem X]?"
                                    </p>
                                </div>
                                
                                <div className="bg-white p-6 rounded-xl border-l-4 border-red-500 shadow-sm border border-slate-200">
                                    <p className="text-sm font-bold text-slate-500 uppercase mb-2">Reframe 2: The Cost of Inaction</p>
                                    <p className="text-lg text-slate-800 leading-relaxed">
                                        "Fair enough. But let’s look at the alternative. If you don't fix this today, how much is [Problem] going to cost you over the next 12 months? Is it more or less than this investment?"
                                    </p>
                                </div>
                             </div>
                         </div>
                    )}

                     {/* Placeholder for others */}
                     {(selectedCategory !== 'opener' && selectedCategory !== 'obj_price') && (
                        <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                            <BookOpen size={48} className="mb-4 opacity-20" />
                            <p>Script content for <strong>{selectedCategory}</strong> goes here.</p>
                        </div>
                     )}

                 </div>
            </div>
        </div>
    );
};

const ScriptNavItem = ({ label, isActive, onClick, isAlert }: { label: string, isActive: boolean, onClick: () => void, isAlert?: boolean }) => (
    <button 
        onClick={onClick}
        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between
            ${isActive 
                ? 'bg-white text-[#16A349] shadow-sm ring-1 ring-slate-100' 
                : 'text-slate-600 hover:bg-white hover:text-slate-900'
            }`}
    >
        <span>{label}</span>
        {isAlert && <ShieldAlert size={14} className={isActive ? 'text-[#16A349]' : 'text-slate-300'} />}
    </button>
)

// 3. Calendar View
const CalendarView = () => {
    return (
        <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
             {/* Calendar Toolbar */}
             <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h2 className="text-lg font-bold text-slate-900">October 2024</h2>
                    <div className="flex gap-1">
                        <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500"><ChevronDown className="rotate-90" size={16} /></button>
                        <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500"><ChevronDown className="-rotate-90" size={16} /></button>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded border border-transparent">Day</button>
                    <button className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded border border-transparent">Week</button>
                    <button className="px-3 py-1.5 text-sm font-bold bg-[#E8F5E9] text-[#16A349] rounded border border-[#A5D6A7]">Month</button>
                </div>
             </div>

             {/* Simple Calendar Grid */}
             <div className="flex-1 p-4 overflow-y-auto">
                 <div className="grid grid-cols-7 gap-px bg-slate-200 border border-slate-200 rounded-lg overflow-hidden">
                    {/* Headers */}
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                        <div key={d} className="bg-slate-50 p-2 text-center text-xs font-bold text-slate-500 uppercase">{d}</div>
                    ))}
                    
                    {/* Days (Mockup) */}
                    {Array.from({ length: 35 }).map((_, i) => {
                        const day = i - 2; // Offset for starting day
                        const isToday = day === 24;
                        return (
                            <div key={i} className={`bg-white min-h-[100px] p-2 relative group hover:bg-slate-50 transition-colors ${day <= 0 || day > 31 ? 'bg-slate-50/50' : ''}`}>
                                {day > 0 && day <= 31 && (
                                    <>
                                        <span className={`text-sm font-medium ${isToday ? 'bg-[#16A349] text-white w-6 h-6 flex items-center justify-center rounded-full' : 'text-slate-700'}`}>
                                            {day}
                                        </span>
                                        
                                        {/* Mock Appointments */}
                                        {day === 24 && (
                                            <div className="mt-2 bg-[#E8F5E9] border border-[#A5D6A7] p-1.5 rounded text-[11px] text-[#16A349] font-bold truncate cursor-pointer hover:shadow-sm">
                                                10:00 AM - Sarah C.
                                            </div>
                                        )}
                                        {(day === 25 || day === 28) && (
                                            <div className="mt-2 bg-blue-50 border border-blue-100 p-1.5 rounded text-[11px] text-blue-600 font-bold truncate cursor-pointer hover:shadow-sm">
                                                2:00 PM - Discovery
                                            </div>
                                        )}
                                        {day === 24 && (
                                             <div className="mt-1 bg-purple-50 border border-purple-100 p-1.5 rounded text-[11px] text-purple-600 font-bold truncate cursor-pointer hover:shadow-sm">
                                                4:30 PM - Closing Call
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )
                    })}
                 </div>
             </div>
        </div>
    )
}