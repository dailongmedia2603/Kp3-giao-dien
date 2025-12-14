import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Download, 
  BookOpen, 
  Calendar, 
  Package, 
  ArrowLeft, 
  Sparkles,
  Image as ImageIcon,
  CheckCircle2,
  ShieldCheck,
  Gift,
  Clock,
  Plus,
  ShoppingCart,
  Lock
} from 'lucide-react';

type ProductType = 'digital' | 'course' | 'service' | 'physical';

const PRODUCT_TYPES = {
  digital: { icon: Download, title: 'Tải xuống Kỹ thuật số', desc: 'Ebook, tệp PDF, mẫu, âm thanh.' },
  course: { icon: BookOpen, title: 'Khóa học / Thành viên', desc: 'Liên kết đến LMS hoặc cộng đồng riêng.' },
  service: { icon: Calendar, title: 'Dịch vụ / Đặt lịch', desc: 'Tư vấn, huấn luyện, liên kết đến lịch.' },
  physical: { icon: Package, title: 'Sản phẩm Vật lý', desc: 'Hàng hóa, sản phẩm cần vận chuyển.' },
};

interface ProductData {
  name: string;
  price: number;
  priceType: 'once' | 'monthly';
  coverImage: string;
}

export const ProductStorePage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [productType, setProductType] = useState<ProductType | null>(null);
  const [productData, setProductData] = useState<ProductData>({
    name: 'Khóa học Đầu tư Bất động sản',
    price: 499,
    priceType: 'once',
    coverImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop'
  });
  const [showOrderBump, setShowOrderBump] = useState(false);
  const [linkGenerated, setLinkGenerated] = useState(false);

  const handleTypeSelect = (type: ProductType) => {
    setProductType(type);
    setStep(2);
  };

  const handleDataChange = (field: keyof ProductData, value: string | number) => {
    setProductData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateLink = () => {
    setLinkGenerated(true);
    setTimeout(() => setLinkGenerated(false), 3000);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <Step1ProductType onSelect={handleTypeSelect} />;
      case 2:
        if (!productType) return null;
        return (
          <Step2Editor
            productType={productType}
            productData={productData}
            onDataChange={handleDataChange}
            onBack={() => setStep(1)}
            showOrderBump={showOrderBump}
            onToggleOrderBump={() => setShowOrderBump(!showOrderBump)}
            onGenerateLink={handleGenerateLink}
            linkGenerated={linkGenerated}
          />
        );
      default:
        return <Step1ProductType onSelect={handleTypeSelect} />;
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto font-sans h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col items-center mb-8 text-center shrink-0">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold">
            Product & Store
          </span>
        </div>
        <h1 className="text-[26px] font-bold text-slate-900 mb-3 tracking-tight">
          {step === 1 ? 'Tạo một sản phẩm mới' : 'Chỉnh sửa & Xem trước'}
        </h1>
        <p className="text-slate-500 text-[13px] leading-relaxed mb-8 max-w-2xl mx-auto">
          {step === 1 
            ? 'Chọn loại sản phẩm bạn muốn bán. Bạn có thể tạo một liên kết bán hàng trong vòng chưa đầy 60 giây.'
            : 'Điền thông tin chi tiết sản phẩm của bạn và xem trước trang thanh toán trong thời gian thực.'}
        </p>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0">
        {renderStepContent()}
      </div>
    </div>
  );
};

