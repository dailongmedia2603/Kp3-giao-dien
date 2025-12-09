import React from 'react';
import { 
  Home, 
  ChevronRight, 
  Folder, 
  Download, 
  Trash2, 
  Copy, 
  Star 
} from 'lucide-react';

export const HvcoTitlesPage: React.FC = () => {
  return (
    <div className="p-8 max-w-[1200px] mx-auto font-sans">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8 text-[13px] text-slate-500">
        <Home size={16} className="text-slate-400" />
        <ChevronRight size={14} className="text-slate-300" />
        <span>Direct Response Headlines</span>
        <ChevronRight size={14} className="text-slate-300" />
        <span className="bg-[#F3E8FF] text-[#7C3AED] px-3 py-1 rounded text-xs font-bold">
          Property Investment Course
        </span>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        
        {/* Header Section */}
        <div className="p-8 pb-0">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 bg-white shrink-0">
               <Folder size={24} strokeWidth={1.5} />
            </div>
            <div>
               <h1 className="text-xl font-bold text-slate-900 leading-tight">Property Investment Course</h1>
               <p className="text-sm text-slate-500 mt-1">Real Estate</p>
            </div>
          </div>

          {/* Title & Actions Row */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">HVCO #1</h2>
            <div className="flex items-center gap-3">
               <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#7C3AED] text-white text-[13px] font-semibold hover:bg-[#6D28D9] transition-colors shadow-sm">
                  <Download size={16} />
                  Download PDF
               </button>
               <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors">
                  <Trash2 size={18} />
               </button>
            </div>
          </div>

          {/* Info Grid */}
          <div className="bg-[#FDFDFD] border-t border-slate-100 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div>
                  <div className="text-[13px] font-bold text-slate-900 mb-1">Topic</div>
                  <div className="text-[14px] text-slate-600">Replacing a 9 to 5 income and retiring 8 to 15 years earlier</div>
               </div>
               <div>
                  <div className="text-[13px] font-bold text-slate-900 mb-1">Target Market</div>
                  <div className="text-[14px] text-slate-600">Men and women over 45</div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Content Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
         {/* Tabs */}
         <div className="flex items-center gap-1 border-b border-slate-100 pb-6 mb-6 overflow-x-auto">
            <button className="px-6 py-2.5 rounded bg-[#7C3AED] text-white text-[13px] font-semibold shadow-sm whitespace-nowrap">
               Long Titles
            </button>
            <button className="px-6 py-2.5 rounded text-slate-500 hover:bg-slate-50 text-[13px] font-semibold transition-colors whitespace-nowrap">
               Short Titles
            </button>
            <button className="px-6 py-2.5 rounded text-slate-500 hover:bg-slate-50 text-[13px] font-semibold transition-colors whitespace-nowrap">
               Beast Mode Titles
            </button>
            <button className="px-6 py-2.5 rounded text-slate-500 hover:bg-slate-50 text-[13px] font-semibold transition-colors whitespace-nowrap">
               Subheadlines
            </button>
         </div>

         {/* List Items */}
         <div className="space-y-4">
            
            <TitleItem 
               text="New Property Course Unlocks the Secret to Affordable Real Estate" 
            />
            
            <TitleItem 
               text="Early Exit: Unshackle from Usual with Uncommon Unions" 
            />
            
            <TitleItem 
               text="Premature Pension: Never Work a Day Past 50" 
            />

            <TitleItem 
               text="New Property Course Unlocks the Secret to Affordable Real Estate" 
            />

         </div>
      </div>
      
      <div className="h-10"></div>
    </div>
  );
};

interface TitleItemProps {
   text: string;
}

const TitleItem: React.FC<TitleItemProps> = ({ text }) => {
   return (
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-slate-200 rounded-lg hover:border-[#E9D5FF] transition-colors group bg-[#FDFDFD]">
         <div className="flex items-start md:items-center gap-4">
            <button className="mt-1 md:mt-0 p-1.5 rounded text-slate-400 hover:text-[#7C3AED] border border-slate-200 bg-white hover:border-[#E9D5FF] transition-colors">
               <Star size={16} />
            </button>
            <span className="text-[14px] font-semibold text-slate-900">{text}</span>
         </div>
         
         <div className="flex items-center gap-3 pl-10 md:pl-0">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded border border-slate-200 text-slate-600 text-[13px] font-semibold hover:bg-slate-50 bg-white transition-colors">
               <Copy size={14} />
               Copy
            </button>
            <button className="px-3 py-1.5 rounded bg-[#F3E8FF] text-[#7C3AED] text-[12px] font-bold hover:bg-[#E9D5FF] transition-colors whitespace-nowrap">
               +15 More Like This
            </button>
         </div>
      </div>
   );
};
