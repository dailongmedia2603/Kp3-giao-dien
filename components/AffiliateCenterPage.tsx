import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Handshake, 
  UserCheck, 
  UserPlus, 
  DollarSign, 
  BarChart2, 
  Link, 
  Download, 
  Trophy, 
  Crown, 
  Copy, 
  Check, 
  X, 
  MoreHorizontal, 
  ArrowRight, 
  Settings, 
  Shield,
  Image as ImageIcon,
  FileText,
  Mail,
  Users,
  MousePointerClick
} from 'lucide-react';

// --- Mock Data ---
const MOCK_PARTNERS = [
  { id: 1, name: 'John Doe', avatar: 'JD', revenue: 12500, conversionRate: 12.5, payoutDue: 1250, status: 'active' },
  { id: 2, name: 'Jane Smith', avatar: 'JS', revenue: 9800, conversionRate: 10.2, payoutDue: 980, status: 'active' },
  { id: 3, name: 'Mike Johnson', avatar: 'MJ', revenue: 5400, conversionRate: 8.1, payoutDue: 540, status: 'active' },
  { id: 4, name: 'Emily White', avatar: 'EW', revenue: 2100, conversionRate: 5.5, payoutDue: 210, status: 'paused' },
];

const MOCK_APPLICATIONS = [
  { id: 1, name: 'Growth Hackers Inc.', email: 'contact@gh.com', website: 'growthhackers.com', message: 'We run a large marketing blog and would love to partner.' },
  { id: 2, name: 'Sarah Lee', email: 'sarah@gmail.com', website: 'youtube.com/sarahlee', message: 'I have a YouTube channel in the marketing niche.' },
];

const MOCK_LEADERBOARD = [
  { rank: 1, name: 'John Doe', avatar: 'JD', revenue: 12500 },
  { rank: 2, name: 'Jane Smith', avatar: 'JS', revenue: 9800 },
  { rank: 3, name: 'Mike Johnson', avatar: 'MJ', revenue: 5400 },
  { rank: 4, name: 'Laura Williams', avatar: 'LW', revenue: 4800 },
  { rank: 5, name: 'Chris Brown', avatar: 'CB', revenue: 4500 },
];

const MOCK_ASSETS = [
  { id: 1, title: 'Logo & Brand Kit', type: 'Branding', icon: Shield },
  { id: 2, title: 'VSL Page Banners', type: 'Banners', icon: ImageIcon },
  { id: 3, title: 'Email Swipe File (Cold)', type: 'Email Copy', icon: Mail },
  { id: 4, title: 'Case Study PDF', type: 'Documents', icon: FileText },
];

