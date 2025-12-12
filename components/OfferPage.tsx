import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Folder, 
  Plus,
  Briefcase,
  Package,
  Monitor,
  Download,
  Link2,
  BookOpen
} from 'lucide-react';

interface OfferPageProps {
  onNavigate?: (view: string) => void;
}

export const OfferPage: React.FC<OfferPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'service' | 'physical' | 'software' | 'digital' | 'e-learning' | 'affiliate'>('service');

  return (
    <div className="p-8 max-w-[1400px] mx-auto font-sans">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-8 text-center">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8F5E9] text-[#16A349] px-3 py-1 rounded text-xs font-bold">
            Offers
          </span>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
          All Offers
        </h1>
        
        <p className="text-slate-500 text-[15px] leading-relaxed mb-8 max-w-2xl mx-auto">
          Manage your services, products, and digital assets in one central location.
        </p>
      </div>

      {/* Tabs - Goal Style */}
      <div className="bg-slate-100/50 rounded-xl border border-slate-200 p-1.5 flex mb-8 gap-1 max-w-5xl mx-auto overflow-x-auto">
        <button 
          onClick={() => setActiveTab('service')}
          className={`flex-1 min-w-[100px] py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-[13px] font-bold transition-all duration-200 whitespace-nowrap
            ${activeTab === 'service' 
              ? 'bg-white text-[#16A349] shadow-sm ring-1 ring-slate-200' 
              : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'
            }`}
        >
          <Briefcase size={18} />
          Service
        </button>
        <button 
          onClick={() => setActiveTab('physical')}
          className={`flex-1 min-w-[100px] py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-[13px] font-bold transition-all duration-200 whitespace-nowrap
            ${activeTab === 'physical' 
              ? 'bg-white text-[#16A349] shadow-sm ring-1 ring-slate-200' 
              : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'
            }`}
        >
          <Package size={18} />
          Physical
        </button>
        <button 
          onClick={() => setActiveTab('software')}
          className={`flex-1 min-w-[100px] py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-[13px] font-bold transition-all duration-200 whitespace-nowrap
            ${activeTab === 'software' 
              ? 'bg-white text-[#16A349] shadow-sm ring-1 ring-slate-200' 
              : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'
            }`}
        >
          <Monitor size={18} />
          Software
        </button>
        <button 
          onClick={() => setActiveTab('digital')}
          className={`flex-1 min-w-[100px] py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-[13px] font-bold transition-all duration-200 whitespace-nowrap
            ${activeTab === 'digital' 
              ? 'bg-white text-[#16A349] shadow-sm ring-1 ring-slate-200' 
              : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'
            }`}
        >
          <Download size={18} />
          Digital
        </button>
        
        {/* E-learning Tab */}
        <button 
          onClick={() => setActiveTab('e-learning')}
          className={`flex-1 min-w-[100px] py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-[13px] font-bold transition-all duration-200 whitespace-nowrap
            ${activeTab === 'e-learning' 
              ? 'bg-white text-[#16A349] shadow-sm ring-1 ring-slate-200' 
              : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'
            }`}
        >
          <BookOpen size={18} />
          E-learning
        </button>
         <button 
          onClick={() => setActiveTab('affiliate')}
          className={`flex-1 min-w-[100px] py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-[13px] font-bold transition-all duration-200 whitespace-nowrap
            ${activeTab === 'affiliate' 
              ? 'bg-white text-[#16A349] shadow-sm ring-1 ring-slate-200' 
              : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'
            }`}
        >
          <Link2 size={18} />
          Affiliate
        </button>
      </div>

      {/* Action Bar */}
      <div className="flex justify-end mb-6">
        <button 
          onClick={() => onNavigate && onNavigate('create-product')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#16A349] text-white text-[14px] font-bold hover:bg-[#149641] transition-colors shadow-sm"
        >
            <Plus size={18} strokeWidth={3} />
            Add New Offer
        </button>
      </div>

      {/* Content Grid */}
      <div className="min-h-[400px]">
        {activeTab === 'service' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
             <ProductCard 
                title="Real Estate Appointment Setting"
                category="Service"
                description="Done-for-you appointment setting service for high-end real estate agents looking to scale their listings."
                icon={Briefcase}
              />
              <ProductCard 
                title="1-on-1 Business Coaching"
                category="Service"
                description="Personalized coaching sessions to help entrepreneurs breakthrough revenue plateaus and optimize operations."
                icon={Briefcase}
              />
              <ProductCard 
                title="SEO Audit & Optimization"
                category="Service"
                description="Comprehensive website analysis and ranking improvement strategy implementation."
                icon={Briefcase}
              />
          </div>
        )}

        {activeTab === 'physical' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
             <ProductCard 
                title="KETO Supplement Pack"
                category="Physical"
                description="A 30-day supply of premium keto-friendly supplements to boost metabolism and energy."
                icon={Package}
              />
               <ProductCard 
                title="Ergonomic Office Chair"
                category="Physical"
                description="High-end ergonomic chair designed for 8+ hours of comfortable work. Lumbar support included."
                icon={Package}
              />
          </div>
        )}

        {activeTab === 'software' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
             <ProductCard 
                title="Pilates Lead Machine SaaS"
                category="Software"
                description="Automated lead generation software specifically built for Pilates studio owners."
                icon={Monitor}
              />
          </div>
        )}

        {activeTab === 'digital' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
             <ProductCard 
                title="Weight Loss Course"
                category="Digital"
                description="A comprehensive 12-week video course teaching sustainable weight loss methods without starvation."
                icon={Download}
              />
              <ProductCard 
                title="E-commerce Mastery Ebook"
                category="Digital"
                description="The ultimate guide to starting and scaling a Shopify store from zero to $10k/month."
                icon={Download}
              />
          </div>
        )}

        {/* E-learning Tab Content */}
        {activeTab === 'e-learning' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
             <ProductCard 
                title="Welcome Email Sequence"
                category="E-learning"
                description="A 5-part email series delivered post-purchase to onboard new customers effectively."
                icon={BookOpen}
              />
              <ProductCard 
                title="Course Access Portal"
                category="E-learning"
                description="Login credentials and access management for the main educational content."
                icon={BookOpen}
              />
              <ProductCard 
                title="Shipping Notification"
                category="E-learning"
                description="Automated SMS and Email templates for physical product dispatch updates."
                icon={BookOpen}
              />
          </div>
        )}

        {/* New Affiliate Tab Content */}
        {activeTab === 'affiliate' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
             <ProductCard 
                title="Partner Program Q3"
                category="Affiliate"
                description="30% recurring commission structure for registered agency partners."
                icon={Link2}
              />
              <ProductCard 
                title="Influencer Media Kit"
                category="Affiliate"
                description="Swipe files, banners, and logos for social media influencers to promote your brand."
                icon={Link2}
              />
          </div>
        )}
      </div>

      <div className="h-10"></div>
    </div>
  );
};

interface ProductCardProps {
    title: string;
    category: string;
    description: string;
    icon: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, category, description, icon: Icon }) => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col p-6 h-full group">
            <div className="flex items-start gap-4 mb-4">
                 <div className="w-12 h-12 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 bg-white shrink-0 group-hover:border-[#A5D6A7] group-hover:text-[#16A349] transition-colors">
                   <Icon size={24} strokeWidth={1.5} />
                </div>
                <div>
                    <h3 className="text-[15px] font-bold text-slate-900 leading-tight mb-1">{title}</h3>
                    <p className="text-[13px] text-slate-500">{category}</p>
                </div>
            </div>
            
            <p className="text-[13px] text-slate-500 leading-relaxed mb-8 flex-1">
                {description}
            </p>

            <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-auto">
                 <button className="text-[13px] font-bold text-slate-700 hover:text-slate-900 transition-colors">
                    Delete
                </button>
                <button className="text-[13px] font-bold text-[#16A349] hover:text-[#149641] transition-colors">
                    Edit Offer
                </button>
            </div>
        </div>
    )
}