import React, { useState, useEffect } from 'react';
import { 
  Home, 
  ChevronRight, 
  User, 
  Target, 
  Zap, 
  Search, 
  Plus, 
  Briefcase, 
  BrainCircuit,
  Save,
  ArrowLeft,
  Sparkles,
  Loader2,
  Trash2,
  Users,
  MapPin,
  Frown,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  MessageSquare,
  ShoppingBag,
  Clock,
  ThumbsUp,
  MessageCircleWarning
} from 'lucide-react';
import { supabase } from '@/src/integrations/supabase/client';
import { useSession } from '@/src/contexts/SessionContext';

// --- Types ---
interface AvatarProfile {
  id: string;
  user_id: string;
  name: string;
  persona_name?: string;
  age?: string;
  role?: string;
  industry?: string;
  company_size?: string;
  location?: string;
  pain_points?: string[];
  goals?: string[];
  current_solutions?: { solution: string; gap: string }[];
  objections?: string[];
  negative_discussions?: string[];
  past_client_feedback?: string[];
  offer_context?: string;
  created_at: string;
  q1_hangouts?: string;
  q2_info_sources?: string;
  q3_frustrations?: string;
  q4_dreams?: string;
  q5_fears?: string;
  q6_communication_channel?: string;
  q7_language?: string;
  q8_daily_routine?: string;
  q9_happiness_triggers?: string;
  summary?: string;
}

const researchQuestions = [
  { id: 'q1_hangouts', label: '1. Họ tụ tập ở đâu?', placeholder: 'Website, diễn đàn, nhóm cụ thể nào?...' },
  { id: 'q2_info_sources', label: '2. Họ lấy thông tin từ đâu?', placeholder: 'Họ tin tưởng ai? Đọc sách báo gì?...' },
  { id: 'q3_frustrations', label: '3. Nỗi thất vọng và thách thức lớn nhất là gì?', placeholder: 'Điều gì khiến họ đau khổ?...' },
  { id: 'q4_dreams', label: '4. Hy vọng, ước mơ và khao khát của họ là gì?', placeholder: 'Họ muốn đạt được điều gì?...' },
  { id: 'q5_fears', label: '5. Nỗi sợ hãi lớn nhất của họ là gì?', placeholder: 'Điều gì khiến họ mất ngủ?...' },
  { id: 'q6_communication_channel', label: '6. Họ thích giao tiếp qua kênh nào?', placeholder: 'Email, chat, hay điện thoại?...' },
  { id: 'q7_language', label: '7. Họ sử dụng ngôn ngữ gì?', placeholder: 'Các từ ngữ cụ thể bạn đã ghi chép lại...' },
  { id: 'q8_daily_routine', label: '8. Một ngày của họ diễn ra như thế nào?', placeholder: 'Hình dung chi tiết từ lúc thức dậy đến khi đi ngủ: 7:00 sáng làm gì? 9:00 sáng làm gì?...' },
  { id: 'q9_happiness_triggers', label: '9. Điều gì làm họ hạnh phúc?', placeholder: 'Điều gì mang lại niềm vui cho họ?...' },
];

const ResearchInput: React.FC<{ label: string; placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; }> = ({ label, placeholder, value, onChange }) => (
  <div>
    <label className="block text-sm font-bold text-slate-700 mb-2">{label}</label>
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-3 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0EB869]/20 focus:border-[#0EB869] resize-y min-h-[100px] leading-relaxed"
    />
  </div>
);

