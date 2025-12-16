import React from 'react';
import { 
  Home, 
  ChevronRight,
  Sparkles,
  ArrowRight,
  Target,
  Users,
  Lock,
  Activity,
  Clock,
  QrCode,
  BrainCircuit,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

// --- Helper Components ---

// Card cho các chỉ số chính (Metric Card) - Redesigned
const MetricCard = ({ icon: Icon, title, amount, subtext, percentage, color, alert }: { icon: any, title: string, amount: string, subtext: string, percentage: string, color: 'green' | 'blue' | 'yellow' | 'red', alert?: boolean }) => {
  // Map color names to specific tailwind classes matching the design system
  const styles = {
    green: { bg: 'bg-[#E8F5E9]', text: 'text-[#16A349]', icon: '#16A349' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', icon: 'text-blue-600' },
    yellow: { bg: 'bg-amber-50', text: 'text-amber-600', icon: 'text-amber-600' },
    red: { bg: 'bg-red-50', text: 'text-red-600', icon: 'text-red-600' },
  };
  
  const activeStyle = styles[color];

  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm p-6 relative flex flex-col hover:shadow-md transition-shadow`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activeStyle.bg}`}>
          <Icon size={20} className={activeStyle.text} />
        </div>
        <span className={`px-2 py-1 rounded text-[11px] font-bold ${activeStyle.bg} ${activeStyle.text}`}>
          {percentage}
        </span>
      </div>
      
      <div>
        <h3 className="text-[13px] font-bold text-slate-500 uppercase tracking-wide mb-1">{title}</h3>
        <p className={`text-2xl font-bold ${alert ? 'text-red-600' : 'text-slate-900'}`}>{amount}</p>
        <p className="text-[13px] text-slate-400 mt-1 flex items-center gap-1">
          {alert && <AlertCircle size={12} />}
          {subtext}
        </p>
      </div>
    </div>
  );
};

// Card cho Clockwork Score - Redesigned
const ClockworkCard = () => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col h-full">
    <div className="flex justify-between items-center mb-6">
      <h3 className="font-bold text-slate-900 text-[16px] flex items-center gap-2">
        <Clock size={20} className="text-purple-500" /> 
        Clockwork Score
      </h3>
      <span className="text-[11px] font-bold bg-green-50 text-[#16A349] px-2 py-1 rounded border border-green-100">+5% This Week</span>
    </div>
    
    <div className="space-y-5 mb-6 flex-1">
      <div>
        <div className="flex justify-between text-[13px] font-medium text-slate-600 mb-2">
          <span>Designing</span>
          <span className="font-bold text-slate-900">20%</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div className="w-[20%] h-full bg-purple-500 rounded-full"></div>
        </div>
      </div>
      <div>
        <div className="flex justify-between text-[13px] font-medium text-slate-600 mb-2">
          <span>Deciding</span>
          <span className="font-bold text-slate-900">15%</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div className="w-[15%] h-full bg-blue-400 rounded-full"></div>
        </div>
      </div>
      <div>
        <div className="flex justify-between text-[13px] font-medium text-slate-600 mb-2">
          <span className="flex items-center gap-1 text-red-500">Doing <AlertCircle size={12}/></span>
          <span className="font-bold text-red-600">65%</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div className="w-[65%] h-full bg-red-500 rounded-full"></div>
        </div>
      </div>
    </div>

    <div className="bg-[#E8F5E9] border border-[#A5D6A7] rounded-lg p-4 mt-auto">
      <p className="text-[13px] text-slate-700 leading-relaxed">
        <span className="font-bold text-[#16A349] flex items-center gap-1 mb-1">
          <BrainCircuit size={14}/> AI Insight:
        </span> 
        Team Media is spending 40% of their time on manual "Ad Setup". Use Otis Ads to automate this.
      </p>
    </div>
  </div>
);

// Card cho Pumpkin Plan - Redesigned
const PumpkinCard = () => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col h-full">
    <div className="flex justify-between items-start mb-6">
      <h3 className="font-bold text-slate-900 text-[16px] flex items-center gap-2">
        <Users size={20} className="text-orange-500" /> 
        Pumpkin Plan
      </h3>
    </div>

    <div className="flex-1 flex flex-col items-center justify-center mb-6">
      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#FFF7ED" strokeWidth="8" />
          <circle cx="60" cy="60" r="54" fill="none" stroke="#F97316" strokeWidth="8" strokeDasharray="250 339.29" strokeLinecap="round" />
        </svg>
        <div className="absolute text-center">
          <p className="text-4xl font-bold text-slate-900">12</p>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">A-List Clients</p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 w-full mt-auto">
      <div className="bg-orange-50 text-orange-800 p-3 rounded-lg text-center border border-orange-100">
        <p className="text-[10px] font-bold uppercase opacity-70 mb-1">A-List Revenue</p>
        <p className="text-[15px] font-bold">1.2 Tỷ</p>
      </div>
      <div className="bg-slate-50 text-slate-600 p-3 rounded-lg text-center border border-slate-100">
        <p className="text-[10px] font-bold uppercase opacity-70 mb-1">To Fire (D-List)</p>
        <p className="text-[15px] font-bold">5 Clients</p>
      </div>
    </div>
  </div>
);

