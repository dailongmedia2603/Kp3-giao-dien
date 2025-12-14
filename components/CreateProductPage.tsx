import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft,
  Loader2,
  Save,
  Sparkles,
  BrainCircuit,
  Type,
  Tag,
  FileText,
  Users,
  Frown,
  CheckCircle2,
  Award,
  Cpu,
  BarChart,
  Globe,
  UserCheck,
  Wrench,
  Star,
  Heart,
  LayoutGrid
} from 'lucide-react';
import { supabase } from '@/src/integrations/supabase/client';
import { useSession } from '@/src/contexts/SessionContext';
import toast from 'react-hot-toast';

interface CreateProductPageProps {
  onCancel: () => void;
  onNavigate: (view: string) => void;
  initialCategory?: string | null;
  productToEdit?: any | null;
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
  type?: string;
}> = ({ icon: Icon, label, description, value, onChange, placeholder, isTextarea, rows, type = 'text' }) => (
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
        type={type}
        className="w-full p-3 border border-slate-200 rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#0EB869]/20 focus:border-[#0EB869]"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    )}
  </div>
);

export const CreateProductPage: React.FC<CreateProductPageProps> = ({ onCancel, onNavigate, initialCategory, productToEdit }) => {
  const { user } = useSession();
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

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

  const isEditMode = !!productToEdit;

  useEffect(() => {
    if (isEditMode) {
      setTitle(productToEdit.title || '');
      setCategory(productToEdit.category || initialCategory || '');
      setDescription(productToEdit.description || '');
      setTargetMarket(productToEdit.target_market || '');
      setPressingProblem(productToEdit.pressing_problem || '');
      setDesiredOutcome(productToEdit.desired_outcome || '');
      setFeatures(productToEdit.features || '');
      setTechnology(productToEdit.technology || '');
      setStudies(productToEdit.studies || '');
      setSocialProof(productToEdit.social_proof || '');
      setAuthorityFigure(productToEdit.authority_figure || '');
      setUniqueMechanism(productToEdit.unique_mechanism || '');
      setReviewCount(productToEdit.review_count?.toString() || '');
      setAvgReviewRating(productToEdit.avg_review_rating?.toString() || '');
      setTotalCustomers(productToEdit.total_customers?.toString() || '');
      setTestimonials(productToEdit.testimonials || '');
    } else {
      setTitle('');
      setCategory(initialCategory || '');
      setDescription('');
      setTargetMarket('');
      setPressingProblem('');
      setDesiredOutcome('');
      setFeatures('');
      setTechnology('');
      setStudies('');
      setSocialProof('');
      setAuthorityFigure('');
      setUniqueMechanism('');
      setReviewCount('');
      setAvgReviewRating('');
      setTotalCustomers('');
      setTestimonials('');
    }
  }, [productToEdit, isEditMode, initialCategory]);

  const offerTypes = [
    { value: 'service', label: 'Service' },
    { value: 'physical', label: 'Physical' },
    { value: 'software', label: 'Software' },
    { value: 'digital', label: 'Digital' },
    { value: 'e-learning', label: 'E-learning' },
    { value: 'affiliate', label: 'Affiliate' },
  ];

  const handleGenerateDescription = async () => {
    if (!title) {
      toast.error('Vui lòng nhập Tiêu đề Product trước.');
      return;
    }
    setIsGenerating(true);
    setDescription('');

    try {
      const { data, error } = await supabase.functions.invoke('generate-offer-summary', {
        body: { 
          offerDetails: {
            title, category, 
            target_market: targetMarket, 
            pressing_problem: pressingProblem, 
            desired_outcome: desiredOutcome,
            features, technology, studies,
            social_proof: socialProof,
            authority_figure: authorityFigure,
            unique_mechanism: uniqueMechanism,
            review_count: reviewCount,
            avg_review_rating: avgReviewRating,
            total_customers: totalCustomers,
            testimonials
          }
        },
      });

      if (error) throw error;

      setDescription(data.description);
      toast.success('Đã tạo mô tả bằng AI!');

    } catch (error: any) {
      console.error("Failed to generate description:", error);
      const errorMessage = error.context?.json?.error || error.message || 'Lỗi khi tạo mô tả.';
      setDescription(`Không thể tạo mô tả: ${errorMessage}`);
      toast.error(errorMessage, { duration: 5000 });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!user) {
      toast.error('Bạn cần đăng nhập để thực hiện.');
      return;
    }
    if (!title || !category) {
      toast.error('Vui lòng điền Tiêu đề và Loại Product.');
      return;
    }

    setIsSaving(true);
    const productData = {
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
    };

    let error;
    if (isEditMode) {
      const { error: updateError } = await supabase
        .from('products')
        .update(productData)
        .eq('id', productToEdit.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase.from('products').insert(productData);
      error = insertError;
    }

    setIsSaving(false);
    if (error) {
      console.error('Error saving product:', error);
      toast.error('Lỗi khi lưu sản phẩm: ' + error.message);
    } else {
      toast.success(`Đã ${isEditMode ? 'cập nhật' : 'tạo'} sản phẩm thành công!`);
      onNavigate('offer');
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto font-sans">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onCancel} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Quay lại Tất cả Products
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto mb-4 text-[#16A349]">
                <Sparkles size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{isEditMode ? 'Chỉnh sửa Product' : 'Tạo Product Mới'}</h2>
              <p className="text-slate-500 text-[15px]">
                {isEditMode ? 'Cập nhật thông tin chi tiết cho sản phẩm của bạn.' : 'Điền các thông tin chi tiết bên dưới để AI tạo mô tả cho bạn.'}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[13px] font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <LayoutGrid size={16} className="text-[#0EB869]" /> 
                  Loại Product*
                </label>
                <p className="text-xs text-slate-500 mb-2">
                  Chọn loại product để phân loại chính xác.
                </p>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#0EB869]/20 focus:border-[#0EB869] bg-white"
                >
                  <option value="" disabled>-- Chọn một loại --</option>
                  {offerTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <FormField icon={Type} label="Tiêu đề Product/Sản phẩm/Dịch vụ*" description="Tên của sản phẩm/dịch vụ/HVCO bạn đang quảng bá." placeholder="e.g., Khóa học Marketing Tinh gọn" value={title} onChange={(e) => setTitle(e.target.value)} />
              
              <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
                  <p className="text-[13px] text-slate-700 leading-relaxed font-medium">
                      <span className="font-bold">Các trường dưới đây là tùy chọn nhưng được khuyến nghị hoàn thành</span> - bạn có thể lưu trữ thông tin sản phẩm thường dùng ở đây để không cần nhập lại trên toàn trang.
                  </p>
              </div>

              <FormField icon={Users} label="Thị trường mục tiêu" description="Ví dụ: Phụ nữ trên 45 tuổi." placeholder="e.g., Chủ doanh nghiệp nhỏ, solo-preneurs" value={targetMarket} onChange={(e) => setTargetMarket(e.target.value)} />
              <FormField icon={Frown} label="Vấn đề cấp bách" description="Ví dụ: Tăng cân/trao đổi chất chậm lại do mãn kinh." placeholder="e.g., Mệt mỏi vì phải 'săn' khách hàng, không có đủ khách hàng tiềm năng chất lượng." value={pressingProblem} onChange={(e) => setPressingProblem(e.target.value)} isTextarea />
              <FormField icon={CheckCircle2} label="Kết quả mong muốn" description="Ví dụ: Trở nên thon gọn, quyến rũ, được khao khát..." placeholder="e.g., Có một dòng khách hàng ổn định, tự động hóa việc kinh doanh." value={desiredOutcome} onChange={(e) => setDesiredOutcome(e.target.value)} isTextarea />
              <FormField icon={Award} label="Tính năng/USP" description="Ví dụ: 10g Protein mỗi muỗng, Làm từ Cà phê Cao cấp, Không đường, Hữu cơ." placeholder="Liệt kê các tính năng chính, mỗi tính năng trên một dòng." value={features} onChange={(e) => setFeatures(e.target.value)} isTextarea />
              <FormField icon={Cpu} label="Công nghệ/Phương pháp cụ thể" description="Ví dụ: AI đột phá mới, Công nghệ 'FirmFit' mới, Khung tái cấp vốn..." placeholder="Công nghệ độc quyền của bạn là gì?" value={technology} onChange={(e) => setTechnology(e.target.value)} />
              <FormField icon={BarChart} label="Nghiên cứu khoa học/Thống kê" description="Ví dụ: 9/10 nha sĩ khuyên dùng." placeholder="Trích dẫn các số liệu hoặc nghiên cứu hỗ trợ." value={studies} onChange={(e) => setStudies(e.target.value)} />
              <FormField icon={Globe} label="Được giới thiệu trên (Bằng chứng xã hội)" description="Ví dụ: GQ, Elle, Vogue & Forbes." placeholder="Liệt kê các kênh truyền thông uy tín đã nói về bạn." value={socialProof} onChange={(e) => setSocialProof(e.target.value)} />
              <FormField icon={UserCheck} label="Nhân vật có uy tín" description="Ví dụ: Được phát triển bởi Tiến sĩ John Doe, một nhà khoa học từng đoạt giải Nobel." placeholder="Ai là người đứng sau sản phẩm này?" value={authorityFigure} onChange={(e) => setAuthorityFigure(e.target.value)} />
              <FormField icon={Wrench} label="Cơ chế độc đáo" description="Điều gì làm cho giải pháp này trở nên độc đáo? (Hệ thống 3 bước, thuật toán...)" placeholder="Mô tả quy trình độc đáo của bạn." value={uniqueMechanism} onChange={(e) => setUniqueMechanism(e.target.value)} isTextarea />
              <FormField icon={Star} label="Số lượng đánh giá" description="Ví dụ: 3144" placeholder="0" value={reviewCount} onChange={(e) => setReviewCount(e.target.value)} type="number" />
              <FormField icon={Star} label="Xếp hạng đánh giá trung bình" description="Ví dụ: 4.75" placeholder="0.0" value={avgReviewRating} onChange={(e) => setAvgReviewRating(e.target.value)} type="number" />
              <FormField icon={Users} label="Tổng số khách hàng (từ trước đến nay)" description="Ví dụ: 475000" placeholder="0" value={totalCustomers} onChange={(e) => setTotalCustomers(e.target.value)} type="number" />
              <FormField icon={Heart} label="Phản hồi của khách hàng" description="Ví dụ: các phản hồi thực tế từ người dùng, mỗi phản hồi trên một dòng." placeholder="Dán các phản hồi tốt nhất vào đây." value={testimonials} onChange={(e) => setTestimonials(e.target.value)} isTextarea />
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-4">
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
              disabled={isSaving || isGenerating || !title || !category}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-slate-200 text-slate-700 text-[14px] font-bold hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {isEditMode ? 'Lưu thay đổi' : 'Lưu Product'}
            </button>
          </div>
        </div>

        <div className="w-full lg:w-[450px] shrink-0">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sticky top-8">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <BrainCircuit size={18} className="text-[#0EB869]" />
              Mô tả do AI tạo*
            </h3>
            <div className="mb-4">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center h-[250px] bg-slate-50 rounded-lg border border-dashed">
                  <Loader2 size={32} className="animate-spin text-slate-400" />
                  <p className="text-sm text-slate-500 mt-4">AI đang suy nghĩ...</p>
                </div>
              ) : (
                <textarea 
                  className="w-full p-4 border border-slate-200 rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#0EB869]/20 focus:border-[#0EB869] min-h-[250px] resize-none bg-slate-50"
                  placeholder="Nhấp vào 'Tạo mô tả' để AI viết nội dung cho bạn ở đây..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};