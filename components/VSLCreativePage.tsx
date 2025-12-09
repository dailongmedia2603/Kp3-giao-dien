import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  ChevronRight, 
  Play, 
  Volume2, 
  Lock, 
  Clock, 
  Settings, 
  Layout, 
  Type, 
  Image as ImageIcon, 
  MousePointerClick,
  RefreshCw,
  Eye,
  ShieldCheck,
  Award
} from 'lucide-react';

export const VSLCreativePage: React.FC = () => {
  // --- Configuration State ---
  const [config, setConfig] = useState({
    headline: "WARNING: Do Not Watch This If You Hate Money",
    subheadline: "Discover the 'Underground' System We Used To Scale To 8-Figures In Record Time",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder for demo
    thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop",
    ctaDelay: 5, // seconds (usually minutes in real life, e.g., 300s)
    ctaText: "YES! I WANT TO SCALE NOW",
    ctaSubtext: "100% Free Strategy Session • Limited Spots",
  });

  // --- Playback State ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isCTAVisible, setIsCTAVisible] = useState(false);

  // --- Timer Logic for Delayed CTA ---
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setElapsedTime((prev) => {
          const next = prev + 1;
          // Check if we passed the threshold
          if (next >= config.ctaDelay) {
            setIsCTAVisible(true);
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, config.ctaDelay]);

  // --- Handlers ---
  const handleStartPlayback = () => {
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setElapsedTime(0);
    setIsCTAVisible(false);
  };

  const handleChange = (field: string, value: any) => {
    setConfig({ ...config, [field]: value });
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto font-sans h-full flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col items-center mb-10 text-center shrink-0">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold">
            VSL Creative
          </span>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
          Video Sales Letter Builder
        </h1>
        
        <p className="text-slate-500 text-[15px] leading-relaxed mb-8 max-w-2xl mx-auto">
          Create high-retention VSL pages with "Tap to Unmute" overlays and timed CTA buttons.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 flex-1 min-h-0">
        
        {/* LEFT: Editor Panel */}
        <div className="w-full xl:w-[450px] shrink-0 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-fit">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <Settings size={18} className="text-slate-400" />
                    VSL Configuration
                </h3>
                <button 
                  onClick={handleReset}
                  className="text-xs font-bold text-[#0EB869] flex items-center gap-1 hover:underline"
                >
                  <RefreshCw size={12} /> Reset Preview
                </button>
            </div>
            
            <div className="p-6 space-y-6 overflow-y-auto max-h-[800px]">
                
                {/* Headline Section */}
                <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">
                        Headline (H1)
                    </label>
                    <textarea 
                        rows={3}
                        value={config.headline}
                        onChange={(e) => handleChange('headline', e.target.value)}
                        className="w-full p-3 border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:border-[#0EB869] resize-none"
                    />
                </div>

                {/* Video & Thumbnail */}
                <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">
                        Thumbnail URL
                    </label>
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            value={config.thumbnail}
                            onChange={(e) => handleChange('thumbnail', e.target.value)}
                            className="flex-1 p-3 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:border-[#0EB869]"
                        />
                        <button className="p-3 bg-slate-100 rounded-lg hover:bg-slate-200">
                            <ImageIcon size={18} className="text-slate-600" />
                        </button>
                    </div>
                </div>

                {/* Delayed CTA Logic */}
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <Clock size={16} className="text-amber-600" />
                        <span className="text-sm font-bold text-amber-900">Delayed Button Logic</span>
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-[11px] font-bold text-amber-800 uppercase tracking-wide mb-1">
                            Reveal Button After (Seconds)
                        </label>
                        <input 
                            type="number" 
                            value={config.ctaDelay}
                            onChange={(e) => handleChange('ctaDelay', Number(e.target.value))}
                            className="w-full p-2 border border-amber-200 rounded bg-white text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400"
                        />
                        <div className="flex justify-between mt-1">
                           <span className="text-[10px] text-amber-600/70">Current Timer: {elapsedTime}s</span>
                           <span className="text-[10px] text-amber-600/70">{isCTAVisible ? 'VISIBLE' : 'HIDDEN'}</span>
                        </div>
                    </div>

                    <div>
                         <label className="block text-[11px] font-bold text-amber-800 uppercase tracking-wide mb-1">
                            Button Text
                        </label>
                        <input 
                            type="text" 
                            value={config.ctaText}
                            onChange={(e) => handleChange('ctaText', e.target.value)}
                            className="w-full p-2 border border-amber-200 rounded bg-white text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400"
                        />
                    </div>
                </div>

            </div>
        </div>

        {/* RIGHT: Live Preview */}
        <div className="flex-1 bg-[#F1F5F9] rounded-xl border border-slate-300 shadow-inner p-4 lg:p-8 overflow-y-auto flex justify-center items-start">
            
            {/* The VSL Page Container */}
            <div className="w-full max-w-[900px] bg-white shadow-2xl min-h-[800px] flex flex-col font-sans relative">
                
                {/* 1. Header Area */}
                <div className="px-6 py-8 md:px-12 md:py-10 text-center bg-white">
                    <div className="inline-block bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider mb-4 rounded-sm">
                        Attention
                    </div>
                    <h1 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight mb-4 uppercase">
                        {config.headline}
                    </h1>
                    <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
                        {config.subheadline}
                    </p>
                </div>

                {/* 2. The VSL Player */}
                <div className="w-full max-w-4xl mx-auto px-4 md:px-8 mb-8">
                    <div className="relative aspect-video bg-black rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-800 overflow-hidden group">
                        
                        {!isPlaying ? (
                            /* State 1: Thumbnail + Unmute Overlay */
                            <div 
                                className="absolute inset-0 cursor-pointer"
                                onClick={handleStartPlayback}
                            >
                                <img 
                                    src={config.thumbnail} 
                                    alt="Video Thumbnail" 
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                                />
                                
                                {/* The "Click to Unmute" Button */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                                    <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/50 shadow-[0_0_30px_rgba(255,255,255,0.3)] animate-pulse hover:scale-105 transition-transform duration-300">
                                        <Volume2 size={40} className="text-white fill-white" />
                                    </div>
                                    <div className="mt-4 bg-white text-slate-900 px-4 py-2 rounded font-bold text-sm uppercase tracking-widest shadow-lg">
                                        Tap to Unmute
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* State 2: Video Playing (Simulated) */
                            <div className="absolute inset-0 bg-black flex items-center justify-center">
                                {/* Simulated Embed */}
                                <iframe 
                                    width="100%" 
                                    height="100%" 
                                    src={`${config.videoUrl}?autoplay=1&mute=0&controls=1&modestbranding=1`} 
                                    title="VSL Player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                        )}
                        
                    </div>

                    {/* Trust Area below video */}
                    <div className="flex items-center justify-center gap-6 mt-4 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                            <Lock size={12} /> Secure 256-bit SSL
                        </div>
                        <div className="h-3 w-px bg-slate-300"></div>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                            <Eye size={12} /> 1,204 watching now
                        </div>
                    </div>
                </div>

                {/* 3. The Delayed Call To Action */}
                <div className={`
                    px-6 py-8 md:px-12 text-center transition-all duration-1000 ease-in-out
                    ${isCTAVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
                `}>
                    <div className="max-w-xl mx-auto">
                        {/* Animated Arrows */}
                        <div className="flex justify-center gap-2 mb-2 animate-bounce">
                            <ChevronRight className="rotate-90 text-red-500" />
                            <ChevronRight className="rotate-90 text-red-500" />
                            <ChevronRight className="rotate-90 text-red-500" />
                        </div>

                        <button className="w-full py-5 bg-red-600 text-white text-xl md:text-2xl font-[900] uppercase rounded shadow-[0_4px_14px_0_rgba(220,38,38,0.39)] hover:bg-red-700 hover:shadow-[0_6px_20px_rgba(220,38,38,0.23)] hover:-translate-y-1 transition-all">
                            {config.ctaText}
                        </button>
                        
                        <div className="flex items-center justify-center gap-2 mt-4 text-slate-500 text-xs font-medium">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            {config.ctaSubtext}
                        </div>

                        {/* Guarantee Badge */}
                        <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col items-center">
                             <div className="w-16 h-16 mb-2 text-slate-300">
                                <ShieldCheck size={64} strokeWidth={1} />
                             </div>
                             <h4 className="font-bold text-slate-700 text-sm">30-Day Money Back Guarantee</h4>
                             <p className="text-xs text-slate-400 max-w-sm mt-1">If you don't see results, we don't want your money. Simple as that.</p>
                        </div>
                    </div>
                </div>

                {/* 4. Footer */}
                <div className="mt-auto py-6 bg-slate-50 border-t border-slate-200 text-center text-[10px] text-slate-400">
                    <p>Copyright © 2024 Direct Response Inc. All Rights Reserved.</p>
                    <div className="flex justify-center gap-4 mt-2">
                        <span>Terms & Conditions</span>
                        <span>Privacy Policy</span>
                        <span>Earnings Disclaimer</span>
                    </div>
                </div>

            </div>

        </div>

      </div>
    </div>
  );
};
