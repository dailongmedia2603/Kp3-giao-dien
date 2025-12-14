import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Sparkles, 
  ChevronLeft, 
  ArrowRight, 
  ArrowLeft,
  Plus
} from 'lucide-react';

interface CreateProductPageProps {
  onCancel: () => void;
}

export const CreateProductPage: React.FC<CreateProductPageProps> = ({ onCancel }) => {
  const [showAuthorityExamples, setShowAuthorityExamples] = useState(false);
  const [mechanismInput, setMechanismInput] = useState("");

  const handleMechanismExampleClick = () => {
    setMechanismInput("$7.8 Billion AI Funnel That's Generating 90-480 Super Qualified Appointments A Month On Autopilot");
  };

  return (
    <div className="p-8 max-w-[800px] mx-auto font-sans mb-20">
      
      {/* Breadcrumb */}
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

      {/* Main Form Container */}
      <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm space-y-8">
        
        {/* Title */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Tiêu đề Offer/Sản phẩm/Dịch vụ*
            </label>
            <div className="text-[12px] text-slate-500 mb-2">Tên của sản phẩm/dịch vụ/HVCO bạn đang quảng bá.</div>
            <input 
                type="text" 
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
            />
            <div className="text-[11px] text-slate-400 mt-1.5">Còn lại 100 ký tự</div>
        </div>

        {/* Category */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Danh mục*
            </label>
            <div className="text-[12px] text-slate-500 mb-2">Ví dụ: Nha khoa, Mỹ phẩm, Đầu tư Bất động sản, Digital Marketing</div>
            <input 
                type="text" 
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
            />
            <div className="text-[11px] text-slate-400 mt-1.5">Còn lại 100 ký tự</div>
        </div>

        {/* Description */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Mô tả*
            </label>
            <div className="text-[12px] text-slate-500 mb-2">KP3 muốn hiểu rõ về offer bạn đang quảng bá.<br/>Nó là gì? Nó làm gì? Nó hoạt động như thế nào?<br/>Mọi người thường sử dụng nó như thế nào?</div>
            <textarea 
                rows={6}
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] resize-none leading-relaxed"
            />
            <div className="text-[11px] text-slate-400 mt-1.5">Còn lại 1000 ký tự</div>
        </div>

        {/* Info Box */}
        <div className="bg-[#F3E8FF] rounded-lg p-5 border border-[#E9D5FF]">
            <p className="text-[13px] text-slate-700 leading-relaxed font-medium">
                <span className="font-bold">Các trường dưới đây là tùy chọn nhưng được khuyến nghị hoàn thành</span> - bạn có thể lưu trữ thông tin sản phẩm thường dùng ở đây để không cần nhập lại trên toàn trang. Bạn sẽ được yêu cầu xem lại thông tin này nếu nó được sử dụng cho một tài nguyên cụ thể.
            </p>
        </div>

        {/* Target Market */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Thị trường mục tiêu
            </label>
            <div className="text-[12px] text-slate-500 mb-2">Ví dụ: Phụ nữ trên 45 tuổi.</div>
            <input 
                type="text" 
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
            />
            <div className="text-[11px] text-slate-400 mt-1.5">Còn lại 100 ký tự</div>
        </div>

        {/* Pressing Problem */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Vấn đề cấp bách
            </label>
            <div className="text-[12px] text-slate-500 mb-2">Ví dụ: Tăng cân/trao đổi chất chậm lại do mãn kinh.</div>
            <textarea 
                rows={4}
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] resize-none"
            />
            <div className="text-[11px] text-slate-400 mt-1.5">Còn lại 200 ký tự</div>
        </div>

        {/* Desired Outcome */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Kết quả mong muốn
            </label>
            <div className="text-[12px] text-slate-500 mb-2">Ví dụ: Trở nên thon gọn, quyến rũ, được khao khát, gây ấn tượng với chồng, trông giống như phiên bản trẻ trung thon gọn của chính mình</div>
            <textarea 
                rows={4}
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] resize-none"
            />
            <div className="text-[11px] text-slate-400 mt-1.5">Còn lại 200 ký tự</div>
        </div>

        {/* Product Features/USPs */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Tính năng/USP:
            </label>
            <div className="text-[12px] text-slate-500 mb-2">Ví dụ: 10g Protein mỗi muỗng, Làm từ Cà phê Cao cấp, Không đường, Hoàn toàn tự nhiên, Hữu cơ</div>
            <textarea 
                rows={4}
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] resize-none"
            />
            <div className="text-[11px] text-slate-400 mt-1.5">Còn lại 200 ký tự</div>
        </div>

        {/* Specific technology... */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Công nghệ/thành phần/phương pháp cụ thể:
            </label>
            <div className="text-[12px] text-slate-500 mb-2">Ví dụ: AI đột phá mới, Công nghệ 'FirmFit' mới, Khung tái cấp vốn, Lỗ hổng thuật toán, Chiến lược chọn cổ phiếu của JP Morgan, Chiến lược Yield Farming, Bài tập 1 trang, Phương pháp 3 bước, v.v.</div>
            <textarea 
                rows={4}
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] resize-none"
            />
            <div className="text-[11px] text-slate-400 mt-1.5">Còn lại 200 ký tự</div>
        </div>

        {/* Scientific Studies... */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Nghiên cứu khoa học/Thống kê:
            </label>
            <div className="text-[12px] text-slate-500 mb-2">Ví dụ: 9/10 nha sĩ khuyên dùng</div>
            <textarea 
                rows={4}
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] resize-none"
            />
            <div className="text-[11px] text-slate-400 mt-1.5">Còn lại 200 ký tự</div>
        </div>

        {/* Featured in... */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Được giới thiệu trên (Bằng chứng xã hội):
            </label>
            <div className="text-[12px] text-slate-500 mb-2">Ví dụ: GQ, Elle, Vogue & Forbes</div>
            <textarea 
                rows={4}
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] resize-none"
            />
            <div className="text-[11px] text-slate-400 mt-1.5">Còn lại 200 ký tự</div>
        </div>

        {/* Credible Authority Figure */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Nhân vật có uy tín:
            </label>
            <button 
                onClick={() => setShowAuthorityExamples(!showAuthorityExamples)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#F3E8FF] hover:bg-[#E9D5FF] text-[#7C3AED] text-[13px] font-bold rounded-lg transition-colors mb-3"
            >
                <Sparkles size={16} />
                Hiển thị ví dụ
                {showAuthorityExamples ? <Plus className="rotate-45 transition-transform" size={16} /> : <Plus size={16} />}
            </button>
            <textarea 
                rows={4}
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] resize-none"
            />
            <div className="text-[11px] text-slate-400 mt-1.5">Còn lại 200 ký tự</div>
        </div>

        {/* Unique Mechanism */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Cơ chế độc đáo:
            </label>
            <div className="text-[12px] text-slate-500 mb-3 leading-relaxed">
                Điều gì làm cho giải pháp này trở nên độc đáo? Hãy nghĩ về quy trình, khung, thành phần, thuật toán, hệ thống 3 bước đặc biệt, v.v. cho phép thị trường mục tiêu của bạn thực sự đạt được kết quả mong muốn.
            </div>
            
            {/* Mechanism Examples Box */}
            <div className="bg-[#FDFBFF] border border-[#E9D5FF] rounded-lg p-5 mb-3">
                <div className="flex items-center gap-2 mb-3 text-[#7C3AED] font-bold text-[13px]">
                    <Sparkles size={16} />
                    Ví dụ
                </div>
                
                <div className="text-center text-[12px] text-slate-500 mb-4">
                    Nhấp vào bất kỳ ví dụ nào để điền vào ô văn bản, sau đó chỉnh sửa cho phù hợp với doanh nghiệp của bạn
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 bg-[#7C3AED] text-white rounded-lg hover:bg-[#6D28D9] transition-colors shrink-0">
                        <ArrowLeft size={16} />
                    </button>
                    
                    <div 
                        onClick={handleMechanismExampleClick}
                        className="flex-1 bg-white border border-[#E9D5FF] rounded-lg p-4 text-center cursor-pointer hover:border-[#7C3AED] hover:shadow-md transition-all"
                    >
                        <p className="text-[13px] font-bold text-slate-900">
                           $7.8 Billion AI Funnel That's Generating 90-480 Super Qualified Appointments A Month On Autopilot
                        </p>
                    </div>

                    <button className="p-2 bg-[#7C3AED] text-white rounded-lg hover:bg-[#6D28D9] transition-colors shrink-0">
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>

            <textarea 
                rows={4}
                value={mechanismInput}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMechanismInput(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] resize-none"
            />
            <div className="text-[11px] text-slate-400 mt-1.5">Còn lại 200 ký tự</div>
        </div>

        {/* Number of reviews */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Số lượng đánh giá:
            </label>
            <div className="text-[12px] text-slate-500 mb-2">Ví dụ: 3144.</div>
            <input 
                type="text" 
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
            />
        </div>

        {/* Average review rating */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Xếp hạng đánh giá trung bình:
            </label>
            <div className="text-[12px] text-slate-500 mb-2">Ví dụ: 4.75.</div>
            <input 
                type="text" 
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
            />
        </div>

        {/* Total number of customers ALL TIME */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Tổng số khách hàng (từ trước đến nay):
            </label>
            <div className="text-[12px] text-slate-500 mb-2">Ví dụ: 475000.</div>
            <input 
                type="text" 
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]"
            />
        </div>

        {/* Testimonials */}
        <div>
            <label className="block text-[13px] font-bold text-slate-700 mb-1">
                Phản hồi của khách hàng:
            </label>
            <div className="text-[12px] text-slate-500 mb-2">Ví dụ: các phản hồi thực tế từ người dùng, mỗi phản hồi trên một dòng.</div>
            <textarea 
                rows={6}
                className="w-full p-3 border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] resize-none"
            />
            <div className="text-[11px] text-slate-400 mt-1.5">Còn lại 1000 ký tự</div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 pt-4">
            <button className="px-6 py-3 bg-[#7C3AED] text-white text-[14px] font-bold rounded-lg hover:bg-[#6D28D9] transition-colors shadow-sm">
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