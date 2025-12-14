import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Youtube, 
  Facebook, 
  Instagram, 
  Video, 
  AtSign,
  Plus,
  Play,
  Hash,
  MessageCircle,
  BarChart2,
  Share2,
  Image as ImageIcon,
  PenTool,
  Film,
  Linkedin,
  Twitter
} from 'lucide-react';

// Custom Icons for TikTok
const TikTokIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export const SocialSystemPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'youtube' | 'tiktok' | 'instagram' | 'facebook' | 'linkedin' | 'x'>('youtube');

  return (
    <div className="p-8 max-w-[1400px] mx-auto font-sans">
      
      {/* Header Section */}
      <div className="flex flex-col items-center mb-8 text-center">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8F5E9] text-[#16A349] px-3 py-1 rounded text-xs font-bold">
            Social System
          </span>
        </div>

        <h1 className="text-[26px] font-bold text-slate-900 mb-3 tracking-tight">
          Social Media Ecosystem
        </h1>
        
        <p className="text-slate-500 text-[13px] leading-relaxed mb-8 max-w-2xl mx-auto">
          Manage your content strategy, generate scripts, and track performance across all your organic channels.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-slate-100/50 rounded-xl border border-slate-200 p-1.5 flex mb-8 gap-1 overflow-x-auto max-w-5xl mx-auto">
        <TabButton 
          isActive={activeTab === 'youtube'} 
          onClick={() => setActiveTab('youtube')} 
          icon={Youtube} 
          label="YouTube" 
        />
        <TabButton 
          isActive={activeTab === 'tiktok'} 
          onClick={() => setActiveTab('tiktok')} 
          icon={TikTokIcon} 
          label="TikTok" 
        />
        <TabButton 
          isActive={activeTab === 'instagram'} 
          onClick={() => setActiveTab('instagram')} 
          icon={Instagram} 
          label="Instagram" 
        />
        <TabButton 
          isActive={activeTab === 'facebook'} 
          onClick={() => setActiveTab('facebook')} 
          icon={Facebook} 
          label="Facebook" 
        />
        <TabButton 
          isActive={activeTab === 'linkedin'} 
          onClick={() => setActiveTab('linkedin')} 
          icon={Linkedin} 
          label="LinkedIn" 
        />
        <TabButton 
          isActive={activeTab === 'x'} 
          onClick={() => setActiveTab('x')} 
          icon={Twitter} 
          label="X" 
        />
      </div>

      {/* Action Bar */}
      <div className="flex justify-end mb-6">
        <button 
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0EB869] text-white text-[14px] font-bold hover:bg-[#0B9655] transition-colors shadow-sm"
        >
            <Plus size={18} strokeWidth={3} />
            Create New Content
        </button>
      </div>

      {/* Content Area */}
      <div className="animate-in fade-in duration-300">
        
        {activeTab === 'youtube' && (
          <PlatformContent 
            title="YouTube Command Center"
            description="Optimize your long-form content and Shorts for maximum retention."
            stats={[
                { label: 'Subscribers', value: '12.4K', change: '+5%' },
                { label: 'Avg View Duration', value: '4:12', change: '+12%' },
                { label: 'CTR', value: '6.8%', change: '-1%' }
            ]}
            tools={[
                { title: 'Video Script Generator', desc: 'Generate full-length video scripts with hooks, body, and CTA.', icon: PenTool },
                { title: 'Thumbnail Analyzer', desc: 'AI analysis of your thumbnails to predict CTR.', icon: ImageIcon },
                { title: 'SEO Title & Description', desc: 'Optimize your metadata for search rankings.', icon: Hash },
                { title: 'Shorts Repurposer', desc: 'Turn long-form highlights into viral Shorts scripts.', icon: Film },
            ]}
          />
        )}

        {activeTab === 'tiktok' && (
           <PlatformContent 
           title="TikTok Viral Lab"
           description="Catch trends early and create high-engagement short videos."
           stats={[
               { label: 'Followers', value: '45.2K', change: '+22%' },
               { label: 'Total Likes', value: '1.2M', change: '+8%' },
               { label: 'Profile Views', value: '8.5K', change: '+15%' }
           ]}
           tools={[
               { title: 'Viral Hook Generator', desc: 'Create 3-second hooks that stop the scroll.', icon: Video },
               { title: 'Trending Sound Finder', desc: 'Identify rising audio trends in your niche.', icon: BarChart2 },
               { title: 'Script to Video', desc: 'AI script writing for 60s educational content.', icon: PenTool },
           ]}
         />
        )}

        {activeTab === 'instagram' && (
           <PlatformContent 
           title="Instagram Growth Hub"
           description="Curate your aesthetic and engage your community via Reels and Stories."
           stats={[
               { label: 'Followers', value: '8,902', change: '+2%' },
               { label: 'Reach', value: '24K', change: '+5%' },
               { label: 'Engagement Rate', value: '4.2%', change: '+0.5%' }
           ]}
           tools={[
               { title: 'Reel Script Generator', desc: 'Scripts optimized for Instagram algorithm.', icon: Film },
               { title: 'Carousel Builder', desc: 'Structure educational carousels that drive saves.', icon: ImageIcon },
               { title: 'Caption Writer', desc: 'Engaging captions with call-to-actions.', icon: PenTool },
               { title: 'Hashtag Grouping', desc: 'Generate optimized hashtag sets.', icon: Hash },
           ]}
         />
        )}

        {activeTab === 'facebook' && (
           <PlatformContent 
           title="Facebook Community Manager"
           description="Nurture your groups and drive organic traffic to your offers."
           stats={[
               { label: 'Page Likes', value: '5.1K', change: '+1%' },
               { label: 'Group Members', value: '2,300', change: '+10%' },
               { label: 'Link Clicks', value: '450', change: '+3%' }
           ]}
           tools={[
               { title: 'Group Post Generator', desc: 'Engagement bait questions and value posts.', icon: MessageCircle },
               { title: 'Ad Copywriter', desc: 'Organic posts designed to test ad angles.', icon: PenTool },
               { title: 'Event Description', desc: 'Compelling copy for your upcoming webinars.', icon: CalendarIcon },
           ]}
         />
        )}

        {activeTab === 'linkedin' && (
           <PlatformContent 
           title="LinkedIn Authority Builder"
           description="Establish professional presence and generate B2B leads."
           stats={[
               { label: 'Connections', value: '5,000+', change: '+10%' },
               { label: 'Post Views', value: '150K', change: '+30%' },
               { label: 'Inbound Leads', value: '12', change: '+2' }
           ]}
           tools={[
               { title: 'Carousel Post Generator', desc: 'Create engaging PDF-style carousels.', icon: ImageIcon },
               { title: 'Poll Creator', desc: 'Generate polls to boost engagement.', icon: BarChart2 },
               { title: 'Article Writer', desc: 'Draft long-form articles to showcase expertise.', icon: PenTool },
           ]}
         />
        )}

        {activeTab === 'x' && (
           <PlatformContent 
           title="X (Twitter) Viral Engine"
           description="Craft viral threads and high-engagement short-form content."
           stats={[
               { label: 'Followers', value: '25.7K', change: '+15%' },
               { label: 'Impressions', value: '2.1M', change: '+50%' },
               { label: 'Link Clicks', value: '5.2K', change: '+25%' }
           ]}
           tools={[
               { title: 'Viral Thread Hook', desc: 'Generate the first tweet of a thread that gets clicks.', icon: AtSign },
               { title: 'Meme Creator', desc: 'Create relevant memes for your niche.', icon: ImageIcon },
               { title: 'Short-form Video Script', desc: 'Write scripts for 1-minute videos.', icon: Film },
           ]}
         />
        )}

      </div>
      
      <div className="h-10"></div>
    </div>
  );
};