// Card cho Live Traffic - Redesigned
const LiveTrafficCard = () => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col h-full">
    <div className="flex justify-between items-center mb-6">
      <h3 className="font-bold text-slate-900 text-[16px] flex items-center gap-2">
        <Activity size={20} className="text-blue-500" /> 
        Live Traffic
      </h3>
      <div className="flex items-center gap-2 bg-red-50 px-2 py-1 rounded-full border border-red-100">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Live</span>
      </div>
    </div>

    <div className="space-y-3 flex-1 overflow-y-auto">
      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 group hover:border-blue-200 transition-colors">
        <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[10px]">FB</div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-bold text-slate-900 truncate">New Lead: Nguyen Van A</p>
          <p className="text-[11px] text-slate-500 truncate">Campaign "Tet 2026"</p>
        </div>
        <p className="text-[10px] font-medium text-slate-400 whitespace-nowrap">Just now</p>
      </div>
      
      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 group hover:border-[#16A349]/30 transition-colors">
        <div className="w-8 h-8 rounded-lg bg-[#E8F5E9] text-[#16A349] flex items-center justify-center"><QrCode size={14} /></div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-bold text-slate-900 truncate">Order #9928 Paid</p>
          <p className="text-[11px] text-slate-500 truncate">via SePay</p>
        </div>
        <p className="text-[10px] font-medium text-slate-400 whitespace-nowrap">2m ago</p>
      </div>

      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 group hover:border-amber-200 transition-colors">
        <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center"><AlertCircle size={14} /></div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-bold text-slate-900 truncate">Ticket #202 High Priority</p>
          <p className="text-[11px] text-slate-500 truncate">Support Portal</p>
        </div>
        <p className="text-[10px] font-medium text-slate-400 whitespace-nowrap">15m ago</p>
      </div>
    </div>

    <button className="w-full mt-4 text-center py-2.5 border border-slate-200 rounded-lg text-[13px] font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
      View All Activity
    </button>
  </div>
);

export const CeoDashboardPage: React.FC = () => {
  return (
    <div className="p-8 max-w-[1400px] mx-auto font-sans flex flex-col">
      
      {/* 1. Header Standardized */}
      <div className="flex flex-col items-center mb-10 text-center shrink-0">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8F5E9] text-[#16A349] px-3 py-1 rounded text-xs font-bold">
            CEO Command
          </span>
        </div>

        <h1 className="text-[26px] font-bold text-slate-900 mb-3 tracking-tight flex items-center gap-3">
          Executive Dashboard <TrendingUp className="text-[#16A349]" size={28} />
        </h1>
        
        <p className="text-slate-500 text-[13px] leading-relaxed mb-8 max-w-2xl mx-auto">
          High-level overview of business health, vital needs, and system optimization.
        </p>
      </div>

      <div className="animate-in fade-in duration-300 space-y-8">
        
        {/* 2. Vital Need Banner - Redesigned as a Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                        <AlertCircle size={20} />
                    </div>
                    <span className="text-[11px] font-bold bg-red-50 text-red-600 px-3 py-1 rounded uppercase tracking-wider border border-red-100">
                        Vital Need: SALES
                    </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-1">Focus on SALES this month</h2>
                <p className="text-[13px] text-slate-500 leading-relaxed max-w-2xl">
                    Revenue is currently 20% below break-even point. Ignore Clockwork (Process) and Legacy tasks for now. Immediate cashflow is the priority.
                </p>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
                 <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 text-[13px] font-bold rounded-lg hover:bg-slate-50 hover:text-[#16A349] transition-colors">
                    <Sparkles size={16} /> Re-Analyze
                </button>
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-[#16A349] text-white text-[13px] font-bold rounded-lg hover:bg-[#149641] transition-colors shadow-sm">
                    Take Action <ArrowRight size={16} />
                </button>
            </div>
        </div>

        {/* 3. Main Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard 
            icon={Target}
            title="Profit Vault"
            amount="250.000.000₫"
            subtext="Do Not Touch."
            percentage="10%"
            color="green"
            />
            <MetricCard 
            icon={Users}
            title="Owner's Comp"
            amount="120.000.000₫"
            subtext="Ready to payout."
            percentage="20%"
            color="blue"
            />
            <MetricCard 
            icon={Lock}
            title="Tax Reserve"
            amount="90.000.000₫"
            subtext="Covered for Q1/2026."
            percentage="15%"
            color="yellow"
            />
            <MetricCard 
            icon={Activity}
            title="Opex (Burn)"
            amount="15.000.000₫"
            subtext="WARNING: Low runway!"
            percentage="55%"
            color="red"
            alert
            />
        </div>

        {/* 4. Lower Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[420px]">
            <ClockworkCard />
            <PumpkinCard />
            <LiveTrafficCard />
        </div>

        <div className="h-10"></div>
      </div>
    </div>
  );
};