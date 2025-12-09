import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Layout, 
  Type, 
  Image as ImageIcon, 
  MonitorPlay, 
  MousePointerClick, 
  Eye, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  RefreshCw, 
  Download
} from 'lucide-react';

export const LandingPageBuilder: React.FC = () => {
  // --- Landing Page State ---
  const [lpState, setLpState] = useState({
    eyebrow: "ATTENTION: For Agency Owners Who Want To Scale...",
    headline: "How To Add $50k-$100k/Mo In Recurring Revenue Without Sending A Single Cold DM",
    subheadline: "In this free 12-minute training, I reveal the exact 'Honey-Pot' mechanism used to flood our calendar with qualified leads.",
    ctaText: "WATCH THE FREE TRAINING NOW",
    ctaSubtext: "100% Free • No Credit Card Required",
    mediaType: 'vsl' as 'vsl' | 'book', // VSL or Book Mockup
    showTrustBar: true
  });

  const handleChange = (field: string, value: any) => {
    setLpState({ ...lpState, [field]: value });
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto font-sans h-full flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col items-center mb-10 text-center shrink-0">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold">
            Landing Pages
          </span>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
          High-Converting Funnel Builder
        </h1>
        
        <p className="text-slate-500 text-[15px] leading-relaxed mb-8 max-w-2xl mx-auto">
          Build aggressive "Direct Response" style landing pages optimized for cold traffic conversions.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 flex-1 min-h-0">
        
        {/* LEFT: Editor Panel */}
        <div className="w-full xl:w-[450px] shrink-0 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-fit">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <Layout size={18} className="text-slate-400" />
                    Page Editor
                </h3>
            </div>
            
            <div className="p-6 space-y-6 overflow-y-auto max-h-[800px]">
                
                {/* Eyebrow */}
                <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">
                        Attention Bar / Eyebrow
                    </label>
                    <input 
                        type="text" 
                        value={lpState.eyebrow}
                        onChange={(e) => handleChange('eyebrow', e.target.value)}
                        className="w-full p-3 border border-slate-200 rounded-lg text-sm text-red-600 font-bold focus:outline-none focus:border-[#0EB869] bg-red-50/30"
                    />
                </div>

                {/* Headline */}
                <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">
                        Main Headline (H1)
                    </label>
                    <textarea 
                        rows={4}
                        value={lpState.headline}
                        onChange={(e) => handleChange('headline', e.target.value)}
                        className="w-full p-3 border border-slate-200 rounded-lg text-lg font-black text-slate-900 focus:outline-none focus:border-[#0EB869] resize-none leading-tight"
                    />
                    <p className="text-[11px] text-slate-400 mt-2">
                        Tip: Capitalize Each Word For Maximum Impact.
                    </p>
                </div>

                {/* Subheadline */}
                <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">
                        Sub-Headline
                    </label>
                    <textarea 
                        rows={3}
                        value={lpState.subheadline}
                        onChange={(e) => handleChange('subheadline', e.target.value)}
                        className="w-full p-3 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 focus:outline-none focus:border-[#0EB869] resize-none"
                    />
                </div>

                {/* Media Toggle */}
                <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">
                        Hero Media Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        <button 
                            onClick={() => handleChange('mediaType', 'vsl')}
                            className={`p-3 rounded-lg border text-sm font-bold flex items-center justify-center gap-2 transition-all
                                ${lpState.mediaType === 'vsl' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200'}`}
                        >
                            <MonitorPlay size={16} /> VSL Video
                        </button>
                        <button 
                            onClick={() => handleChange('mediaType', 'book')}
                            className={`p-3 rounded-lg border text-sm font-bold flex items-center justify-center gap-2 transition-all
                                ${lpState.mediaType === 'book' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200'}`}
                        >
                            <ImageIcon size={16} /> 3D Book
                        </button>
                    </div>
                </div>

                {/* CTA */}
                <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">
                        Call To Action Button
                    </label>
                    <input 
                        type="text" 
                        value={lpState.ctaText}
                        onChange={(e) => handleChange('ctaText', e.target.value)}
                        className="w-full p-3 border border-slate-200 rounded-lg text-sm font-bold text-white bg-red-600 focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-200"
                    />
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-100 flex gap-3">
                     <button className="flex-1 py-3 bg-[#0EB869] text-white text-sm font-bold rounded-lg hover:bg-[#0B9655] shadow-sm flex items-center justify-center gap-2">
                        <Download size={16} /> Export HTML
                    </button>
                </div>

            </div>
        </div>

        {/* RIGHT: Live Preview (The Direct Response Page) */}
        <div className="flex-1 bg-[#E5E7EB] rounded-xl border border-slate-300 shadow-inner p-4 lg:p-8 overflow-y-auto relative flex justify-center">
            
            {/* Browser Frame */}
            <div className="w-full max-w-[800px] bg-white shadow-2xl min-h-[1000px] flex flex-col font-sans">
                
                {/* 1. Header (Distraction Free) */}
                <div className="h-20 border-b border-slate-100 flex items-center justify-center bg-white sticky top-0 z-10">
                    <span className="text-2xl font-[900] tracking-tighter text-slate-900">
                        GETTIME.<span className="text-[#0EB869]">MONEY</span>
                    </span>
                </div>

                {/* 2. Attention Bar */}
                <div className="bg-red-600 px-4 py-2 text-center">
                    <p className="text-white text-xs md:text-sm font-bold uppercase tracking-wide">
                        {lpState.eyebrow}
                    </p>
                </div>

                {/* 3. Hero Section */}
                <div className="px-6 py-10 md:px-12 md:py-16 text-center max-w-4xl mx-auto">
                    
                    {/* H1 */}
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-[900] text-slate-900 leading-[1.1] mb-6 uppercase">
                        {/* Highlight logic specifically for "Without" or similar keywords could go here, for now just rendering text */}
                        <span className="bg-yellow-300 px-2 box-decoration-clone">
                           {lpState.headline}
                        </span>
                    </h1>

                    {/* Subhead */}
                    <p className="text-lg md:text-xl text-slate-700 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                        {lpState.subheadline}
                    </p>

                    {/* Media (VSL or Book) */}
                    <div className="mb-10 max-w-3xl mx-auto relative group cursor-pointer">
                        {lpState.mediaType === 'vsl' ? (
                            <div className="aspect-video bg-black rounded-lg shadow-2xl border-4 border-white flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                {/* Play Button Pulse */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        <div className="w-16 h-16 bg-red-600 rounded-full animate-ping absolute opacity-50"></div>
                                        <MonitorPlay className="text-white ml-1" size={32} fill="currentColor" />
                                    </div>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 text-left">
                                    <div className="inline-block px-2 py-1 bg-red-600 text-white text-[10px] font-bold uppercase rounded mb-2">Live Training</div>
                                    <p className="text-white font-bold text-sm md:text-lg">Unlocking The Honey-Pot Mechanism</p>
                                </div>
                            </div>
                        ) : (
                            <div className="aspect-[4/3] bg-slate-100 rounded-lg flex items-center justify-center border-2 border-slate-100 relative">
                                <div className="w-48 h-64 bg-white shadow-[20px_20px_60px_rgba(0,0,0,0.3)] border-l-8 border-slate-900 flex flex-col relative transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
                                    <div className="bg-red-600 h-1/2 flex items-center justify-center p-4">
                                        <span className="text-white font-black text-2xl uppercase leading-none text-center">The KP3 Method</span>
                                    </div>
                                    <div className="h-1/2 flex items-end justify-center pb-4">
                                         <span className="text-slate-900 font-bold uppercase tracking-widest text-xs">Free Report</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* CTA Section */}
                    <div className="max-w-xl mx-auto">
                        <div className="bg-yellow-50 border-2 border-yellow-200 border-dashed rounded-xl p-6">
                            <p className="text-slate-900 font-bold text-sm mb-4 uppercase">
                                Enter your email below to get instant access:
                            </p>
                            
                            <div className="flex flex-col gap-3">
                                <input 
                                    type="email" 
                                    placeholder="Enter your best email address..." 
                                    className="w-full p-4 border border-slate-300 rounded-lg text-slate-600 focus:outline-none focus:border-slate-500"
                                />
                                <button className="w-full py-4 bg-red-600 text-white text-xl md:text-2xl font-[900] uppercase rounded-lg shadow-lg hover:bg-red-700 hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3">
                                    {lpState.ctaText} <ArrowRight strokeWidth={4} size={24} />
                                </button>
                            </div>
                            
                            <div className="flex items-center justify-center gap-4 mt-4 text-[11px] text-slate-500 font-medium">
                                <span className="flex items-center gap-1"><Lock size={12} /> Secure 256-Bit SSL</span>
                                <span className="flex items-center gap-1">{lpState.ctaSubtext}</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* 4. Trust Bar */}
                {lpState.showTrustBar && (
                    <div className="bg-slate-50 py-8 border-t border-slate-200">
                        <div className="max-w-4xl mx-auto px-6">
                            <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                                As Seen In Major Publications
                            </p>
                            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-40 grayscale">
                                {/* Mock Logos */}
                                <div className="text-2xl font-serif font-bold italic">Forbes</div>
                                <div className="text-xl font-sans font-black tracking-tight">Entrepreneur</div>
                                <div className="text-xl font-serif font-bold">Inc.</div>
                                <div className="text-xl font-sans font-bold">Business Insider</div>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* 5. Content / Bullets (Preview Only) */}
                <div className="py-16 px-6 max-w-3xl mx-auto">
                    <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center uppercase">Here Is What You Will Discover:</h3>
                    <div className="space-y-4">
                        {[1,2,3].map((i) => (
                            <div key={i} className="flex items-start gap-4">
                                <CheckCircle2 className="text-[#0EB869] shrink-0 mt-1" size={24} />
                                <div>
                                    <span className="font-bold text-slate-900 text-lg">Secret #{i}: The "Invisible" Funnel.</span>
                                    <span className="text-slate-600 text-lg"> How to set up a system that nurtures leads while you sleep, without sounding salesy or desperate.</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-auto py-8 text-center text-xs text-slate-400 border-t border-slate-100">
                    <p>&copy; 2024 GETTIME.MONEY. All Rights Reserved.</p>
                    <div className="flex justify-center gap-4 mt-2">
                        <span>Privacy Policy</span>
                        <span>Terms of Service</span>
                    </div>
                </div>

            </div>

        </div>

      </div>
    </div>
  );
};