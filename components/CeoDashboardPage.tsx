import React from 'react';
import { 
  Activity, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  AlertTriangle, 
  Globe, 
  Zap, 
  Target, 
  Clock, 
  CheckCircle2, 
  ShieldAlert,
  ArrowUpRight,
  Ticket,
  LayoutDashboard
} from 'lucide-react';

// --- Mock Data ---
const FINANCIALS = {
  revenue: 14250,
  spend: 3840,
  netProfit: 10410,
  roas: 3.71,
  history: [8500, 9200, 11000, 9800, 12500, 13100, 14250] // Last 7 days profit
};

const HEALTH_METRICS = {
  traffic: { cpl: '$12.50', hookRate: '32%', status: 'healthy' },
  funnel: { optIn: '24%', salesConv: '1.8%', status: 'warning' },
  community: { dau: 1240, newMembers: 45, status: 'healthy' },
  ops: { 
    alerts: [
      { type: 'domain', text: 'gettime.money expires in 6d' },
      { type: 'support', text: '3 Urgent Tickets Pending' }
    ],
    status: 'alert'
  }
};

const LIVE_FEED = [
  { id: 1, time: '10:42 AM', type: 'sale', text: 'New Sale: "Agency Scale Course" ($997)', user: 'Mike R.' },
  { id: 2, time: '10:38 AM', type: 'lead', text: 'New Lead: "John Doe" from FB Ads', user: 'System' },
  { id: 3, time: '10:15 AM', type: 'alert', text: 'Ad Set "Testing_V4" CPA > $50', user: 'Ad Manager' },
  { id: 4, time: '09:55 AM', type: 'support', text: 'Ticket Escalated: "Login Issue"', user: 'Sarah J.' },
  { id: 5, time: '09:42 AM', type: 'sale', text: 'New Sale: "VIP Coaching" ($2,500)', user: 'Jessica T.' },
];

