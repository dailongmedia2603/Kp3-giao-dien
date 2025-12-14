import React, { useState, useEffect } from 'react';
import { 
  Home, 
  ChevronRight, 
  Target, 
  ShoppingCart, 
  MessageSquare, 
  Sparkles, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Facebook, 
  Youtube, 
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Rocket,
  Users,
  Globe
} from 'lucide-react';

// Custom TikTok Icon
const TikTokIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// --- Mock Data ---
const MOCK_METRICS = {
  totalSpend: { value: 12450, trend: 15.2 },
  cpl: { value: 4.82, trend: -8.5 },
  roas: { value: 4.2, trend: 0.3 },
};

const MOCK_CREATIVES = [
  { id: 'c1', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop', status: 'High Potential', score: 92 },
  { id: 'c2', image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a53?q=80&w=800&auto=format&fit=crop', status: 'Performing Well', score: 85 },
  { id: 'c3', image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=800&auto=format&fit=crop', status: 'Fatigue Warning', score: 45 },
  { id: 'c4', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop', status: 'New', score: null },
];

// --- Sub-Components ---

const MetricCard = ({ title, value, trend, icon: Icon, prefix = '', suffix = '' }: { title: string, value: number, trend: number, icon: React.ElementType, prefix?: string, suffix?: string }) => {
  const isPositive = trend >= 0;
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">{title}</h3>
        <Icon size={20} className="text-slate-400" />
      </div>
      <p className="text-4xl font-bold text-slate-900">{prefix}{value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{suffix}</p>
      <div className={`flex items-center gap-1 text-sm font-bold mt-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        <span>{Math.abs(trend)}% vs last week</span>
      </div>
    </div>
  );
};

const GoalCard = ({ title, icon: Icon, isSelected, onClick }: { title: string, icon: React.ElementType, isSelected: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`p-6 rounded-xl border-2 text-left transition-all duration-200 w-full h-full flex flex-col
      ${isSelected ? 'bg-blue-50 border-blue-500 shadow-lg scale-105' : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'}
    `}
  >
    <Icon size={24} className={`mb-3 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
    <h4 className="font-bold text-slate-900">{title}</h4>
  </button>
);

const CreativeCard = ({ image, status, score, isSelected, onClick }: { image: string, status: string, score: number | null, isSelected: boolean, onClick: () => void }) => {
  const getStatusColor = () => {
    if (status === 'High Potential') return 'bg-green-100 text-green-800 border-green-200';
    if (status === 'Performing Well') return 'bg-blue-100 text-blue-800 border-blue-200';
    if (status === 'Fatigue Warning') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-slate-100 text-slate-800 border-slate-200';
  };

  return (
    <div
      onClick={onClick}
      className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-4 transition-all duration-200
        ${isSelected ? 'border-blue-500 shadow-2xl scale-105' : 'border-transparent hover:shadow-lg'}
      `}
    >
      <img src={image} alt="Ad Creative" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-[10px] font-bold border ${getStatusColor()}`}>
        {status}
      </div>
      {score && (
        <div className="absolute bottom-2 right-2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-xs font-bold text-slate-900 border border-white/50">
          {score}
        </div>
      )}
    </div>
  );
};

const ChannelToggle = ({ icon: Icon, label, isEnabled, onToggle }: { icon: React.ElementType, label: string, isEnabled: boolean, onToggle: () => void }) => (
  <button
    onClick={onToggle}
    className={`flex items-center justify-between p-3 rounded-lg border transition-all w-full
      ${isEnabled ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}
    `}
  >
    <div className="flex items-center gap-2">
      <Icon size={18} />
      <span className="text-sm font-bold">{label}</span>
    </div>
    <div className={`w-10 h-5 rounded-full p-1 transition-colors ${isEnabled ? 'bg-blue-500' : 'bg-slate-300'}`}>
      <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${isEnabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
    </div>
  </button>
);

// --- Main Component ---
export const UnifiedAdsManagerPage: React.FC = () => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedCreativeId, setSelectedCreativeId] = useState<string | null>(null);
  const [budget, setBudget] = useState(50);
  const [audience, setAudience] = useState<'broad' | 'niche'>('broad');
  const [channels, setChannels] = useState({ facebook: true, google: false, tiktok: false });
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchSuccess, setLaunchSuccess] = useState(false);

  const handleLaunch = () => {
    setIsLaunching(true);
    setLaunchSuccess(false);
    setTimeout(() => {
      setIsLaunching(false);
      setLaunchSuccess(true);
      setTimeout(() => setLaunchSuccess(false), 4000);
    }, 2000);
  };

  const isLaunchReady = selectedGoal && selectedCreativeId;

  return (
    <div className="p-8 max-w-[1600px] mx-auto font-sans h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col items-center mb-8 text-center shrink-0">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold">
            Unified Ads Manager
          </span>
        </div>
        <h1 className="text-[26px] font-bold text-slate-900 mb-3 tracking-tight">
          Unified Ads Launcher
        </h1>
        <p className="text-slate-500 text-[13px] leading-relaxed mb-8 max-w-2xl mx-auto">
          Launch multi-channel campaigns in 3 clicks. Let AI handle the optimization.
        </p>
      </div>

      {/* Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <MetricCard title="Total Spend" value={MOCK_METRICS.totalSpend.value} trend={MOCK_METRICS.totalSpend.trend} icon={DollarSign} prefix="$" />
        <MetricCard title="Cost Per Lead" value={MOCK_METRICS.cpl.value} trend={MOCK_METRICS.cpl.trend} icon={Users} prefix="$" />
        <MetricCard title="ROAS" value={MOCK_METRICS.roas.value} trend={MOCK_METRICS.roas.trend} icon={Sparkles} suffix="x" />
      </div>

      {/* The 3-Click Launcher */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Step 1: Goal */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">1</div>
            <h3 className="font-bold text-slate-900 text-lg">Choose Your Goal</h3>
          </div>
          <div className="grid grid-rows-3 gap-4 flex-1">
            <GoalCard title="Generate Leads" icon={Target} isSelected={selectedGoal === 'leads'} onClick={() => setSelectedGoal('leads')} />
            <GoalCard title="Drive Sales" icon={ShoppingCart} isSelected={selectedGoal === 'sales'} onClick={() => setSelectedGoal('sales')} />
            <GoalCard title="Get Messages" icon={MessageSquare} isSelected={selectedGoal === 'messages'} onClick={() => setSelectedGoal('messages')} />
          </div>
        </div>

        {/* Step 2: Content */}
        <div className={`flex flex-col transition-opacity duration-500 ${selectedGoal ? 'opacity-100' : 'opacity-40 grayscale pointer-events-none'}`}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">2</div>
            <h3 className="font-bold text-slate-900 text-lg">Select Creative</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {MOCK_CREATIVES.map(c => (
              <CreativeCard 
                key={c.id}
                image={c.image}
                status={c.status}
                score={c.score}
                isSelected={selectedCreativeId === c.id}
                onClick={() => setSelectedCreativeId(c.id)}
              />
            ))}
          </div>
          <button className="w-full py-3 bg-slate-100 text-slate-700 font-bold text-sm rounded-lg border border-slate-200 hover:bg-slate-200 flex items-center justify-center gap-2">
            <Sparkles size={16} /> Generate with AI
          </button>
        </div>

        {/* Step 3: Launch */}
        <div className={`flex flex-col transition-opacity duration-500 ${isLaunchReady ? 'opacity-100' : 'opacity-40 grayscale pointer-events-none'}`}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">3</div>
            <h3 className="font-bold text-slate-900 text-lg">Configure & Launch</h3>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-6 flex-1 flex flex-col">
            {/* Budget */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Daily Budget</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <input 
                  type="number" 
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg font-bold text-lg"
                />
              </div>
            </div>
            {/* Audience */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Audience</label>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setAudience('broad')} className={`py-2 rounded-lg text-sm font-bold border ${audience === 'broad' ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-white'}`}>Broad</button>
                <button onClick={() => setAudience('niche')} className={`py-2 rounded-lg text-sm font-bold border ${audience === 'niche' ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-white'}`}>Niche</button>
              </div>
            </div>
            {/* Channels */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Channels</label>
              <div className="space-y-2">
                <ChannelToggle icon={Facebook} label="Facebook / IG" isEnabled={channels.facebook} onToggle={() => setChannels(c => ({...c, facebook: !c.facebook}))} />
                <ChannelToggle icon={Youtube} label="Google / YouTube" isEnabled={channels.google} onToggle={() => setChannels(c => ({...c, google: !c.google}))} />
                <ChannelToggle icon={TikTokIcon} label="TikTok" isEnabled={channels.tiktok} onToggle={() => setChannels(c => ({...c, tiktok: !c.tiktok}))} />
              </div>
            </div>
            {/* Launch Button */}
            <div className="mt-auto">
              <button
                onClick={handleLaunch}
                disabled={isLaunching || launchSuccess}
                className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg flex items-center justify-center gap-3 transition-all duration-300
                  ${launchSuccess ? 'bg-green-500' : 
                    isLaunching ? 'bg-slate-400' : 
                    'bg-blue-600 hover:bg-blue-700 transform hover:-translate-y-0.5'}
                `}
              >
                {isLaunching ? <Loader2 size={24} className="animate-spin" /> : 
                 launchSuccess ? <CheckCircle2 size={24} /> : 
                 <Rocket size={24} />}
                {isLaunching ? 'Launching...' : launchSuccess ? 'Campaign Live!' : 'Launch Campaign'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};