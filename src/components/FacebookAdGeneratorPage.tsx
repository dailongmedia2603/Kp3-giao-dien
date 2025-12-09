import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Folder, 
  Download, 
  Trash2, 
  Copy, 
  Star,
  ChevronDown,
  RefreshCw
} from 'lucide-react';

export const FacebookAdGeneratorPage: React.FC = () => {
  const [isBestMode, setIsBestMode] = useState(true);

  return (
    <div className="p-8 max-w-[1400px] mx-auto font-sans">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8 text-[13px] text-slate-500">
        <Home size={16} className="text-slate-400" />
        <ChevronRight size={14} className="text-slate-300" />
        <span>Facebook Ad Generator</span>
        <ChevronRight size={14} className="text-slate-300" />
        <span className="bg-[#F3E8FF] text-[#7C3AED] px-3 py-1 rounded text-xs font-bold">
          Property Investment Course
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
                   <Folder size={24} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                   <h1 className="text-xl font-bold text-slate-900 leading-tight">Property Investment Course</h1>
                   <p className="text-sm text-slate-500 mt-1">Real Estate</p>
                </div>
              </div>

              {/* Sub Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900">Facebook Ad</h2>
                <div className="flex items-center gap-3">
                   <button className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#7C3AED] text-white text-[13px] font-semibold hover:bg-[#6D28D9] transition-colors shadow-sm">
                      <Download size={16} />
                      Download PDF
                   </button>
                   <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors">
                      <Trash2 size={18} />
                   </button>
                </div>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-2 mb-8">
                <span className="px-3 py-1 rounded bg-[#F3E8FF] text-[#7C3AED] text-[11px] font-bold uppercase tracking-wide">
                  Type <span className="text-slate-900 ml-1">Lead Gen</span>
                </span>
                <span className="px-3 py-1 rounded border border-slate-200 text-slate-500 text-[11px] font-bold uppercase tracking-wide">
                  Style <span className="text-slate-900 ml-1">Hero Ad</span>
                </span>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-lg border border-slate-200 p-1 flex mb-8">
                <button className="flex-1 py-2.5 bg-[#7C3AED] text-white font-semibold text-[13px] rounded shadow-sm text-center">
                  Ad Headlines
                </button>
                <button className="flex-1 py-2.5 text-slate-500 font-semibold text-[13px] hover:text-slate-700 transition-colors text-center">
                  Ad Body Copy
                </button>
              </div>

              {/* Best Mode Toggle */}
              <div className="flex justify-center mb-8">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setIsBestMode(!isBestMode)}>
                  <div className={`w-12 h-6 rounded-full p-1 transition-colors relative ${isBestMode ? 'bg-[#10B981]' : 'bg-slate-200'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isBestMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </div>
                  <span className="text-slate-700 text-sm font-medium">Best Mode On</span>
                </div>
              </div>

              {/* Result Card 1 (Generating) */}
              <div className="border border-[#E9D5FF] rounded-xl bg-[#FDFBFF] p-6 mb-6 relative overflow-hidden">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-slate-500 text-xs font-medium">Headline</span>
                  <button className="text-slate-300 hover:text-[#7C3AED] transition-colors">
                    <Star size={18} />
                  </button>
                </div>
                
                <h3 className="text-[15px] font-bold text-slate-900 mb-8 pr-8 leading-relaxed">
                  New Property Course Unlocks the Secret to Affordable Real Estate
                </h3>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-[13px] font-semibold hover:bg-slate-50 transition-colors">
                      <Copy size={16} />
                      Copy
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F3E8FF] text-[#7C3AED] text-[13px] font-bold hover:bg-[#E9D5FF] transition-colors">
                      Generating...
                    </button>
                  </div>
                  <button className="text-xs font-bold text-slate-500 hover:text-slate-700">
                    Report Click Through Rate
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-[#F3E8FF] h-2 rounded-full mb-3">
                  <div className="bg-[#C084FC] h-2 rounded-full w-[22%]"></div>
                </div>
                
                <div className="flex items-center justify-between text-[11px] font-medium">
                  <span className="text-[#7C3AED] font-bold">Generating 15 More</span>
                  <span className="text-slate-500">78% Remaining <span className="mx-1 text-slate-300">|</span> 4 minutes</span>
                </div>
                
                {/* Active Indicator Line */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C084FC]"></div>
              </div>

              {/* Result Card 2 */}
              <div className="border border-slate-200 rounded-xl bg-white p-6 hover:border-[#E9D5FF] transition-colors group">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[#7C3AED] text-xs font-medium">Headline Regenerated</span>
                  <button className="text-slate-300 hover:text-[#7C3AED] transition-colors group-hover:text-[#7C3AED]">
                    <Star size={18} fill="currentColor" />
                  </button>
                </div>
                
                <h3 className="text-[15px] font-bold text-slate-900 leading-relaxed">
                  The Property Investment Course That Real Estate Insiders Don't Want You To Know
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="w-full lg:w-[400px] shrink-0">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sticky top-6">
            <h3 className="text-lg font-bold text-slate-900 mb-2 text-center">Regenerate Facebook Ad</h3>
            <p className="text-center text-slate-500 text-[13px] leading-relaxed mb-8 px-2">
              Submit or modify the pre-filled form below to regenerate a similar Facebook Ad and headline set.
            </p>

            {/* Type Toggle */}
            <div className="bg-white rounded-lg border border-slate-200 p-1 flex mb-8">
                <button className="flex-1 py-2 bg-[#7C3AED] text-white font-semibold text-[13px] rounded shadow-sm text-center">
                  Lead Gen
                </button>
                <button className="flex-1 py-2 text-slate-500 font-semibold text-[13px] hover:text-slate-700 transition-colors text-center">
                  Ecommerce
                </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
              
              {/* Ad Style */}
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">
                  Ad Style*
                </label>
                <div className="text-xs text-slate-400 mb-2">Please select what style of ad you'd like</div>
                <div className="relative">
                  <select className="w-full p-3 pr-10 bg-white border border-slate-200 rounded-lg appearance-none text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]">
                    <option>Hero Ad</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Helper Box */}
              <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-lg p-4 text-[13px] text-slate-700 leading-relaxed">
                Highlights someone's success story to show you how to achieve the same without all the hard work.
              </div>

              {/* Call To Action */}
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">
                  Ad Call To Action*
                </label>
                <div className="text-xs text-slate-400 mb-2">Please select your primary call to action</div>
                <div className="relative">
                  <select className="w-full p-3 pr-10 bg-white border border-slate-200 rounded-lg appearance-none text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]">
                    <option>Book A Free 30-minute Call</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Target Market */}
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">
                  Target Market*
                </label>
                <div className="text-xs text-slate-400 mb-2">e.g. Women over 45</div>
                <input 
                  type="text" 
                  defaultValue="Men and women over 50"
                  className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
                />
                <div className="text-[11px] text-slate-400 mt-1.5">100 characters left</div>
              </div>

               {/* Product Category (Cut off in image but added for completeness) */}
               <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">
                  Product Category*
                </label>
                <input 
                  type="text" 
                  disabled
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none"
                />
              </div>

            </div>
          </div>
        </div>

      </div>
      
      <div className="h-10"></div>
    </div>
  );
};
