import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Image as ImageIcon, 
  Type, 
  RefreshCw, 
  Download, 
  MoreHorizontal,
  ThumbsUp,
  MessageSquare,
  Share2,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';

export const AdCreativesPage: React.FC = () => {
  // --- Ad State ---
  const [adState, setAdState] = useState({
    primaryText: "STOP scrolling if you're an Agency Owner stuck at $10k/mo. \n\nMost gurus tell you to \"just send more cold DMs\". \n\nBut let's be honest... nobody wants to be a spammer in 2024. \n\nThe \"Godfather Offer\" method flips the script entirely. Instead of chasing clients, we build a mousetrap so good they can't say no. \n\nI recorded a 7-minute raw breakdown of how we booked 42 calls last week without sending a single cold DM.",
    headline: "FREE TRAINING: The 7-Minute \"Godfather Offer\" Breakdown",
    description: "GETTIME.MONEY",
    cta: "Learn More",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop", // Placeholder "Pattern Interrupt"
    likes: 428,
    comments: 64
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');

  // --- Handlers ---
  const handleChange = (field: string, value: any) => {
    setAdState({ ...adState, [field]: value });
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Helper to truncate text for the "See More" effect
  const getTruncatedText = (text: string, limit: number = 180) => {
    if (text.length <= limit) return text;
    return text.substring(0, limit) + "...";
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto font-sans h-full flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col items-center mb-10 text-center shrink-0">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold">
            Ad Creatives
          </span>
        </div>

        <h1 className="text-[26px] font-bold text-slate-900 mb-3 tracking-tight">
          Direct Response Ad Builder
        </h1>
        
        <p className="text-slate-500 text-[13px] leading-relaxed mb-8 max-w-2xl mx-auto">
          Design high-converting "native" social ads. Focus on the hook, the pattern interrupt, and the click.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 flex-1 min-h-0">
        
        {/* LEFT: Editor Panel */}
        <div className="w-full xl:w-[500px] shrink-0 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-fit">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <Type size={18} className="text-slate-400" />
                    Ad Copy & Creative
                </h3>
                <div className="flex gap-2">
                    <button className="p-2 hover:bg-slate-200 rounded text-slate-400 transition-colors" title="Reset">
                        <RefreshCw size={14} />
                    </button>
                </div>
            </div>
            
            <div className="p-6 space-y-6 overflow-y-auto max-h-[800px]">
                
                {/* Primary Text (The Hook) */}
                <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">
                        Primary Text (The Hook)
                    </label>
                    <div className="relative">
                        <textarea 
                            rows={8}
                            value={adState.primaryText}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('primaryText', e.target.value)}
                            className="w-full p-3 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-[#0EB869] focus:ring-2 focus:ring-[#0EB869]/10 resize-none leading-relaxed"
                            placeholder="Call out the avatar, state the pain, hint at the solution..."
                        />
                        <div className="absolute bottom-3 right-3 text-[10px] font-bold text-slate-400 bg-white/80 px-2 py-1 rounded">
                            {adState.primaryText.length} chars
                        </div>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2">
                        Tip: Start with a strong "Pattern Interrupt" statement or question.
                    </p>
                </div>

                {/* Visual */}
                <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">
                        Visual Asset (Pattern Interrupt)
                    </label>
                    <div className="flex gap-2 mb-3">
                         <input 
                            type="text" 
                            value={adState.image}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('image', e.target.value)}
                            className="flex-1 p-2.5 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:border-[#0EB869]"
                            placeholder="Image URL..."
                        />
                        <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-200">
                            Upload
                        </button>
                    </div>
                    <div className="h-32 w-full bg-slate-100 rounded-lg border border-slate-200 overflow-hidden relative group cursor-pointer">
                        <img src={adState.image} alt="Preview" className="w-full h-full object-cover opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                            <span className="bg-white px-3 py-1.5 rounded-full text-xs font-bold shadow-sm flex items-center gap-2">
                                <ImageIcon size={14} /> Change Image
                            </span>
                        </div>
                    </div>
                </div>

                {/* Headline (The Godfather Offer) */}
                <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">
                        Headline (Bold Text)
                    </label>
                    <input 
                        type="text" 
                        value={adState.headline}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('headline', e.target.value)}
                        className="w-full p-3 border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:border-[#0EB869]"
                    />
                </div>

                {/* CTA Button */}
                <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-[13px] font-bold text-slate-700 mb-2">
                            Call To Action
                        </label>
                        <select 
                            value={adState.cta}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange('cta', e.target.value)}
                            className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:border-[#0EB869]"
                        >
                            <option>Learn More</option>
                            <option>Sign Up</option>
                            <option>Download</option>
                            <option>Book Now</option>
                            <option>Apply Now</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-[13px] font-bold text-slate-700 mb-2">
                            Link Description
                        </label>
                        <input 
                            type="text" 
                            value={adState.description}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('description', e.target.value)}
                            className="w-full p-3 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:border-[#0EB869]"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-slate-100 flex gap-3">
                     <button className="flex-1 py-3 bg-[#0EB869] text-white text-sm font-bold rounded-lg hover:bg-[#0B9655] shadow-sm flex items-center justify-center gap-2">
                        <Download size={16} /> Save Creative
                    </button>
                </div>

            </div>
        </div>

        {/* RIGHT: Preview (The Native Feed) */}
        <div className="flex-1 bg-[#F0F2F5] rounded-xl border border-slate-200 shadow-inner p-8 flex flex-col relative overflow-hidden items-center justify-center">
            
            {/* Device Toggles */}
            <div className="absolute top-6 right-6 z-20 flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
                <button 
                    onClick={() => setPreviewDevice('mobile')}
                    className={`p-2 rounded ${previewDevice === 'mobile' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    <Smartphone size={18} />
                </button>
                <button 
                    onClick={() => setPreviewDevice('desktop')}
                    className={`p-2 rounded ${previewDevice === 'desktop' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    <Monitor size={18} />
                </button>
            </div>

            {/* THE AD CARD */}
            <div 
                className={`bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 flex flex-col
                    ${previewDevice === 'mobile' ? 'w-[375px]' : 'w-[500px]'}
                `}
            >
                {/* Ad Header */}
                <div className="p-3 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                        {/* Profile Pic Placeholder */}
                        <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center overflow-hidden">
                             <div className="w-full h-full bg-gradient-to-br from-[#0EB869] to-[#86EFAC]"></div>
                        </div>
                        <div>
                            <div className="text-[13px] font-bold text-slate-900 leading-tight">
                                KP3 Direct Response
                            </div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-1">
                                Sponsored <span className="text-[8px]">•</span> <Globe size={10} />
                            </div>
                        </div>
                    </div>
                    <div className="text-slate-500">
                        <MoreHorizontal size={20} />
                    </div>
                </div>

                {/* Primary Text */}
                <div className="px-3 pb-3 text-[14px] text-slate-900 whitespace-pre-wrap leading-normal font-normal">
                    {isExpanded ? adState.primaryText : getTruncatedText(adState.primaryText)}
                    {adState.primaryText.length > 180 && !isExpanded && (
                        <span 
                            onClick={toggleExpand}
                            className="text-slate-500 font-semibold cursor-pointer hover:underline ml-1"
                        >
                            See more
                        </span>
                    )}
                </div>

                {/* Visual Area (Pattern Interrupt) */}
                <div className={`w-full bg-slate-100 relative ${previewDevice === 'mobile' ? 'aspect-[4/5]' : 'aspect-video'}`}>
                    <img 
                        src={adState.image} 
                        alt="Ad Visual" 
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* CTA Bar / Headline Section */}
                <div className="bg-[#F0F2F5] px-3 py-3 flex items-center justify-between border-t border-slate-100">
                    <div className="flex-1 pr-4 min-w-0">
                        <div className="text-[11px] text-slate-500 uppercase tracking-wide truncate mb-0.5">
                            {adState.description}
                        </div>
                        <div className="text-[16px] font-bold text-slate-900 leading-tight truncate">
                            {adState.headline}
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-[#E4E6EB] text-slate-900 text-[13px] font-bold rounded hover:bg-[#D8DADF] transition-colors whitespace-nowrap shrink-0">
                        {adState.cta}
                    </button>
                </div>

                {/* Social Proof Footer */}
                <div className="px-3 py-2 border-t border-slate-100 flex items-center justify-between text-slate-500">
                     <div className="flex items-center gap-1.5 text-[12px]">
                         <div className="flex -space-x-1">
                             <div className="w-4 h-4 rounded-full bg-[#1877F2] flex items-center justify-center border border-white z-10">
                                 <ThumbsUp size={8} className="text-white" fill="currentColor" />
                             </div>
                             <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center border border-white">
                                <span className="text-[8px] text-white">❤️</span>
                             </div>
                         </div>
                         <span>{adState.likes}</span>
                     </div>
                     <div className="text-[12px] flex gap-3">
                         <span>{adState.comments} Comments</span>
                         <span>24 Shares</span>
                     </div>
                </div>

                {/* Action Buttons (Fake) */}
                <div className="px-2 py-1 border-t border-slate-100 flex items-center justify-between">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 text-slate-500 hover:bg-slate-50 rounded text-[13px] font-medium">
                        <ThumbsUp size={16} /> Like
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 text-slate-500 hover:bg-slate-50 rounded text-[13px] font-medium">
                        <MessageSquare size={16} /> Comment
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 text-slate-500 hover:bg-slate-50 rounded text-[13px] font-medium">
                        <Share2 size={16} /> Share
                    </button>
                </div>

            </div>

        </div>

      </div>
    </div>
  );
};