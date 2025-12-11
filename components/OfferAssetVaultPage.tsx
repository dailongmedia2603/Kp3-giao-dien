import React from 'react';
import { 
  Home, 
  ChevronRight, 
  Palette, 
  Book, 
  Star, 
  FileText, 
  Search, 
  Plus,
  Folder
} from 'lucide-react';

// Mock Data
const ASSET_CATEGORIES = [
  { name: 'Brand Kits', icon: Palette, count: 2, color: 'blue' },
  { name: 'Lead Magnets (Ebooks)', icon: Book, count: 5, color: 'purple' },
  { name: 'Testimonials', icon: Star, count: 18, color: 'amber' },
  { name: 'Case Studies', icon: FileText, count: 3, color: 'green' },
];

export const OfferAssetVaultPage: React.FC = () => {
  return (
    <div className="p-8 max-w-[1400px] mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold">
            Offer Asset Vault
          </span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
          Offer Asset Vault
        </h1>
        <p className="text-slate-500 text-[15px] leading-relaxed mb-8 max-w-2xl mx-auto">
          A central library for your marketing assets. Store logos, testimonials, lead magnets, and case studies.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex justify-between items-center mb-8">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search assets..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0EB869]/20 focus:border-[#0EB869] text-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#0EB869] text-white text-xs font-bold rounded-lg hover:bg-[#0B9655] shadow-sm">
          <Plus size={14} /> Upload New Asset
        </button>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ASSET_CATEGORIES.map(category => {
          const colors = {
            blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'hover:border-blue-300' },
            purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'hover:border-purple-300' },
            amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'hover:border-amber-300' },
            green: { bg: 'bg-green-50', text: 'text-green-600', border: 'hover:border-green-300' },
          };
          const style = colors[category.color as keyof typeof colors];
          return (
            <div key={category.name} className={`bg-white border border-slate-200 rounded-xl p-5 shadow-sm transition-all cursor-pointer ${style.border} hover:shadow-lg`}>
              <div className="flex justify-between items-start mb-8">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${style.bg}`}>
                  <category.icon size={20} className={style.text} />
                </div>
                <span className="font-bold text-slate-400 text-lg">{category.count}</span>
              </div>
              <h3 className="font-bold text-slate-900">{category.name}</h3>
            </div>
          );
        })}
        <div className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-6 text-center text-slate-400 hover:border-[#0EB869] hover:text-[#0EB869] hover:bg-slate-50/50 transition-all cursor-pointer">
          <Folder size={24} className="mb-2" />
          <span className="text-sm font-bold">New Category</span>
        </div>
      </div>
    </div>
  );
};