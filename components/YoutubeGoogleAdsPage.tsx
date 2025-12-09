import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Youtube, 
  Search, 
  TrendingUp, 
  DollarSign, 
  Target, 
  MousePointerClick,
  Trash2,
  Ban,
  Filter,
  Play,
  Smartphone,
  Crown,
  Eye,
  BarChart3,
  Video,
  AlertOctagon,
  CheckCircle2,
  LayoutGrid,
  List
} from 'lucide-react';

// --- Mock Data ---
const CAMPAIGNS = [
  {
    id: 1,
    name: "Cold Traffic - Scale",
    thumbnail: "https://images.unsplash.com/photo-1598550874175-4d7112ee750c?q=80&w=600&auto=format&fit=crop",
    viewRate: "42%",
    cpv: "$0.04",
    cpa: "$12.50",
    status: "active"
  },
  {
    id: 2,
    name: "Retargeting - Webinar",
    thumbnail: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600&auto=format&fit=crop",
    viewRate: "55%",
    cpv: "$0.08",
    cpa: "$8.20",
    status: "active"
  },
  {
    id: 3,
    name: "Test Creative V4",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
    viewRate: "28%",
    cpv: "$0.03",
    cpa: "$24.00",
    status: "learning"
  }
];

const PLACEMENTS = [
  { id: 1, name: "Toys Review HQ", type: "Kids", impressions: 14000, cost: "$120", conversion: 0 },
  { id: 2, name: "Marketing Mastery", type: "Business", impressions: 5000, cost: "$80", conversion: 12 },
  { id: 3, name: "Cocomelon Nursery Rhymes", type: "Kids", impressions: 25000, cost: "$210", conversion: 0 },
  { id: 4, name: "Tech Talk Daily", type: "Tech", impressions: 3200, cost: "$45", conversion: 5 },
  { id: 5, name: "Relaxing Rain Sounds", type: "Music/Sleep", impressions: 8000, cost: "$50", conversion: 0 },
];

const AB_TEST_DATA = {
  variantA: {
    id: 'A',
    thumbnail: "https://images.unsplash.com/photo-1576267423048-15c0040fec78?q=80&w=600&auto=format&fit=crop",
    headline: "Stop Wasting Ad Spend",
    hookRate: 35, // %,
    clickRate: 1.2,
    cpa: 24.50,
    isWinner: false
  },
  variantB: {
    id: 'B',
    thumbnail: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=600&auto=format&fit=crop",
    headline: "The 3-Step Funnel Fix",
    hookRate: 52, // %,
    clickRate: 2.8,
    cpa: 14.20,
    isWinner: true
  }
};

