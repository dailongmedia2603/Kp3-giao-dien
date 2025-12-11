import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Users, 
  DollarSign, 
  PieChart, 
  Filter, 
  Crown, 
  Rabbit, 
  Heart, 
  ArrowUpRight, 
  ArrowDownRight, 
  BrainCircuit, 
  AlertTriangle,
  CheckCircle2,
  MoreHorizontal
} from 'lucide-react';

// --- Mock Data ---
const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Sarah Jenkins', avatar: 'SJ', metric: 15200, metricLabel: 'Revenue', badges: ['Top Closer', 'Customer Favorite'] },
  { rank: 2, name: 'Tom Ford', avatar: 'TF', metric: 12800, metricLabel: 'Revenue', badges: ['Top Closer'] },
  { rank: 3, name: 'David Chen', avatar: 'DC', metric: 115, metricLabel: 'Tasks', badges: ['Speed Demon'] },
  { rank: 4, name: 'Jessica Bloom', avatar: 'JB', metric: 98, metricLabel: 'Tasks', badges: [] },
];

const MOCK_QBR_DATA = {
  qbrTime: 65,
  adminTime: 35, // This will trigger the alert
  role: 'Designer'
};

const MOCK_CANDIDATES = [
  { id: 'c1', name: 'Alice Gray', role: 'Media Buyer', score: 95, stage: 'AI Scored' },
  { id: 'c2', name: 'Bob Williams', role: 'Closer', score: 88, stage: 'Interview' },
  { id: 'c3', name: 'Charlie Brown', role: 'Media Buyer', score: 75, stage: 'AI Scored' },
  { id: 'c4', name: 'Diana Prince', role: 'Designer', score: 98, stage: 'Hired' },
  { id: 'c5', name: 'Edward Nygma', role: 'Closer', score: 65, stage: 'New' },
  { id: 'c6', name: 'Fiona Glenanne', role: 'Designer', score: 82, stage: 'Interview' },
];

const KANBAN_STAGES = ['New', 'AI Scored', 'Interview', 'Hired'];

// --- Sub-Components ---

const Badge = ({ type }: { type: string }) => {
  const badgeStyles: { [key: string]: { icon: React.ElementType, text: string, color: string } } = {
    'Top Closer': { icon: Crown, text: 'Top Closer', color: 'amber' },
    'Speed Demon': { icon: Rabbit, text: 'Speed Demon', color: 'blue' },
    'Customer Favorite': { icon: Heart, text: 'Customer Favorite', color: 'pink' },
  };
  const style = badgeStyles[type];
  if (!style) return null;

  const colors = {
    amber: 'bg-amber-100 text-amber-700',
    blue: 'bg-blue-100 text-blue-700',
    pink: 'bg-pink-100 text-pink-700',
  };

  return (
    <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${colors[style.color as keyof typeof colors]}`}>
      <style.icon size={12} fill="currentColor" /> {style.text}
    </span>
  );
};

// --- Main Component ---
export const TeamHRPage: React.FC = () => {
  return (
    <div className="p-8 max-w-[1600px] mx-auto font-sans h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col items-center mb-8 text-center shrink-0">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold">
            Team & HR
          </span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
          Team Performance & HR
        </h1>
        <p className="text-slate-500 text-[15px] leading-relaxed mb-8 max-w-2xl mx-auto">
          Gamify performance, optimize roles with Clockwork principles, and build your A-Team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Mercenary Scorecard */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-900">Mercenary Scorecard</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Rank</th>
                  <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Employee</th>
                  <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Performance</th>
                  <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Badges</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_LEADERBOARD.map(p => (
                  <tr key={p.rank}>
                    <td className="px-6 py-4 text-lg font-bold text-slate-400">{p.rank}</td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-xs">{p.avatar}</div>
                      <span className="font-bold text-slate-900">{p.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`text-lg font-bold ${p.metricLabel === 'Revenue' ? 'text-green-600' : 'text-blue-600'}`}>
                        {p.metricLabel === 'Revenue' ? `$${p.metric.toLocaleString()}` : p.metric}
                      </div>
                      <div className="text-xs text-slate-500">{p.metricLabel}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {p.badges.map(b => <Badge key={b} type={b} />)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Commission Wallet & QBR */}
        <div className="space-y-8">
          {/* Commission Wallet */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-6 shadow-lg">
            <h3 className="font-bold text-white/80 text-sm mb-2">Real-time Commission</h3>
            <p className="text-4xl font-black mb-1">You made $500 today!</p>
            <p className="text-green-200 text-xs mb-4">Total pending: $2,450</p>
            <button className="w-full py-2 bg-white text-green-600 font-bold rounded-lg hover:bg-green-50 transition-colors">
              Request Payout
            </button>
          </div>

          {/* QBR Tracking */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <PieChart size={18} className="text-slate-400" /> QBR Analysis ({MOCK_QBR_DATA.role})
            </h3>
            <div className="flex justify-center items-center my-4">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#fca5a5" strokeWidth="3.8" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#4f46e5" strokeWidth="3.8" strokeDasharray={`${MOCK_QBR_DATA.qbrTime}, 100`} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-slate-900">{MOCK_QBR_DATA.qbrTime}%</span>
                  <span className="text-xs font-bold text-slate-500">QBR Time</span>
                </div>
              </div>
            </div>
            {MOCK_QBR_DATA.adminTime > 20 && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-lg text-xs flex items-start gap-2">
                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">High Admin Time:</span> This role is spending {MOCK_QBR_DATA.adminTime}% of their time on non-QBR tasks. Consider delegating or automating.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recruitment Pipeline */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Recruitment Pipeline</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {KANBAN_STAGES.map(stage => (
            <div key={stage} className="bg-slate-100 rounded-xl border border-slate-200 flex flex-col">
              <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider">{stage}</h3>
                <span className="text-xs font-bold bg-white px-2 py-0.5 rounded-full text-slate-500">
                  {MOCK_CANDIDATES.filter(c => c.stage === stage).length}
                </span>
              </div>
              <div className="p-3 space-y-3 flex-1">
                {MOCK_CANDIDATES.filter(c => c.stage === stage).map(candidate => (
                  <div key={candidate.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-bold text-slate-900">{candidate.name}</div>
                        <div className="text-xs text-slate-500">{candidate.role}</div>
                      </div>
                      <button className="text-slate-300 hover:text-slate-500"><MoreHorizontal size={16} /></button>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-100 rounded-lg">
                      <BrainCircuit size={18} className="text-blue-600" />
                      <span className="text-xs font-bold text-slate-500">AI Match:</span>
                      <span className={`text-lg font-bold ${candidate.score > 90 ? 'text-green-600' : 'text-blue-600'}`}>{candidate.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};