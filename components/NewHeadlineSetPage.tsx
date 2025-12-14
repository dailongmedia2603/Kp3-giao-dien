import React from 'react';
import { 
  Home, 
  ChevronRight, 
  ChevronDown
} from 'lucide-react';

export const NewHeadlineSetPage: React.FC = () => {
  return (
    <div className="p-8 max-w-[800px] mx-auto font-sans">
      
      {/* Header / Breadcrumb */}
      <div className="flex flex-col items-center mb-10">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span>Direct Response Headlines</span>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#F3E8FF] text-[#7C3AED] px-3 py-1 rounded text-xs font-bold">
            New Headline Set
          </span>
        </div>
        
        <h1 className="text-[26px] font-bold text-slate-900 mb-2 tracking-tight">
          New Headline Set
        </h1>
        
        <p className="text-slate-500 text-center text-[13px]">
          Generates 25 Different Headlines
        </p>
      </div>

      {/* Selected Product Section */}
      <div className="mb-6">
        <label className="block text-[13px] font-medium text-slate-600 mb-2">
            Selected Product
        </label>
        <div className="bg-white border border-slate-200 rounded-lg px-4 py-3 flex items-center justify-between shadow-sm">
            <span className="text-[14px] font-bold text-slate-900">Property Management Course</span>
            <button className="flex items-center gap-1 text-[13px] text-slate-500 hover:text-slate-700 font-medium">
                Change
                <ChevronDown size={14} />
            </button>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="space-y-6">
            
            {/* Target Market */}
            <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-1">
                    Target Market*
                </label>
                <div className="text-[12px] text-slate-500 mb-2">e.g. Women over 45</div>
                <input 
                    type="text" 
                    defaultValue="Men and women over 50"
                    className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
                />
                <div className="text-[11px] text-slate-400 mt-1.5">100 characters left</div>
            </div>

            {/* Pressing Problem */}
            <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-1">
                    Pressing Problem*
                </label>
                <div className="text-[12px] text-slate-500 mb-2">e.g. Weight gain/metabolism slowing down due to menopause</div>
                <textarea 
                    rows={4}
                    className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] resize-none leading-relaxed"
                    defaultValue="One pressing problem related to real estate is housing affordability. In many regions, the cost of housing has outpaced income growth, making it increasingly difficult for individuals"
                />
                <div className="text-[11px] text-slate-400 mt-1.5">1000 characters left</div>
            </div>

            {/* Desired Outcome */}
            <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-1">
                    Desired Outcome*
                </label>
                <div className="text-[12px] text-slate-500 mb-2">e.g. Being slim, sexy, desirable, impressing their husband, looking like their younger</div>
                <textarea 
                    rows={3}
                    className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] resize-none leading-relaxed"
                    defaultValue="The primary goal of a real estate business is to meet clients needs while ensuring profitability and sustainability."
                />
                <div className="text-[11px] text-slate-400 mt-1.5">1000 characters left</div>
            </div>

             {/* Unique Mechanism (Partially shown in screenshot, adding placeholder) */}
             <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-1">
                    Unique Mechanism
                </label>
                 <div className="text-[12px] text-slate-500 mb-2">What...</div>
            </div>

        </div>
      </div>
      
      <div className="h-10"></div>
    </div>
  );
};