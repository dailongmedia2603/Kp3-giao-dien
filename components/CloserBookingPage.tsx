import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Calendar, 
  Settings, 
  BarChart2, 
  Clock, 
  Plus, 
  MoreHorizontal, 
  Users, 
  Link, 
  DollarSign,
  CheckCircle2,
  Eye,
  Copy,
  Trash2,
  ArrowRight,
  Globe,
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

// --- MOCK DATA ---
const MOCK_EVENT_TYPES = [
  { id: 1, name: '15-Min Discovery Call', duration: 15, price: null, active: true },
  { id: 2, name: '1-Hour Strategy Session', duration: 60, price: 250, active: true },
  { id: 3, name: 'Partnership Inquiry', duration: 30, price: null, active: false },
];

const MOCK_APPOINTMENTS = [
  { id: 1, time: '9:00 AM', duration: 60, title: 'Strategy Session w/ John Doe', status: 'paid' },
  { id: 2, time: '11:00 AM', duration: 15, title: 'Discovery Call w/ Jane Smith', status: 'scheduled' },
  { id: 3, time: '2:00 PM', duration: 60, title: 'Strategy Session w/ Mike Ross', status: 'no-show' },
];

// --- MAIN COMPONENT ---
export const CloserBookingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'event-types': return <EventTypesView />;
      case 'calendar': return <CalendarView />;
      case 'availability': return <AvailabilityView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto font-sans h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col items-center mb-8 text-center shrink-0">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold">
            Closer Booking
          </span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
          Universal Booking & Scheduling
        </h1>
        <p className="text-slate-500 text-[15px] leading-relaxed mb-8 max-w-2xl mx-auto">
          Tạo trang đặt lịch, quản lý lịch hẹn và phân tích hiệu suất.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 p-1.5 flex mb-8 gap-1 max-w-4xl mx-auto shrink-0 shadow-sm">
        <TabButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={BarChart2} label="Dashboard" />
        <TabButton active={activeTab === 'event-types'} onClick={() => setActiveTab('event-types')} icon={Settings} label="Event Types" />
        <TabButton active={activeTab === 'calendar'} onClick={() => setActiveTab('calendar')} icon={Calendar} label="Master Calendar" />
        <TabButton active={activeTab === 'availability'} onClick={() => setActiveTab('availability')} icon={Clock} label="Availability" />
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0">
        {renderContent()}
      </div>
    </div>
  );
};

// --- SUB-VIEWS ---

