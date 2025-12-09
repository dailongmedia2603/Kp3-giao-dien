import React, { useState, useEffect } from 'react';
import { X, Play, BookOpen, ExternalLink, Video, Layout, FileText, Settings, Target, Share2, Phone, Briefcase } from 'lucide-react';

interface SOPVideo {
  title: string;
  duration: string;
  url: string; // Embed URL usually
  description: string;
}

// --- MOCK DATA: Map view IDs to Video Lists ---
const SOP_DATABASE: Record<string, SOPVideo[]> = {
  'offer': [
    { 
      title: "Mastering Your Offer Strategy", 
      duration: "5:20", 
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      description: "Learn the fundamentals of structuring your service, physical, or digital offers for maximum conversion." 
    },
    { 
      title: "Product Categories 101", 
      duration: "3:10", 
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      description: "A quick guide on organizing your services into logical tabs for better management." 
    }
  ],
  'create-product': [
    { 
      title: "The Perfect Product Description", 
      duration: "6:15", 
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      description: "How to write descriptions that sell using the 4-part framework." 
    },
    { 
      title: "Unique Mechanisms Explained", 
      duration: "4:45", 
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      description: "Defining the 'Secret Sauce' of your product to stand out in the market." 
    }
  ],
  'dream-buyer': [
    { 
      title: "Psychological Profiling Deep Dive", 
      duration: "8:45", 
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      description: "Go beyond demographics. Learn to map fears, desires, and secret aspirations." 
    },
    { 
      title: "AI Research Lab Tutorial", 
      duration: "4:15", 
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      description: "How to use the auto-generate feature to build a profile in seconds using just an offer name." 
    }
  ],
  'hero-mechanisms': [
    { 
      title: "Visualizing Your Process", 
      duration: "6:30", 
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      description: "Step-by-step guide to creating a visual roadmap of your proprietary mechanism." 
    },
    { 
      title: "Naming Your Protocol", 
      duration: "3:20", 
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      description: "How to create catchy, high-value names for your 3-step system." 
    }
  ],
  'facebook-ads': [
    { 
      title: "Compliance-Safe Ad Copy", 
      duration: "10:00", 
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      description: "Tips on using the generator to avoid ad bans while maintaining high click-through rates." 
    },
    { 
      title: "Hook Generation Secrets", 
      duration: "5:30", 
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      description: "How to select the right 'Best Mode' settings for viral hooks." 
    }
  ],
  'direct-response': [
    { 
      title: "The 4 U's of Headlines", 
      duration: "7:10", 
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      description: "Urgent, Unique, Useful, Ultra-specific. How to apply these to your headline generation." 
    },
    { 
      title: "Subheadline Mastery", 
      duration: "4:00", 
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      description: "Writing the text that gets them to read the next line." 
    }
  ],
  'hvco': [
    { 
      title: "What is an HVCO?", 
      duration: "3:45", 
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      description: "Understanding High Value Content Offers and why they are the top of your funnel." 
    },
    { 
      title: "Titles that Get Downloads", 
      duration: "5:50", 
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      description: "Analyzing top performing lead magnet titles." 
    }
  ],
  'goal': [
    { 
      title: "The 4 Phases of Growth", 
      duration: "12:00", 
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      description: "Launch, Cook, Stabilize, Scale. Identifying where you are right now." 
    },
    { 
      title: "Setting KPI Targets", 
      duration: "6:20", 
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      description: "How to calculate realistic CPA and ROAS goals for your budget." 
    }
  ],
  'funnel-builder': [
    { 
      title: "Funnel Mapping 101", 
      duration: "15:00", 
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      description: "How to drag, drop, and connect nodes to simulate your customer journey." 
    },
    { 
      title: "Using the CPM Calculator Node", 
      duration: "4:30", 
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      description: "Projecting costs and traffic flow before you spend a dollar." 
    }
  ],
  'mini-tools': [
    { 
      title: "ROI Calculator Walkthrough", 
      duration: "8:10", 
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      description: "Deep dive into the advanced funnel projection tool." 
    },
    { 
      title: "Quick Utility Overview", 
      duration: "3:00", 
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      description: "How to use the various helper tools for quick tasks." 
    }
  ],
  'social-system': [
    { 
      title: "Content Repurposing Workflow", 
      duration: "9:20", 
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      description: "Turn one YouTube video into 10 pieces of content for TikTok, IG, and LinkedIn." 
    },
    { 
      title: "Platform Specific Scripts", 
      duration: "5:15", 
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      description: "Why you shouldn't post the same caption on every platform." 
    }
  ],
  'closer': [
    { 
      title: "The Samurai Sword Script", 
      duration: "14:40", 
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      description: "Mastering the specific sales script modules in the Script Hub." 
    },
    { 
      title: "Managing Your Pipeline", 
      duration: "6:00", 
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      description: "Best practices for moving deals from 'New Lead' to 'Closed Won'." 
    }
  ],
  'all-in-plan': [
    { 
      title: "The 5 Pillars of Business Health", 
      duration: "11:30", 
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      description: "Understanding Offer, Attraction, Conversion, Delivery, and Recurring." 
    },
    { 
      title: "Interpreting Your Health Score", 
      duration: "4:00", 
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      description: "What to do when your 'Conversion' pillar is lagging behind." 
    }
  ],
  'settings': [
    { 
      title: "Configuring Global Prompts", 
      duration: "5:00", 
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      description: "How to customize the AI's personality across the entire dashboard." 
    },
    { 
      title: "Team & Billing Management", 
      duration: "3:30", 
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      description: "Adding members and managing your subscription plan." 
    }
  ],
  'default': [
    { 
      title: "Dashboard Overview & Navigation", 
      duration: "2:00", 
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      description: "A quick tour of the entire KP3 dashboard ecosystem." 
    },
    { 
      title: "Getting Started Guide", 
      duration: "1:30", 
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
      description: "First steps to take after logging in." 
    }
  ]
};

