import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Users, 
  Mail, 
  MousePointerClick, 
  DollarSign, 
  Activity, 
  AlertTriangle, 
  Trash2, 
  RefreshCw, 
  Filter, 
  Trophy,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  BarChart3,
  Search,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Plus,
  Sparkles,
  PenTool,
  Send,
  Monitor,
  Smartphone,
  Globe,
  Loader2
} from 'lucide-react';

export const EmailListPage: React.FC = () => {
  // --- State ---
  const [viewMode, setViewMode] = useState<'dashboard' | 'composer'>('dashboard');
  const [timeRange, setTimeRange] = useState('Last 30 Days');

  // --- Composer State ---
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploySuccess, setDeploySuccess] = useState(false);
  const [campaignData, setCampaignData] = useState({
    subject: '',
    body: '',
    platform: 'Mailchimp',
    audience: 'VIP Buyers',
    topic: '',
    tone: 'Persuasive'
  });

  // --- Mock Data ---
  const metrics = {
    totalSubscribers: 124500,
    subscribersGrowth: 2.4, // %
    avgOpenRate: 28.5,
    avgCtr: 4.2,
    revenuePerRecipient: 1.15, // $
    revenueGrowth: 12.5, // %
    listHealthScore: 94, // 0-100
    bounceRate: 0.8,
    spamComplaints: 0.02
  };

  const segments = [
    { id: 1, name: "VIP Buyers (3+ Purchases)", count: 4250, status: "Active" },
    { id: 2, name: "Cart Abandoners (7 Days)", count: 1820, status: "Hot" },
    { id: 3, name: "Clickers / Non-Buyers", count: 15400, status: "Warm" },
    { id: 4, name: "Cold Leads (>90 Days Inactive)", count: 24500, status: "At Risk" },
  ];

  const campaigns = [
    { 
      id: 101, 
      name: "Q3 Flash Sale - Last Chance", 
      sentDate: "Oct 24, 10:00 AM", 
      recipients: 45000, 
      status: "Sent",
      revenue: 12500,
      abTest: true,
      variants: [
        { label: "A", subject: "Is this goodbye?", openRate: 32.4, ctr: 3.1, winner: false },
        { label: "B", subject: "Your cart is expiring in 1 hour...", openRate: 41.8, ctr: 5.2, winner: true }
      ]
    },
    { 
      id: 102, 
      name: "Weekly Newsletter #45", 
      sentDate: "Oct 22, 09:00 AM", 
      recipients: 112000, 
      status: "Sent",
      revenue: 3400,
      abTest: false,
      variants: [
        { label: "A", subject: "The secret to scaling ads...", openRate: 26.5, ctr: 1.8, winner: true }
      ]
    },
    { 
      id: 103, 
      name: "Webinar Invite - Cold Segment", 
      sentDate: "Oct 20, 02:00 PM", 
      recipients: 24000, 
      status: "Sent",
      revenue: 0, // Webinar reg
      abTest: true,
      variants: [
        { label: "A", subject: "Free Training: 3 Steps to...", openRate: 18.2, ctr: 0.9, winner: false },
        { label: "B", subject: "Stop doing this immediately", openRate: 29.4, ctr: 2.1, winner: true }
      ]
    }
  ];

  // --- Handlers ---
  const handleGenerateAI = () => {
    if (!campaignData.topic) return;
    setIsGenerating(true);
    setTimeout(() => {
        setCampaignData(prev => ({
            ...prev,
            subject: `🔥 Exclusive: ${prev.topic} (Open Inside)`,
            body: `Hi [First_Name],\n\nWe noticed you've been looking into ${prev.topic}, but haven't pulled the trigger yet.\n\nHere is the truth: Most people fail because they lack a system.\n\nThat's why today, we are opening up access to our proprietary framework designed specifically for ${prev.audience}.\n\nClick below to get started immediately.\n\n[Link: Access Now]\n\nBest,\nKp3 Team`
        }));
        setIsGenerating(false);
    }, 1500);
  };

  const handleDeploy = () => {
      setIsDeploying(true);
      setTimeout(() => {
          setIsDeploying(false);
          setDeploySuccess(true);
          setTimeout(() => setDeploySuccess(false), 3000);
      }, 2000);
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto font-sans h-full flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col items-center mb-8 text-center shrink-0">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span 
            onClick={() => setViewMode('dashboard')}
            className={`cursor-pointer ${viewMode === 'dashboard' ? 'bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold' : 'hover:text-slate-800'}`}
          >
            Email List
          </span>
          {viewMode === 'composer' && (
             <>
                <ChevronRight size={14} className="text-slate-300" />
                <span className="bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold">
                    AI Composer
                </span>
             </>
          )}
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight flex items-center gap-3">
          {viewMode === 'dashboard' ? (
              <>List Performance Pulse <Activity className="text-[#0EB869]" size={28} /></>
          ) : (
              <>AI Email Composer <Sparkles className="text-[#0EB869]" size={28} /></>
          )}
        </h1>
        
        <p className="text-slate-500 text-[15px] leading-relaxed mb-8 max-w-2xl mx-auto">
          {viewMode === 'dashboard' 
            ? "High-velocity data for direct response marketers. Monitor list health, revenue per recipient, and behavioral segments."
            : "Generate high-converting email copy instantly and deploy directly to your marketing platform."}
        </p>

        {/* View Toggle */}
        <div className="bg-white border border-slate-200 rounded-lg p-1 flex shadow-sm mb-4">
            <button 
                onClick={() => setViewMode('dashboard')}
                className={`px-6 py-2 text-xs font-bold rounded-md transition-all flex items-center gap-2 ${viewMode === 'dashboard' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
            >
                <BarChart3 size={14} /> Dashboard
            </button>
            <button 
                onClick={() => setViewMode('composer')}
                className={`px-6 py-2 text-xs font-bold rounded-md transition-all flex items-center gap-2 ${viewMode === 'composer' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
            >
                <PenTool size={14} /> AI Writer & Deploy
            </button>
        </div>
      </div>

      {/* ================= DASHBOARD VIEW ================= */}
      {viewMode === 'dashboard' && (
        <div className="animate-in fade-in duration-300">
            {/* Row 1: The Pulse (Metrics) */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                {/* Metric 1: RPR (Hero Metric) */}
                <div className="bg-slate-900 rounded-xl p-6 text-white shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <DollarSign size={64} />
                    </div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Revenue / Recipient</div>
                    <div className="text-4xl font-mono font-bold text-[#0EB869] mb-2 flex items-baseline gap-2">
                        ${metrics.revenuePerRecipient}
                        <span className="text-sm font-sans font-medium text-[#0EB869] bg-[#0EB869]/20 px-1.5 py-0.5 rounded flex items-center">
                            <ArrowUpRight size={12} className="mr-0.5" /> {metrics.revenueGrowth}%
                        </span>
                    </div>
                    <div className="text-xs text-slate-400 border-t border-slate-700 pt-3 mt-2">
                        Target: $1.00 <span className="mx-1">•</span> <span className="text-[#0EB869] font-bold">Above Target</span>
                    </div>
                </div>

                {/* Metric 2: Click Through Rate */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Click-Through Rate</div>
                        <MousePointerClick size={16} className="text-slate-400" />
                    </div>
                    <div className="text-3xl font-mono font-bold text-slate-900 mb-2">{metrics.avgCtr}%</div>
                    <div className="text-xs text-slate-500">
                        Avg Open Rate: <span className="font-bold text-slate-900">{metrics.avgOpenRate}%</span>
                    </div>
                    {/* Mini Bar Chart Visualization */}
                    <div className="flex gap-1 items-end h-8 mt-4 opacity-60">
                        {[40, 65, 45, 80, 55, 70, 60, 90, 75, 50].map((h, i) => (
                            <div key={i} className="flex-1 bg-[#0EB869] rounded-t-sm" style={{ height: `${h}%` }}></div>
                        ))}
                    </div>
                </div>

                {/* Metric 3: List Growth */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Total Subscribers</div>
                        <Users size={16} className="text-slate-400" />
                    </div>
                    <div className="text-3xl font-mono font-bold text-slate-900 mb-2">{metrics.totalSubscribers.toLocaleString()}</div>
                    <div className="flex items-center gap-2 text-xs">
                        <span className="text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded flex items-center">
                            <ArrowUpRight size={12} className="mr-1" /> {metrics.subscribersGrowth}%
                        </span>
                        <span className="text-slate-400">vs last 30 days</span>
                    </div>
                    {/* Mini Line Chart Visualization */}
                    <div className="relative h-10 mt-3 w-full overflow-hidden">
                            <svg className="w-full h-full" preserveAspectRatio="none">
                                <path d="M0,30 L10,25 L20,28 L30,15 L40,20 L50,10 L60,18 L70,5 L80,12 L90,8 L100,2" fill="none" stroke="#64748B" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                            </svg>
                    </div>
                </div>

                {/* Metric 4: List Health */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">List Health</div>
                            <Activity size={16} className="text-slate-400" />
                        </div>
                        <div className="flex items-center gap-3 mb-1">
                            <div className="text-3xl font-mono font-bold text-slate-900">{metrics.listHealthScore}</div>
                            <div className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase rounded border border-green-200">Excellent</div>
                        </div>
                    </div>

                    <div className="space-y-2 mt-4">
                        <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Bounce Rate</span>
                            <span className={`font-bold ${metrics.bounceRate > 1 ? 'text-red-500' : 'text-slate-700'}`}>{metrics.bounceRate}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${metrics.bounceRate > 1 ? 'bg-red-500' : 'bg-[#0EB869]'}`} style={{ width: `${metrics.bounceRate * 20}%` }}></div>
                        </div>

                        <div className="flex justify-between text-xs pt-1">
                            <span className="text-slate-500">Spam Complaints</span>
                            <span className={`font-bold ${metrics.spamComplaints > 0.1 ? 'text-red-500' : 'text-slate-700'}`}>{metrics.spamComplaints}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${metrics.spamComplaints > 0.1 ? 'bg-red-500' : 'bg-[#0EB869]'}`} style={{ width: `${metrics.spamComplaints * 100}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-8 flex-1 min-h-0">
                
                {/* LEFT COLUMN: Behavioral Segments */}
                <div className="w-full xl:w-[400px] shrink-0 flex flex-col gap-6">
                    
                    {/* Segmentation Panel */}
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                <PieChart size={18} className="text-slate-400" />
                                Smart Segments
                            </h3>
                            <button className="text-xs font-bold text-[#0EB869] hover:underline flex items-center gap-1">
                                <Plus size={12} /> New Segment
                            </button>
                        </div>
                        
                        <div className="divide-y divide-slate-100">
                            {segments.map(seg => (
                                <div key={seg.id} className="p-4 hover:bg-slate-50 transition-colors group cursor-pointer">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-sm font-bold text-slate-800 group-hover:text-[#0EB869] transition-colors">{seg.name}</span>
                                        <MoreHorizontal size={14} className="text-slate-300 group-hover:text-slate-500" />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                                            <Users size={12} /> {seg.count.toLocaleString()}
                                        </span>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                                            seg.status === 'Active' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                            seg.status === 'Hot' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                            seg.status === 'At Risk' ? 'bg-red-50 text-red-600 border-red-100' :
                                            'bg-slate-100 text-slate-500 border-slate-200'
                                        }`}>
                                            {seg.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Hygiene Action */}
                        <div className="p-4 bg-red-50 border-t border-red-100">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-red-100 rounded text-red-600">
                                    <Trash2 size={16} />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-red-800 uppercase mb-1">List Hygiene Alert</h4>
                                    <p className="text-xs text-red-700/80 mb-3 leading-relaxed">
                                        You have 24,500 inactive leads dragging down your open rates.
                                    </p>
                                    <button className="w-full py-2 bg-white border border-red-200 text-red-600 text-xs font-bold rounded hover:bg-red-50 transition-colors shadow-sm">
                                        Clean Up Inactive Leads
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-slate-900 rounded-xl p-6 text-white shadow-md">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <RefreshCw size={18} className="text-[#0EB869]" />
                            Sync Status
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400">Shopify Data</span>
                                <span className="flex items-center gap-1.5 text-[#0EB869] font-bold text-xs">
                                    <CheckCircle2 size={12} /> Synced 2m ago
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400">Facebook Leads</span>
                                <span className="flex items-center gap-1.5 text-[#0EB869] font-bold text-xs">
                                    <CheckCircle2 size={12} /> Synced 5m ago
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400">ClickFunnels</span>
                                <span className="flex items-center gap-1.5 text-amber-500 font-bold text-xs">
                                    <RefreshCw size={12} className="animate-spin" /> Syncing...
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* RIGHT COLUMN: Campaign Performance */}
                <div className="flex-1 min-w-0 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
                    <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2">
                            <BarChart3 size={18} className="text-slate-400" />
                            Campaign Performance
                        </h3>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                <input type="text" placeholder="Search..." className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:border-[#0EB869]" />
                            </div>
                            <button className="p-1.5 border border-slate-200 rounded-md hover:bg-slate-100 text-slate-500">
                                <Filter size={14} />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    <th className="px-6 py-4">Campaign</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">A/B Test Results</th>
                                    <th className="px-6 py-4 text-right">Revenue</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {campaigns.map((camp) => (
                                    <tr key={camp.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 align-top">
                                            <div className="font-bold text-slate-900 mb-1">{camp.name}</div>
                                            <div className="text-xs text-slate-500 flex items-center gap-2">
                                                <Mail size={10} /> {camp.recipients.toLocaleString()} Recipients
                                                <span className="text-slate-300">|</span>
                                                {camp.sentDate}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 align-top">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-600 border border-green-100 uppercase tracking-wide">
                                                <CheckCircle2 size={10} /> {camp.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 align-top">
                                            <div className="space-y-3">
                                                {camp.variants.map((v, i) => (
                                                    <div key={i} className={`flex items-start gap-3 p-2 rounded-lg border ${v.winner ? 'bg-[#E8FCF3] border-[#86EFAC]' : 'bg-white border-slate-100'}`}>
                                                        <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0 ${v.winner ? 'bg-[#0EB869] text-white' : 'bg-slate-100 text-slate-500'}`}>
                                                            {v.label}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className={`text-xs truncate font-medium ${v.winner ? 'text-slate-900' : 'text-slate-500'}`}>
                                                                    "{v.subject}"
                                                                </span>
                                                                {v.winner && <Trophy size={12} className="text-[#0EB869]" fill="currentColor" />}
                                                            </div>
                                                            <div className="flex items-center gap-4 text-[11px]">
                                                                <span className="font-mono text-slate-600"><span className="text-slate-400">Open:</span> <strong>{v.openRate}%</strong></span>
                                                                <span className="font-mono text-slate-600"><span className="text-slate-400">CTR:</span> <strong>{v.ctr}%</strong></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 align-top text-right">
                                            <div className="font-mono font-bold text-slate-900 text-lg">
                                                ${camp.revenue.toLocaleString()}
                                            </div>
                                            <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">
                                                Generated
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 border-t border-slate-100 bg-slate-50 text-center">
                        <button className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">
                            View All Campaigns History
                        </button>
                    </div>
                </div>

            </div>
        </div>
      )}

      {/* ================= COMPOSER VIEW ================= */}
      {viewMode === 'composer' && (
          <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0 animate-in fade-in duration-300">
              
              {/* Left Panel: Configuration */}
              <div className="w-full lg:w-[400px] shrink-0 flex flex-col gap-6">
                  <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                      <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                          <Sparkles size={18} className="text-[#0EB869]" />
                          Campaign Strategy
                      </h3>
                      
                      <div className="space-y-5">
                          {/* Topic Input */}
                          <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Campaign Topic / Angle</label>
                              <textarea 
                                  value={campaignData.topic}
                                  onChange={(e) => setCampaignData({...campaignData, topic: e.target.value})}
                                  placeholder="e.g. Announcing the new Black Friday deal with 50% off all courses..."
                                  className="w-full p-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#0EB869] resize-none h-24"
                              />
                          </div>

                          {/* Audience */}
                          <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Target Audience</label>
                              <select 
                                  value={campaignData.audience}
                                  onChange={(e) => setCampaignData({...campaignData, audience: e.target.value})}
                                  className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#0EB869]"
                              >
                                  {segments.map(seg => (
                                      <option key={seg.id} value={seg.name}>{seg.name} ({seg.count} contacts)</option>
                                  ))}
                              </select>
                          </div>

                          {/* Tone */}
                          <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Tone of Voice</label>
                              <div className="grid grid-cols-2 gap-2">
                                  {['Persuasive', 'Urgent', 'Friendly', 'Storytelling'].map(tone => (
                                      <button 
                                          key={tone}
                                          onClick={() => setCampaignData({...campaignData, tone})}
                                          className={`py-2 text-xs font-bold rounded border ${campaignData.tone === tone ? 'bg-[#E8FCF3] text-[#0EB869] border-[#0EB869]' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                                      >
                                          {tone}
                                      </button>
                                  ))}
                              </div>
                          </div>

                          {/* Platform */}
                          <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Deploy To Platform</label>
                              <select 
                                  value={campaignData.platform}
                                  onChange={(e) => setCampaignData({...campaignData, platform: e.target.value})}
                                  className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#0EB869]"
                              >
                                  <option value="Mailchimp">Mailchimp</option>
                                  <option value="Klaviyo">Klaviyo</option>
                                  <option value="ActiveCampaign">ActiveCampaign</option>
                                  <option value="ConvertKit">ConvertKit</option>
                              </select>
                          </div>

                          <button 
                              onClick={handleGenerateAI}
                              disabled={isGenerating || !campaignData.topic}
                              className={`w-full py-3 rounded-lg text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all mt-2
                                  ${isGenerating || !campaignData.topic ? 'bg-slate-300 cursor-not-allowed' : 'bg-[#0EB869] hover:bg-[#0B9655]'}`}
                          >
                              {isGenerating ? (
                                  <><Loader2 size={16} className="animate-spin" /> Writing Draft...</>
                              ) : (
                                  <><Sparkles size={16} /> Generate with AI</>
                              )}
                          </button>
                      </div>
                  </div>
              </div>

              {/* Right Panel: Editor & Preview */}
              <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
                  
                  {/* Editor Header */}
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                      <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Live Editor</span>
                          {campaignData.subject && <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded font-bold">Draft Generated</span>}
                      </div>
                      <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-slate-200 rounded text-slate-500" title="Preview Mobile">
                              <Smartphone size={16} />
                          </button>
                          <button className="p-2 hover:bg-slate-200 rounded text-slate-500" title="Preview Desktop">
                              <Monitor size={16} />
                          </button>
                      </div>
                  </div>

                  {/* Editor Body */}
                  <div className="flex-1 p-6 overflow-y-auto space-y-6">
                      
                      {/* Subject Line */}
                      <div>
                          <label className="block text-xs font-bold text-slate-700 mb-2">Subject Line</label>
                          <input 
                              type="text" 
                              value={campaignData.subject}
                              onChange={(e) => setCampaignData({...campaignData, subject: e.target.value})}
                              placeholder="Waiting for AI generation..."
                              className="w-full p-3 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:border-[#0EB869]"
                          />
                      </div>

                      {/* Email Body */}
                      <div className="flex-1">
                          <label className="block text-xs font-bold text-slate-700 mb-2">Email Content</label>
                          <textarea 
                              value={campaignData.body}
                              onChange={(e) => setCampaignData({...campaignData, body: e.target.value})}
                              placeholder="AI will generate the body copy here..."
                              className="w-full p-4 border border-slate-200 rounded-lg text-sm text-slate-800 leading-relaxed focus:outline-none focus:border-[#0EB869] h-[400px] resize-none font-mono"
                          />
                      </div>
                  </div>

                  {/* Deployment Footer */}
                  <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Globe size={14} />
                          Targeting: <span className="font-bold text-slate-700">{campaignData.platform}</span>
                      </div>
                      
                      <div className="flex gap-3">
                          <button className="px-4 py-2 border border-slate-200 bg-white text-slate-600 text-sm font-bold rounded-lg hover:bg-slate-50 transition-colors">
                              Send Test Email
                          </button>
                          
                          {deploySuccess ? (
                              <button className="px-6 py-2 bg-green-500 text-white text-sm font-bold rounded-lg flex items-center gap-2 cursor-default">
                                  <CheckCircle2 size={16} /> Deployed Successfully!
                              </button>
                          ) : (
                              <button 
                                  onClick={handleDeploy}
                                  disabled={isDeploying || !campaignData.body}
                                  className={`px-6 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg flex items-center gap-2 transition-all 
                                      ${isDeploying || !campaignData.body ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-800'}`}
                              >
                                  {isDeploying ? (
                                      <><Loader2 size={16} className="animate-spin" /> Deploying...</>
                                  ) : (
                                      <><Send size={16} /> Deploy Campaign</>
                                  )}
                              </button>
                          )}
                      </div>
                  </div>

              </div>
          </div>
      )}

    </div>
  );
};