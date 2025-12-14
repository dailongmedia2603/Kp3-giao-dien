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
  Loader2
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
}

// --- Mock Data Offers ---
const MOCK_OFFERS = [
  { id: 'offer_s1', category: 'Service', title: 'Real Estate Appointment Setting', description: 'Done-for-you appointment setting service for high-end real estate agents.' },
  { id: 'offer_s2', category: 'Service', title: '1-on-1 Business Coaching', description: 'Personalized coaching sessions to help entrepreneurs breakthrough revenue plateaus.' },
  { id: 'offer_p1', category: 'Physical', title: 'KETO Supplement Pack', description: 'A 30-day supply of premium keto-friendly supplements.' },
  { id: 'offer_sw1', category: 'Software', title: 'Pilates Lead Machine SaaS', description: 'Automated lead generation software specifically built for Pilates studio owners.' },
  { id: 'offer_d1', category: 'Digital', title: 'Weight Loss Course', description: 'A comprehensive 12-week video course teaching sustainable weight loss.' },
];

const OFFER_CATEGORIES = ['Service', 'Physical', 'Software', 'Digital', 'E-learning', 'Affiliate'];

export const DreamBuyerPage: React.FC = () => {
  const { user } = useSession();
  const [view, setView] = useState<'list' | 'create' | 'detail'>('list');
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarProfile | null>(null);
  const [avatars, setAvatars] = useState<AvatarProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Creation State
  const [selectedOfferId, setSelectedOfferId] = useState('');
  const [marketNegativityInput, setMarketNegativityInput] = useState('');
  const [pastFeedbackInput, setPastFeedbackInput] = useState('');
  const [personaNameInput, setPersonaNameInput] = useState('');
  const [ageInput, setAgeInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const selectedOffer = MOCK_OFFERS.find(o => o.id === selectedOfferId);

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

  const handleCreate = async () => {
    if (!user || isGenerating) return;
    setIsGenerating(true);

    // Simulate AI Generation
    const newAvatarData = {
        user_id: user.id,
        name: `${personaNameInput || 'New'} - Generated Profile`,
        persona_name: personaNameInput || "Alex Mercer",
        age: ageInput || "28-35",
        role: "Marketing Manager",
        industry: "E-commerce",
        company_size: "10-50 Employees",
        location: "Global",
        pain_points: ["High CPA on Facebook Ads", "Creative fatigue", "Tracking attribution issues"],
        goals: ["Scale to $50k/mo ad spend", "Stabilize ROAS at 3.0x", "Automate creative testing"],
        current_solutions: [{ solution: "Freelance Media Buyers", gap: "Inconsistent results and lack of communication." }],
        objections: ["Tried agencies before and got burned.", "Is this compatible with Shopify?"],
        negative_discussions: marketNegativityInput ? [marketNegativityInput, "General skepticism about results."] : ["Venting about rising ad costs.", "Complaining about agencies over-promising."],
        past_client_feedback: pastFeedbackInput ? [pastFeedbackInput] : ["Client wanted more reporting frequency."],
        offer_context: selectedOffer ? selectedOffer.title : "Custom Research"
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
        // Reset form
        setSelectedOfferId('');
        setMarketNegativityInput('');
        setPastFeedbackInput('');
        setPersonaNameInput('');
        setAgeInput('');
    }
    
    setIsGenerating(false);
  };

  const handleViewDetail = (avatar: AvatarProfile) => {
    setSelectedAvatar(avatar);
    setView('detail');
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto font-sans h-full flex flex-col">
      
      {/* Header / Breadcrumb */}
      <div className="flex flex-col items-center mb-8 text-center shrink-0">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span 
            className={`cursor-pointer hover:text-slate-700 ${view === 'list' ? 'bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold' : ''}`}
            onClick={() => setView('list')}
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
                    onClick={() => setView('create')}
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
                                      {avatar.role ? avatar.role.charAt(0) : 'A'}
                                  </div>
                                  <div className="text-right">
                                      <div className="px-2 py-1 bg-slate-50 border border-slate-100 rounded text-[10px] font-bold text-slate-500 uppercase tracking-wide inline-block mb-1">
                                          {avatar.industry}
                                      </div>
                                      <div className="text-[12px] font-bold text-slate-400">
                                          {avatar.age} yrs
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
                                      "{avatar.pain_points && avatar.pain_points[0]}"
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
        <div className="max-w-3xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[#E8FCF3] rounded-full flex items-center justify-center mx-auto mb-4 text-[#0EB869]">
                        <BrainCircuit size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Avatar Research Lab</h2>
                    <p className="text-slate-500 text-[15px]">
                        Select an existing offer or define a new one to generate a psychological profile.
                    </p>
                </div>

                <div className="space-y-6">
                    
                    <div>
                        <label className="block text-[14px] font-bold text-slate-900 mb-2 flex items-center gap-2">
                            <ShoppingBag size={16} className="text-[#0EB869]" /> Select Offer
                        </label>
                        <select 
                            value={selectedOfferId}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedOfferId(e.target.value)}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-[15px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0EB869]/20 focus:border-[#0EB869]"
                        >
                            <option value="">-- Choose an existing offer --</option>
                            
                            {OFFER_CATEGORIES.map(category => {
                                const categoryOffers = MOCK_OFFERS.filter(offer => offer.category === category);
                                if (categoryOffers.length === 0) return null;
                                return (
                                    <optgroup label={category} key={category} className="font-bold text-slate-900">
                                        {categoryOffers.map(offer => (
                                            <option key={offer.id} value={offer.id} className="text-slate-700">
                                                {offer.title}
                                            </option>
                                        ))}
                                    </optgroup>
                                );
                            })}

                            <option value="custom" className="font-bold text-[#0EB869]">+ Create Custom/New Offer</option>
                        </select>
                    </div>

                    {selectedOffer && (
                        <div className="bg-[#E8FCF3] border border-[#86EFAC] rounded-xl p-4 animate-in fade-in mb-4">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="px-2 py-0.5 bg-white rounded text-[10px] font-bold border border-[#86EFAC] text-[#0EB869] uppercase">
                                    {selectedOffer.category}
                                </span>
                                <h4 className="text-[#0EB869] font-bold text-sm">{selectedOffer.title}</h4>
                            </div>
                            <p className="text-slate-600 text-xs mt-1">{selectedOffer.description}</p>
                        </div>
                    )}

                    <div className="h-px bg-slate-100 my-4"></div>

                    <div>
                        <label className="block text-[13px] font-bold text-slate-900 mb-2 flex items-center gap-2">
                            <MessageCircleWarning size={16} className="text-orange-500" /> 
                            Bình luận tiêu cực trên thị trường (Negative Market Discussions)
                        </label>
                        <p className="text-xs text-slate-500 mb-2">
                            What are people complaining about regarding similar products/competitors?
                        </p>
                        <textarea 
                            className="w-full p-4 border border-slate-200 rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#0EB869]/20 focus:border-[#0EB869] min-h-[100px] resize-none"
                            placeholder="e.g. 'The course was too theoretical', 'Support took days to reply', 'The software is buggy'..."
                            value={marketNegativityInput}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMarketNegativityInput(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-[13px] font-bold text-slate-900 mb-2 flex items-center gap-2">
                            <ThumbsUp size={16} className="text-blue-500" /> 
                            Feedback khách hàng cũ (Past Client Feedback)
                        </label>
                        <p className="text-xs text-slate-500 mb-2">
                            What have your actual previous clients said? (Good or Bad)
                        </p>
                        <textarea 
                            className="w-full p-4 border border-slate-200 rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#0EB869]/20 focus:border-[#0EB869] min-h-[100px] resize-none"
                            placeholder="e.g. 'I loved the coaching but wished the videos were shorter', 'Best investment I made this year'..."
                            value={pastFeedbackInput}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPastFeedbackInput(e.target.value)}
                        />
                    </div>

                    <div className="h-px bg-slate-100 my-4"></div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[14px] font-bold text-slate-900 mb-2 flex items-center gap-2">
                                <User size={16} className="text-slate-400" /> Name (Optional)
                            </label>
                            <input 
                                type="text"
                                placeholder="e.g. Sarah"
                                value={personaNameInput}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPersonaNameInput(e.target.value)}
                                className="w-full p-3 border border-slate-200 rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#0EB869]/20 focus:border-[#0EB869]"
                            />
                        </div>
                        <div>
                            <label className="block text-[14px] font-bold text-slate-900 mb-2 flex items-center gap-2">
                                <Clock size={16} className="text-slate-400" /> Age Range (Optional)
                            </label>
                            <input 
                                type="text"
                                placeholder="e.g. 35-45"
                                value={ageInput}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAgeInput(e.target.value)}
                                className="w-full p-3 border border-slate-200 rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#0EB869]/20 focus:border-[#0EB869]"
                            />
                        </div>
                    </div>

                    <button 
                        onClick={handleCreate}
                        disabled={isGenerating}
                        className={`w-full py-4 rounded-xl text-white font-bold text-[15px] shadow-sm flex items-center justify-center gap-2 transition-all mt-4
                            ${isGenerating ? 'bg-slate-300 cursor-not-allowed' : 'bg-[#0EB869] hover:bg-[#0B9655]'}`}
                    >
                        {isGenerating ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Researching Market Data...
                            </>
                        ) : (
                            <>
                                <BrainCircuit size={20} />
                                Generate Dream Buyer Avatar
                            </>
                        )}
                    </button>
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
                            {selectedAvatar.role ? selectedAvatar.role.charAt(0) : 'A'}
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

                    <div className="bg-[#E8FCF3] border border-[#86EFAC] rounded-xl p-5">
                        <h4 className="text-[#0EB869] font-bold text-sm mb-2 flex items-center gap-2">
                            <Sparkles size={16} /> Generated Context
                        </h4>
                        <p className="text-xs text-[#065F46] leading-relaxed italic">
                            "Generated based on offer: {selectedAvatar.offer_context}"
                        </p>
                    </div>

                    {selectedAvatar.past_client_feedback && selectedAvatar.past_client_feedback.length > 0 && (
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                            <h4 className="text-blue-600 font-bold text-sm mb-2 flex items-center gap-2">
                                <ThumbsUp size={16} /> Past Feedback
                            </h4>
                             <ul className="space-y-2">
                                {selectedAvatar.past_client_feedback.map((fb, idx) => (
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