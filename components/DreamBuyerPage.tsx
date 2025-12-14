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

const AvatarDetailView: React.FC<{ avatar: AvatarProfile; onBack: () => void; }> = ({ avatar, onBack }) => {
  return (
    <div className="h-full flex flex-col animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back to Avatars
        </button>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-bold text-xs hover:bg-slate-50">
            Edit Profile
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0EB869] text-white rounded-lg font-bold text-xs hover:bg-[#0B9655] shadow-sm">
            <Save size={14} /> Save Changes
          </button>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row gap-6 h-full min-h-0">
        <div className="w-full xl:w-[320px] shrink-0 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full mx-auto mb-4 border-4 border-white shadow-sm flex items-center justify-center text-3xl font-bold text-slate-400">
              {avatar.role ? avatar.role.charAt(0) : 'A'}
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-1">{avatar.persona_name}</h2>
            <p className="text-sm text-slate-500 font-medium mb-1">{avatar.role}</p>
            <span className="inline-block px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500 mb-6">
              Age: {avatar.age}
            </span>
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <Briefcase size={18} className="text-[#0EB869] shrink-0" />
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Industry</div>
                  <div className="text-sm font-bold text-slate-800">{avatar.industry}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <Users size={18} className="text-[#0EB869] shrink-0" />
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Company Size</div>
                  <div className="text-sm font-bold text-slate-800">{avatar.company_size}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <MapPin size={18} className="text-[#0EB869] shrink-0" />
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Location</div>
                  <div className="text-sm font-bold text-slate-800">{avatar.location}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#E8FCF3] border border-[#86EFAC] rounded-xl p-5">
            <h4 className="text-[#0EB869] font-bold text-sm mb-2 flex items-center gap-2">
              <Sparkles size={16} /> Generated Context
            </h4>
            <p className="text-xs text-[#065F46] leading-relaxed italic">
              "Generated based on offer: {avatar.offer_context}"
            </p>
          </div>
          {avatar.past_client_feedback && avatar.past_client_feedback.length > 0 && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
              <h4 className="text-blue-600 font-bold text-sm mb-2 flex items-center gap-2">
                <ThumbsUp size={16} /> Past Feedback
              </h4>
              <ul className="space-y-2">
                {avatar.past_client_feedback.map((fb, idx) => (
                  <li key={idx} className="text-xs text-blue-800 leading-relaxed italic">
                    "{fb}"
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="flex-1 overflow-y-auto pr-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-red-50/50 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-100 text-red-500 flex items-center justify-center"><Frown size={18} /></div>
              <h3 className="text-lg font-bold text-slate-900">Pain Points & Frustrations</h3>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-500 mb-4 italic">What keeps them awake at night?</p>
              <div className="space-y-3">
                {avatar.pain_points?.map((pain, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-lg border border-red-100 bg-red-50/30">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-600 font-bold text-xs flex items-center justify-center mt-0.5">{idx + 1}</span>
                    <span className="text-[15px] text-slate-800 font-medium leading-relaxed">{pain}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-[#E8FCF3]/50 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#E8FCF3] text-[#0EB869] flex items-center justify-center"><Target size={18} /></div>
              <h3 className="text-lg font-bold text-slate-900">Goals & Desires</h3>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-500 mb-4 italic">What specific results do they want?</p>
              <div className="grid grid-cols-1 gap-3">
                {avatar.goals?.map((goal, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-[#86EFAC] transition-colors bg-slate-50 hover:bg-white">
                    <CheckCircle2 size={18} className="text-[#0EB869] flex-shrink-0" />
                    <span className="text-[14px] text-slate-700 font-medium">{goal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-amber-50/50 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center"><Zap size={18} /></div>
              <h3 className="text-lg font-bold text-slate-900">Current Solutions & Gaps</h3>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-500 mb-4 italic">How are they trying to solve this now? Why is it failing?</p>
              <div className="space-y-4">
                {avatar.current_solutions?.map((item, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase">Current Fix</span>
                      <span className="text-sm font-bold text-slate-900">{item.solution}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-slate-600 bg-amber-50 p-3 rounded border border-amber-100">
                      <span className="font-bold text-amber-700 shrink-0">The Gap:</span>
                      {item.gap}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center"><ShieldAlert size={18} /></div>
              <h3 className="text-lg font-bold text-slate-900">Objections & Hesitations</h3>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-500 mb-4 italic">Why might they doubt your offer?</p>
              <ul className="space-y-3">
                {avatar.objections?.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[14px] text-slate-700">
                    <XCircle size={18} className="text-slate-400 mt-0.5 shrink-0" />
                    <span>"{obj}"</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-orange-50/50 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center"><MessageSquare size={18} /></div>
              <h3 className="text-lg font-bold text-slate-900">Negative Discussions & Rants</h3>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-500 mb-4 italic">What are they complaining about online?</p>
              <div className="space-y-3">
                {avatar.negative_discussions?.map((disc, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-lg border border-orange-100 bg-orange-50/30">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-200 text-orange-700 font-bold text-xs flex items-center justify-center mt-0.5">!</span>
                    <span className="text-[14px] text-slate-800 font-medium leading-relaxed italic">"{disc}"</span>
                  </div>
                ))}
              </div>
            </div>
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
        return selectedAvatar ? <AvatarDetailView avatar={selectedAvatar} onBack={() => setView('list')} /> : <div>Avatar not found. <button onClick={() => setView('list')}>Go Back</button></div>;
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
                      <button onClick={(e) => { e.stopPropagation(); handleDelete(avatar.id); }} className="text-xs font-bold text-red-500 hover:text-red-700">Delete</button>
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