export const YoutubeGoogleAdsPage: React.FC = () => {
  const [mode, setMode] = useState<'search' | 'youtube'>('youtube');
  const [activeTab, setActiveTab] = useState<'campaigns' | 'placements' | 'creative' | 'builder'>('campaigns');
  const [kidKillerActive, setKidKillerActive] = useState(false);
  
  // Ad Builder State
  const [adForm, setAdForm] = useState({
    videoUrl: 'https://youtube.com/watch?v=example',
    headline: 'Free Training: How to Scale',
    cta: 'Watch Now',
    desc: 'Stop guessing. Start scaling. Click below to see the framework.'
  });

  return (
    <div className="p-8 max-w-[1600px] mx-auto font-sans h-full flex flex-col">
      
      {/* Header & Toggle */}
      <div className="flex flex-col items-center mb-8 text-center shrink-0">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold">
            Traffic Command Center
          </span>
        </div>

        {/* The Switch */}
        <div className="bg-slate-100 p-1.5 rounded-full flex gap-1 mb-8 shadow-inner border border-slate-200">
            <button 
                onClick={() => setMode('search')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${mode === 'search' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <Search size={16} /> Search Ads
            </button>
            <button 
                onClick={() => setMode('youtube')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${mode === 'youtube' ? 'bg-red-600 text-white shadow-md shadow-red-200' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <Youtube size={18} fill={mode === 'youtube' ? "currentColor" : "none"} /> YouTube Ads
            </button>
        </div>

        {/* ROI Cockpit (Shared DNA) */}
        <div className="grid grid-cols-4 gap-4 w-full max-w-5xl mb-10">
            <MetricCard label="Total Spend" value="$12,450" change="+12%" icon={DollarSign} color="text-slate-900" />
            <MetricCard label="Conversions" value="482" change="+5%" icon={Target} color="text-slate-900" />
            <MetricCard label="Avg. CPA" value="$25.80" change="-8%" icon={TrendingUp} color="text-[#0EB869]" highlight />
            <MetricCard label="ROAS" value="3.42x" change="+0.2" icon={BarChart3} color="text-[#0EB869]" highlight />
        </div>
      </div>

      {/* --- YOUTUBE MODE CONTENT --- */}
      {mode === 'youtube' && (
        <div className="flex-1 flex flex-col min-h-0 animate-in fade-in duration-300">
            
            {/* YouTube Navigation Tabs */}
            <div className="flex border-b border-slate-200 mb-6">
                <TabItem active={activeTab === 'campaigns'} onClick={() => setActiveTab('campaigns')} icon={LayoutGrid} label="Visual Campaigns" />
                <TabItem active={activeTab === 'placements'} onClick={() => setActiveTab('placements')} icon={List} label="Placement Cleaner" />
                <TabItem active={activeTab === 'creative'} onClick={() => setActiveTab('creative')} icon={Eye} label="Creative Hook Meter" />
                <TabItem active={activeTab === 'builder'} onClick={() => setActiveTab('builder')} icon={Video} label="Ad Builder" />
            </div>

            {/* TAB 1: Visual Campaigns */}
            {activeTab === 'campaigns' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CAMPAIGNS.map(camp => (
                        <div key={camp.id} className="group relative aspect-video rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer border border-slate-200">
                            {/* Thumbnail Hero */}
                            <img src={camp.thumbnail} alt={camp.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                            {/* Metrics Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                                <div className="flex justify-between items-end mb-2">
                                    <h3 className="font-bold text-lg leading-tight">{camp.name}</h3>
                                    <span className="bg-[#0EB869] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Active</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-xs border-t border-white/20 pt-3">
                                    <div>
                                        <div className="text-white/60 mb-0.5">View Rate</div>
                                        <div className="font-bold text-sm">{camp.viewRate}</div>
                                    </div>
                                    <div>
                                        <div className="text-white/60 mb-0.5">CPV</div>
                                        <div className="font-bold text-sm">{camp.cpv}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-white/60 mb-0.5">CPA</div>
                                        <div className="font-bold text-sm text-[#86EFAC]">{camp.cpa}</div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Play Button Overlay */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Play size={20} className="text-white fill-white ml-1" />
                            </div>
                        </div>
                    ))}
                    
                    {/* Add New Placeholder */}
                    <div 
                        onClick={() => setActiveTab('builder')}
                        className="aspect-video rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:border-red-400 hover:text-red-500 hover:bg-red-50/50 transition-all cursor-pointer"
                    >
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                            <Video size={24} />
                        </div>
                        <span className="font-bold text-sm">Launch New Campaign</span>
                    </div>
                </div>
            )}

            {/* TAB 2: Placement Cleaner */}
            {activeTab === 'placements' && (
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
                    {/* Toolbar */}
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <div className="flex items-center gap-3">
                            <h3 className="font-bold text-slate-900">Where Ads Showed</h3>
                            <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">142 Channels</span>
                        </div>
                        
                        <div className="flex gap-3">
                            <button 
                                onClick={() => setKidKillerActive(!kidKillerActive)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold border transition-all
                                    ${kidKillerActive 
                                        ? 'bg-red-100 text-red-700 border-red-200 shadow-inner' 
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-red-300 hover:text-red-600'}
                                `}
                            >
                                <AlertOctagon size={16} />
                                Kid Killer Mode: {kidKillerActive ? 'ON' : 'OFF'}
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800">
                                <Ban size={16} /> Exclude Selected
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="flex-1 overflow-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
                                <tr>
                                    <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase w-10"><input type="checkbox" /></th>
                                    <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Channel Name</th>
                                    <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Category</th>
                                    <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Impressions</th>
                                    <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Spend</th>
                                    <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {PLACEMENTS.map(place => {
                                    const isBad = place.type === 'Kids' || place.type === 'Music/Sleep';
                                    const highlight = kidKillerActive && isBad;
                                    
                                    return (
                                        <tr key={place.id} className={`hover:bg-slate-50 transition-colors ${highlight ? 'bg-red-50 hover:bg-red-100' : ''}`}>
                                            <td className="px-6 py-3"><input type="checkbox" checked={highlight} /></td>
                                            <td className="px-6 py-3">
                                                <div className="font-bold text-slate-900">{place.name}</div>
                                            </td>
                                            <td className="px-6 py-3">
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase
                                                    ${isBad ? 'bg-red-100 text-red-600 border-red-200' : 'bg-slate-100 text-slate-500 border-slate-200'}
                                                `}>
                                                    {place.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3 text-slate-600">{place.impressions.toLocaleString()}</td>
                                            <td className="px-6 py-3 text-slate-600">{place.cost}</td>
                                            <td className="px-6 py-3 text-right">
                                                <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* TAB 3: Creative Performance (Hook Meter) */}
            {activeTab === 'creative' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* A/B Comparison */}
                    {[AB_TEST_DATA.variantA, AB_TEST_DATA.variantB].map((variant, idx) => (
                        <div key={idx} className={`bg-white rounded-xl border-2 ${variant.isWinner ? 'border-amber-300 shadow-lg ring-1 ring-amber-100' : 'border-slate-200'} overflow-hidden relative`}>
                            
                            {variant.isWinner && (
                                <div className="absolute top-0 right-0 bg-amber-400 text-white px-4 py-1.5 rounded-bl-xl font-bold text-xs flex items-center gap-2 z-10 shadow-sm">
                                    <Crown size={14} fill="currentColor" /> WINNER
                                </div>
                            )}

                            <div className="p-5 border-b border-slate-100 flex items-start gap-4">
                                <div className="w-24 aspect-video rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                                    <img src={variant.thumbnail} className="w-full h-full object-cover" alt="thumb" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase mb-1">Variant {variant.id}</div>
                                    <h3 className="font-bold text-slate-900 text-lg leading-tight">"{variant.headline}"</h3>
                                </div>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* The Funnel Bar */}
                                <div>
                                    <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                                        <span>Hook Rate (3s)</span>
                                        <span className={variant.isWinner ? 'text-green-600' : ''}>{variant.hookRate}%</span>
                                    </div>
                                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full ${variant.isWinner ? 'bg-indigo-500' : 'bg-slate-400'}`} style={{ width: `${variant.hookRate}%` }}></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                                        <span>Click Rate (CTR)</span>
                                        <span className={variant.isWinner ? 'text-green-600' : ''}>{variant.clickRate}%</span>
                                    </div>
                                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full ${variant.isWinner ? 'bg-[#0EB869]' : 'bg-slate-400'}`} style={{ width: `${variant.clickRate * 10}%` }}></div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                                    <span className="text-xs font-medium text-slate-500">Cost Per Acquisition</span>
                                    <span className={`text-xl font-bold ${variant.isWinner ? 'text-[#0EB869]' : 'text-slate-900'}`}>
                                        ${variant.cpa.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* TAB 4: Ad Builder */}
            {activeTab === 'builder' && (
                <div className="flex flex-col lg:flex-row gap-8 h-full">
                    
                    {/* Left: Input Form */}
                    <div className="flex-1 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Video size={18} className="text-red-600" />
                            YouTube Ad Configuration
                        </h3>
                        
                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-2">YouTube Video URL</label>
                                <div className="relative">
                                    <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input 
                                        type="text" 
                                        value={adForm.videoUrl}
                                        onChange={(e) => setAdForm({...adForm, videoUrl: e.target.value})}
                                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-red-500"
                                        placeholder="https://youtube.com/..."
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-2">Headline (15 chars)</label>
                                <input 
                                    type="text" 
                                    value={adForm.headline}
                                    onChange={(e) => setAdForm({...adForm, headline: e.target.value})}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-red-500 font-bold"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-2">Description</label>
                                <textarea 
                                    value={adForm.desc}
                                    onChange={(e) => setAdForm({...adForm, desc: e.target.value})}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-red-500 h-24 resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-2">Call To Action Button</label>
                                <select 
                                    value={adForm.cta}
                                    onChange={(e) => setAdForm({...adForm, cta: e.target.value})}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-red-500 bg-white"
                                >
                                    <option>Watch Now</option>
                                    <option>Learn More</option>
                                    <option>Sign Up</option>
                                    <option>Download</option>
                                </select>
                            </div>

                            <button className="w-full py-3 bg-red-600 text-white font-bold text-sm rounded-lg hover:bg-red-700 shadow-sm mt-4">
                                Save Creative to Library
                            </button>
                        </div>
                    </div>

                    {/* Right: Mobile Preview */}
                    <div className="w-full lg:w-[400px] flex items-center justify-center bg-slate-50 rounded-xl border border-slate-200 p-8">
                        <div className="w-[300px] bg-black rounded-[2rem] border-8 border-slate-800 overflow-hidden shadow-2xl relative aspect-[9/19]">
                            {/* Status Bar */}
                            <div className="h-6 w-full bg-black flex justify-between items-center px-4">
                                <span className="text-[10px] text-white font-bold">9:41</span>
                                <div className="flex gap-1">
                                    <div className="w-3 h-3 bg-white rounded-full opacity-20"></div>
                                    <div className="w-3 h-3 bg-white rounded-full opacity-20"></div>
                                </div>
                            </div>

                            {/* Video Area (Simulated) */}
                            <div className="h-[30%] bg-slate-900 relative group cursor-pointer">
                                <img 
                                    src="https://images.unsplash.com/photo-1598550874175-4d7112ee750c?q=80&w=600&auto=format&fit=crop" 
                                    alt="preview" 
                                    className="w-full h-full object-cover opacity-80"
                                />
                                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-1 rounded">0:15</div>
                                <div className="absolute bottom-2 left-2 bg-yellow-400 text-black text-[10px] font-bold px-1 rounded-sm">Ad</div>
                            </div>

                            {/* In-Feed Content */}
                            <div className="bg-[#1e1e1e] h-full p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex gap-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">A</div>
                                        <div>
                                            <div className="text-white text-xs font-bold">AgencyScale</div>
                                            <div className="text-white/50 text-[10px]">Sponsored</div>
                                        </div>
                                    </div>
                                    <MoreHorizontal className="text-white/50" size={16} />
                                </div>
                                
                                <div className="text-white font-bold text-sm mb-1">{adForm.headline}</div>
                                <div className="text-white/70 text-xs mb-4 line-clamp-2">{adForm.desc}</div>

                                {/* CTA Button */}
                                <div className="bg-[#3EA6FF] text-black text-center py-2 rounded font-bold text-sm cursor-pointer hover:bg-[#65b8ff]">
                                    {adForm.cta}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )}

        </div>
      )}

      {/* --- SEARCH MODE PLACEHOLDER --- */}
      {mode === 'search' && (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 animate-in fade-in">
              <Search size={64} className="mb-4 opacity-20" />
              <h2 className="text-xl font-bold text-slate-600 mb-2">Search Ads Dashboard</h2>
              <p className="max-w-md text-center text-sm">Switch to YouTube mode to access the Visual Command Center, Placement Cleaner, and Creative Hook Meter.</p>
          </div>
      )}

    </div>
  );
};

// --- Sub-components ---

const MetricCard = ({ label, value, change, icon: Icon, color, highlight }: { label: string, value: string, change: string, icon: any, color: string, highlight?: boolean }) => (
    <div className={`p-4 rounded-xl border shadow-sm flex flex-col justify-between h-28 ${highlight ? 'bg-white border-[#86EFAC]' : 'bg-white border-slate-200'}`}>
        <div className="flex justify-between items-start">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">{label}</span>
            <div className={`p-1.5 rounded-lg ${highlight ? 'bg-[#E8FCF3] text-[#0EB869]' : 'bg-slate-100 text-slate-400'}`}>
                <Icon size={16} />
            </div>
        </div>
        <div>
            <div className={`text-2xl font-black ${color}`}>{value}</div>
            <div className={`text-xs font-bold mt-1 ${change.includes('+') ? 'text-[#0EB869]' : 'text-red-500'}`}>{change} vs last mo.</div>
        </div>
    </div>
);

const TabItem = ({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) => (
    <button 
        onClick={onClick}
        className={`flex items-center gap-2 px-6 py-4 border-b-2 text-sm font-bold transition-all ${active ? 'border-red-600 text-red-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
    >
        <Icon size={18} />
        {label}
    </button>
);

const MoreHorizontal = ({ size, className }: { size: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
);
