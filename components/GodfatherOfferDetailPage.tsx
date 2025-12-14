import React from 'react';
import { 
  ArrowLeft, 
  Edit, 
  Trash2,
  HelpCircle,
  DollarSign,
  CreditCard,
  Gift,
  ShieldCheck,
  Clock,
  BrainCircuit
} from 'lucide-react';

const DetailItem: React.FC<{ icon: React.ElementType; label: string; value: string | null | undefined }> = ({ icon: Icon, label, value }) => {
  if (!value) return null;
  return (
    <div className="py-4 border-b border-slate-100 last:border-b-0">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
        <Icon size={14} />
        {label}
      </div>
      <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
        {value}
      </div>
    </div>
  );
};

export const GodfatherOfferDetailPage: React.FC<{ offer: any; onBack: () => void; onDelete: (id: string) => void; onEdit: (offer: any) => void; }> = ({ offer, onBack, onDelete, onEdit }) => {
  return (
    <div className="p-8 max-w-[800px] mx-auto font-sans animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Quay lại All Offers
        </button>
        <div className="flex gap-2">
          <button onClick={() => onEdit(offer)} className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-bold text-xs hover:bg-slate-50">
            <Edit size={14} /> Chỉnh sửa
          </button>
          <button onClick={() => onDelete(offer.id)} className="flex items-center gap-2 px-4 py-2 border border-red-200 bg-red-50 rounded-lg text-red-600 font-bold text-xs hover:bg-red-100">
            <Trash2 size={14} /> Xóa
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
        <div className="mb-6 pb-6 border-b border-slate-100">
          <h1 className="text-3xl font-bold text-slate-900">{offer.title}</h1>
        </div>

        {offer.description && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl shadow-sm overflow-hidden mb-6">
                <div className="px-6 py-4 border-b border-blue-100 bg-blue-100/50 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                        <BrainCircuit size={18} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Tóm tắt Offer (AI)</h3>
                </div>
                <div className="p-6">
                    <p className="text-sm text-slate-700 leading-relaxed italic">
                        "{offer.description}"
                    </p>
                </div>
            </div>
        )}

        <h3 className="font-bold text-slate-900 mb-2">7 Thành phần của Godfather Offer</h3>
        <div className="divide-y divide-slate-100">
          <DetailItem icon={HelpCircle} label="Rationale (Lý do hợp lý)" value={offer.rationale} />
          <DetailItem icon={DollarSign} label="Build Value (Xây dựng giá trị)" value={offer.value_build} />
          <DetailItem icon={DollarSign} label="Pricing (Định giá)" value={offer.pricing} />
          <DetailItem icon={CreditCard} label="Payment Options (Tùy chọn thanh toán)" value={offer.payment_options} />
          <DetailItem icon={Gift} label="Premiums (Quà tặng kèm/Bonuses)" value={offer.premiums} />
          <DetailItem icon={ShieldCheck} label="Power Guarantee (Cam kết mạnh mẽ)" value={offer.power_guarantee} />
          <DetailItem icon={Clock} label="Scarcity (Sự khan hiếm)" value={offer.scarcity} />
        </div>
      </div>
    </div>
  );
};