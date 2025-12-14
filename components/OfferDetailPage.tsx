import React from 'react';
import { 
  ArrowLeft, 
  Edit, 
  Trash2,
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
  Heart
} from 'lucide-react';

const DetailItem: React.FC<{ icon: React.ElementType; label: string; value: string | number | string[] }> = ({ icon: Icon, label, value }) => (
  <div className="py-4 border-b border-slate-100 last:border-b-0">
    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
      <Icon size={14} />
      {label}
    </div>
    <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
      {Array.isArray(value) ? (
        <ul className="list-disc pl-5">
          {value.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      ) : (
        value
      )}
    </div>
  </div>
);

export const OfferDetailPage: React.FC<{ offer: any; onBack: () => void; onDelete: (id: string) => void; onEdit: (offer: any) => void; }> = ({ offer, onBack, onDelete, onEdit }) => {
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
          <span className="text-xs font-bold text-white bg-[#16A349] px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">{offer.category}</span>
          <h1 className="text-3xl font-bold text-slate-900">{offer.title}</h1>
        </div>

        <h3 className="font-bold text-slate-900 mb-2">Chi tiết Offer</h3>
        <div className="divide-y divide-slate-100">
          {offer.target_market && <DetailItem icon={Users} label="Thị trường mục tiêu" value={offer.target_market} />}
          {offer.pressing_problem && <DetailItem icon={Frown} label="Vấn đề cấp bách" value={offer.pressing_problem} />}
          {offer.desired_outcome && <DetailItem icon={CheckCircle2} label="Kết quả mong muốn" value={offer.desired_outcome} />}
          {offer.features && <DetailItem icon={Award} label="Tính năng/USP" value={offer.features} />}
          {offer.technology && <DetailItem icon={Cpu} label="Công nghệ/Phương pháp" value={offer.technology} />}
          {offer.studies && <DetailItem icon={BarChart} label="Nghiên cứu/Thống kê" value={offer.studies} />}
          {offer.social_proof && <DetailItem icon={Globe} label="Bằng chứng xã hội" value={offer.social_proof} />}
          {offer.authority_figure && <DetailItem icon={UserCheck} label="Nhân vật có uy tín" value={offer.authority_figure} />}
          {offer.unique_mechanism && <DetailItem icon={Wrench} label="Cơ chế độc đáo" value={offer.unique_mechanism} />}
          {offer.review_count && <DetailItem icon={Star} label="Số lượng đánh giá" value={offer.review_count} />}
          {offer.avg_review_rating && <DetailItem icon={Star} label="Xếp hạng trung bình" value={offer.avg_review_rating} />}
          {offer.total_customers && <DetailItem icon={Users} label="Tổng số khách hàng" value={offer.total_customers} />}
          {offer.testimonials && <DetailItem icon={Heart} label="Phản hồi" value={offer.testimonials} />}
        </div>
      </div>
    </div>
  );
};