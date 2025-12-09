import React from 'react';
import { 
  Home, 
  ChevronRight, 
  Search, 
  Folder, 
  Star, 
  Plus, 
  SlidersHorizontal, 
  Video, 
  ChevronLeft,
  ArrowRight
} from 'lucide-react';

interface DirectResponsePageProps {
  onNavigate?: (view: string) => void;
}

export const DirectResponsePage: React.FC<DirectResponsePageProps> = ({ onNavigate }) => {
  return (
    <div className="p-8 max-w-[1200px] mx-auto font-sans">
      
      {/* Header / Breadcrumb */}
      <div className="flex flex-col items-center mb-10">
        <div className="flex items-center gap-2 mb-6">
          <Home size={18} className="text-slate-400" />
          <ChevronRight size={16} className="text-slate-300" />
          <span className="bg-[#F3E8FF] text-[#7C3AED] px-3 py-1 rounded text-xs font-bold">
            Direct Response Headlines
          </span>
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
          Direct Response Headlines
        </h1>
        
        <p className="text-slate-500 text-center max-w-2xl text-[15px] leading-relaxed">
          Create powerful eyebrows, headlines and subheadlines designed to<br/>
          capture attention and drive action on your landing pages.
        </p>
      </div>

      {/* Controls: Search & Usage */}
      <div className="flex items-center justify-between mb-8">
        <div className="relative w-[400px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search Headlines" 
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] text-sm text-slate-700 placeholder:text-slate-400 shadow-sm"
          />
        </div>

        <div className="flex items-center gap-4">
            {/* Circular Progress Widget */}
            <div className="relative w-12 h-12 flex items-center justify-center">
                {/* Background circle */}
                <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 36 36">
                    <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="3"
                    />
                    {/* Progress circle (approx 25%) */}
                    <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#10B981" 
                        strokeWidth="3"
                        strokeDasharray="25, 100"
                        className="drop-shadow-sm"
                    />
                </svg>
                <span className="absolute text-[10px] font-bold text-slate-700">05/20</span>
            </div>
            <div>
                <div className="text-[13px] font-bold text-slate-900">Headlines Usage</div>
                <div className="text-[12px] text-slate-500">Usage Resets: 16/06/2024</div>
            </div>
        </div>
      </div>

      {/* Project Card 1: Property Investment Course */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
        {/* Card Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 bg-white">
                    <Folder size={24} strokeWidth={1.5} />
                </div>
                <div>
                    <h3 className="text-[16px] font-bold text-slate-900">Property Investment Course</h3>
                    <p className="text-sm text-slate-500">Real Estate</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-[13px] font-semibold hover:bg-slate-50 transition-colors">
                    <Star size={16} />
                    View Favourites Headlines
                </button>
                <button 
                  onClick={() => onNavigate && onNavigate('new-headline-set')}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#7C3AED] text-white text-[13px] font-semibold hover:bg-[#6D28D9] transition-colors shadow-sm"
                >
                    <Plus size={16} />
                    Create New Headline
                </button>
            </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Headline Set Card Left */}
                <HeadlineSetCard />
                
                {/* Headline Set Card Right */}
                <HeadlineSetCard />
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-8 border-t border-slate-100 pt-6">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50">
                    <ChevronLeft size={16} />
                    Previous
                </button>
                
                <div className="flex items-center gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-100 text-slate-900 text-sm font-medium">1</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded text-slate-500 text-sm hover:bg-slate-50">2</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded text-slate-500 text-sm hover:bg-slate-50">3</button>
                    <span className="text-slate-400 text-sm px-2">...</span>
                    <button className="w-8 h-8 flex items-center justify-center rounded text-slate-500 text-sm hover:bg-slate-50">8</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded text-slate-500 text-sm hover:bg-slate-50">9</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded text-slate-500 text-sm hover:bg-slate-50">10</button>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50">
                    Next
                    <ArrowRight size={16} />
                </button>
            </div>
        </div>
      </div>

      {/* Project Card 2: Weight Loss Program (Collapsed View / Bottom of Image) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 bg-white">
                    <Folder size={24} strokeWidth={1.5} />
                </div>
                <div>
                    <h3 className="text-[16px] font-bold text-slate-900">Weight Loss Program</h3>
                    <p className="text-sm text-slate-500">Weight Loss</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-[13px] font-semibold hover:bg-slate-50 transition-colors">
                    <Star size={16} />
                    View Favourites Headlines
                </button>
                <button 
                  onClick={() => onNavigate && onNavigate('new-headline-set')}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#7C3AED] text-white text-[13px] font-semibold hover:bg-[#6D28D9] transition-colors shadow-sm"
                >
                    <Plus size={16} />
                    Create New Headline
                </button>
            </div>
        </div>
      </div>
      
      {/* Spacer for bottom scrolling */}
      <div className="h-10"></div>
    </div>
  );
};

// Sub-component for the Headline Set Card
const HeadlineSetCard: React.FC = () => {
    return (
        <div className="bg-[#FDFDFD] border border-slate-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="text-[#7C3AED] font-bold text-[15px] mb-4">Headline Set #556</h4>
            
            <div className="space-y-4 mb-6">
                <div>
                    <div className="text-slate-900 font-bold text-[13px] mb-1">Target Market</div>
                    <div className="text-slate-600 text-[14px]">Men over 30...</div>
                </div>
                <div>
                    <div className="text-slate-900 font-bold text-[13px] mb-1">Pressing Problem</div>
                    <div className="text-slate-600 text-[14px]">Book appointments with atleast closing rate of 30%</div>
                </div>
                <div>
                    <div className="text-slate-900 font-bold text-[13px] mb-1">Desired Outcome</div>
                    <div className="text-slate-600 text-[14px]">Close atleast 20 sales from the campaign!</div>
                </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                    <span className="text-[#7C3AED] font-bold text-[13px] mr-1">Modifiers</span>
                    
                    <button className="w-7 h-7 flex items-center justify-center rounded border border-[#E9D5FF] text-[#7C3AED] bg-white hover:bg-[#F3E8FF] transition-colors">
                        <SlidersHorizontal size={14} />
                    </button>
                    <button className="w-7 h-7 flex items-center justify-center rounded border border-[#E9D5FF] text-[#7C3AED] bg-white hover:bg-[#F3E8FF] transition-colors">
                        <Video size={14} />
                    </button>
                     <button className="w-7 h-7 flex items-center justify-center rounded border border-[#E9D5FF] text-[#7C3AED] bg-white hover:bg-[#F3E8FF] transition-colors text-[10px] font-bold">
                        56
                    </button>
                </div>
                <button className="text-[#7C3AED] font-bold text-[13px] hover:underline">
                    View Headlines
                </button>
            </div>
        </div>
    )
}
