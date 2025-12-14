import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  Plus,
  Loader2,
  Save
} from 'lucide-react';
import { supabase } from '@/src/integrations/supabase/client';
import { useSession } from '@/src/contexts/SessionContext';
import toast from 'react-hot-toast';

interface CreateProductPageProps {
  onCancel: () => void;
  onNavigate: (view: string) => void;
}

export const CreateProductPage: React.FC<CreateProductPageProps> = ({ onCancel, onNavigate }) => {
  const { user } = useSession();
  const [isSaving, setIsSaving] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [targetMarket, setTargetMarket] = useState('');
  const [pressingProblem, setPressingProblem] = useState('');
  const [desiredOutcome, setDesiredOutcome] = useState('');
  const [features, setFeatures] = useState('');
  const [technology, setTechnology] = useState('');
  const [studies, setStudies] = useState('');
  const [socialProof, setSocialProof] = useState('');
  const [authorityFigure, setAuthorityFigure] = useState('');
  const [uniqueMechanism, setUniqueMechanism] = useState('');
  const [reviewCount, setReviewCount] = useState('');
  const [avgReviewRating, setAvgReviewRating] = useState('');
  const [totalCustomers, setTotalCustomers] = useState('');
  const [testimonials, setTestimonials] = useState('');

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
      features,
      technology,
      studies,
      social_proof: socialProof,
      authority_figure: authorityFigure,
      unique_mechanism: uniqueMechanism,
      review_count: reviewCount ? parseInt(reviewCount) : null,
      avg_review_rating: avgReviewRating ? parseFloat(avgReviewRating) : null,
      total_customers: totalCustomers ? parseInt(totalCustomers) : null,
      testimonials,
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
    <div className="p-8 max-w-[800px] mx-auto font-sans mb-20">
      
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <button onClick={onCancel} className="flex items-center gap-1 hover:text-slate-700">
             <Home size={16} className="text-slate-400" />
          </button>
          <ChevronRight size={14} className="text-slate-300" />
          <button onClick={onCancel} className="hover:text-slate-700">Tất cả Offer</button>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#F3E8FF] text-[#7C3AED] px-3 py-1 rounded text-xs font-bold">
            Tạo mới
          </span>
        </div>
        
        <h1 className="text-[26px] font-bold text-slate-900 mb-2 tracking-tight">
          Tạo Offer Mới
        </h1>
        
        <p className="text-slate-500 text-center text-[13px]">
          Hãy cho chúng tôi biết một chút về offer/dịch vụ của bạn.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm space-y-8">
        
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Tiêu đề Offer/Sản phẩm/Dịch vụ*
            </label>
            <div className="text-[12px] text-slate-500 mb-2">Tên của sản phẩm/dịch vụ/HVCO bạn đang quảng bá.</div>
            <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
            />
        </div>

        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Danh mục*
            </label>
            <div className="text-[12px] text-slate-500 mb-2">Ví dụ: Nha khoa, Mỹ phẩm, Đầu tư Bất động sản, Digital Marketing</div>
            <input 
                type="text" 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
            />
        </div>

        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Mô tả*
            </label>
            <div className="text-[12px] text-slate-500 mb-2">KP3 muốn hiểu rõ về offer bạn đang quảng bá.<br/>Nó là gì? Nó làm gì? Nó hoạt động như thế nào?<br/>Mọi người thường sử dụng nó như thế nào?</div>
            <textarea 
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] resize-none leading-relaxed"
            />
        </div>

        <div className="bg-[#F3E8FF] rounded-lg p-5 border border-[#E9D5FF]">
            <p className="text-[13px] text-slate-700 leading-relaxed font-medium">
                <span className="font-bold">Các trường dưới đây là tùy chọn nhưng được khuyến nghị hoàn thành</span> - bạn có thể lưu trữ thông tin sản phẩm thường dùng ở đây để không cần nhập lại trên toàn trang. Bạn sẽ được yêu cầu xem lại thông tin này nếu nó được sử dụng cho một tài nguyên cụ thể.
            </p>
        </div>

        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Thị trường mục tiêu
            </label>
            <div className="text-[12px] text-slate-500 mb-2">Ví dụ: Phụ nữ trên 45 tuổi.</div>
            <input 
                type="text" 
                value={targetMarket}
                onChange={(e) => setTargetMarket(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
            />
        </div>

        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Vấn đề cấp bách
            </label>
            <div className="text-[12px] text-slate-500 mb-2">Ví dụ: Tăng cân/trao đổi chất chậm lại do mãn kinh.</div>
            <textarea 
                rows={4}
                value={pressingProblem}
                onChange={(e) => setPressingProblem(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] resize-none"
            />
        </div>

        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Kết quả mong muốn
            </label>
            <div className="text-[12px] text-slate-500 mb-2">Ví dụ: Trở nên thon gọn, quyến rũ, được khao khát, gây ấn tượng với chồng, trông giống như phiên bản trẻ trung thon gọn của chính mình</div>
            <textarea 
                rows={4}
                value={desiredOutcome}
                onChange={(e) => setDesiredOutcome(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] resize-none"
            />
        </div>

        <div className="flex items-center gap-4 pt-4">
            <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#7C3AED] text-white text-[14px] font-bold rounded-lg hover:bg-[#6D28D9] transition-colors shadow-sm disabled:opacity-50"
            >
                {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                Tạo Offer
            </button>
            <button 
                onClick={onCancel}
                className="px-6 py-3 bg-white border border-slate-200 text-slate-700 text-[14px] font-bold rounded-lg hover:bg-slate-50 transition-colors"
            >
                Hủy
            </button>
        </div>

      </div>
    </div>
  );
};