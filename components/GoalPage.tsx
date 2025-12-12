import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Rocket, 
  ShieldCheck, 
  TrendingUp, 
  Folder, 
  Download, 
  Trash2, 
  Target,
  CheckCircle2,
  ArrowRight,
  Flame
} from 'lucide-react';

export const GoalPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'launching' | 'cook' | 'stabilize' | 'scale'>('launching');

  return (
    <div className="p-8 max-w-[1400px] mx-auto font-sans">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8 text-[13px] text-slate-500">
        <Home size={16} className="text-slate-400" />
        <ChevronRight size={14} className="text-slate-300" />
        <span>Goal</span>
        <ChevronRight size={14} className="text-slate-300" />
        <span className="bg-[#E8F5E9] text-[#16A349] px-3 py-1 rounded text-xs font-bold capitalize">
          {activeTab} Phase
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Column - Main Content */}
        <div className="flex-1 w-full">
          
          {/* Main Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
            <div className="p-8">
              {/* Header */}
              <div className="flex items-start gap-4 mb-8 border-b border-slate-100 pb-8">
                <div className="w-12 h-12 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 bg-white shrink-0">
                   <Target size={24} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                   <h1 className="text-xl font-bold text-slate-900 leading-tight">Q3 Business Objectives</h1>
                   <p className="text-sm text-slate-500 mt-1">Strategic Planning</p>
                </div>
              </div>

              {/* Tabs Navigation */}
              <div className="bg-slate-100/50 rounded-xl border border-slate-200 p-1.5 flex mb-8 gap-1 overflow-x-auto">
                <button 
                  onClick={() => setActiveTab('launching')}
                  className={`flex-1 min-w-[100px] py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-[13px] font-bold transition-all duration-200 whitespace-nowrap
                    ${activeTab === 'launching' 
                      ? 'bg-white text-[#16A349] shadow-sm ring-1 ring-slate-200' 
                      : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'
                    }`}
                >
                  <Rocket size={18} />
                  Launching
                </button>
                <button 
                  onClick={() => setActiveTab('cook')}
                  className={`flex-1 min-w-[100px] py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-[13px] font-bold transition-all duration-200 whitespace-nowrap
                    ${activeTab === 'cook' 
                      ? 'bg-white text-[#16A349] shadow-sm ring-1 ring-slate-200' 
                      : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'
                    }`}
                >
                  <Flame size={18} />
                  Cook
                </button>
                <button 
                  onClick={() => setActiveTab('stabilize')}
                  className={`flex-1 min-w-[100px] py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-[13px] font-bold transition-all duration-200 whitespace-nowrap
                    ${activeTab === 'stabilize' 
                      ? 'bg-white text-[#16A349] shadow-sm ring-1 ring-slate-200' 
                      : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'
                    }`}
                >
                  <ShieldCheck size={18} />
                  Stabilize
                </button>
                <button 
                  onClick={() => setActiveTab('scale')}
                  className={`flex-1 min-w-[100px] py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-[13px] font-bold transition-all duration-200 whitespace-nowrap
                    ${activeTab === 'scale' 
                      ? 'bg-white text-[#16A349] shadow-sm ring-1 ring-slate-200' 
                      : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'
                    }`}
                >
                  <TrendingUp size={18} />
                  Scale
                </button>
              </div>

              {/* Tab Content */}
              <div className="min-h-[400px]">
                {activeTab === 'launching' && (
                  <div className="animate-in fade-in duration-300 slide-in-from-bottom-2">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-bold text-slate-900">Launch Phase Strategy</h2>
                      <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#16A349] text-white text-[13px] font-semibold hover:bg-[#149641] transition-colors shadow-sm">
                            <Download size={16} />
                            Export Plan
                        </button>
                      </div>
                    </div>

                    <div className="bg-[#E8F5E9] border border-[#A5D6A7] rounded-xl p-6 mb-6">
                      <h3 className="text-[#16A349] font-bold text-[15px] mb-4 flex items-center gap-2">
                        <Rocket size={18} />
                        Launch Checklist
                      </h3>
                      <div className="space-y-3">
                        <CheckItem text="Define core value proposition" checked />
                        <CheckItem text="Set up landing page & funnel" checked />
                        <CheckItem text="Configure email automation sequence" />
                        <CheckItem text="Create initial ad creatives (3 variations)" />
                        <CheckItem text="Setup tracking pixel & analytics" />
                      </div>
                    </div>

                    <div className="border border-slate-200 rounded-xl p-6">
                       <h3 className="text-slate-900 font-bold text-[15px] mb-2">Launch Metrics</h3>
                       <p className="text-slate-500 text-[13px] mb-4">Key Performance Indicators for the first 30 days.</p>
                       <div className="grid grid-cols-3 gap-4">
                          <MetricBox label="Target Leads" value="500" />
                          <MetricBox label="Max CPA" value="$15.00" />
                          <MetricBox label="Conv. Rate" value="2.5%" />
                       </div>
                    </div>
                  </div>
                )}

                {activeTab === 'cook' && (
                  <div className="animate-in fade-in duration-300 slide-in-from-bottom-2">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-bold text-slate-900">The "Cook" Phase</h2>
                      <div className="flex items-center gap-3">
                        <span className="text-[12px] font-bold text-amber-500 uppercase tracking-wide bg-amber-50 px-3 py-1 rounded">In Progress</span>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-6">
                      <h3 className="text-amber-600 font-bold text-[15px] mb-4 flex items-center gap-2">
                        <Flame size={18} />
                        Preparation & Incubation
                      </h3>
                      <p className="text-slate-600 text-[14px] leading-relaxed mb-4">
                        This phase is about refining the offer, warming up the audience, and gathering initial feedback before the full-scale stabilization.
                      </p>
                      <div className="space-y-3">
                        <CheckItem text="Run A/B tests on headlines" checked />
                        <CheckItem text="Analyze heatmaps on landing page" />
                        <CheckItem text="Gather early adopter testimonials" />
                        <CheckItem text="Refine email copy based on open rates" />
                      </div>
                    </div>

                    <div className="border border-slate-200 rounded-xl p-6">
                       <h3 className="text-slate-900 font-bold text-[15px] mb-2">Heat Levels</h3>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                             <div className="text-[14px] font-bold text-slate-900 mb-1">Audience Warmth</div>
                             <div className="w-full bg-slate-100 h-2 rounded-full mt-2">
                                <div className="bg-amber-500 h-2 rounded-full w-[65%]"></div>
                             </div>
                             <div className="text-[11px] text-slate-400 mt-1 text-right">65% Warm</div>
                          </div>
                          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                             <div className="text-[14px] font-bold text-slate-900 mb-1">Offer Clarity</div>
                             <div className="w-full bg-slate-100 h-2 rounded-full mt-2">
                                <div className="bg-amber-500 h-2 rounded-full w-[80%]"></div>
                             </div>
                             <div className="text-[11px] text-slate-400 mt-1 text-right">80% Optimized</div>
                          </div>
                       </div>
                    </div>
                  </div>
                )}

                {activeTab === 'stabilize' && (
                  <div className="animate-in fade-in duration-300 slide-in-from-bottom-2">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-bold text-slate-900">Stabilization Protocol</h2>
                      <div className="flex items-center gap-3">
                         <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wide bg-slate-100 px-3 py-1 rounded">Status: Pending</span>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6">
                      <h3 className="text-slate-700 font-bold text-[15px] mb-4 flex items-center gap-2">
                        <ShieldCheck size={18} />
                        Optimization Areas
                      </h3>
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                           <div className="text-[14px] font-bold text-slate-900 mb-1">Funnel Leaks</div>
                           <p className="text-[13px] text-slate-500">Analyze drop-off points between checkout and upsell pages.</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                           <div className="text-[14px] font-bold text-slate-900 mb-1">Customer Feedback Loop</div>
                           <p className="text-[13px] text-slate-500">Implement NPS score collection after purchase.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'scale' && (
                  <div className="animate-in fade-in duration-300 slide-in-from-bottom-2">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-bold text-slate-900">Scaling Roadmap</h2>
                    </div>

                    <div className="bg-gradient-to-r from-[#16A349] to-[#6EE7B7] rounded-xl p-6 text-white mb-6 shadow-md">
                       <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                          <TrendingUp size={20} />
                          10x Growth Plan
                       </h3>
                       <p className="text-white/90 text-sm leading-relaxed max-w-xl">
                          Focus on increasing ad spend while maintaining ROAS. Expand to new audiences and lookalike audiences based on high-value customers.
                       </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="border border-slate-200 rounded-xl p-5 hover:border-[#16A349] transition-colors cursor-pointer group">
                          <div className="text-slate-400 group-hover:text-[#16A349] mb-2"><Target size={24}/></div>
                          <h4 className="font-bold text-slate-900 text-sm">New Markets</h4>
                          <p className="text-slate-500 text-xs mt-1">Expand geo-targeting to UK & CA</p>
                       </div>
                       <div className="border border-slate-200 rounded-xl p-5 hover:border-[#16A349] transition-colors cursor-pointer group">
                          <div className="text-slate-400 group-hover:text-[#16A349] mb-2"><CheckCircle2 size={24}/></div>
                          <h4 className="font-bold text-slate-900 text-sm">Affiliate Program</h4>
                          <p className="text-slate-500 text-xs mt-1">Recruit top 10 industry partners</p>
                       </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Right Column - Sidebar Settings */}
        <div className="w-full lg:w-[400px] shrink-0">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sticky top-6">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Goal Settings</h3>
            <p className="text-slate-500 text-[13px] leading-relaxed mb-6">
              Configure parameters for your current business goal phase.
            </p>

            <div className="space-y-5">
              
              {/* Goal Type */}
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">
                  Primary Objective
                </label>
                <select className="w-full p-3 bg-white border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#16A349]/20 focus:border-[#16A349]">
                   <option>Revenue Growth</option>
                   <option>User Acquisition</option>
                   <option>Brand Awareness</option>
                </select>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">
                  Monthly Budget Allocation
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                  <input 
                    type="text" 
                    defaultValue="5,000"
                    className="w-full pl-7 p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#16A349]/20 focus:border-[#16A349]"
                  />
                </div>
              </div>

               {/* Timeline */}
               <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">
                  Target Completion Date
                </label>
                <input 
                    type="date" 
                    className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#16A349]/20 focus:border-[#16A349]"
                  />
              </div>

              {/* Action Button */}
              <button className="w-full py-3 bg-[#16A349] text-white text-[14px] font-bold rounded-lg hover:bg-[#149641] transition-colors shadow-sm mt-4">
                 Update Settings
              </button>

            </div>
          </div>
        </div>

      </div>
      
      <div className="h-10"></div>
    </div>
  );
};

// Helper Components for this page
const CheckItem = ({ text, checked = false }: { text: string; checked?: boolean }) => (
  <div className="flex items-start gap-3">
    <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 
      ${checked ? 'bg-[#16A349] border-[#16A349]' : 'border-slate-300 bg-white'}`}>
      {checked && <CheckCircle2 size={14} className="text-white" />}
    </div>
    <span className={`text-[14px] ${checked ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>
      {text}
    </span>
  </div>
);

const MetricBox = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-slate-50 rounded-lg p-3 text-center border border-slate-100">
    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1">{label}</div>
    <div className="text-xl font-bold text-slate-900">{value}</div>
  </div>
);