// --- StatCard Component (Styled like CEO Dashboard) ---
const StatCard = ({ icon: Icon, title, amount, subtext, percentage, color, alert }: { icon: any, title: string, amount: string, subtext: string, percentage: string, color: 'green' | 'blue' | 'yellow' | 'red', alert?: boolean }) => {
  const colorClasses = {
    green: { border: 'border-green-200', text: 'text-green-600', bg: 'bg-green-50' },
    blue: { border: 'border-blue-200', text: 'text-blue-600', bg: 'bg-blue-50' },
    yellow: { border: 'border-yellow-200', text: 'text-yellow-600', bg: 'bg-yellow-50' },
    red: { border: 'border-red-200', text: 'text-red-600', bg: 'bg-red-50' },
  };
  const styles = colorClasses[color];

  return (
    <div className={`bg-white rounded-xl border ${styles.border} shadow-sm p-5 relative flex flex-col`}>
      {percentage && (
        <div className={`absolute top-4 right-4 px-2 py-0.5 rounded text-xs font-bold ${styles.bg} ${styles.text}`}>
          {percentage}
        </div>
      )}
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${styles.bg}`}>
          <Icon className={styles.text} size={18} />
        </div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</h3>
      </div>
      <div className="mt-auto">
        <p className={`text-3xl font-bold ${alert ? 'text-red-500' : 'text-slate-800'}`}>{amount}</p>
        {subtext && <p className="text-xs text-slate-400 mt-1">{subtext}</p>}
      </div>
    </div>
  );
};

// --- Main Component ---
export const AffiliateCenterPage: React.FC = () => {
  const [view, setView] = useState<'admin' | 'partner'>('admin');

  return (
    <div className="p-8 max-w-[1600px] mx-auto font-sans h-full flex flex-col bg-slate-50">
      {/* Header */}
      <div className="flex flex-col items-center mb-8 text-center shrink-0">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold">
            Affiliate Center
          </span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight flex items-center gap-3">
          <Handshake className="text-blue-600" size={28} />
          Partner Portal
        </h1>
        <p className="text-slate-500 text-[15px] leading-relaxed mb-8 max-w-2xl mx-auto">
          Manage your remote sales army. Track performance, manage payouts, and empower your partners.
        </p>
        {/* View Toggle */}
        <div className="bg-white border border-slate-200 rounded-lg p-1 flex shadow-sm">
          <button onClick={() => setView('admin')} className={`px-6 py-2 text-xs font-bold rounded-md transition-all flex items-center gap-2 ${view === 'admin' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>
            <Settings size={14} /> Admin View
          </button>
          <button onClick={() => setView('partner')} className={`px-6 py-2 text-xs font-bold rounded-md transition-all flex items-center gap-2 ${view === 'partner' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>
            <Users size={14} /> Partner View
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0">
        {view === 'admin' ? <AdminView /> : <PartnerView />}
      </div>
    </div>
  );
};

// --- Admin View ---
const AdminView = () => (
  <div className="animate-in fade-in duration-300 space-y-8">
    {/* Stats */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard 
        title="Total Revenue Generated" 
        amount="$29,800" 
        subtext="All-time partner revenue"
        percentage="+15%"
        icon={DollarSign}
        color="green"
      />
      <StatCard 
        title="Active Partners" 
        amount="4" 
        subtext="+2 this month"
        percentage="Live"
        icon={Users}
        color="blue"
      />
      <StatCard 
        title="Total Payouts Due" 
        amount="$2,980" 
        subtext="For the current cycle"
        percentage="Pending"
        icon={DollarSign}
        color="yellow"
      />
    </div>

    {/* Partner Table & Payouts */}
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-bold text-slate-900 flex items-center gap-2"><UserCheck size={18} className="text-slate-400" /> Active Partners</h3>
        <button className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-2">
          <DollarSign size={14} /> One-Click Payout
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <th className="px-6 py-4">Partner</th>
              <th className="px-6 py-4">Revenue Generated</th>
              <th className="px-6 py-4">Conv. Rate</th>
              <th className="px-6 py-4">Payout Due</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_PARTNERS.map(p => (
              <tr key={p.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">{p.avatar}</div>
                  <span className="font-bold text-slate-900">{p.name}</span>
                </td>
                <td className="px-6 py-4 font-mono text-slate-700 font-medium">${p.revenue.toLocaleString()}</td>
                <td className="px-6 py-4 font-mono text-slate-700 font-medium">{p.conversionRate}%</td>
                <td className="px-6 py-4 font-mono text-blue-600 font-bold">${p.payoutDue.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${p.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>{p.status}</span>
                </td>
                <td className="px-6 py-4 text-right"><button className="p-1 text-slate-400 hover:text-slate-600"><MoreHorizontal size={16} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Approvals */}
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
      <div className="p-5 border-b border-slate-100 bg-slate-50/50">
        <h3 className="font-bold text-slate-900 flex items-center gap-2"><UserPlus size={18} className="text-slate-400" /> New Partner Applications</h3>
      </div>
      <div className="divide-y divide-slate-100">
        {MOCK_APPLICATIONS.map(app => (
          <div key={app.id} className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-slate-900">{app.name}</div>
                <a href={`http://${app.website}`} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">{app.website}</a>
                <p className="text-xs text-slate-500 mt-2 italic bg-slate-50 p-2 rounded border border-slate-100">"{app.message}"</p>
              </div>
              <div className="flex gap-2 shrink-0 ml-4">
                <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600"><X size={16} /></button>
                <button className="p-2 bg-green-500 border border-green-600 rounded-lg text-white hover:bg-green-600"><Check size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- Partner View ---
const PartnerView = () => {
  const [url, setUrl] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const handleGenerate = () => {
    if (!url) return;
    const refId = 'john_doe'; // Mock
    const separator = url.includes('?') ? '&' : '?';
    setGeneratedLink(`${url}${separator}ref=${refId}`);
  };

  return (
    <div className="animate-in fade-in duration-300 space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Your Rank" 
          amount="#1" 
          subtext="Top 1% of partners"
          percentage="Elite"
          icon={Trophy}
          color="yellow"
        />
        <StatCard 
          title="Total Clicks" 
          amount="1,240" 
          subtext="+150 this week"
          percentage="Traffic"
          icon={MousePointerClick}
          color="blue"
        />
        <StatCard 
          title="Commission Due" 
          amount="$1,250" 
          subtext="Next payout: Jan 1st"
          percentage="Ready"
          icon={DollarSign}
          color="green"
        />
      </div>

      {/* Link Generator */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
        <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4"><Link size={18} className="text-slate-400" /> Your Unique Tracking Link</h3>
        <div className="flex flex-col md:flex-row gap-2">
          <input type="text" value={url} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)} placeholder="Paste a landing page URL here..." className="flex-1 p-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" />
          <button onClick={handleGenerate} className="bg-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">Generate</button>
        </div>
        {generatedLink && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg flex justify-between items-center">
            <span className="text-blue-800 font-mono text-sm">{generatedLink}</span>
            <button className="bg-white border border-slate-200 rounded px-3 py-1 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-1"><Copy size={12} /> Copy</button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance & Leaderboard */}
        <div className="lg:col-span-2 space-y-8">
          {/* Performance Graph */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4"><BarChart2 size={18} className="text-slate-400" /> Performance</h3>
            <div className="h-64 bg-slate-50 rounded-lg flex items-end justify-around p-4 border border-slate-100">
              {/* Mock graph */}
              {[30, 50, 40, 70, 60, 80, 90].map((h, i) => (
                <div key={i} className="w-8 group relative">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">${h*10}</div>
                  <div className="bg-blue-300 hover:bg-blue-500 rounded-t-md transition-colors" style={{ height: `${h}%` }}></div>
                </div>
              ))}
            </div>
          </div>
          {/* Leaderboard */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="p-5 border-b border-slate-100"><h3 className="font-bold text-slate-900 flex items-center gap-2"><Trophy size={18} className="text-amber-500" /> Leaderboard</h3></div>
            <div className="divide-y divide-slate-100">
              {MOCK_LEADERBOARD.map(p => (
                <div key={p.rank} className="p-4 flex items-center justify-between hover:bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <span className={`w-6 text-center font-bold text-sm ${p.rank <= 3 ? 'text-amber-500' : 'text-slate-400'}`}>{p.rank}</span>
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">{p.avatar}</div>
                    <span className="font-bold text-slate-900">{p.name}</span>
                  </div>
                  <div className="font-mono text-slate-700 font-medium">${p.revenue.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Assets */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm h-fit">
          <div className="p-5 border-b border-slate-100"><h3 className="font-bold text-slate-900 flex items-center gap-2"><Download size={18} className="text-slate-400" /> Promotional Assets</h3></div>
          <div className="divide-y divide-slate-100">
            {MOCK_ASSETS.map(asset => (
              <div key={asset.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center"><asset.icon size={16} /></div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm">{asset.title}</div>
                    <div className="text-xs text-slate-400">{asset.type}</div>
                  </div>
                </div>
                <button className="p-1.5 text-slate-400 hover:text-blue-600"><Download size={16} /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};