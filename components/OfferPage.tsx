import React, { useState, useEffect } from 'react';
import { 
  Home, 
  ChevronRight, 
  Plus,
  Briefcase,
  Package,
  Monitor,
  Download,
  Link2,
  BookOpen,
  Loader2,
  Trash2,
  LayoutGrid
} from 'lucide-react';
import { supabase } from '@/src/integrations/supabase/client';
import { useSession } from '@/src/contexts/SessionContext';
import toast from 'react-hot-toast';

interface Offer {
  id: string;
  title: string;
  category: string;
  description: string;
}

interface OfferPageProps {
  onNavigate?: (view: string) => void;
}

export const OfferPage: React.FC<OfferPageProps> = ({ onNavigate }) => {
  const { user } = useSession();
  const [activeTab, setActiveTab] = useState<'all' | 'service' | 'physical' | 'software' | 'digital' | 'e-learning' | 'affiliate'>('all');
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      const { data, error } = await supabase
        .from('offers')
        .select('id, title, category, description')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching offers:', error);
        toast.error('Không thể tải danh sách offer.');
      } else {
        setOffers(data || []);
      }
      setIsLoading(false);
    };

    fetchOffers();
  }, [user]);

  const handleDelete = async (offerId: string) => {
    if (!user) return;

    if (!window.confirm('Bạn có chắc chắn muốn xóa offer này không?')) {
      return;
    }

    const { error } = await supabase
      .from('offers')
      .delete()
      .match({ id: offerId, user_id: user.id });

    if (error) {
      toast.error('Xóa offer thất bại: ' + error.message);
    } else {
      setOffers(prev => prev.filter(o => o.id !== offerId));
      toast.success('Đã xóa offer thành công.');
    }
  };

  const getIconForCategory = (category: string) => {
    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes('service')) return Briefcase;
    if (lowerCategory.includes('physical')) return Package;
    if (lowerCategory.includes('software')) return Monitor;
    if (lowerCategory.includes('digital')) return Download;
    if (lowerCategory.includes('e-learning')) return BookOpen;
    if (lowerCategory.includes('affiliate')) return Link2;
    return Briefcase; // Default icon
  };

  const filteredOffers = offers.filter(offer => {
    if (activeTab === 'all') {
      return true;
    }
    const lowerCategory = offer.category?.toLowerCase() || '';
    switch (activeTab) {
      case 'service': return lowerCategory.includes('service');
      case 'physical': return lowerCategory.includes('physical');
      case 'software': return lowerCategory.includes('software');
      case 'digital': return lowerCategory.includes('digital');
      case 'e-learning': return lowerCategory.includes('e-learning');
      case 'affiliate': return lowerCategory.includes('affiliate');
      default: return false;
    }
  });

  return (
    <div className="p-8 max-w-[1400px] mx-auto font-sans">
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8F5E9] text-[#16A349] px-3 py-1 rounded text-xs font-bold">
            Products & Offers
          </span>
        </div>

        <h1 className="text-[26px] font-bold text-slate-900 mb-3 tracking-tight">
          All Offers
        </h1>
        
        <p className="text-slate-500 text-[13px] leading-relaxed mb-8 max-w-2xl mx-auto">
          Manage your services, products, and digital assets in one central location.
        </p>
      </div>

      <div className="bg-slate-100/50 rounded-xl border border-slate-200 p-1.5 flex mb-8 gap-1 max-w-5xl mx-auto overflow-x-auto">
        <TabButton active={activeTab === 'all'} onClick={() => setActiveTab('all')} icon={LayoutGrid} label="All" />
        <TabButton active={activeTab === 'service'} onClick={() => setActiveTab('service')} icon={Briefcase} label="Service" />
        <TabButton active={activeTab === 'physical'} onClick={() => setActiveTab('physical')} icon={Package} label="Physical" />
        <TabButton active={activeTab === 'software'} onClick={() => setActiveTab('software')} icon={Monitor} label="Software" />
        <TabButton active={activeTab === 'digital'} onClick={() => setActiveTab('digital')} icon={Download} label="Digital" />
        <TabButton active={activeTab === 'e-learning'} onClick={() => setActiveTab('e-learning')} icon={BookOpen} label="E-learning" />
        <TabButton active={activeTab === 'affiliate'} onClick={() => setActiveTab('affiliate')} icon={Link2} label="Affiliate" />
      </div>

      <div className="flex justify-end mb-6">
        <button 
          onClick={() => onNavigate && onNavigate('create-product')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#16A349] text-white text-[14px] font-bold hover:bg-[#149641] transition-colors shadow-sm"
        >
            <Plus size={18} strokeWidth={3} />
            Add New Offer
        </button>
      </div>

      <div className="min-h-[400px]">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 size={32} className="animate-spin text-slate-400" />
          </div>
        ) : filteredOffers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {filteredOffers.map(offer => (
              <ProductCard 
                key={offer.id}
                title={offer.title}
                category={offer.category}
                description={offer.description}
                icon={getIconForCategory(offer.category)}
                onDelete={() => handleDelete(offer.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-xl border border-dashed">
            <p className="text-slate-500">Không có offer nào trong danh mục này.</p>
          </div>
        )}
      </div>

      <div className="h-10"></div>
    </div>
  );
};

const TabButton: React.FC<{ active: boolean, onClick: () => void, icon: React.ElementType, label: string }> = ({ active, onClick, icon: Icon, label }) => (
    <button 
      onClick={onClick}
      className={`flex-1 min-w-[100px] py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-[13px] font-bold transition-all duration-200 whitespace-nowrap
        ${active 
          ? 'bg-white text-[#16A349] shadow-sm ring-1 ring-slate-200' 
          : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'
        }`}
    >
      <Icon size={18} />
      {label}
    </button>
);

interface ProductCardProps {
    title: string;
    category: string;
    description: string;
    icon: any;
    onDelete: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, category, description, icon: Icon, onDelete }) => {
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
                 <button onClick={onDelete} className="text-[13px] font-bold text-red-500 hover:text-red-700 transition-colors flex items-center gap-1">
                    <Trash2 size={14} /> Delete
                </button>
                <button className="text-[13px] font-bold text-[#16A349] hover:text-[#149641] transition-colors">
                    Edit Offer
                </button>
            </div>
        </div>
    )
}