const CreateAvatarView: React.FC<{ onBack: () => void; onSaveSuccess: (newAvatar: AvatarProfile) => void; }> = ({ onBack, onSaveSuccess }) => {
  const { user } = useSession();
  const [formData, setFormData] = useState<Partial<AvatarProfile>>({ name: '' });
  const [summary, setSummary] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field: keyof AvatarProfile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateSummary = () => {
    setIsGenerating(true);
    const summaryText = researchQuestions
      .map(q => {
        const answer = formData[q.id as keyof AvatarProfile] as string;
        return answer ? `**${q.label.substring(3)}**\n${answer}\n` : '';
      })
      .filter(Boolean)
      .join('\n');
    
    setTimeout(() => {
      setSummary(summaryText || 'Không có đủ thông tin để tạo tóm tắt.');
      setIsGenerating(false);
    }, 1000);
  };

  const handleSave = async () => {
    if (!user || !formData.name) return;
    setIsSaving(true);
    const { data, error } = await supabase
      .from('dream_buyer_avatars')
      .insert({ ...formData, user_id: user.id, summary })
      .select()
      .single();

    if (error) {
      console.error('Error saving avatar:', error);
      alert('Lỗi: Không thể lưu Avatar. Vui lòng thử lại.');
    } else if (data) {
      onSaveSuccess(data);
    }
    setIsSaving(false);
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"><ArrowLeft size={20} /></button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Avatar Research Lab</h2>
          <p className="text-slate-500 text-sm">Điền vào các trường để xây dựng hồ sơ khách hàng của bạn.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel: Inputs */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 h-fit">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Tên Avatar*</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., Agency Owner Adam"
              className="w-full p-3 border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0EB869]/20 focus:border-[#0EB869]"
            />
          </div>
          {researchQuestions.map(q => (
            <ResearchInput
              key={q.id}
              label={q.label}
              placeholder={q.placeholder}
              value={formData[q.id as keyof AvatarProfile] as string || ''}
              onChange={(e) => handleInputChange(q.id as keyof AvatarProfile, e.target.value)}
            />
          ))}
          <div className="flex gap-4 pt-4 border-t border-slate-100">
            <button onClick={handleSave} disabled={isSaving} className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#0EB869] text-white font-bold rounded-lg shadow-sm hover:bg-[#0B9655] disabled:bg-slate-300">
              {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Lưu
            </button>
            <button onClick={handleGenerateSummary} disabled={isGenerating} className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-700 disabled:bg-slate-400">
              {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
              Tạo tóm tắt
            </button>
          </div>
        </div>
        {/* Right Panel: Summary */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-8 h-[calc(100vh-120px)] overflow-y-auto">
          <h3 className="font-bold text-lg mb-4 text-slate-900">Tóm tắt Avatar</h3>
          <div className="prose prose-sm max-w-none text-slate-700 whitespace-pre-wrap">
            {isGenerating ? (
              <div className="flex items-center justify-center h-40 text-slate-400">
                <Loader2 size={24} className="animate-spin" />
              </div>
            ) : summary ? (
              summary.split('\n\n').map((section, i) => (
                <div key={i} className="mb-4">
                  {section.split('\n').map((line, j) => {
                    if (line.startsWith('**')) {
                      return <h4 key={j} className="font-bold text-slate-800 text-sm mb-1">{line.replace(/\*\*/g, '')}</h4>
                    }
                    return <p key={j} className="text-slate-600 text-sm leading-relaxed">{line}</p>
                  })}
                </div>
              ))
            ) : (
              <p className="italic text-slate-400">Nội dung tóm tắt sẽ được tạo ở đây sau khi bạn điền thông tin và nhấn "Tạo tóm tắt".</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const DreamBuyerPage: React.FC = () => {
  const { user } = useSession();
  const [view, setView] = useState<'list' | 'create' | 'detail'>('list');
  const [avatars, setAvatars] = useState<AvatarProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarProfile | null>(null);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }
    const fetchAvatars = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('dream_buyer_avatars')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching avatars:', error);
      } else {
        setAvatars(data || []);
      }
      setIsLoading(false);
    };
    fetchAvatars();
  }, [user]);

  const handleSaveSuccess = (newAvatar: AvatarProfile) => {
    setAvatars(prev => [newAvatar, ...prev]);
    setView('list');
  };

  const handleDelete = async (id: string) => {
    if (!user) return;
    const { error } = await supabase.from('dream_buyer_avatars').delete().match({ id, user_id: user.id });
    if (error) {
      console.error('Error deleting avatar:', error);
    } else {
      setAvatars(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleViewDetail = (avatar: AvatarProfile) => {
    setSelectedAvatar(avatar);
    setView('detail');
  };

  const renderContent = () => {
    switch (view) {
      case 'create':
        return <CreateAvatarView onBack={() => setView('list')} onSaveSuccess={handleSaveSuccess} />;
      case 'detail':
        // Detail view can be implemented later if needed
        return <div>Detail View for {selectedAvatar?.name}</div>;
      case 'list':
      default:
        return (
          <div className="animate-in fade-in duration-300">
            <div className="flex flex-col items-center mb-8 text-center">
              <h1 className="text-[26px] font-bold text-slate-900 mb-3 tracking-tight">
                Dream Buyer Avatars
              </h1>
              <p className="text-slate-500 text-[13px] leading-relaxed mb-8 max-w-2xl mx-auto">
                Research, define, and store your Dream Buyer Avatars. Use these deep profiles to write high-converting copy and train your closers.
              </p>
              <button 
                onClick={() => setView('create')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0EB869] text-white text-[14px] font-bold hover:bg-[#0B9655] transition-colors shadow-sm"
              >
                <Plus size={18} strokeWidth={3} />
                New Research
              </button>
            </div>
            {isLoading ? (
              <div className="flex justify-center items-center h-64"><Loader2 size={32} className="animate-spin text-slate-400" /></div>
            ) : avatars.length === 0 ? (
              <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400"><Users size={24} /></div>
                <h3 className="text-slate-900 font-bold mb-1">No Avatars Yet</h3>
                <p className="text-slate-500 text-sm mb-4">Click "New Research" to generate your first avatar.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {avatars.map(avatar => (
                  <div key={avatar.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-[#86EFAC] transition-all group flex flex-col">
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-14 h-14 rounded-full bg-[#E8FCF3] border-2 border-white shadow-sm flex items-center justify-center text-[#0EB869] text-xl font-bold">
                          {avatar.role ? avatar.role.charAt(0) : 'A'}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{avatar.persona_name || avatar.name}</h3>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">{avatar.name}</p>
                      <p className="text-sm text-slate-500 leading-relaxed flex-1">
                        {avatar.summary ? avatar.summary.substring(0, 100) + '...' : 'No summary available.'}
                      </p>
                    </div>
                    <div className="mt-auto border-t border-slate-100 p-4 bg-slate-50/50 flex justify-between items-center">
                      <button onClick={() => handleDelete(avatar.id)} className="text-xs font-bold text-red-500 hover:text-red-700">Delete</button>
                      <button onClick={() => handleViewDetail(avatar)} className="text-xs font-bold text-[#0EB869] hover:text-[#0B9655]">View Dossier</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto font-sans h-full flex flex-col">
      {renderContent()}
    </div>
  );
};