// --- Step 1: Product Type Selection ---
const Step1ProductType: React.FC<{ onSelect: (type: ProductType) => void }> = ({ onSelect }) => (
  <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Object.entries(PRODUCT_TYPES).map(([key, { icon: Icon, title, desc }]) => (
        <div
          key={key}
          onClick={() => onSelect(key as ProductType)}
          className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-lg hover:border-[#0EB869] transition-all cursor-pointer group"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#E8FCF3] text-[#0EB869] flex items-center justify-center shrink-0 border border-white shadow-sm group-hover:scale-105 transition-transform">
              <Icon size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#0EB869] transition-colors">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- Step 2: Editor & Preview ---
const Step2Editor: React.FC<{
  productType: ProductType;
  productData: ProductData;
  onDataChange: (field: keyof ProductData, value: any) => void;
  onBack: () => void;
  showOrderBump: boolean;
  onToggleOrderBump: () => void;
  onGenerateLink: () => void;
  linkGenerated: boolean;
}> = ({ productType, productData, onDataChange, onBack, showOrderBump, onToggleOrderBump, onGenerateLink, linkGenerated }) => (
  <div className="flex flex-col xl:flex-row gap-8 h-full animate-in fade-in duration-300">
    {/* Left: Editor Panel */}
    <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h2 className="font-bold text-slate-900">Chỉnh sửa {PRODUCT_TYPES[productType].title}</h2>
          <p className="text-xs text-slate-400">Điền thông tin chi tiết bên dưới.</p>
        </div>
      </div>

      <div className="space-y-6 mb-6">
        {/* Name */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Tên sản phẩm</label>
          <input
            type="text"
            value={productData.name}
            onChange={(e) => onDataChange('name', e.target.value)}
            className="w-full p-3 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#0EB869]"
          />
        </div>
        {/* Price */}
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Giá</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
              <input
                type="number"
                value={productData.price}
                onChange={(e) => onDataChange('price', parseFloat(e.target.value) || 0)}
                className="w-full pl-7 p-3 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#0EB869]"
              />
            </div>
          </div>
          <select
            value={productData.priceType}
            onChange={(e) => onDataChange('priceType', e.target.value)}
            className="p-3 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#0EB869]"
          >
            <option value="once">Một lần</option>
            <option value="monthly">/tháng</option>
          </select>
        </div>
        {/* Cover Image */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Ảnh bìa</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={productData.coverImage}
              onChange={(e) => onDataChange('coverImage', e.target.value)}
              placeholder="https://..."
              className="flex-1 p-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#0EB869]"
            />
            <button className="p-3 bg-slate-100 rounded-lg hover:bg-slate-200"><ImageIcon size={18} className="text-slate-500" /></button>
          </div>
        </div>
      </div>

      {/* Godfather Offer Checklist */}
      <GodfatherChecklist />

      <div className="mt-auto pt-6 border-t border-slate-100">
        <button
          onClick={onGenerateLink}
          className={`w-full py-3 rounded-lg text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all
            ${linkGenerated ? 'bg-green-500' : 'bg-[#0EB869] hover:bg-[#0B9655]'}`}
        >
          {linkGenerated ? <><CheckCircle2 size={16} /> Liên kết đã được sao chép!</> : <><Sparkles size={16} /> Tạo liên kết bán hàng</>}
        </button>
      </div>
    </div>

    {/* Right: Preview */}
    <div className="w-full xl:w-[450px] shrink-0 flex flex-col items-center">
      <div className="mb-4">
        <label className="flex items-center cursor-pointer">
          <div className={`w-10 h-6 rounded-full p-1 transition-colors ${showOrderBump ? 'bg-[#0EB869]' : 'bg-slate-200'}`}>
            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${showOrderBump ? 'translate-x-4' : 'translate-x-0'}`}></div>
          </div>
          <span className="ml-3 text-sm font-bold text-slate-700">Bật Order Bump</span>
        </label>
      </div>
      <CheckoutPreview productData={productData} orderBump={showOrderBump} />
    </div>
  </div>
);

// --- Sub-components for Step 2 ---
const GodfatherChecklist: React.FC = () => (
  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
      <Sparkles size={16} className="text-amber-500" />
      "Godfather Offer" Checklist
    </h4>
    <div className="space-y-3">
      <ChecklistItem text="Thêm một sự đảm bảo mạnh mẽ" />
      <ChecklistItem text="Bao gồm ít nhất 3 phần thưởng" />
      <ChecklistItem text="Tạo ra sự khan hiếm hoặc khẩn cấp" />
    </div>
  </div>
);

const ChecklistItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-start gap-2 text-sm">
    <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center mt-0.5 shrink-0">
      <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
    </div>
    <span className="text-slate-600">{text}</span>
  </div>
);

const CheckoutPreview: React.FC<{ productData: ProductData, orderBump: boolean }> = ({ productData, orderBump }) => (
  <div className="w-[340px] bg-slate-800 rounded-[2.5rem] p-2 shadow-2xl">
    <div className="bg-white rounded-[2rem] overflow-hidden h-[680px] flex flex-col">
      {/* Header */}
      <div className="h-16 bg-slate-50 border-b border-slate-200 flex items-center justify-center shrink-0">
        <span className="text-lg font-bold text-slate-800">Thanh toán</span>
      </div>
      
      {/* Body */}
      <div className="flex-1 overflow-y-auto p-5 bg-slate-50">
        {/* Product Info */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-20 h-20 rounded-lg bg-slate-200 overflow-hidden shrink-0">
            {productData.coverImage && <img src={productData.coverImage} alt="cover" className="w-full h-full object-cover" />}
          </div>
          <div>
            <p className="font-bold text-slate-900 leading-tight">{productData.name || 'Tên sản phẩm'}</p>
            <p className="text-lg font-bold text-[#0EB869] mt-1">
              ${productData.price}
              {productData.priceType === 'monthly' && <span className="text-xs text-slate-500">/tháng</span>}
            </p>
          </div>
        </div>

        {/* Order Bump */}
        {orderBump && (
          <div className="bg-amber-50 border-2 border-dashed border-amber-300 rounded-lg p-4 mb-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-2 mb-2">
              <input type="checkbox" id="order-bump" className="h-5 w-5 rounded text-[#0EB869] focus:ring-[#0EB869]" />
              <label htmlFor="order-bump" className="font-bold text-slate-800">CÓ! Thêm vào đơn hàng của tôi</label>
            </div>
            <p className="text-sm text-slate-600 ml-7">Thêm "Ebook Swipe File" chỉ với <span className="font-bold text-red-600">$27</span> (thường là $97)!</p>
          </div>
        )}

        {/* Payment Form */}
        <div className="space-y-4">
          <input type="email" placeholder="Địa chỉ Email" className="w-full p-3 border border-slate-300 rounded-md text-sm" />
          <div className="p-3 border border-slate-300 rounded-md">
            <p className="text-sm text-slate-400">Thẻ tín dụng hoặc ghi nợ</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-5 bg-white border-t border-slate-200 shrink-0">
        <button className="w-full py-3 bg-[#0EB869] text-white font-bold rounded-lg shadow-md hover:bg-[#0B9655]">
          Thanh toán ${productData.price}
        </button>
        <p className="text-center text-[10px] text-slate-400 mt-3 flex items-center justify-center gap-1">
          <Lock size={10} /> Thanh toán an toàn được cung cấp bởi Stripe.
        </p>
      </div>
    </div>
  </div>
);