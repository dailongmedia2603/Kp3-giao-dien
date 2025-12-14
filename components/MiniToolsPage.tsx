import React, { useState, useEffect } from 'react';
import { 
  Home, 
  ChevronRight, 
  Search, 
  Wrench,
  Link,
  Calculator,
  Type,
  Palette,
  QrCode,
  FileText,
  Mail,
  ExternalLink,
  ArrowLeft,
  DollarSign,
  TrendingUp,
  Activity,
  BarChart3,
  RefreshCw,
  Film,
  CreditCard,
  User,
  Monitor
} from 'lucide-react';
import { WebinarPage } from './WebinarPage';

// --- ROI Calculator Component ---
const ROICalculatorTool: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  // State for inputs
  const [inputs, setInputs] = useState({
    cpc: 1.50,
    ctr: 1.0,
    adSpend: 4000,
    hvcoCvr: 15, // Landing Page Conversion Rate
    bookedCallCvr: 5, // Lead to Booked Call Rate
    showRate: 70, // Call Show Rate
    closeRate: 20, // Call Close Rate
    ltv: 3000, // Lifetime Value
    mgmtFee: 2000 // Monthly Agency/Management Fee
  });

  // State for calculated results
  const [results, setResults] = useState({
    impressions: 0,
    cpm: 0,
    clicks: 0,
    leads: 0,
    cpl: 0, // Cost Per Lead
    bookedCalls: 0,
    bookedCallCpl: 0,
    heldCalls: 0,
    heldCallCpl: 0,
    sales: 0,
    revenue: 0,
    totalCost: 0,
    profit: 0,
    cpa: 0, // Cost Per Acquisition (Sale)
    roas: 0
  });

  // Calculation Logic
  useEffect(() => {
    // 1. Traffic
    const clicks = inputs.cpc > 0 ? inputs.adSpend / inputs.cpc : 0;
    const impressions = inputs.ctr > 0 ? (clicks / (inputs.ctr / 100)) : 0;
    const cpm = impressions > 0 ? (inputs.adSpend / impressions) * 1000 : 0;

    // 2. Leads (HVCO)
    const leads = clicks * (inputs.hvcoCvr / 100);
    const cpl = leads > 0 ? inputs.adSpend / leads : 0;

    // 3. Appointments
    const bookedCalls = leads * (inputs.bookedCallCvr / 100);
    const bookedCallCpl = bookedCalls > 0 ? inputs.adSpend / bookedCalls : 0;

    const heldCalls = bookedCalls * (inputs.showRate / 100);
    const heldCallCpl = heldCalls > 0 ? inputs.adSpend / heldCalls : 0;

    // 4. Sales & Finance
    const sales = heldCalls * (inputs.closeRate / 100);
    const revenue = sales * inputs.ltv;
    
    const totalCost = inputs.adSpend + inputs.mgmtFee;
    const profit = revenue - totalCost;
    const cpa = sales > 0 ? totalCost / sales : 0; // CPA typically includes total cost to acquire
    const roas = totalCost > 0 ? revenue / totalCost : 0;

    setResults({
      impressions,
      cpm,
      clicks,
      leads,
      cpl,
      bookedCalls,
      bookedCallCpl,
      heldCalls,
      heldCallCpl,
      sales,
      revenue,
      totalCost,
      profit,
      cpa,
      roas
    });
  }, [inputs]);

  const handleInputChange = (field: keyof typeof inputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };
  
  const formatNumber = (val: number) => {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="animate-in fade-in duration-300">
      {/* Tool Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">ROI Calculator</h2>
          <p className="text-slate-500 text-sm">Service Based Business Funnel Projection</p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        
        {/* Left Column: Inputs */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm p-6 lg:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Activity size={20} className="text-[#16A349]" />
                Campaign Inputs
            </h3>

            <div className="space-y-8">
                {/* Section 1: Traffic */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        <span>Traffic Metrics</span>
                        <div className="h-px bg-slate-100 flex-1"></div>
                    </div>
                    
                    <InputSlider 
                        label="Monthly Ad Spend" 
                        value={inputs.adSpend} 
                        onChange={(v) => handleInputChange('adSpend', v)} 
                        min={500} max={50000} step={100} 
                        prefix="$"
                    />
                    <InputSlider 
                        label="Average CPC (Cost Per Click)" 
                        value={inputs.cpc} 
                        onChange={(v) => handleInputChange('cpc', v)} 
                        min={0.1} max={50} step={0.1} 
                        prefix="$"
                    />
                    <InputSlider 
                        label="CTR (Click Through Rate)" 
                        value={inputs.ctr} 
                        onChange={(v) => handleInputChange('ctr', v)} 
                        min={0.1} max={10} step={0.1} 
                        suffix="%"
                    />
                </div>

                {/* Section 2: Funnel Conversion */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        <span>Funnel Conversion</span>
                        <div className="h-px bg-slate-100 flex-1"></div>
                    </div>

                    <InputSlider 
                        label="Landing Page CVR (Opt-in)" 
                        value={inputs.hvcoCvr} 
                        onChange={(v) => handleInputChange('hvcoCvr', v)} 
                        min={1} max={80} step={0.5} 
                        suffix="%"
                    />
                    <InputSlider 
                        label="Lead to Booked Call CVR" 
                        value={inputs.bookedCallCvr} 
                        onChange={(v) => handleInputChange('bookedCallCvr', v)} 
                        min={1} max={50} step={0.5} 
                        suffix="%"
                    />
                </div>

                {/* Section 3: Sales Performance */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        <span>Sales Performance</span>
                        <div className="h-px bg-slate-100 flex-1"></div>
                    </div>

                    <InputSlider 
                        label="Call Show Rate" 
                        value={inputs.showRate} 
                        onChange={(v) => handleInputChange('showRate', v)} 
                        min={10} max={100} step={1} 
                        suffix="%"
                    />
                    <InputSlider 
                        label="Closing Rate" 
                        value={inputs.closeRate} 
                        onChange={(v) => handleInputChange('closeRate', v)} 
                        min={1} max={100} step={1} 
                        suffix="%"
                    />
                    <InputSlider 
                        label="Customer LTV" 
                        value={inputs.ltv} 
                        onChange={(v) => handleInputChange('ltv', v)} 
                        min={100} max={50000} step={100} 
                        prefix="$"
                    />
                    <InputSlider 
                        label="Monthly Management Fee" 
                        value={inputs.mgmtFee} 
                        onChange={(v) => handleInputChange('mgmtFee', v)} 
                        min={0} max={20000} step={100} 
                        prefix="$"
                    />
                </div>
            </div>
        </div>

        {/* Right Column: Results (Dark Theme) */}
        <div className="w-full xl:w-[400px] shrink-0">
            <div className="bg-slate-900 rounded-xl shadow-xl overflow-hidden text-white sticky top-6">
                
                {/* Header */}
                <div className="p-6 bg-slate-800 border-b border-slate-700">
                    <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                         NGHIAKK <span className="text-[#16A349]">KP3</span>
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed">
                        Based on these numbers, here is what you could expect for return on investment.
                    </p>
                </div>

                {/* Metrics Table */}
                <div className="p-6 space-y-4">
                    
                    {/* Top Funnel */}
                    <ResultRow label="CPM" value={formatCurrency(results.cpm)} />
                    <ResultRow label="Impressions" value={formatNumber(results.impressions)} />
                    <ResultRow label="Link Clicks" value={formatNumber(results.clicks)} />
                    
                    <div className="h-px bg-slate-800 my-2"></div>

                    {/* Middle Funnel */}
                    <ResultRow label="Leads Generated" value={formatNumber(results.leads)} highlight />
                    <ResultRow label="Cost Per Lead (CPL)" value={formatCurrency(results.cpl)} />
                    
                    <ResultRow label="Booked Calls" value={formatNumber(results.bookedCalls)} highlight />
                    <ResultRow label="Cost Per Booked Call" value={formatCurrency(results.bookedCallCpl)} />
                    
                    <ResultRow label="Held Calls (Shows)" value={formatNumber(results.heldCalls)} highlight />
                    <ResultRow label="Cost Per Held Call" value={formatCurrency(results.heldCallCpl)} />

                    <div className="h-px bg-slate-800 my-2"></div>

                    {/* Bottom Funnel / Financials */}
                    <ResultRow label="Sales Closed" value={formatNumber(results.sales)} highlight color="text-[#16A349]" />
                    <ResultRow label="Acquisition Cost (CPA)" value={formatCurrency(results.cpa)} />
                    
                    <div className="mt-6 pt-6 border-t border-slate-700">
                        <div className="flex justify-between items-end mb-2">
                             <span className="text-sm font-medium text-slate-400">Projected Revenue</span>
                             <span className="text-2xl font-bold text-white">{formatCurrency(results.revenue)}</span>
                        </div>
                        <div className="flex justify-between items-end mb-2">
                             <span className="text-sm font-medium text-slate-400">Total Cost (Ad + Mgmt)</span>
                             <span className="text-sm font-medium text-red-400">-{formatCurrency(results.totalCost)}</span>
                        </div>
                         <div className="flex justify-between items-end mb-4">
                             <span className="text-sm font-medium text-slate-400">Net Profit</span>
                             <span className={`text-xl font-bold ${results.profit > 0 ? 'text-[#16A349]' : 'text-red-500'}`}>
                                {formatCurrency(results.profit)}
                             </span>
                        </div>
                        
                        {/* ROAS Badge */}
                        <div className="bg-[#16A349] rounded-lg p-4 text-center">
                            <div className="text-xs font-bold text-white/80 uppercase mb-1">Lifetime ROAS</div>
                            <div className="text-3xl font-bold text-white">{results.roas.toFixed(2)}x</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components for ROI Calculator ---
const InputSlider: React.FC<{
    label: string;
    value: number;
    onChange: (val: number) => void;
    min: number;
    max: number;
    step: number;
    prefix?: string;
    suffix?: string;
}> = ({ label, value, onChange, min, max, step, prefix = '', suffix = '' }) => {
    return (
        <div className="group">
            <div className="flex items-center justify-between mb-3">
                <label className="text-[13px] font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                    {label}
                </label>
                <div className="flex items-center">
                    {prefix && <span className="text-[14px] font-bold text-slate-900 mr-0.5">{prefix}</span>}
                    <input 
                        type="number" 
                        value={value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value))}
                        className="w-20 text-right font-bold text-slate-900 text-[15px] border-b border-transparent hover:border-slate-300 focus:border-[#16A349] focus:outline-none bg-transparent p-0"
                    />
                    {suffix && <span className="text-[14px] font-bold text-slate-900 ml-0.5">{suffix}</span>}
                </div>
            </div>
            <input 
                type="range" 
                min={min} 
                max={max} 
                step={step} 
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#16A349] hover:bg-slate-300 transition-colors"
            />
        </div>
    );
};

const ResultRow: React.FC<{ label: string; value: string; highlight?: boolean; color?: string }> = ({ label, value, highlight, color }) => (
    <div className="flex justify-between items-center py-0.5">
        <span className={`text-[13px] ${highlight ? 'text-white font-medium' : 'text-slate-400 font-normal'}`}>{label}</span>
        <span className={`text-[14px] font-bold ${color ? color : 'text-white'}`}>{value}</span>
    </div>
);


// --- Main MiniToolsPage Component ---
export const MiniToolsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeToolId, setActiveToolId] = useState<number | null>(null);

  // Mock data for tools
  const tools = [
    {
      id: 8,
      title: "Video Production Plan",
      description: "Streamline your video creation process from pre-production to publishing.",
      category: "Content",
      icon: Film,
      color: "#F59E0B" // Amber
    },
    {
      id: 9,
      title: "Analytics",
      description: "Track performance metrics across all your marketing channels.",
      category: "Data",
      icon: BarChart3,
      color: "#3B82F6" // Blue
    },
    {
      id: 10,
      title: "Integration",
      description: "Connect your tools and automate workflows seamlessly.",
      category: "Utility",
      icon: Link,
      color: "#6366F1" // Indigo
    },
    {
      id: 11,
      title: "Debt Repayment Plan",
      description: "Create a strategic plan to eliminate business debt efficiently.",
      category: "Finance",
      icon: CreditCard,
      color: "#EF4444" // Red
    },
    {
      id: 12,
      title: "Personal Brand",
      description: "Define and refine your personal brand identity and voice.",
      category: "Branding",
      icon: User,
      color: "#EC4899" // Pink
    },
    {
      id: 13,
      title: "Webinar",
      description: "Plan and script high-converting webinars for your audience.",
      category: "Marketing",
      icon: Monitor,
      color: "#8B5CF6" // Violet
    },
    {
      id: 2, // Matches ROI Calc ID
      title: "ROI Calculator",
      description: "Advanced projection for Service Based Business funnels. Calculate CPA, ROAS and Profit.",
      category: "Finance",
      icon: Calculator,
      color: "#16A349" // Emerald
    }
  ];

  const filteredTools = tools.filter(tool => 
    tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If a tool is active, render the specific tool component
  if (activeToolId === 2) {
    return (
      <div className="p-8 max-w-[1400px] mx-auto font-sans">
        <ROICalculatorTool onBack={() => setActiveToolId(null)} />
        <div className="h-10"></div>
      </div>
    );
  }

  // Render Webinar Page
  if (activeToolId === 13) {
    return (
      <div className="p-8 max-w-[1400px] mx-auto font-sans">
        <WebinarPage onBack={() => setActiveToolId(null)} />
        <div className="h-10"></div>
      </div>
    );
  }

  // Otherwise render the grid
  return (
    <div className="p-8 max-w-[1400px] mx-auto font-sans">
      
      {/* Header Section */}
      <div className="flex flex-col items-center mb-10 text-center">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8F5E9] text-[#16A349] px-3 py-1 rounded text-xs font-bold">
            Mini Tools
          </span>
        </div>

        <h1 className="text-[26px] font-bold text-slate-900 mb-3 tracking-tight">
          Mini Tools Hub
        </h1>
        
        <p className="text-slate-500 text-[13px] leading-relaxed mb-8 max-w-2xl mx-auto">
          A collection of small but mighty utilities to help streamline your daily workflow.
        </p>

        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search for a tool..." 
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16A349]/20 focus:border-[#16A349] text-sm text-slate-700 placeholder:text-slate-400 shadow-sm"
          />
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTools.map((tool) => (
          <div 
            key={tool.id}
            onClick={() => setActiveToolId(tool.id)}
            className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-[#A5D6A7] transition-all duration-200 group flex flex-col cursor-pointer h-full"
          >
            <div className="p-6 flex flex-col h-full">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                  style={{ backgroundColor: `${tool.color}15`, color: tool.color }}
                >
                  <tool.icon size={20} strokeWidth={2} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wide px-2 py-1 rounded bg-slate-50 text-slate-500 border border-slate-100">
                  {tool.category}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-[16px] font-bold text-slate-900 mb-2 group-hover:text-[#16A349] transition-colors">
                {tool.title}
              </h3>
              <p className="text-[13px] text-slate-500 leading-relaxed mb-6 flex-1">
                {tool.description}
              </p>

              {/* Footer / Action */}
              <div className="pt-4 border-t border-slate-50 mt-auto flex items-center justify-between">
                <span className="text-[12px] font-semibold text-slate-400 group-hover:text-slate-600 transition-colors">
                  v1.0
                </span>
                <button className="flex items-center gap-1 text-[13px] font-bold text-[#16A349] hover:underline">
                  Open Tool
                  <ExternalLink size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Tool Placeholder */}
        <div className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-6 text-center text-slate-400 hover:border-[#16A349] hover:text-[#16A349] hover:bg-slate-50/50 transition-all cursor-pointer min-h-[200px]">
           <Wrench size={32} strokeWidth={1.5} className="mb-3 opacity-50" />
           <span className="text-sm font-bold">Request a Tool</span>
           <span className="text-xs opacity-70 mt-1">Need something custom?</span>
        </div>
      </div>
      
      {filteredTools.length === 0 && (
        <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Search size={24} />
            </div>
            <h3 className="text-slate-900 font-bold mb-1">No tools found</h3>
            <p className="text-slate-500 text-sm">Try searching for something else.</p>
        </div>
      )}

      <div className="h-10"></div>
    </div>
  );
};