interface SOPModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: string;
}

export const SOPModal: React.FC<SOPModalProps> = ({ isOpen, onClose, currentView }) => {
  const [activeVideo, setActiveVideo] = useState<SOPVideo | null>(null);

  // Determine which videos to show
  const videos = SOP_DATABASE[currentView] || SOP_DATABASE['default'];
  
  // Set default video when opening or changing view
  useEffect(() => {
    if (isOpen && videos.length > 0) {
      setActiveVideo(videos[0]);
    }
  }, [isOpen, currentView]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#E8FCF3] flex items-center justify-center text-[#0EB869]">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">SOP & Tutorials</h2>
              <p className="text-xs text-slate-500 font-medium">
                Guide for: <span className="uppercase text-[#0EB869] font-bold tracking-wide">{currentView.replace('-', ' ')}</span>
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-slate-50">
            
            {/* Main Video Player Area - Adjusted for proper aspect ratio */}
            <div className="flex-1 bg-black flex flex-col justify-center relative">
               <div className="w-full h-full flex items-center justify-center p-4 lg:p-8">
                  {activeVideo ? (
                    <div className="w-full max-w-5xl aspect-video bg-slate-900 shadow-2xl rounded-xl overflow-hidden relative border border-slate-800/50">
                        <iframe 
                            className="absolute inset-0 w-full h-full"
                            src={activeVideo.url} 
                            title={activeVideo.title}
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                    </div>
                  ) : (
                      <div className="text-slate-500 flex flex-col items-center">
                          <Video size={48} className="mb-2 opacity-20" />
                          <span>Select a video to play</span>
                      </div>
                  )}
               </div>
               
               {/* Video Title Bar overlay (Optional, or placed below) */}
               {activeVideo && (
                   <div className="bg-slate-900 border-t border-slate-800 p-6 shrink-0">
                       <h3 className="text-xl font-bold text-white mb-2">{activeVideo.title}</h3>
                       <p className="text-slate-400 text-sm leading-relaxed max-w-3xl">{activeVideo.description}</p>
                   </div>
               )}
            </div>

            {/* Sidebar List */}
            <div className="w-full lg:w-96 bg-white border-l border-slate-200 overflow-y-auto shrink-0 flex flex-col">
                <div className="p-5 flex-1">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Layout size={14} /> Available Guides ({videos.length})
                    </h3>
                    <div className="space-y-3">
                        {videos.map((video, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveVideo(video)}
                                className={`w-full text-left p-3 rounded-xl border transition-all duration-200 group flex gap-3
                                    ${activeVideo?.title === video.title 
                                        ? 'bg-[#E8FCF3] border-[#0EB869] shadow-sm ring-1 ring-[#0EB869]/20' 
                                        : 'bg-white border-slate-200 hover:border-[#86EFAC] hover:shadow-sm'
                                    }`}
                            >
                                <div className={`w-20 h-14 rounded-lg shrink-0 flex items-center justify-center relative overflow-hidden
                                    ${activeVideo?.title === video.title ? 'bg-white' : 'bg-slate-100'}
                                `}>
                                    {/* Thumbnail Placeholder */}
                                    <div className={`absolute inset-0 opacity-10 ${activeVideo?.title === video.title ? 'bg-[#0EB869]' : 'bg-slate-900'}`}></div>
                                    <Play size={20} className={activeVideo?.title === video.title ? 'text-[#0EB869]' : 'text-slate-400'} fill="currentColor" />
                                </div>
                                <div>
                                    <div className={`text-sm font-bold line-clamp-2 mb-1.5 leading-snug ${activeVideo?.title === video.title ? 'text-[#0EB869]' : 'text-slate-800'}`}>
                                        {video.title}
                                    </div>
                                    <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> 
                                        {video.duration}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-5 bg-slate-50 border-t border-slate-100">
                    <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                        <h4 className="text-indigo-900 font-bold text-sm mb-1">Need personal help?</h4>
                        <p className="text-indigo-600 text-xs mb-3">Book a 1-on-1 implementation call with our team.</p>
                        <button className="w-full py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2 transition-colors shadow-sm">
                            Book Call <ExternalLink size={12} />
                        </button>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};