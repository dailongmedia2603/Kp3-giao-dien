import React, { useState } from 'react';
import { supabase } from '@/src/integrations/supabase/client';
import { useSession } from '@/src/contexts/SessionContext';
import { 
  Users, 
  Facebook, 
  LayoutTemplate, 
  BookOpen, 
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
  Infinity,
  LayoutDashboard,
  Landmark,
  Store,
  GalleryVerticalEnd,
  Handshake,
  Shield,
  GraduationCap,
  Warehouse,
  Building2,
  Award,
  Briefcase,
  TrendingUp,
  PenTool,
  FlaskConical,
  Package,
  ChevronDown
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

const SidebarCategory: React.FC<{
  label: string;
  icon: React.ElementType;
  color: string;
  isCollapsed: boolean;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ label, icon: Icon, color, isCollapsed, isOpen, onToggle }) => {
  if (isCollapsed) {
    return (
      <div className="pt-5 first:pt-0">
        <div className="h-px bg-slate-200 mx-2"></div>
      </div>
    );
  }

  return (
    <div className="pt-4 first:pt-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon size={18} style={{ color }} />
          <span className="text-[12px] font-bold uppercase tracking-wider" style={{ color }}>
            {label}
          </span>
        </div>
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
    </div>
  );
};

const categoriesData = [
  {
    id: 'COMMAND CENTER',
    label: 'COMMAND CENTER',
    icon: Briefcase,
    color: '#475569',
    items: [
      { view: 'ceo-dashboard', icon: LayoutDashboard, label: 'CEO Command', badge: 'Live' },
      { view: 'all-in-plan', icon: Map, label: 'The All In Plan', badge: 'Beta' },
      { view: 'treasury', icon: Landmark, label: 'Treasury (Finance)' },
      { view: 'goal', icon: Target, label: 'Goal' },
    ],
  },
  {
    id: 'OFFER & STRATEGY',
    label: 'OFFER & STRATEGY',
    icon: Target,
    color: '#9333ea',
    items: [
      { view: 'dream-buyer', icon: Users, label: 'Dream Buyer Avatars' },
      { view: 'offer', icon: ShoppingBag, label: 'Offer', badge: '1' },
      { view: 'hero-mechanisms', icon: Rabbit, label: 'Hero Mechanisms' },
      { view: 'product-store', icon: Store, label: 'Product & Store' },
      { view: 'asset', icon: Layers, label: 'Asset' },
    ],
  },
  {
    id: 'TRAFFIC ENGINE',
    label: 'TRAFFIC ENGINE',
    icon: TrendingUp,
    color: '#2563eb',
    items: [
      { view: 'unified-ads', icon: GalleryVerticalEnd, label: 'Unified Ads Manager' },
      { view: 'facebook-ads', icon: Facebook, label: 'Facebook Ad Generator' },
      { view: 'youtube-ads', icon: MonitorPlay, label: 'Youtube/Google Ads' },
      { view: 'social-system', icon: Share2, label: 'Media Company' },
      { view: 'affiliate-center', icon: Handshake, label: 'Affiliate Center' },
    ],
  },
  {
    id: 'CONTENT & CREATIVE',
    label: 'CONTENT & CREATIVE',
    icon: PenTool,
    color: '#ea580c',
    items: [
      { view: 'direct-response', icon: LayoutTemplate, label: 'Direct Response Headlines' },
      { view: 'hvco', icon: BookOpen, label: 'HVCO Titles' },
      { view: 'unlimited-content', icon: Infinity, label: 'Unlimited Content', badge: 'AI' },
      { view: 'ad-creatives', icon: Image, label: 'Ad Creatives' },
      { view: 'vsl-creative', icon: Video, label: 'VSL Creative' },
    ],
  },
  {
    id: 'CONVERSION LAB',
    label: 'CONVERSION LAB',
    icon: FlaskConical,
    color: '#0d9488',
    items: [
      { view: 'funnel-builder', icon: Filter, label: 'Funnel Builder' },
      { view: 'landing-pages', icon: Scan, label: 'Landing Pages' },
      { view: 'website', icon: Globe, label: 'Website' },
    ],
  },
  {
    id: 'SALES & CLOSE',
    label: 'SALES & CLOSE',
    icon: Handshake,
    color: '#16a34a',
    items: [
      { view: 'closer', icon: Phone, label: 'Closer' },
      { view: 'email-list', icon: Mail, label: 'Email List' },
      { view: 'legal-shield', icon: Shield, label: 'Legal Shield' },
    ],
  },
  {
    id: 'DELIVERY & OPS',
    label: 'DELIVERY & OPS',
    icon: Package,
    color: '#4b5563',
    items: [
      { view: 'education-hub', icon: GraduationCap, label: 'Education Hub' },
      { view: 'retail-ops', icon: Warehouse, label: 'Retail Ops' },
      { view: 'agency-portal', icon: Building2, label: 'Agency Portal' },
      { view: 'team-hr', icon: Users, label: 'Team & HR' },
    ],
  },
  {
    id: 'SYSTEM & UTILITIES',
    label: 'SYSTEM & UTILITIES',
    icon: Wrench,
    color: '#475569',
    items: [
      { view: 'community', icon: Users, label: 'KP3 Community' },
      { view: 'club', icon: Award, label: 'Club', badge: 'Club' },
      { view: 'support', icon: LifeBuoy, label: 'Support' },
      { view: 'mini-tools', icon: Wrench, label: 'Mini Tools', badge: 'New' },
      { view: 'settings', icon: Settings, label: 'Settings' },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const { profile } = useSession();

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div 
      className={`
        ${isCollapsed ? 'w-[80px] min-w-[80px] px-3' : 'w-[280px] min-w-[280px] px-5'} 
        h-screen bg-[#F8F9FB] flex flex-col border-r border-gray-200/50 overflow-y-auto sticky top-0
        transition-all duration-300 ease-in-out z-50
      `}
    >
      <div className={`flex items-center ${isCollapsed ? 'justify-center flex-col-reverse gap-6' : 'justify-between'} mb-8 pt-5 transition-all duration-300`}>
        <div className="flex items-center gap-1 cursor-pointer overflow-hidden" onClick={() => onNavigate('dashboard')}>
          {isCollapsed ? (
            <img src="/logo-icon.png" alt="Logo" className="h-8 w-auto" onError={(e) => e.currentTarget.style.display = 'none'} />
          ) : (
            <img src="/logo-full.png" alt="Logo" className="h-8 w-auto" onError={(e) => e.currentTarget.style.display = 'none'} />
          )}
        </div>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors shadow-sm"
        >
          {isCollapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
        </button>
      </div>

      <div className={`mb-2 transition-all duration-300 ${isCollapsed ? 'opacity-0 h-0 overflow-hidden mb-0' : 'opacity-100 h-auto'}`}>
        <h3 className="text-slate-900 font-bold text-[15px] mb-1 whitespace-nowrap">Power by KP3</h3>
        <p className="text-slate-500 text-[13px] mb-6 font-normal whitespace-nowrap">Clock Work</p>
      </div>

      <div className="flex flex-col flex-1">
        {categoriesData.map(category => (
          <div key={category.id}>
            <SidebarCategory
              label={category.label}
              icon={category.icon}
              color={category.color}
              isCollapsed={isCollapsed}
              isOpen={openCategories.includes(category.id)}
              onToggle={() => toggleCategory(category.id)}
            />
            {openCategories.includes(category.id) && !isCollapsed && (
              <div className="pl-4 pt-2 space-y-1">
                {category.items.map(item => (
                  <SidebarItem
                    key={item.view}
                    icon={item.icon}
                    label={item.label}
                    isActive={currentView === item.view}
                    onClick={() => onNavigate(item.view)}
                    isCollapsed={isCollapsed}
                    badge={item.badge}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={`border-t border-slate-200/60 mt-2 mb-4 pt-3 ${isCollapsed ? 'px-1' : 'px-0'}`}>
         <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all group`}>
             <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 shrink-0 shadow-sm">
                 {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="avatar" className="w-full h-full rounded-full object-cover" />
                 ) : (
                    <User size={20} />
                 )}
             </div>
             
             {!isCollapsed && (
                 <div className="flex-1 min-w-0">
                     <div className="text-[14px] font-bold text-slate-900 truncate">
                        {profile?.first_name || profile?.last_name ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : 'Welcome'}
                     </div>
                     <div className="text-[12px] text-slate-500 truncate">Free Member</div>
                 </div>
             )}

             {!isCollapsed && (
                 <button onClick={handleLogout} title="Logout" className="p-2 -mr-2 rounded-full hover:bg-red-50">
                    <LogOut size={16} className="text-slate-400 group-hover:text-red-500" />
                 </button>
             )}
         </div>
      </div>
    </div>
  );
};