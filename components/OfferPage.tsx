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
  Gift,
  ShoppingBag
} from 'lucide-react';
import { supabase } from '@/src/integrations/supabase/client';
import { useSession } from '@/src/contexts/SessionContext';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  [key: string]: any;
}

interface Offer {
  id: string;
  title: string;
  description: string;
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

const ProductCard: React.FC<{ product: Product; icon: any; onClick: () => void; onDelete: (e: React.MouseEvent) => void; }> = ({ product, icon: Icon, onClick, onDelete }) => {
    return (
        <div onClick={onClick} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group cursor-pointer">
            <div className="p-6 flex-1">
                <div className="flex items-start gap-4 mb-4">
                     <div className="w-12 h-12 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 bg-white shrink-0 group-hover:border-[#A5D6A7] group-hover:text-[#16A349] transition-colors">
                       <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                        <h3 className="text-[15px] font-bold text-slate-900 leading-tight mb-1 group-hover:text-[#16A349] transition-colors">{product.title}</h3>
                        <p className="text-[13px] text-slate-500">{product.category}</p>
                    </div>
                </div>
                
                <p className="text-[13px] text-slate-500 leading-relaxed mb-8 flex-1">
                    {product.description}
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

const OfferCard: React.FC<{ offer: Offer; onClick: () => void; }> = ({ offer, onClick }) => (
  <div onClick={onClick} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 group hover:shadow-md transition-shadow flex flex-col h-full cursor-pointer">
    <div className="flex items-start gap-4 mb-4">
      <div className="w-12 h-12 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 bg-white shrink-0 group-hover:border-[#A5D6A7] group-hover:text-[#16A349] transition-colors">
        <ShoppingBag size={24} />
      </div>
      <div>
        <h3 className="text-[15px] font-bold text-slate-900 leading-tight mb-1 group-hover:text-[#16A349] transition-colors">{offer.title}</h3>
      </div>
    </div>
    <p className="text-[13px] text-slate-500 leading-relaxed mb-8 flex-1">
      {offer.description || 'Chưa có mô tả. Nhấp để xem chi tiết.'}
    </p>
    <div className="flex items-center justify-end pt-4 border-t border-slate-100 mt-auto">
      <button className="text-[13px] font-bold text-[#16A349] hover:text-[#149641] transition-colors">
        View Details
      </button>
    </div>
  </div>
);

const BonusCard: React.FC<{ bonus: Bonus }> = ({ bonus }) => (
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

const OfferView: React.FC<{ offers: Offer[]; onNavigate?: (view: string, data?: any) => void; }> = ({ offers, onNavigate }) => (
  <div className="animate-in fade-in duration-300">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-slate-900">Offer Stack</h2>
      <button onClick={() => onNavigate && onNavigate('create-offer')} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#16A349] text-white text-[14px] font-bold hover:bg-[#149641] transition-colors shadow-sm">
        <Plus size={18} strokeWidth={3} />
        Thêm Offer
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {offers.map(offer => (
        <OfferCard key={offer.id} offer={offer} onClick={() => onNavigate && onNavigate('godfather-offer-detail', offer)} />
      ))}
    </div>
  </div>
);

const BonusView: React.FC<{ bonuses: Bonus[] }> = ({ bonuses }) => (
  <div className="animate-in fade-in duration-300">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-slate-900">Bonus</h2>
      <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#16A349] text-white text-[14px] font-bold hover:bg-[#149641] transition-colors shadow-sm">
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

export const OfferPage: React.FC<OfferPageProps> = ({ onNavigate }) => {
  const { user } = useSession();
  const [mainTab, setMainTab] = useState<'products' | 'offer' | 'bonus'>('products');
  const [activeCategory, setActiveCategory] = useState<'all' | 'service' | 'physical' | 'software' | 'digital' | 'e-learning' | 'affiliate'>('all');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [bonuses, setBonuses] = useState<Bonus[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      
      const productsPromise = supabase.from('products').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
      const offersPromise = supabase.from('offers').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
      const bonusesPromise = supabase.from('bonuses').select('*').eq('user_id', user.id).order('created_at', { ascending: false });

      const [productsResult, offersResult, bonusesResult] = await Promise.all([productsPromise, offersPromise, bonusesPromise]);

      if (productsResult.error) toast.error('Không thể tải Products.');
      else setProducts(productsResult.data || []);

      if (offersResult.error) toast.error('Không thể tải Offers.');
      else setOffers(offersResult.data || []);

      if (bonusesResult.error) toast.error('Không thể tải Bonuses.');
      else setBonuses(bonusesResult.data || []);

      setIsLoading(false);
    };

    fetchData();
  }, [user]);

  const handleDeleteProduct = async (productId: string) => {
    if (!user || !window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) return;

    const { error } = await supabase.from('products').delete().match({ id: productId, user_id: user.id });
    if (error) toast.error('Xóa sản phẩm thất bại: ' + error.message);
    else {
      setProducts(prev => prev.filter(p => p.id !== productId));
      toast.success('Đã xóa sản phẩm thành công.');
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
    return Briefcase;
  };

  const filteredProducts = products.filter(product => {
    if (activeCategory === 'all') return true;
    const lowerCategory = product.category?.toLowerCase() || '';
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
        <h1 className="text-[26px] font-bold text-slate-900 mb-3 tracking-tight">Products & Offers</h1>
        <p className="text-slate-500 text-[13px] leading-relaxed mb-8 max-w-2xl mx-auto">Manage your services, products, and digital assets in one central location.</p>
      </div>

      <div className="bg-slate-100/50 rounded-xl border border-slate-200 p-1.5 flex mb-8 gap-1 max-w-lg mx-auto">
        <MainTabButton active={mainTab === 'products'} onClick={() => setMainTab('products')} label="Products" />
        <MainTabButton active={mainTab === 'offer'} onClick={() => setMainTab('offer')} label="Offer" />
        <MainTabButton active={mainTab === 'bonus'} onClick={() => setMainTab('bonus')} label="Bonus" />
      </div>

      {mainTab === 'products' && (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-[260px] shrink-0">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-6">
              <div className="p-2 space-y-1">
                {categories.map(cat => (
                  <CategorySidebarItem key={cat.id} icon={cat.icon} label={cat.label} isActive={activeCategory === cat.id} onClick={() => setActiveCategory(cat.id as any)} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">{categories.find(c => c.id === activeCategory)?.label} Products</h2>
              <button onClick={() => onNavigate && onNavigate('create-product', activeCategory === 'all' ? undefined : activeCategory)} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#16A349] text-white text-[14px] font-bold hover:bg-[#149641] transition-colors shadow-sm">
                <Plus size={18} strokeWidth={3} />
                Thêm Product
              </button>
            </div>
            <div className="min-h-[400px]">
              {isLoading ? (
                <div className="flex justify-center items-center h-64"><Loader2 size={32} className="animate-spin text-slate-400" /></div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in duration-300">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} icon={getIconForCategory(product.category)} onClick={() => onNavigate && onNavigate('offer-detail', product)} onDelete={(e) => { e.stopPropagation(); handleDeleteProduct(product.id); }} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-slate-50 rounded-xl border border-dashed"><p className="text-slate-500">Không có sản phẩm nào trong danh mục này.</p></div>
              )}
            </div>
          </div>
        </div>
      )}

      {mainTab === 'offer' && <OfferView offers={offers} onNavigate={onNavigate} />}
      {mainTab === 'bonus' && <BonusView bonuses={bonuses} />}

      <div className="h-10"></div>
    </div>
  );
};