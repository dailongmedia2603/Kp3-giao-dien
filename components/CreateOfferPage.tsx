import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft,
  Loader2,
  Save,
  Sparkles,
  BrainCircuit,
  ShoppingBag,
  HelpCircle,
  DollarSign,
  CreditCard,
  Gift,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { supabase } from '@/src/integrations/supabase/client';
import { useSession } from '@/src/contexts/SessionContext';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  title: string;
}

interface CreateOfferPageProps {
  onCancel: () => void;
  onNavigate: (view: string, data?: any) => void;
  offerToEdit?: any | null;
}

const FormField: React.FC<{
  icon: React.ElementType;
  label: string;
  description: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  rows?: number;
}> = ({ icon: Icon, label, description, value, onChange, placeholder, rows = 4 }) => (
  <div>
    <label className="block text-[13px] font-bold text-slate-900 mb-2 flex items-center gap-2">
      <Icon size={16} className="text-[#16A349]" /> 
      {label}
    </label>
    <p className="text-xs text-slate-500 mb-2">
      {description}
    </p>
    <textarea 
      className="w-full p-4 border border-slate-200 rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#16A349]/20 focus:border-[#16A349] min-h-[100px] resize-none"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
    />
  </div>
);

export const CreateOfferPage: React.FC<CreateOfferPageProps> = ({ onCancel, onNavigate, offerToEdit }) => {
  const { user } = useSession();
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  
  const [selectedProductId, setSelectedProductId] = useState('');
  const [rationale, setRationale] = useState('');
  const [valueBuild, setValueBuild] = useState('');
  const [pricing, setPricing] = useState('');
  const [paymentOptions, setPaymentOptions] = useState('');
  const [premiums, setPremiums] = useState('');
  const [powerGuarantee, setPowerGuarantee] = useState('');
  const [scarcity, setScarcity] = useState('');
  const [generatedSummary, setGeneratedSummary] = useState('');

  const isEditMode = !!offerToEdit;

  useEffect(() => {
    if (isEditMode && offerToEdit) {
      setSelectedProductId(offerToEdit.product_id || '');
      setRationale(offerToEdit.rationale || '');
      setValueBuild(offerToEdit.value_build || '');
      setPricing(offerToEdit.pricing || '');
      setPaymentOptions(offerToEdit.payment_options || '');
      setPremiums(offerToEdit.premiums || '');
      setPowerGuarantee(offerToEdit.power_guarantee || '');
      setScarcity(offerToEdit.scarcity || '');
      setGeneratedSummary(offerToEdit.description || '');
    } else {
      setSelectedProductId('');
      setRationale('');
      setValueBuild('');
      setPricing('');
      setPaymentOptions('');
      setPremiums('');
      setPowerGuarantee('');
      setScarcity('');
      setGeneratedSummary('');
    }
  }, [offerToEdit, isEditMode]);

  useEffect(() => {
    if (!user) return;
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id, title')
        .eq('user_id', user.id);
      if (error) {
        toast.error('Không thể tải danh sách sản phẩm.');
      } else {
        setProducts(data || []);
      }
    };
    fetchProducts();
  }, [user]);

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    setGeneratedSummary('');
    try {
      const { data, error } = await supabase.functions.invoke('generate-offer-summary', {
        body: { 
          offerDetails: {
            rationale,
            value_build: valueBuild,
            pricing,
            payment_options: paymentOptions,
            premiums,
            power_guarantee: powerGuarantee,
            scarcity,
            title: products.find(p => p.id === selectedProductId)?.title || ''
          }
        },
      });
      if (error) throw error;
      setGeneratedSummary(data.summary);
      toast.success('Đã tạo tóm tắt offer bằng AI!');
    } catch (error: any) {
      const errorMessage = error.context?.json?.error || error.message || 'Lỗi khi tạo tóm tắt.';
      setGeneratedSummary(`Không thể tạo tóm tắt: ${errorMessage}`);
      toast.error(errorMessage, { duration: 5000 });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!user || !selectedProductId) {
      toast.error('Vui lòng chọn một sản phẩm.');
      return;
    }

    setIsSaving(true);
    const offerData = {
      user_id: user.id,
      product_id: selectedProductId,
      title: products.find(p => p.id === selectedProductId)?.title || 'New Offer',
      description: generatedSummary,
      rationale,
      value_build: valueBuild,
      pricing,
      payment_options: paymentOptions,
      premiums,
      power_guarantee: powerGuarantee,
      scarcity,
    };

    let error;
    if (isEditMode) {
        const { error: updateError } = await supabase
            .from('offers')
            .update(offerData)
            .eq('id', offerToEdit.id);
        error = updateError;
    } else {
        const { error: insertError } = await supabase.from('offers').insert(offerData);
        error = insertError;
    }

    setIsSaving(false);
    if (error) {
      toast.error(`Lỗi khi ${isEditMode ? 'cập nhật' : 'lưu'} offer: ` + error.message);
    } else {
      toast.success(`Đã ${isEditMode ? 'cập nhật' : 'tạo'} offer thành công!`);
      onNavigate('offer');
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto font-sans">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onCancel} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Quay lại
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto mb-4 text-[#16A349]">
                <Sparkles size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{isEditMode ? 'Chỉnh sửa Offer' : 'Tạo Offer Mới'}</h2>
              <p className="text-slate-500 text-[15px]">
                {isEditMode ? 'Cập nhật thông tin cho Godfather Offer của bạn.' : 'Xây dựng một "Godfather Offer" không thể chối từ bằng cách điền các thông tin bên dưới.'}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[13px] font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <ShoppingBag size={16} className="text-[#16A349]" /> 
                  Chọn Product*
                </label>
                <p className="text-xs text-slate-500 mb-2">
                  Chọn một sản phẩm cốt lõi để xây dựng offer này.
                </p>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#16A349]/20 focus:border-[#16A349] bg-white"
                >
                  <option value="" disabled>-- Chọn một sản phẩm --</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>{product.title}</option>
                  ))}
                </select>
              </div>

              <FormField icon={HelpCircle} label="1. Rationale (Lý do hợp lý)" description="Tại sao bạn lại có ưu đãi này? (VD: Xả kho, sinh nhật, tìm case study...)" placeholder="e.g., Để kỷ niệm 5 năm thành lập, chúng tôi muốn tri ân 50 khách hàng đầu tiên..." value={rationale} onChange={(e) => setRationale(e.target.value)} />
              <FormField icon={DollarSign} label="2. Build Value (Xây dựng giá trị)" description="Liệt kê các thành phần và giá trị của chúng để tạo ra 'Total Value'." placeholder="e.g., - Khóa học chính (Giá trị $1,997)&#10;- Bonus 1: Swipe File (Giá trị $497)&#10;Tổng giá trị: $2,494" value={valueBuild} onChange={(e) => setValueBuild(e.target.value)} />
              <FormField icon={DollarSign} label="3. Pricing (Định giá)" description="Công bố giá bán thực tế của bạn." placeholder="e.g., Giá thông thường: $1,997. Hôm nay chỉ còn: $497" value={pricing} onChange={(e) => setPricing(e.target.value)} />
              <FormField icon={CreditCard} label="4. Payment Options (Tùy chọn thanh toán)" description="Cung cấp phương án trả góp nếu cần thiết." placeholder="e.g., Hoặc chỉ cần 3 lần thanh toán, mỗi lần $197." value={paymentOptions} onChange={(e) => setPaymentOptions(e.target.value)} />
              <FormField icon={Gift} label="5. Premiums (Quà tặng kèm/Bonuses)" description="Liệt kê các quà tặng kèm để tăng giá trị." placeholder="e.g., Bonus #1: Truy cập cộng đồng VIP&#10;Bonus #2: Buổi coaching 1-1" value={premiums} onChange={(e) => setPremiums(e.target.value)} />
              <FormField icon={ShieldCheck} label="6. Power Guarantee (Cam kết mạnh mẽ)" description="Đảo ngược rủi ro cho khách hàng." placeholder="e.g., Cam kết hoàn tiền 200% trong 60 ngày nếu bạn không thấy kết quả." value={powerGuarantee} onChange={(e) => setPowerGuarantee(e.target.value)} />
              <FormField icon={Clock} label="7. Scarcity (Sự khan hiếm)" description="Lý do khách hàng phải hành động ngay." placeholder="e.g., Ưu đãi này chỉ dành cho 20 người đầu tiên và sẽ kết thúc sau 24 giờ." value={scarcity} onChange={(e) => setScarcity(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[450px] shrink-0">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sticky top-8">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <BrainCircuit size={18} className="text-[#16A349]" />
              Tóm tắt Offer do AI tạo
            </h3>
            <div className="mb-4">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center h-[250px] bg-slate-50 rounded-lg border border-dashed">
                  <Loader2 size={32} className="animate-spin text-slate-400" />
                  <p className="text-sm text-slate-500 mt-4">AI đang suy nghĩ...</p>
                </div>
              ) : (
                <textarea 
                  className="w-full p-4 border border-slate-200 rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#16A349]/20 focus:border-[#16A349] min-h-[250px] resize-none bg-slate-50"
                  placeholder="Nhấp vào 'Tạo tóm tắt' để AI viết nội dung cho bạn ở đây..."
                  value={generatedSummary}
                  onChange={(e) => setGeneratedSummary(e.target.value)}
                />
              )}
            </div>
            <button 
              onClick={handleGenerateSummary}
              disabled={isGenerating || isSaving}
              className="w-full mb-2 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#0EB869] text-white text-[14px] font-bold hover:bg-[#0B9655] transition-colors shadow-sm disabled:opacity-50"
            >
              {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
              Tạo tóm tắt Offer
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-slate-200 text-slate-700 text-[14px] font-bold hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {isEditMode ? 'Lưu thay đổi' : 'Lưu Offer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};