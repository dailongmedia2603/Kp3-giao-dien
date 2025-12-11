import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Target, 
  Search, 
  BarChart, 
  Users, 
  TrendingUp, 
  DollarSign,
  Frown,
  Lightbulb,
  Key,
  AlertTriangle
} from 'lucide-react';

// --- MOCK DATA for a searched niche ---
const MOCK_NICHE_DATA = {
  niche: 'AI Copywriting for Coaches',
  opportunityScore: 88,
  searchVolume: '1.2M/mo',
  competition: 'Medium',
  growth: '+25% YoY',
  monetizationPotential: 'High',
  painPoints: [
    "Writer's block when creating content.",
    "Spending too much time on marketing copy.",
    "Struggling to convert leads with emails.",
    "Inconsistent brand voice across platforms.",
  ],
  existingSolutions: [
    "Hiring expensive copywriters.",
    "Using generic AI tools like ChatGPT.",
    "Buying pre-made content templates.",
  ],
  topKeywords: [
    { keyword: 'ai for coaches', volume: '45k' },
    { keyword: 'copywriting for life coaches', volume: '22k' },
    { keyword: 'ai email marketing', volume: '18k' },
    { keyword: 'social media content generator', volume: '15k' },
  ],
};

// --- Sub-Components ---

const StatCard: React.FC<{ icon: React.ElementType, title: string, value: string, color: string }> = ({ icon: Icon, title, value, color }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
    <div className="flex items-center gap-3 mb-2">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${color}-50 text-${color}-600`}>
        <Icon size={18} />
      </div>
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</h3>
    </div>
    <p className={`text-2xl font-bold text-slate-800`}>{value}</p>
  </div>
);

const CompetitionBadge: React.FC<{ level: 'Low' | 'Medium' | 'High' }> = ({ level }) => {
  const styles = {
    Low: 'bg-green-100 text-green-700',
    Medium: 'bg-amber-100 text-amber-700',
    High: 'bg-red-100 text-red-700',
  };
  return <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[level]}`}>{level}</span>;
};

// --- Main Component ---
export const HungryMarketPage: React.FC = () => {
  const [niche, setNiche] = useState('AI Copywriting for Coaches');
  const [data, setData] = useState<typeof MOCK_NICHE_DATA | null>(MOCK_NICHE_DATA);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (!niche) return;
    setIsLoading(true);
    setTimeout(() => {
      setData(MOCK_NICHE_DATA);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold">
            Hungry Market
          </span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight flex items-center gap-3">
          Market Research Engine <Target className="text-[#0EB869]" />
        </h1>
        <p className="text-slate-500 text-[15px] leading-relaxed mb-8 max-w-2xl mx-auto">
          Validate your ideas. Find profitable niches and uncover the exact pain points of your dream customers.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="relative">
          <input 
            type="text" 
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Enter a niche, keyword, or problem..." 
            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:outline-none focus:ring-4 focus:ring-[#0EB869]/20 focus:border-[#0EB869] text-lg text-center font-medium text-slate-700 placeholder:text-slate-400 shadow-sm"
          />
          <button 
            onClick={handleSearch}
            disabled={isLoading}
            className="absolute right-3 top-3 bottom-3 px-6 bg-[#0EB869] text-white rounded-lg font-bold hover:bg-[#0B9655] transition-colors disabled:bg-slate-300"
          >
            {isLoading ? 'Analyzing...' : 'Search'}
          </button>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
        </div>
      </div>

      {/* Results Dashboard */}
      {data && (
        <div className="animate-in fade-in duration-500 space-y-8">
          {/* Top Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={BarChart} title="Search Volume" value={data.searchVolume} color="blue" />
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Competition</h3>
              <CompetitionBadge level={data.competition as any} />
            </div>
            <StatCard icon={TrendingUp} title="12-Month Growth" value={data.growth} color="green" />
            <StatCard icon={DollarSign} title="Monetization" value={data.monetizationPotential} color="purple" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Score & Keywords */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col items-center">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Opportunity Score</h3>
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#F1F5F9" strokeWidth="3" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#0EB869" strokeWidth="3" strokeDasharray={`${data.opportunityScore}, 100`} strokeLinecap="round" />
                  </svg>
                  <span className="absolute text-3xl font-bold text-slate-900">{data.opportunityScore}</span>
                </div>
                <p className="text-xs text-slate-500 mt-3 text-center">A high score indicates strong demand with manageable competition.</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Key size={16} className="text-slate-400" /> Top Keywords</h3>
                <div className="space-y-2">
                  {data.topKeywords.map(kw => (
                    <div key={kw.keyword} className="flex justify-between items-center p-2 bg-slate-50 rounded-md text-sm">
                      <span className="text-slate-700">{kw.keyword}</span>
                      <span className="font-bold text-slate-500">{kw.volume}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Pain Points & Solutions */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Frown size={16} className="text-red-500" /> Customer Pain Points</h3>
                <ul className="space-y-3">
                  {data.painPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 shrink-0"></div>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Lightbulb size={16} className="text-blue-500" /> Existing Solutions & Gaps</h3>
                <ul className="space-y-4">
                  {data.existingSolutions.map((solution, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 shrink-0"></div>
                      <div>
                        <span className="font-semibold">{solution}</span>
                        <div className="text-xs text-slate-500 mt-1 p-2 bg-amber-50 border-l-2 border-amber-400 rounded-r-md">
                          <span className="font-bold">Gap:</span> The current solutions are often too expensive or generic.
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};