// --- Sub-components ---

const TabButton = ({ isActive, onClick, icon: Icon, label }: { isActive: boolean, onClick: () => void, icon: any, label: string }) => (
  <button 
    onClick={onClick}
    className={`flex-1 min-w-[100px] py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-[13px] font-bold transition-all duration-200 whitespace-nowrap
      ${isActive 
        ? 'bg-white text-[#0EB869] shadow-sm ring-1 ring-slate-200' 
        : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'
      }`}
  >
    <Icon size={18} strokeWidth={2} />
    {label}
  </button>
);

const PlatformContent = ({ title, description, stats, tools }: { title: string, description: string, stats: any[], tools: any[] }) => (
    <div className="space-y-6">
        {/* Banner / Stats Row */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 bg-[#E8F5E9] border border-[#86EFAC] rounded-xl p-6 flex flex-col justify-center">
                <h2 className="text-xl font-bold text-[#0EB869] mb-2">{title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
            </div>
            {stats.map((stat, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-center">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1">{stat.label}</div>
                    <div className="flex items-end gap-3">
                        <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                        <div className={`text-xs font-bold mb-1 ${stat.change.includes('+') ? 'text-[#0EB869]' : 'text-red-500'}`}>
                            {stat.change}
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Tools Grid */}
        <h3 className="text-lg font-bold text-slate-900 mt-8 mb-4 flex items-center gap-2">
            <Wrench size={18} className="text-[#0EB869]" />
            Platform Tools
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.map((tool, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#86EFAC] transition-all cursor-pointer p-6 group">
                     <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-4 group-hover:bg-[#E8F5E9] group-hover:text-[#0EB869] group-hover:border-[#86EFAC] transition-colors">
                        <tool.icon size={20} />
                     </div>
                     <h4 className="text-[15px] font-bold text-slate-900 mb-2">{tool.title}</h4>
                     <p className="text-[13px] text-slate-500 leading-relaxed mb-4">{tool.desc}</p>
                     <div className="text-[12px] font-bold text-[#0EB869] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Launch Tool <ChevronRight size={12} />
                     </div>
                </div>
            ))}
             {/* Add New Placeholder */}
             <div className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-6 text-center text-slate-400 hover:border-[#0EB869] hover:text-[#0EB869] hover:bg-slate-50/50 transition-all cursor-pointer min-h-[180px]">
                <Plus size={32} strokeWidth={1.5} className="mb-3 opacity-50" />
                <span className="text-sm font-bold">Request Feature</span>
             </div>
        </div>
    </div>
);

// Fallback icon for simplicity if imports fail or strictly generic
const Wrench = ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
);

const CalendarIcon = ({ size = 20, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);