export const CeoDashboardPage: React.FC = () => {
  return (
    <div className="min-h-full bg-slate-950 text-white font-sans p-6 lg:p-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-8 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight flex items-center gap-3 uppercase text-white">
            <LayoutDashboard className="text-emerald-500" />
            CEO Command Center
          </h1>
          <p className="text-slate-500 text-xs font-mono uppercase tracking-widest mt-1">
            Global Ops • <span className="text-emerald-500">Live Connection</span> • {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-4">
           <div className="px-3 py-1 bg-slate-900 border border-slate-800 rounded text-xs font-mono text-slate-400">
              Uptime: 99.9%
           </div>
           <div className="flex items-center gap-2 text-xs font-bold text-slate-300 px-3 py-1 bg-slate-900 border border-slate-800 rounded">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              SYSTEM ACTIVE
           </div>
        </div>
      </div>

      {/* 1. The "North Star" Bar (Financials) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
         
         {/* Revenue */}
         <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden group">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                <DollarSign size={12} /> Revenue Today
            </div>
            <div className="text-3xl font-mono font-bold text-white mb-1 flex items-center gap-2">
                ${FINANCIALS.revenue.toLocaleString()}
                <span className="text-xs font-sans text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center">
                    <TrendingUp size={10} className="mr-1" /> +12%
                </span>
            </div>
            <div className="w-full bg-slate-800 h-1 mt-3 rounded-full overflow-hidden">
                <div className="bg-white h-full w-[75%] shadow-[0_0_10px_white]"></div>
            </div>
         </div>

         {/* Ad Spend */}
         <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                <Activity size={12} /> Ad Spend Today
            </div>
            <div className="text-3xl font-mono font-bold text-rose-500 mb-1">
                -${FINANCIALS.spend.toLocaleString()}
            </div>
            <p className="text-xs text-slate-600 font-mono mt-2">Budget Cap: $5,000</p>
         </div>

         {/* Net Profit & Sparkline */}
         <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex justify-between items-center relative overflow-hidden">
            <div className="z-10">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                    Net Profit (Est)
                </div>
                <div className="text-3xl font-mono font-bold text-emerald-500">
                    +${FINANCIALS.netProfit.toLocaleString()}
                </div>
                <p className="text-xs text-slate-600 font-mono mt-2">Margin: {Math.round((FINANCIALS.netProfit / FINANCIALS.revenue) * 100)}%</p>
            </div>
            {/* Simple Sparkline SVG */}
            <svg className="w-24 h-16 text-emerald-500/20 absolute right-0 bottom-0" viewBox="0 0 100 50" preserveAspectRatio="none">
                <path 
                    d="M0 50 L0 30 L15 35 L30 20 L45 25 L60 10 L75 15 L100 0 V50 Z" 
                    fill="currentColor"
                />
                <path 
                    d="M0 30 L15 35 L30 20 L45 25 L60 10 L75 15 L100 0" 
                    fill="none" 
                    stroke="#10B981" 
                    strokeWidth="2"
                />
            </svg>
         </div>

         {/* ROAS Meter */}
         <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col items-center justify-center relative">
            <div className="relative w-32 h-16 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-slate-800 rounded-t-full"></div>
                <div 
                    className={`absolute top-0 left-0 w-full h-full rounded-t-full origin-bottom transition-all duration-1000 ${
                        FINANCIALS.roas < 2 ? 'bg-rose-500' : FINANCIALS.roas > 4 ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                    style={{ transform: `rotate(${(FINANCIALS.roas / 6) * 180 - 180}deg)` }}
                ></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-12 bg-slate-900 rounded-t-full flex items-end justify-center pb-1">
                    <span className={`text-xl font-bold ${
                        FINANCIALS.roas < 2 ? 'text-rose-500' : FINANCIALS.roas > 4 ? 'text-emerald-500' : 'text-amber-500'
                    }`}>{FINANCIALS.roas}x</span>
                </div>
            </div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">ROAS Meter</div>
         </div>
      </div>

      {/* 2. Department Health Grid & Live Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 h-full min-h-0 flex-1">
         
         {/* Middle Section: Department Health (2/3 width) */}
         <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-min">
            
            {/* Traffic Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative group hover:border-emerald-500/50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-white flex items-center gap-2">
                        <Globe size={16} className="text-blue-500" /> Traffic (Ads)
                    </h3>
                    <div className={`w-2 h-2 rounded-full ${HEALTH_METRICS.traffic.status === 'healthy' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-amber-500'}`}></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-3 rounded border border-slate-800">
                        <div className="text-xs text-slate-500 uppercase">Avg. CPL</div>
                        <div className="text-lg font-mono font-bold text-white">{HEALTH_METRICS.traffic.cpl}</div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded border border-slate-800">
                        <div className="text-xs text-slate-500 uppercase">Hook Rate</div>
                        <div className="text-lg font-mono font-bold text-white">{HEALTH_METRICS.traffic.hookRate}</div>
                    </div>
                </div>
            </div>

            {/* Funnel Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative group hover:border-amber-500/50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-white flex items-center gap-2">
                        <Target size={16} className="text-purple-500" /> Funnel (VSL)
                    </h3>
                    <div className={`w-2 h-2 rounded-full ${HEALTH_METRICS.funnel.status === 'healthy' ? 'bg-emerald-500' : 'bg-amber-500 shadow-[0_0_8px_#f59e0b]'}`}></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-3 rounded border border-slate-800">
                        <div className="text-xs text-slate-500 uppercase">Opt-in Rate</div>
                        <div className="text-lg font-mono font-bold text-white">{HEALTH_METRICS.funnel.optIn}</div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded border border-slate-800">
                        <div className="text-xs text-slate-500 uppercase">Sales Conv.</div>
                        <div className="text-lg font-mono font-bold text-amber-500">{HEALTH_METRICS.funnel.salesConv}</div>
                    </div>
                </div>
            </div>

            {/* Community Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative group hover:border-pink-500/50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-white flex items-center gap-2">
                        <Users size={16} className="text-pink-500" /> Community
                    </h3>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-3 rounded border border-slate-800">
                        <div className="text-xs text-slate-500 uppercase">Daily Active</div>
                        <div className="text-lg font-mono font-bold text-white">{HEALTH_METRICS.community.dau}</div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded border border-slate-800">
                        <div className="text-xs text-slate-500 uppercase">New Members</div>
                        <div className="text-lg font-mono font-bold text-white">+{HEALTH_METRICS.community.newMembers}</div>
                    </div>
                </div>
            </div>

            {/* Operations Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative group hover:border-red-500/50 transition-colors border-l-4 border-l-red-500">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-white flex items-center gap-2">
                        <ShieldAlert size={16} className="text-red-500" /> Operations
                    </h3>
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]"></div>
                </div>
                <div className="space-y-2">
                    {HEALTH_METRICS.ops.alerts.map((alert, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs p-2 bg-red-500/10 border border-red-500/20 rounded text-red-400">
                            {alert.type === 'domain' ? <Globe size={12} /> : <Ticket size={12} />}
                            <span className="font-medium">{alert.text}</span>
                        </div>
                    ))}
                </div>
            </div>

         </div>

         {/* Right Section: Live Battle Feed */}
         <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg flex flex-col h-full overflow-hidden">
            <div className="p-4 border-b border-slate-800 bg-slate-950/50 flex justify-between items-center">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <Zap size={14} className="text-emerald-500" /> Live Battle Feed
                </h3>
                <span className="text-[10px] font-mono text-slate-500 animate-pulse">REC ●</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {LIVE_FEED.map((event) => (
                    <div key={event.id} className="flex gap-3 text-xs border-l-2 border-slate-700 pl-3 py-1 relative">
                        {/* Dot on timeline */}
                        <div className={`absolute -left-[5px] top-2 w-2 h-2 rounded-full border-2 border-slate-900 
                            ${event.type === 'sale' ? 'bg-emerald-500' : 
                              event.type === 'alert' ? 'bg-red-500' : 
                              event.type === 'support' ? 'bg-amber-500' : 'bg-blue-500'}
                        `}></div>
                        
                        <div className="text-slate-500 font-mono w-14 shrink-0">{event.time}</div>
                        <div className="flex-1">
                            <div className={`font-bold mb-0.5 ${
                                event.type === 'sale' ? 'text-emerald-400' : 
                                event.type === 'alert' ? 'text-red-400' : 
                                event.type === 'support' ? 'text-amber-400' : 'text-slate-300'
                            }`}>
                                {event.text}
                            </div>
                            <div className="text-slate-600 flex items-center gap-1">
                                <span>Action by:</span> <span className="text-slate-500">{event.user}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Feed Footer */}
            <div className="p-3 border-t border-slate-800 bg-slate-950/30 text-center">
                <button className="text-[10px] font-bold text-slate-500 hover:text-slate-300 uppercase tracking-widest transition-colors">
                    View Full Audit Log
                </button>
            </div>
         </div>

      </div>
    </div>
  );
};