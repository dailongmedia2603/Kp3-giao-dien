import React, { useState } from 'react';
import { 
  Users, 
  Facebook, 
  LayoutTemplate, 
  BookOpen, 
  Folder, 
  LifeBuoy, 
  Settings,
  ChevronsLeft,
  ChevronsRight,
  Rabbit,
  Image,
  Scan,
  Video,
  Share2,
  Mail,
  Filter,
  Target,
  ShoppingBag,
  Wrench,
  User,
  LogOut,
  Globe,
  Layers,
  MonitorPlay,
  Phone,
  Map,
  Infinity
} from 'lucide-react';
import { SidebarItemProps } from '../types';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon: Icon, isActive, badge, onClick, isCollapsed }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        group relative flex items-center ${isCollapsed ? 'justify-center px-2' : 'justify-between px-3'} py-2.5 rounded-lg cursor-pointer transition-all duration-200
        ${isActive 
          ? 'bg-white text-[#0EB869] shadow-sm ring-1 ring-slate-100' 
          : 'text-slate-600 hover:bg-gray-100 hover:text-slate-900'}
      `}
      title={isCollapsed ? label : undefined}
    >
      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} w-full`}>
        <Icon 
          size={20} 
          strokeWidth={2} 
          className={`shrink-0 ${isActive ? 'text-[#0EB869]' : 'text-slate-500 group-hover:text-slate-900'}`} 
        />
        {!isCollapsed && (
          <span className="text-[14px] font-medium whitespace-nowrap overflow-hidden transition-all duration-200">
            {label}
          </span>
        )}
      </div>
      
      {!isCollapsed && badge && (
        <span className="bg-gray-200 text-slate-600 text-xs font-semibold px-2 py-0.5 rounded-full min-w-[20px] text-center ml-2">
          {badge}
        </span>
      )}

      {isCollapsed && badge && (
        <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0EB869] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0EB869]"></span>
        </span>
      )}
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div 
      className={`
        ${isCollapsed ? 'w-[80px] min-w-[80px] px-3' : 'w-[280px] min-w-[280px] px-5'} 
        h-screen bg-[#F8F9FB] flex flex-col border-r border-gray-200/50 overflow-y-auto sticky top-0
        transition-all duration-300 ease-in-out z-50
      `}
    >
      {/* Header / Logo */}
      <div className={`flex items-center ${isCollapsed ? 'justify-center flex-col-reverse gap-6' : 'justify-between'} mb-8 pt-5 transition-all duration-300`}>
        <div className="flex items-center gap-1 cursor-pointer overflow-hidden" onClick={() => onNavigate('dashboard')}>
          {/* Custom Logo text */}
          <span 
            className="text-2xl font-[800] tracking-tighter text-[#0EB869] whitespace-nowrap" 
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {isCollapsed ? 'G' : 'GETTIME.MONEY'}
          </span>
        </div>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors shadow-sm"
        >
          {isCollapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
        </button>
      </div>

      {/* Generators Section */}
      <div className={`mb-2 transition-all duration-300 ${isCollapsed ? 'opacity-0 h-0 overflow-hidden mb-0' : 'opacity-100 h-auto'}`}>
        <h3 className="text-slate-900 font-bold text-[15px] mb-1 whitespace-nowrap">Power by KP3</h3>
        <p className="text-slate-500 text-[13px] mb-6 font-normal whitespace-nowrap">Clock Work</p>
      </div>

      {/* Navigation List */}
      <div className="flex flex-col gap-2 flex-1">
        
        {/* New Menu: The All In Plan */}
        <SidebarItem 
          icon={Map} 
          label="The All In Plan" 
          isActive={currentView === 'all-in-plan'}
          onClick={() => onNavigate('all-in-plan')}
          isCollapsed={isCollapsed}
          badge="Beta"
        />

        <SidebarItem 
          icon={Users} 
          label="Dream Buyer Avatars" 
          isActive={currentView === 'dream-buyer'}
          onClick={() => onNavigate('dream-buyer')}
          isCollapsed={isCollapsed}
        />
        <SidebarItem 
          icon={Facebook} 
          label="Facebook Ad Generator" 
          isActive={currentView === 'facebook-ads'}
          onClick={() => onNavigate('facebook-ads')}
          isCollapsed={isCollapsed}
        />
        <SidebarItem 
          icon={LayoutTemplate} 
          label="Direct Response Headlines" 
          isActive={currentView === 'direct-response'}
          onClick={() => onNavigate('direct-response')}
          isCollapsed={isCollapsed}
        />
        <SidebarItem 
          icon={BookOpen} 
          label="HVCO Titles" 
          isActive={currentView === 'hvco'}
          onClick={() => onNavigate('hvco')}
          isCollapsed={isCollapsed}
        />
        <SidebarItem 
          icon={Rabbit} 
          label="Hero Mechanisms" 
          isActive={currentView === 'hero-mechanisms'}
          onClick={() => onNavigate('hero-mechanisms')}
          isCollapsed={isCollapsed}
        />
        
        <SidebarItem 
          icon={Image} 
          label="Ad Creatives" 
          isActive={currentView === 'ad-creatives'}
          onClick={() => onNavigate('ad-creatives')}
          isCollapsed={isCollapsed}
        />

        <SidebarItem 
          icon={Scan} 
          label="Landing Pages" 
          isActive={currentView === 'landing-pages'}
          onClick={() => onNavigate('landing-pages')}
          isCollapsed={isCollapsed}
        />

        {/* New Menu: Website */}
        <SidebarItem 
          icon={Globe} 
          label="Website" 
          isActive={currentView === 'website'}
          onClick={() => onNavigate('website')}
          isCollapsed={isCollapsed}
        />

        {/* New Menu: Asset */}
        <SidebarItem 
          icon={Layers} 
          label="Asset" 
          isActive={currentView === 'asset'}
          onClick={() => onNavigate('asset')}
          isCollapsed={isCollapsed}
        />

        {/* New Menu: Youtube/Google Ads */}
        <SidebarItem 
          icon={MonitorPlay} 
          label="Youtube/Google Ads" 
          isActive={currentView === 'youtube-ads'}
          onClick={() => onNavigate('youtube-ads')}
          isCollapsed={isCollapsed}
        />

        <SidebarItem 
          icon={Video} 
          label="VSL Creative" 
          isActive={currentView === 'vsl-creative'}
          onClick={() => onNavigate('vsl-creative')}
          isCollapsed={isCollapsed}
        />

        <SidebarItem 
          icon={Share2} 
          label="Social System" 
          isActive={currentView === 'social-system'}
          onClick={() => onNavigate('social-system')}
          isCollapsed={isCollapsed}
        />

        {/* New Menu: Closer */}
        <SidebarItem 
          icon={Phone} 
          label="Closer" 
          isActive={currentView === 'closer'}
          onClick={() => onNavigate('closer')}
          isCollapsed={isCollapsed}
        />

        <SidebarItem 
          icon={Mail} 
          label="Email List" 
          isActive={currentView === 'email-list'}
          onClick={() => onNavigate('email-list')}
          isCollapsed={isCollapsed}
        />

        <SidebarItem 
          icon={Filter} 
          label="Funnel Builder" 
          isActive={currentView === 'funnel-builder'}
          onClick={() => onNavigate('funnel-builder')}
          isCollapsed={isCollapsed}
        />

        <SidebarItem 
          icon={Wrench} 
          label="Mini Tools" 
          isActive={currentView === 'mini-tools'}
          onClick={() => onNavigate('mini-tools')}
          isCollapsed={isCollapsed}
          badge="New"
        />

        {/* Separator */}
        <div className={`my-4 border-t border-slate-200 ${isCollapsed ? 'mx-2' : 'mx-1'}`}></div>

        <SidebarItem 
          icon={ShoppingBag} 
          label="Offer" 
          badge="1" 
          isActive={currentView === 'offer'}
          onClick={() => onNavigate('offer')}
          isCollapsed={isCollapsed}
        />
        
        <SidebarItem 
          icon={Target} 
          label="Goal" 
          isActive={currentView === 'goal'}
          onClick={() => onNavigate('goal')}
          isCollapsed={isCollapsed}
        />
      </div>

      {/* Footer Links */}
      <div className="flex flex-col gap-1 mt-auto pt-8 pb-2">
        <SidebarItem 
          icon={LifeBuoy} 
          label="Support" 
          isActive={currentView === 'support'}
          onClick={() => onNavigate('support')}
          isCollapsed={isCollapsed} 
        />
        <SidebarItem 
          icon={Users} 
          label="KP3 Community" 
          isActive={currentView === 'community'}
          onClick={() => onNavigate('community')}
          isCollapsed={isCollapsed}
          badge="Club"
        />
        <SidebarItem 
          icon={Infinity} 
          label="Unlimited Content" 
          isActive={currentView === 'unlimited-content'}
          onClick={() => onNavigate('unlimited-content')}
          isCollapsed={isCollapsed}
          badge="AI" 
        />
        <SidebarItem 
          icon={Settings} 
          label="Settings" 
          isActive={currentView === 'settings'}
          onClick={() => onNavigate('settings')}
          isCollapsed={isCollapsed} 
        />
      </div>

      {/* User Profile */}
      <div className={`border-t border-slate-200/60 mt-2 mb-4 pt-3 ${isCollapsed ? 'px-1' : 'px-0'}`}>
         <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all cursor-pointer group`}>
            {/* Avatar */}
             <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 shrink-0 shadow-sm">
                 <User size={20} />
             </div>
             
             {!isCollapsed && (
                 <div className="flex-1 min-w-0">
                     <div className="text-[14px] font-bold text-slate-900 truncate">Hai Phút Phúc</div>
                     <div className="text-[12px] text-slate-500 truncate">Free Member</div>
                 </div>
             )}

             {!isCollapsed && (
                 <LogOut size={16} className="text-slate-400 group-hover:text-slate-600 ml-1" />
             )}
         </div>
      </div>
    </div>
  );
};