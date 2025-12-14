import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Map,
  ShoppingBag,
  Magnet,
  Filter,
  Package,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Lock
} from 'lucide-react';

export const AllInPlanPage: React.FC = () => {
  // Mock computed state based on other parts of the app
  // In a real app, these would come from a global store/context
  const planState = {
    offer: { progress: 100, status: 'optimized', items: 3, total: 3 },
    attraction: { progress: 65, status: 'in-progress', items: 2, total: 3 },
    conversion: { progress: 40, status: 'warning', items: 2, total: 5 },
    delivery: { progress: 20, status: 'pending', items: 1, total: 4 },
    recurring: { progress: 0, status: 'locked', items: 0, total: 3 },
  };

  const totalScore = Math.round(
    (planState.offer.progress + 
     planState.attraction.progress + 
     planState.conversion.progress + 
     planState.delivery.progress + 
     planState.recurring.progress) / 5
  );

  return (
    <div className="p-8 max-w-[1400px] mx-auto font-sans">
      
      {/* Header Section */}
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8F5E9] text-[#16A349] px-3 py-1 rounded text-xs font-bold">
            The All In Plan
          </span>
        </div>

        <h1 className="text-[26px] font-bold text-slate-900 mb-3 tracking-tight flex items-center gap-3">
          Business Master Plan <Map className="text-[#16A349]" size={28} />
        </h1>
        
        <p className="text-slate-500 text-[13px] leading-relaxed mb-8 max-w-2xl mx-auto">
          A dynamic visual roadmap of your business health across the 5 core pillars. 
          Updates automatically as you build assets.
        </p>

        {/* Total Health Score */}
        <div className="bg-white border border-slate-200 rounded-full px-8 py-4 shadow-sm flex items-center gap-6">
            <div className="text-right">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Overall Health</div>
                <div className="text-sm font-medium text-slate-600">System Optimization</div>
            </div>
            <div className="relative w-16 h-16 flex items-center justify-center">
                 <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 36 36">
                    <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#F1F5F9"
                        strokeWidth="3"
                    />
                    <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={totalScore > 70 ? '#10B981' : totalScore > 40 ? '#F59E0B' : '#EF4444'}
                        strokeWidth="3"
                        strokeDasharray={`${totalScore}, 100`}
                        className="drop-shadow-sm transition-all duration-1000 ease-out"
                    />
                </svg>
                <span className="absolute text-lg font-bold text-slate-900">{totalScore}%</span>
            </div>
        </div>
      </div>

      {/* The 5 Pillars Visual Flow */}
      <div className="relative mb-12">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0 hidden lg:block rounded-full"></div>
        <div className="absolute top-1/2 left-0 h-1 bg-[#16A349]/30 -translate-y-1/2 z-0 hidden lg:block rounded-full transition-all duration-1000" style={{ width: `${totalScore}%` }}></div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative z-10">
            
            {/* 1. Offer */}
            <PillarCard 
                title="1. Offer" 
                icon={ShoppingBag} 
                description="Product Market Fit"
                stats={planState.offer}
                color="text-[#16A349]"
                bgColor="bg-[#E8F5E9]"
                borderColor="border-[#16A349]"
            >
                <CheckListItem label="Create Dream Buyer Avatar" done />
                <CheckListItem label="Define HVCO Title" done />
                <CheckListItem label="Set Pricing Strategy" done />
            </PillarCard>

            {/* 2. Attraction */}
            <PillarCard 
                title="2. Attraction" 
                icon={Magnet} 
                description="Traffic & Attention"
                stats={planState.attraction}
                color="text-blue-500"
                bgColor="bg-blue-50"
                borderColor="border-blue-200"
            >
                <CheckListItem label="Generate Facebook Ad Copy" done />
                <CheckListItem label="Create Ad Creative" done />
                <CheckListItem label="Setup Social Content Plan" />
            </PillarCard>

            {/* 3. Conversion */}
            <PillarCard 
                title="3. Conversion" 
                icon={Filter} 
                description="Turning Leads to Sales"
                stats={planState.conversion}
                color="text-amber-500"
                bgColor="bg-amber-50"
                borderColor="border-amber-200"
            >
                <CheckListItem label="Build Landing Page" done />
                <CheckListItem label="Write Sales Script" done />
                <CheckListItem label="Setup Email Automation" />
                <CheckListItem label="Train Sales Team (Closer)" />
                <CheckListItem label="VSL Production" />
            </PillarCard>

            {/* 4. Delivery */}
            <PillarCard 
                title="4. Delivery" 
                icon={Package} 
                description="Fulfillment & Ops"
                stats={planState.delivery}
                color="text-purple-500"
                bgColor="bg-purple-50"
                borderColor="border-purple-200"
            >
                <CheckListItem label="Onboarding Email Sequence" done />
                <CheckListItem label="Course/Product Access" />
                <CheckListItem label="Customer Support Setup" />
                <CheckListItem label="Feedback Loop" />
            </PillarCard>

            {/* 5. Recurring */}
            <PillarCard 
                title="5. Recurring" 
                icon={RefreshCw} 
                description="Retention & LTV"
                stats={planState.recurring}
                color="text-slate-400"
                bgColor="bg-slate-50"
                borderColor="border-slate-200"
                isLocked
            >
                <CheckListItem label="Upsell Strategy" />
                <CheckListItem label="Community Management" />
                <CheckListItem label="Referral System" />
            </PillarCard>

        </div>
      </div>

      {/* Insight Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-500 slide-in-from-bottom-4">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-[#16A349]" />
                Next Best Move
            </h3>
            <p className="text-sm text-slate-600 mb-4">
                Your <strong>Conversion</strong> pillar is currently the bottleneck (40%). 
                Focus on completing the <span className="font-bold text-slate-900">Email Automation</span> and <span className="font-bold text-slate-900">VSL Creative</span> to unblock flow.
            </p>
            <button className="w-full py-2.5 bg-[#16A349] text-white text-sm font-bold rounded-lg hover:bg-[#149641] transition-colors">
                Go to Funnel Builder
            </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm lg:col-span-2">
             <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <AlertCircle size={20} className="text-blue-500" />
                System Alerts
            </h3>
            <div className="space-y-3">
                <AlertItem 
                    title="Missing Ad Creatives" 
                    desc="You have generated ad copy but no visual creatives in the 'Attraction' pillar."
                    action="Create Ads"
                />
                <AlertItem 
                    title="No Upsell Configured" 
                    desc="Recurring revenue is at 0%. Consider adding a backend offer to increase LTV."
                    action="Add Offer"
                />
            </div>
        </div>
      </div>
      
      <div className="h-10"></div>
    </div>
  );
};

// --- Sub Components ---

const PillarCard: React.FC<{
    title: string;
    icon: any;
    description: string;
    stats: { progress: number, items: number, total: number, status: string };
    color: string;
    bgColor: string;
    borderColor: string;
    children?: React.ReactNode;
    isLocked?: boolean;
}> = ({ title, icon: Icon, description, stats, color, bgColor, borderColor, children, isLocked }) => {
    return (
        <div className={`bg-white rounded-xl border ${stats.progress === 100 ? 'border-[#16A349]' : 'border-slate-200'} shadow-sm flex flex-col h-full relative overflow-hidden group hover:shadow-md transition-shadow`}>
            {isLocked && (
                <div className="absolute inset-0 bg-slate-50/80 backdrop-blur-[1px] z-20 flex flex-col items-center justify-center text-slate-400">
                    <Lock size={32} className="mb-2" />
                    <span className="text-xs font-bold uppercase tracking-wide">Locked</span>
                </div>
            )}
            
            {/* Header */}
            <div className={`p-5 border-b border-slate-50 ${bgColor}`}>
                <div className="flex justify-between items-start mb-3">
                    <div className={`w-10 h-10 rounded-lg bg-white flex items-center justify-center ${color} shadow-sm`}>
                        <Icon size={20} strokeWidth={2.5} />
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full bg-white border ${borderColor} ${color}`}>
                        {stats.progress}%
                    </span>
                </div>
                <h3 className={`text-[15px] font-bold ${color} mb-1`}>{title}</h3>
                <p className="text-[12px] text-slate-500 font-medium">{description}</p>
            </div>

            {/* Checklist */}
            <div className="p-5 flex-1 bg-white">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-3">
                    <span>Progress</span>
                    <span>{stats.items}/{stats.total}</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-slate-100 rounded-full mb-4">
                    <div 
                        className={`h-1.5 rounded-full transition-all duration-1000 ${stats.progress === 100 ? 'bg-[#16A349]' : color.replace('text-', 'bg-')}`} 
                        style={{ width: `${stats.progress}%` }}
                    ></div>
                </div>

                <div className="space-y-2">
                    {children}
                </div>
            </div>

             {/* Footer Status */}
             <div className="p-3 border-t border-slate-50 bg-slate-50/50 text-center">
                <span className={`text-[11px] font-bold uppercase tracking-wider ${
                    stats.status === 'optimized' ? 'text-[#16A349]' : 
                    stats.status === 'in-progress' ? 'text-blue-500' : 
                    stats.status === 'warning' ? 'text-amber-500' : 'text-slate-400'
                }`}>
                    {stats.status.replace('-', ' ')}
                </span>
             </div>
        </div>
    );
};

const CheckListItem = ({ label, done }: { label: string, done?: boolean }) => (
    <div className={`flex items-start gap-2 text-[13px] ${done ? 'text-slate-400' : 'text-slate-600'}`}>
        {done ? (
            <CheckCircle2 size={16} className="text-[#16A349] shrink-0 mt-0.5" />
        ) : (
            <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0 mt-0.5"></div>
        )}
        <span className={done ? 'line-through decoration-slate-300' : ''}>{label}</span>
    </div>
);

const AlertItem = ({ title, desc, action }: { title: string, desc: string, action: string }) => (
    <div className="flex items-start justify-between p-3 rounded-lg border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors">
        <div>
            <div className="text-[14px] font-bold text-slate-900 mb-1">{title}</div>
            <p className="text-[12px] text-slate-500 leading-relaxed">{desc}</p>
        </div>
        <button className="text-[12px] font-bold text-[#16A349] hover:underline whitespace-nowrap ml-4 mt-1">
            {action} <ArrowRight size={10} className="inline ml-0.5" />
        </button>
    </div>
);