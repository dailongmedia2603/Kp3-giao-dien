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

// --- Mock Data Offers ---
const MOCK_OFFERS = [
  { id: 'offer_s1', category: 'Service', title: 'Real Estate Appointment Setting', description: 'Done-for-you appointment setting service for high-end real estate agents.' },
  { id: 'offer_s2', category: 'Service', title: '1-on-1 Business Coaching', description: 'Personalized coaching sessions to help entrepreneurs breakthrough revenue plateaus.' },
  { id: 'offer_p1', category: 'Physical', title: 'KETO Supplement Pack', description: 'A 30-day supply of premium keto-friendly supplements.' },
  { id: 'offer_sw1', category: 'Software', title: 'Pilates Lead Machine SaaS', description: 'Automated lead generation software specifically built for Pilates studio owners.' },
  { id: 'offer_d1', category: 'Digital', title: 'Weight Loss Course', description: 'A comprehensive 12-week video course teaching sustainable weight loss.' },
];

const OFFER_CATEGORIES = ['Service', 'Physical', 'Software', 'Digital', 'E-learning', 'Affiliate'];

const CreateAvatarView: React.FC<{ onBack: () => void; onSaveSuccess: (newAvatar: AvatarProfile) => void; }> = ({ onBack, onSaveSuccess }) => {
  const { user } = useSession();
  const [selectedOfferId, setSelectedOfferId] = useState('');
  const [marketNegativityInput, setMarketNegativityInput] = useState('');
  const [pastFeedbackInput, setPastFeedbackInput] = useState('');
  const [personaNameInput, setPersonaNameInput] = useState('');
  const [ageInput, setAgeInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const selectedOffer = MOCK_OFFERS.find(o => o.id === selectedOfferId);

  const handleCreate = async () => {
    if (!user || isGenerating) return;
    setIsGenerating(true);

    // Simulate AI Generation based on inputs
    const newAvatarData = {
        user_id: user.id,
        name: `${personaNameInput || 'New'} - ${selectedOffer?.title || 'Custom Research'}`,
        persona_name: personaNameInput || "Generated Persona",
        age: ageInput || "30-40",
        role: "Decision Maker",
        industry: selectedOffer ? selectedOffer.category : "General",
        company_size: "10-50 Employees",
        location: "Online",
        negative_discussions: marketNegativityInput ? [marketNegativityInput] : [],
        past_client_feedback: pastFeedbackInput ? [pastFeedbackInput] : [],
        offer_context: selectedOffer ? selectedOffer.title : "Custom Research",
        pain_points: ["High CPA on Facebook Ads", "Creative fatigue", "Tracking attribution issues"],
        goals: ["Scale to $50k/mo ad spend", "Stabilize ROAS at 3.0x", "Automate creative testing"],
        summary: `A summary based on the inputs.`
    };

    const { data, error } = await supabase
      .from('dream_buyer_avatars')
      .insert(newAvatarData)
      .select()
      .single();

    if (error) {
        console.error("Error creating avatar:", error);
    } else if (data) {
        onSaveSuccess(data);
    }
    
    setIsGenerating(false);
  };

  return (
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
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-[26px] font-bold text-slate-900 mb-1 tracking-tight">
                      Dream Buyer Avatars
                    </h1>
                    <p className="text-slate-500 text-[13px] leading-relaxed">
                      Research, define, and store your Dream Buyer Avatars.
                    </p>
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