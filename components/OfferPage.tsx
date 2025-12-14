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
  LayoutGrid,
  Gift
} from 'lucide-react';
import { supabase } from '@/src/integrations/supabase/client';
import { useSession } from '@/src/contexts/SessionContext';
import toast from 'react-hot-toast';

interface Offer {
  id: string;
  title: string;
  category: string;
  description: string;
  [key: string]: any; // Allow other properties
}

interface Bonus {
  id: string;
  title: string;
  description: string;
  value: number;
}

interface OfferPageProps {
  onNavigate?: (view: string, data?: any) => void;
}

const MainTabButton: React.FC<{ active: boolean, onClick: () => void, label: string }> = ({ active, onClick, label }) => (
  <button 
    onClick={onClick}
    className={`flex-1 py-3 px-6 rounded-lg text-sm font-bold transition-all duration-200
      ${active ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:bg-white/60'}
    `}
  >
    {label}
  </button>
);

const CategorySidebarItem: React.FC<{ icon: React.ElementType, label: string, isActive: boolean, onClick: () => void }> = ({ icon: Icon, label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 text-[14px] font-medium rounded-lg transition-colors
      ${isActive ? 'bg-[#E8F5E9] text-[#16A349]' : 'text-slate-600 hover:bg-slate-50'}
    `}
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
    onClick: () => void;
    onDelete: (e: React.MouseEvent) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, category, description, icon: Icon, onClick, onDelete }) => {
    return (
        <div onClick={onClick} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group cursor-pointer">
            <div className="p-6 flex-1">
                <div className="flex items-start gap-4 mb-4">
                     <div className="w-12 h-12 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 bg-white shrink-0 group-hover:border-[#A5D6A7] group-hover:text-[#16A349] transition-colors">
                       <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                        <h3 className="text-[15px] font-bold text-slate-900 leading-tight mb-1 group-hover:text-[#16A349] transition-colors">{title}</h3>
                        <p className="text-[13px] text-slate-500">{category}</p>
                    </div>
                </div>
                
                <p className="text-[13px] text-slate-500 leading-relaxed mb-8 flex-1">
                    {description}
                </p>
            </div>

            <div className="flex items-center justify-between pt-4 pb-4 px-6 border-t border-slate-100 mt-auto">
                 <button onClick={onDelete} className="text-[13px] font-bold text-red-500 hover:text-red-700 transition-colors flex items-center gap-1">
                    <Trash2 size={14} /> Delete
                </button>
                <button className="text-[13px] font-bold text-[#16A349] hover:text-[#149641] transition-colors">
                    View Details
                </button>
            </div>
        </div>
    )
}

const BonusCard: React.FC<{ bonus: Bonus }> = ({ bonus }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 group hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 bg-white shrink-0 group-hover:border-[#A5D6A7] group-hover:text-[#16A349] transition-colors">
          <Gift size={24} />
        </div>
        <div>
          <h3 className="text-[15px] font-bold text-slate-900 leading-tight mb-1 group-hover:text-[#16A349] transition-colors">{bonus.title}</h3>
          <p className="text-[13px] text-slate-500 font-bold">${bonus.value} Value</p>
        </div>
      </div>
      <p className="text-[13px] text-slate-500 leading-relaxed mb-8 flex-1">
        {bonus.description}
      </p>
      <div className="flex items-center justify-end pt-4 border-t border-slate-100 mt-auto">
        <button className="text-[13px] font-bold text-[#16A349] hover:text-[#149641] transition-colors">
          Edit Bonus
        </button>
      </div>
    </div>
  );
}

const BonusView: React.FC = () => {
  const [bonuses, setBonuses] = useState<Bonus[]>([
    { id: '1', title: 'Bonus #1: The Ultimate Swipe File', description: 'My private collection of winning ad copy and headlines.', value: 497 },
    { id: '2', title: 'Bonus #2: Community Access', description: 'Lifetime access to our private community of agency owners.', value: 997 },
  ]);

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Bonus / Quà tặng
        </h2>
        <button 
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#16A349] text-white text-[14px] font-bold hover:bg-[#149641] transition-colors shadow-sm"
        >
          <Plus size={18} strokeWidth={3} />
          Thêm Bonus
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {bonuses.map(bonus => (
          <BonusCard key={bonus.id} bonus={bonus} />
        ))}
      </div>
    </div>
  );
}

export const OfferPage: React.FC<OfferPageProps> = ({ onNavigate }) => {
  const { user } = useSession();
  const [mainTab, setMainTab] = useState<'products' | 'offer' | 'bonus'>('products');
  const [activeCategory, setActiveCategory] = useState<'all' | 'service' | 'physical' | 'software' | 'digital' | 'e-learning' | 'affiliate'>('all');
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
        .select('*')
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
    const lowerCategory = category?.toLowerCase() || '';
    if (lowerCategory.includes('service')) return Briefcase;
    if (lowerCategory.includes('physical')) return Package;
    if (lowerCategory.includes('software')) return Monitor;
    if (lowerCategory.includes('digital')) return Download;
    if (lowerCategory.includes('e-learning')) return BookOpen;
    if (lowerCategory.includes('affiliate')) return Link2;
    return Briefcase; // Default icon
  };

  const filteredOffers = offers.filter(offer => {
    if (activeCategory === 'all') {
      return true;
    }
    const lowerCategory = offer.category?.toLowerCase() || '';
    return lowerCategory.includes(activeCategory);
  });

  const categories = [
    { id: 'all', label: 'All', icon: LayoutGrid },
    { id: 'service', label: 'Service', icon: Briefcase },
    { id: 'physical', label: 'Physical', icon: Package },
    { id: 'software', label: 'Software', icon: Monitor },
    { id: 'digital', label: 'Digital', icon: Download },
    { id: 'e-learning', label: 'E-learning', icon: BookOpen },
    { id: 'affiliate', label: 'Affiliate', icon: Link2 },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto font-sans">
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8F5E9] text-[#16A349] px-3 py-1 rounded text-xs font-bold">
            Products & Offers
          </span>
        </div>

        <h1 className="text-[26px] font-bold text-slate-900 mb-3 tracking-tight">
          Products & Offers
        </h1>
        
        <p className="text-slate-500 text-[13px] leading-relaxed mb-8 max-w-2xl mx-auto">
          Manage your services, products, and digital assets in one central location.
        </p>
      </div>

      <div className="bg-slate-100/50 rounded-xl border border-slate-200 p-1.5 flex mb-8 gap-1 max-w-lg mx-auto">
        <MainTabButton active={mainTab === 'products'} onClick={() => setMainTab('products')} label="Products" />
        <MainTabButton active={mainTab === 'offer'} onClick={() => setMainTab('offer')} label="Offer" />
        <MainTabButton active={mainTab === 'bonus'} onClick={() => setMainTab('bonus')} label="Bonus / Quà tặng" />
      </div>

      {mainTab === 'products' && (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-[260px] shrink-0">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-6">
              <div className="p-2 space-y-1">
                {categories.map(cat => (
                  <CategorySidebarItem
                    key={cat.id}
                    icon={cat.icon}
                    label={cat.label}
                    isActive={activeCategory === cat.id}
                    onClick={() => setActiveCategory(cat.id as any)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                {categories.find(c => c.id === activeCategory)?.label} Products
              </h2>
              <button 
                onClick={() => onNavigate && onNavigate('create-product', activeCategory === 'all' ? undefined : activeCategory)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#16A349] text-white text-[14px] font-bold hover:bg-[#149641] transition-colors shadow-sm"
              >
                <Plus size={18} strokeWidth={3} />
                Thêm Product
              </button>
            </div>

            <div className="min-h-[400px]">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 size={32} className="animate-spin text-slate-400" />
                </div>
              ) : filteredOffers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in duration-300">
                  {filteredOffers.map(offer => (
                    <ProductCard 
                      key={offer.id}
                      title={offer.title}
                      category={offer.category}
                      description={offer.description}
                      icon={getIconForCategory(offer.category)}
                      onClick={() => onNavigate && onNavigate('offer-detail', offer)}
                      onDelete={(e) => {
                        e.stopPropagation();
                        handleDelete(offer.id);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-slate-50 rounded-xl border border-dashed">
                  <p className="text-slate-500">Không có sản phẩm nào trong danh mục này.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {mainTab === 'offer' && (
        <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
          <h2 className="text-xl font-bold text-slate-700">Offer View</h2>
          <p className="text-slate-500">This section is under construction.</p>
        </div>
      )}

      {mainTab === 'bonus' && (
        <BonusView />
      )}

      <div className="h-10"></div>
    </div>
  );
};