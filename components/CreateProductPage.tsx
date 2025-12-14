import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Sparkles, 
  ArrowLeft,
  Loader2,
  Save,
  BrainCircuit,
  Type,
  Tag,
  FileText,
  Users,
  Frown,
  CheckCircle2
} from 'lucide-react';
import { supabase } from '@/src/integrations/supabase/client';
import { useSession } from '@/src/contexts/SessionContext';
import toast from 'react-hot-toast';

interface CreateProductPageProps {
  onCancel: () => void;
  onNavigate: (view: string) => void;
}

const FormField: React.FC<{
  icon: React.ElementType;
  label: string;
  description: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  isTextarea?: boolean;
  rows?: number;
}> = ({ icon: Icon, label, description, value, onChange, placeholder, isTextarea, rows }) => (
  <div>
    <label className="block text-[13px] font-bold text-slate-900 mb-2 flex items-center gap-2">
      <Icon size={16} className="text-[#0EB869]" /> 
      {label}
    </label>
    <p className="text-xs text-slate-500 mb-2">
      {description}
    </p>
    {isTextarea ? (
      <textarea 
        className="w-full p-4 border border-slate-200 rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#0EB869]/20 focus:border-[#0EB869] min-h-[100px] resize-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows || 4}
      />
    ) : (
      <input 
        type="text"
        className="w-full p-3 border border-slate-200 rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#0EB869]/20 focus:border-[#0EB869]"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    )}
  </div>
);

export const CreateProductPage: React.FC<CreateProductPageProps> = ({ onCancel, onNavigate }) => {
  const { user } = useSession();
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [targetMarket, setTargetMarket] = useState('');
  const [pressingProblem, setPressingProblem] = useState('');
  const [desiredOutcome, setDesiredOutcome] = useState('');

  const handleGenerateDescription = async () => {
    if (!title) {
      toast.error('Vui lòng nhập Tiêu đề Offer trước.');
      return;
    }
    setIsGenerating(true);
    setDescription('');

    try {
      const { data, error } = await supabase.functions.invoke('generate-offer-summary', {
        body: { 
          offerDetails: {
            title,
            category,
            target_market: targetMarket,
            pressing_problem: pressingProblem,
            desired_outcome: desiredOutcome,
          }
        },
      });

      if (error) throw error;

      setDescription(data.description);
      toast.success('Đã tạo mô tả bằng AI!');

    } catch (error: any) {
      console.error("Failed to generate description:", error);
      const errorMessage = error.message || 'Lỗi khi tạo mô tả.';
      setDescription(`Không thể tạo mô tả: ${errorMessage}`);
      toast.error(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!user) {
      toast.error('Bạn cần đăng nhập để tạo offer.');
      return;
    }
    if (!title || !category || !description) {
      toast.error('Vui lòng điền các trường bắt buộc (*).');
      return;
    }

    setIsSaving(true);
    const { error } = await supabase.from('offers').insert({
      user_id: user.id,
      title,
      category,
      description,
      target_market: targetMarket,
      pressing_problem: pressingProblem,
      desired_outcome: desiredOutcome,
    });

    setIsSaving(false);
    if (error) {
      console.error('Error saving offer:', error);
      toast.error('Lỗi khi lưu offer: ' + error.message);
    } else {
      toast.success('Đã tạo offer thành công!');
      onNavigate('offer');
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto font-sans">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onCancel} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Quay lại Tất cả Offer
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#E8FCF3] rounded-full flex items-center justify-center mx-auto mb-4 text-[#0EB869]">
                <Sparkles size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Tạo Offer Mới</h2>
              <p className="text-slate-500 text-[15px]">
                Điền các thông tin chi tiết bên dưới để AI tạo mô tả cho bạn.
              </p>
            </div>

            <div className="space-y-6">
              <FormField icon={Type} label="Tiêu đề Offer/Sản phẩm/Dịch vụ*" description="Tên của sản phẩm/dịch vụ/HVCO bạn đang quảng bá." placeholder="e.g., Khóa học Marketing Tinh gọn" value={title} onChange={(e) => setTitle(e.target.value)} />
              <FormField icon={Tag} label="Danh mục*" description="Ví dụ: Nha khoa, Mỹ phẩm, Đầu tư Bất động sản, Digital Marketing" placeholder="e.g., Digital Marketing" value={category} onChange={(e) => setCategory(e.target.value)} />
              <FormField icon={Users} label="Thị trường mục tiêu" description="Ví dụ: Phụ nữ trên 45 tuổi." placeholder="e.g., Chủ doanh nghiệp nhỏ, solo-preneurs" value={targetMarket} onChange={(e) => setTargetMarket(e.target.value)} />
              <FormField icon={Frown} label="Vấn đề cấp bách" description="Ví dụ: Tăng cân/trao đổi chất chậm lại do mãn kinh." placeholder="e.g., Mệt mỏi vì phải 'săn' khách hàng, không có đủ khách hàng tiềm năng chất lượng." value={pressingProblem} onChange={(e) => setPressingProblem(e.target.value)} isTextarea />
              <FormField icon={CheckCircle2} label="Kết quả mong muốn" description="Ví dụ: Trở nên thon gọn, quyến rũ, được khao khát..." placeholder="e.g., Có một dòng khách hàng ổn định, tự động hóa việc kinh doanh." value={desiredOutcome} onChange={(e) => setDesiredOutcome(e.target.value)} isTextarea />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[450px] shrink-0">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sticky top-8">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <BrainCircuit size={18} className="text-[#0EB869]" />
              Mô tả do AI tạo*
            </h3>
            <div className="mb-4">
              <textarea 
                className="w-full p-4 border border-slate-200 rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#0EB869]/20 focus:border-[#0EB869] min-h-[250px] resize-none bg-slate-50"
                placeholder="Nhấp vào 'Tạo mô tả' để AI viết nội dung cho bạn ở đây..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleGenerateDescription}
                disabled={isGenerating || isSaving || !title}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#0EB869] text-white text-[14px] font-bold hover:bg-[#0B9655] transition-colors shadow-sm disabled:opacity-50"
              >
                {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                Tạo mô tả
              </button>
              <button 
                onClick={handleSave}
                disabled={isSaving || isGenerating || !title || !description}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-slate-200 text-slate-700 text-[14px] font-bold hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                Lưu Offer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};