import React, { useState, useEffect } from 'react';
import { 
  Home, 
  ChevronRight, 
  User, 
  Target, 
  Zap, 
  ShieldAlert, 
  Search, 
  Plus, 
  Briefcase, 
  MapPin, 
  Users, 
  BrainCircuit,
  Frown,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Save,
  ArrowLeft,
  Sparkles,
  MessageSquare,
  ShoppingBag,
  Clock,
  ThumbsUp,
  MessageCircleWarning,
  Loader2,
  Globe,
  BookOpen,
  Type,
  Smile
} from 'lucide-react';
import { supabase } from '@/src/integrations/supabase/client';
import { useSession } from '@/src/contexts/SessionContext';

// --- Types ---
interface AvatarProfile {
  id: string;
  user_id: string;
  name: string;
  persona_name: string;
  age: string;
  role: string;
  industry: string;
  company_size: string;
  location: string;
  pain_points: string[];
  goals: string[];
  current_solutions: { solution: string; gap: string }[];
  objections: string[];
  negative_discussions: string[];
  past_client_feedback: string[];
  offer_context: string;
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

export const DreamBuyerPage: React.FC = () => {
  const { user } = useSession();
  const [view, setView] = useState<'list' | 'create' | 'detail'>('list');
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarProfile | null>(null);
  const [avatars, setAvatars] = useState<AvatarProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // --- NEW STATE FOR THE FORM ---
  const [avatarName, setAvatarName] = useState('');
  const [q1, setQ1] = useState(''); // hangouts
  const [q2, setQ2] = useState(''); // info sources
  const [q3, setQ3] = useState(''); // frustrations
  const [q4, setQ4] = useState(''); // dreams
  const [q5, setQ5] = useState(''); // fears
  const [q6, setQ6] = useState(''); // communication
  const [q7, setQ7] = useState(''); // language
  const [q8, setQ8] = useState(''); // daily routine
  const [q9, setQ9] = useState(''); // happiness
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState<string | null>(null);

  // Fetch avatars from Supabase
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

  const resetForm = () => {
    setAvatarName('');
    setQ1(''); setQ2(''); setQ3(''); setQ4(''); setQ5(''); 
    setQ6(''); setQ7(''); setQ8(''); setQ9('');
    setGeneratedSummary(null);
  };

  const handleSave = async (withSummary: boolean = false) => {
    if (!user || !avatarName) return;

    // Logic for "Tạo tóm tắt" button
    if (withSummary) {
        setIsGenerating(true);
        setGeneratedSummary(null);
        // Simulate AI call
        setTimeout(() => {
            const summaryText = `Đây là bản tóm tắt do AI tạo cho ${avatarName}, dựa trên các câu trả lời được cung cấp về nỗi đau, ước mơ và thói quen hàng ngày của họ.`;
            setGeneratedSummary(summaryText);
            setIsGenerating(false);
        }, 1500);
        return; // Exit without saving, just for preview
    }

    // Logic for "Lưu" button
    setIsSaving(true);
    const newAvatarData = {
        user_id: user.id,
        name: avatarName,
        persona_name: avatarName,
        q1_hangouts: q1,
        q2_info_sources: q2,
        q3_frustrations: q3,
        q4_dreams: q4,
        q5_fears: q5,
        q6_communication_channel: q6,
        q7_language: q7,
        q8_daily_routine: q8,
        q9_happiness_triggers: q9,
        summary: generatedSummary, // Save the generated summary if it exists
    };

    const { data, error } = await supabase
      .from('dream_buyer_avatars')
      .insert(newAvatarData)
      .select()
      .single();

    if (error) {
        console.error("Error creating avatar:", error);
    } else if (data) {
        setAvatars(prev => [data, ...prev]);
        setSelectedAvatar(data);
        setView('detail');
        resetForm();
    }
    
    setIsSaving(false);
  };

  const handleViewDetail = (avatar: AvatarProfile) => {
    setSelectedAvatar(avatar);
    setView('detail');
  };

  const FormField: React.FC<{
    icon: React.ElementType;
    label: string;
    description: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
  }> = ({ icon: Icon, label, description, value, onChange, placeholder }) => (
    <div>
      <label className="block text-[13px] font-bold text-slate-900 mb-2 flex items-center gap-2">
        <Icon size={16} className="text-[#0EB869]" /> 
        {label}
      </label>
      <p className="text-xs text-slate-500 mb-2">
        {description}
      </p>
      <textarea 
        className="w-full p-4 border border-slate-200 rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#0EB869]/20 focus:border-[#0EB869] min-h-[100px] resize-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );

  return (
    <div className="p-8 max-w-[1600px] mx-auto font-sans h-full flex flex-col">
      
      {/* Header / Breadcrumb */}
      <div className="flex flex-col items-center mb-8 text-center shrink-0">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span 
            className={`cursor-pointer hover:text-slate-700 ${view === 'list' ? 'bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold' : ''}`}
            onClick={() => { setView('list'); resetForm(); }}
          >
            Dream Buyer Avatars
          </span>
          {view !== 'list' && (
             <>
                <ChevronRight size={14} className="text-slate-300" />
                <span className="bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold">
                    {view === 'create' ? 'Research Lab' : 'Avatar Profile'}
                </span>
             </>
          )}
        </div>

        {view === 'list' && (
            <>
                <h1 className="text-[26px] font-bold text-slate-900 mb-3 tracking-tight">
                  Dream Buyer Avatars
                </h1>
                <p className="text-slate-500 text-[13px] leading-relaxed mb-8 max-w-2xl mx-auto">
                Research, define, and store your Dream Buyer Avatars. Use these deep profiles to write high-converting copy and train your closers.
                </p>
            </>
        )}
      </div>

      {/* VIEW: LIST */}
      {view === 'list' && (
        <div className="animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-8">
                <div className="relative w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search avatars..." 
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0EB869]/20 focus:border-[#0EB869] text-sm"
                    />
                </div>
                <button 
                    onClick={() => { setView('create'); resetForm(); }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0EB869] text-white text-[14px] font-bold hover:bg-[#0B9655] transition-colors shadow-sm"
                >
                    <Plus size={18} strokeWidth={3} />
                    New Research
                </button>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 size={32} className="animate-spin text-slate-400" />
              </div>
            ) : avatars.length === 0 ? (
              <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                      <Users size={24} />
                  </div>
                  <h3 className="text-slate-900 font-bold mb-1">No Avatars Yet</h3>
                  <p className="text-slate-500 text-sm mb-4">Click "New Research" to generate your first avatar.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {avatars.map(avatar => (
                      <div 
                          key={avatar.id}
                          onClick={() => handleViewDetail(avatar)}
                          className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-[#86EFAC] transition-all cursor-pointer group flex flex-col h-full"
                      >
                          <div className="p-6">
                              <div className="flex justify-between items-start mb-4">
                                  <div className="w-14 h-14 rounded-full bg-[#E8FCF3] border-2 border-white shadow-sm flex items-center justify-center text-[#0EB869] text-xl font-bold">
                                      {avatar.persona_name ? avatar.persona_name.charAt(0) : 'A'}
                                  </div>
                                  <div className="text-right">
                                      <div className="px-2 py-1 bg-slate-50 border border-slate-100 rounded text-[10px] font-bold text-slate-500 uppercase tracking-wide inline-block mb-1">
                                          {avatar.industry || 'Chưa xác định'}
                                      </div>
                                      <div className="text-[12px] font-bold text-slate-400">
                                          {avatar.age || 'N/A'}
                                      </div>
                                  </div>
                              </div>
                              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#0EB869] transition-colors">
                                  {avatar.persona_name}
                              </h3>
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">{avatar.name}</p>
                              <p className="text-sm text-slate-500 mb-4">{avatar.role} @ {avatar.company_size}</p>
                              
                              <div className="bg-red-50 rounded-lg p-3 border border-red-100 mb-4">
                                  <div className="text-[11px] font-bold text-red-500 uppercase mb-1 flex items-center gap-1">
                                      <AlertTriangle size={12} /> Top Pain Point
                                  </div>
                                  <p className="text-[13px] text-slate-700 line-clamp-2">
                                      "{avatar.pain_points && avatar.pain_points[0] || avatar.q3_frustrations || 'Chưa xác định'}"
                                  </p>
                              </div>
                          </div>
                          <div className="mt-auto border-t border-slate-50 p-4 bg-slate-50/50 rounded-b-xl flex justify-between items-center">
                              <span className="text-xs font-medium text-slate-400">Updated today</span>
                              <span className="text-xs font-bold text-[#0EB869] flex items-center gap-1">
                                  View Dossier <ChevronRight size={12} />
                              </span>
                          </div>
                      </div>
                  ))}
              </div>
            )}
        </div>
      )}

      {/* VIEW: CREATE (RESEARCH LAB) */}
      {view === 'create' && (
        <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex-1">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-[#E8FCF3] rounded-full flex items-center justify-center mx-auto mb-4 text-[#0EB869]">
                            <BrainCircuit size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Avatar Research Lab</h2>
                        <p className="text-slate-500 text-[15px]">
                            Trả lời các câu hỏi dưới đây để xây dựng hồ sơ tâm lý khách hàng.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-[13px] font-bold text-slate-900 mb-2 flex items-center gap-2">
                                <User size={16} className="text-[#0EB869]" />
                                Tên avatar
                            </label>
                            <input 
                                type="text"
                                className="w-full p-3 border border-slate-200 rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#0EB869]/20 focus:border-[#0EB869]"
                                placeholder="e.g., Agency Owner Alan"
                                value={avatarName}
                                onChange={(e) => setAvatarName(e.target.value)}
                            />
                        </div>

                        <FormField icon={Globe} label="1. Họ tụ tập ở đâu?" description="Website, diễn đàn, nhóm cụ thể nào?" placeholder="e.g., Các nhóm Facebook về marketing, diễn đàn Indie Hackers, Twitter..." value={q1} onChange={(e) => setQ1(e.target.value)} />
                        <FormField icon={BookOpen} label="2. Họ lấy thông tin từ đâu?" description="Họ tin tưởng ai? Đọc sách báo gì?" placeholder="e.g., Theo dõi Russell Brunson, đọc sách của Dan Kennedy, nghe podcast My First Million..." value={q2} onChange={(e) => setQ2(e.target.value)} />
                        <FormField icon={Frown} label="3. Nỗi thất vọng và thách thức lớn nhất là gì?" description="Điều gì khiến họ đau khổ?" placeholder="e.g., Không có đủ khách hàng tiềm năng chất lượng, mệt mỏi vì phải 'săn' khách hàng..." value={q3} onChange={(e) => setQ3(e.target.value)} />
                        <FormField icon={Sparkles} label="4. Hy vọng, ước mơ và khao khát của họ là gì?" description="Họ muốn đạt được điều gì?" placeholder="e.g., Có một dòng khách hàng ổn định, tự động hóa việc kinh doanh, có nhiều thời gian hơn cho gia đình..." value={q4} onChange={(e) => setQ4(e.target.value)} />
                        <FormField icon={ShieldAlert} label="5. Nỗi sợ hãi lớn nhất của họ là gì?" description="Điều gì khiến họ mất ngủ?" placeholder="e.g., Sợ phải quay lại làm công việc cũ, sợ không đủ tiền trả lương cho nhân viên..." value={q5} onChange={(e) => setQ5(e.target.value)} />
                        <FormField icon={MessageSquare} label="6. Họ thích giao tiếp qua kênh nào?" description="Email, chat, hay điện thoại?" placeholder="e.g., Thích email hơn vì có thể trả lời bất cứ lúc nào, ghét các cuộc gọi không báo trước..." value={q6} onChange={(e) => setQ6(e.target.value)} />
                        <FormField icon={Type} label="7. Họ sử dụng ngôn ngữ gì?" description="Các từ ngữ cụ thể bạn đã ghi chép lại." placeholder="e.g., 'scale', 'ROAS', 'bottleneck', 'automation', 'predictable'..." value={q7} onChange={(e) => setQ7(e.target.value)} />
                        <FormField icon={Clock} label="8. Một ngày của họ diễn ra như thế nào?" description="Hình dung chi tiết từ lúc thức dậy đến khi đi ngủ." placeholder="e.g., 6:00 sáng: tập thể dục. 7:00: kiểm tra email. 9:00: họp team..." value={q8} onChange={(e) => setQ8(e.target.value)} />
                        <FormField icon={Smile} label="9. Điều gì làm họ hạnh phúc?" description="Ngoài công việc, điều gì mang lại niềm vui cho họ?" placeholder="e.g., Dành thời gian cho con cái, đi du lịch, được công nhận là chuyên gia trong ngành..." value={q9} onChange={(e) => setQ9(e.target.value)} />

                        <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                            <button 
                                onClick={() => handleSave(false)}
                                disabled={isSaving || isGenerating || !avatarName}
                                className="flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-200 text-slate-700 text-[14px] font-bold hover:bg-slate-50 transition-colors disabled:opacity-50"
                            >
                                {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                Lưu
                            </button>
                            <button 
                                onClick={() => handleSave(true)}
                                disabled={isSaving || isGenerating || !avatarName}
                                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0EB869] text-white text-[14px] font-bold hover:bg-[#0B9655] transition-colors shadow-sm disabled:opacity-50"
                            >
                                {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <BrainCircuit size={18} />}
                                Tạo tóm tắt
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-[450px] shrink-0">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sticky top-8">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <BrainCircuit size={18} className="text-[#0EB869]" />
                        AI Generated Summary
                    </h3>
                    {isGenerating ? (
                        <div className="flex flex-col items-center justify-center h-64 bg-slate-50 rounded-lg border border-dashed">
                            <Loader2 size={32} className="animate-spin text-slate-400" />
                            <p className="text-sm text-slate-500 mt-4">AI is thinking...</p>
                        </div>
                    ) : generatedSummary ? (
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                            <p className="text-sm text-blue-800 leading-relaxed italic">
                                "{generatedSummary}"
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 bg-slate-50 rounded-lg border border-dashed">
                            <p className="text-sm text-slate-500 text-center">
                                Click "Tạo tóm tắt" after filling out the form to generate a summary here.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
      )}

      {/* VIEW: DETAIL (THE DOSSIER) */}
      {view === 'detail' && selectedAvatar && (
        <div className="h-full flex flex-col animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-6">
                <button 
                    onClick={() => setView('list')}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium"
                >
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
                            {selectedAvatar.persona_name ? selectedAvatar.persona_name.charAt(0) : 'A'}
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-1">{selectedAvatar.persona_name}</h2>
                        <p className="text-sm text-slate-500 font-medium mb-1">{selectedAvatar.role}</p>
                        <span className="inline-block px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500 mb-6">
                            Age: {selectedAvatar.age}
                        </span>
                        
                        <div className="space-y-4 text-left">
                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <Briefcase size={18} className="text-[#0EB869] shrink-0" />
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase">Industry</div>
                                    <div className="text-sm font-bold text-slate-800">{selectedAvatar.industry}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <Users size={18} className="text-[#0EB869] shrink-0" />
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase">Company Size</div>
                                    <div className="text-sm font-bold text-slate-800">{selectedAvatar.company_size}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <MapPin size={18} className="text-[#0EB869] shrink-0" />
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase">Location</div>
                                    <div className="text-sm font-bold text-slate-800">{selectedAvatar.location}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {selectedAvatar.summary && (
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                            <h4 className="text-blue-600 font-bold text-sm mb-2 flex items-center gap-2">
                                <BrainCircuit size={16} /> AI Summary
                            </h4>
                             <p className="text-xs text-blue-800 leading-relaxed italic">
                                "{selectedAvatar.summary}"
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                    
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 bg-red-50/50 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-500 flex items-center justify-center">
                                <Frown size={18} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Pain Points & Frustrations</h3>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-slate-500 mb-4 italic">
                                What keeps them awake at night? What specific inefficiencies are they desperate to solve?
                            </p>
                            <div className="space-y-3">
                                {selectedAvatar.pain_points?.map((pain, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-4 rounded-lg border border-red-100 bg-red-50/30">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-600 font-bold text-xs flex items-center justify-center mt-0.5">
                                            {idx + 1}
                                        </span>
                                        <span className="text-[15px] text-slate-800 font-medium leading-relaxed">{pain}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 bg-[#E8FCF3]/50 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#E8FCF3] text-[#0EB869] flex items-center justify-center">
                                <Target size={18} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Goals & Desires</h3>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-slate-500 mb-4 italic">
                                What specific results do they want? Revenue? Time savings? Status?
                            </p>
                            <div className="grid grid-cols-1 gap-3">
                                {selectedAvatar.goals?.map((goal, idx) => (
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
                            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                                <Zap size={18} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Current Solutions & Gaps</h3>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-slate-500 mb-4 italic">
                                How are they trying to solve this now? Why is it failing?
                            </p>
                            <div className="space-y-4">
                                {selectedAvatar.current_solutions?.map((item, idx) => (
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
                            <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center">
                                <ShieldAlert size={18} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Objections & Hesitations</h3>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-slate-500 mb-4 italic">
                                Why might they doubt your offer? Too expensive? Past failures?
                            </p>
                            <ul className="space-y-3">
                                {selectedAvatar.objections?.map((obj, idx) => (
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
                            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                                <MessageSquare size={18} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Negative Discussions & Rants</h3>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-slate-500 mb-4 italic">
                                What are they complaining about in forums, social media comments, and reviews?
                            </p>
                            <div className="space-y-3">
                                {selectedAvatar.negative_discussions?.map((disc, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-4 rounded-lg border border-orange-100 bg-orange-50/30">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-200 text-orange-700 font-bold text-xs flex items-center justify-center mt-0.5">
                                            !
                                        </span>
                                        <span className="text-[14px] text-slate-800 font-medium leading-relaxed italic">"{disc}"</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
      )}
    </div>
  );
};