const DashboardView = () => (
  <div className="animate-in fade-in duration-300 space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard title="Conversion Rate" value="12.5%" change="+2.1%" trend="up" />
      <StatCard title="Show-up Rate" value="88.2%" change="-1.5%" trend="down" />
      <StatCard title="Total Revenue" value="$4,250" change="+$500" trend="up" />
    </div>
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
      <h3 className="font-bold text-slate-900 mb-4">Bookings Over Time</h3>
      <div className="h-64 bg-slate-50 rounded-lg flex items-end justify-around p-4 border border-slate-100">
        {[30, 50, 40, 70, 60, 80, 90].map((h, i) => (
          <div key={i} className="w-8 group relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">{h}</div>
            <div className="bg-blue-300 hover:bg-blue-500 rounded-t-md transition-colors" style={{ height: `${h}%` }}></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const EventTypesView = () => {
    const [showEditor, setShowEditor] = useState(false);

    if (showEditor) {
        return <EventTypeEditor onBack={() => setShowEditor(false)} />;
    }

    return (
        <div className="animate-in fade-in duration-300">
            <div className="flex justify-end mb-6">
                <button onClick={() => setShowEditor(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 shadow-sm">
                    <Plus size={14} /> New Event Type
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_EVENT_TYPES.map(event => (
                    <div key={event.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="font-bold text-slate-900 mb-1">{event.name}</h3>
                                <p className="text-xs text-slate-500">{event.duration} minutes</p>
                            </div>
                            <div className={`w-2 h-2 rounded-full mt-1 ${event.active ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                        </div>
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
                            <span className="text-sm font-bold text-blue-600">{event.price ? `$${event.price}` : 'Free'}</span>
                            <button onClick={() => setShowEditor(true)} className="text-xs font-bold text-blue-600 hover:underline">Edit</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const EventTypeEditor = ({ onBack }: { onBack: () => void }) => (
    <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-xl shadow-sm p-8 animate-in fade-in">
        <div className="flex items-center gap-4 mb-6">
            <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"><ArrowLeft size={18} /></button>
            <h2 className="text-xl font-bold text-slate-900">Create Event Type</h2>
        </div>
        <div className="space-y-6">
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Event Name</label>
                <input type="text" defaultValue="15-Min Discovery Call" className="w-full p-3 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border">
                <p className="font-medium text-slate-800">Require Payment</p>
                <div className="w-10 h-6 bg-slate-200 rounded-full p-1"><div className="w-4 h-4 bg-white rounded-full shadow-sm"></div></div>
            </div>
            <div>
                <h4 className="text-sm font-bold text-slate-700 mb-2">Pre-booking Questions</h4>
                <div className="space-y-2">
                    <div className="p-3 bg-white border rounded-lg flex items-center justify-between"><span>Name (Default)</span><MoreHorizontal size={16} /></div>
                    <div className="p-3 bg-white border rounded-lg flex items-center justify-between"><span>Email (Default)</span><MoreHorizontal size={16} /></div>
                    <button className="w-full py-2 border-2 border-dashed rounded-lg text-slate-400 text-sm font-medium hover:border-blue-500 hover:text-blue-600">+ Add Question</button>
                </div>
            </div>
            <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">Save Event Type</button>
        </div>
    </div>
);

const CalendarView = () => (
  <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 animate-in fade-in duration-300">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-bold text-slate-900">Master Calendar</h3>
      <div className="flex items-center gap-2 text-xs text-green-600 font-bold">
        <CheckCircle2 size={14} /> Synced with Google Calendar
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {['Today', 'Tomorrow', 'Friday, Oct 28'].map((day, i) => (
        <div key={i}>
          <h4 className="font-bold text-center mb-2">{day}</h4>
          <div className="space-y-2">
            {MOCK_APPOINTMENTS.map(apt => (
              <div key={apt.id} className={`p-3 rounded-lg border-l-4 ${
                apt.status === 'paid' ? 'border-green-500 bg-green-50' :
                apt.status === 'scheduled' ? 'border-blue-500 bg-blue-50' : 'border-red-500 bg-red-50'
              }`}>
                <p className="font-bold text-sm text-slate-800">{apt.title}</p>
                <p className="text-xs text-slate-500">{apt.time}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AvailabilityView = () => (
    <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-xl shadow-sm p-8 animate-in fade-in">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Availability & Rules</h2>
        <div className="space-y-6">
            <div>
                <h4 className="text-sm font-bold text-slate-700 mb-2">Working Hours</h4>
                <p className="text-xs text-slate-500 mb-2">Define when you are available for bookings.</p>
                <div className="p-4 bg-slate-50 rounded-lg border">
                    <p>Mon - Fri: 9:00 AM - 5:00 PM</p>
                </div>
            </div>
            <div>
                <h4 className="text-sm font-bold text-slate-700 mb-2">Round Robin</h4>
                <p className="text-xs text-slate-500 mb-2">Distribute meetings among team members.</p>
                <select className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm">
                    <option>Equal Distribution</option>
                    <option>Performance-based</option>
                </select>
            </div>
        </div>
    </div>
);

// --- Helper Components ---

const TabButton: React.FC<{ active: boolean, onClick: () => void, icon: React.ElementType, label: string }> = ({ active, onClick, icon: Icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex-1 min-w-[120px] py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-[13px] font-bold transition-all duration-200 whitespace-nowrap
      ${active 
        ? 'bg-slate-900 text-white shadow-sm' 
        : 'text-slate-500 hover:bg-slate-100'
      }`}
  >
    <Icon size={18} />
    {label}
  </button>
);

const StatCard: React.FC<{ title: string, value: string, change: string, trend: 'up' | 'down' }> = ({ title, value, change, trend }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
    <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">{title}</h4>
    <p className="text-3xl font-bold text-slate-900">{value}</p>
    <p className={`text-xs font-bold mt-1 flex items-center gap-1 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
      {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
      {change}
    </p>
  </div>
);