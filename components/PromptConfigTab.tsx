import React, { useState, useEffect, useRef } from 'react';
import { Save, RotateCcw, Loader2, Bot } from 'lucide-react';
import { supabase } from '@/src/integrations/supabase/client';
import { useSession } from '@/src/contexts/SessionContext';
import toast from 'react-hot-toast';

const DEFAULT_DREAM_BUYER_PROMPT = `You are a world-class marketing strategist and psychologist. Based on the following answers about a "Dream Buyer" named {{name}}, create a concise, insightful summary of the avatar.

Here are the details:
- Where they hang out: {{q1_hangouts}}
- Information sources: {{q2_info_sources}}
- Frustrations: {{q3_frustrations}}
- Dreams: {{q4_dreams}}
- Fears: {{q5_fears}}
- Communication channels: {{q6_communication_channel}}
- Language they use: {{q7_language}}
- Daily routine: {{q8_daily_routine}}
- Happiness triggers: {{q9_happiness_triggers}}

Synthesize this information into a compelling persona description in Vietnamese. The summary should be a narrative that brings the person to life, focusing on their core motivations, fears, and what would make them say "yes" to an offer.`;

const promptVariables = [
  { name: 'Tên Avatar', value: '{{name}}' },
  { name: 'Họ tụ tập ở đâu?', value: '{{q1_hangouts}}' },
  { name: 'Nguồn thông tin', value: '{{q2_info_sources}}' },
  { name: 'Thất vọng & Thách thức', value: '{{q3_frustrations}}' },
  { name: 'Ước mơ & Khao khát', value: '{{q4_dreams}}' },
  { name: 'Nỗi sợ hãi', value: '{{q5_fears}}' },
  { name: 'Kênh giao tiếp', value: '{{q6_communication_channel}}' },
  { name: 'Ngôn ngữ sử dụng', value: '{{q7_language}}' },
  { name: 'Thói quen hàng ngày', value: '{{q8_daily_routine}}' },
  { name: 'Điều làm họ hạnh phúc', value: '{{q9_happiness_triggers}}' },
];

const PromptConfigTab: React.FC = () => {
  const { user } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [dreamBuyerPrompt, setDreamBuyerPrompt] = useState(DEFAULT_DREAM_BUYER_PROMPT);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!user) return;

    const fetchSettings = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('api_configurations')
        .select('dream_buyer_prompt')
        .eq('user_id', user.id)
        .single();

      if (data && data.dream_buyer_prompt) {
        setDreamBuyerPrompt(data.dream_buyer_prompt);
      } else if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        console.error('Error fetching prompt settings:', error);
        toast.error('Không thể tải cài đặt prompt.');
      }
      setIsLoading(false);
    };

    fetchSettings();
  }, [user]);

  const handleInsertVariable = (variableValue: string) => {
    if (!textareaRef.current) return;

    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const text = textareaRef.current.value;

    const newText = text.substring(0, start) + variableValue + text.substring(end);
    setDreamBuyerPrompt(newText);

    // Use a timeout to allow React to re-render before we set the selection
    setTimeout(() => {
      if (textareaRef.current) {
        const newCursorPosition = start + variableValue.length;
        textareaRef.current.focus();
        textareaRef.current.selectionStart = newCursorPosition;
        textareaRef.current.selectionEnd = newCursorPosition;
      }
    }, 0);
  };

  const handleSave = async () => {
    if (!user) {
      toast.error('Bạn phải đăng nhập để lưu cài đặt.');
      return;
    }

    setIsSaving(true);
    const { error } = await supabase
      .from('api_configurations')
      .upsert({
        user_id: user.id,
        dream_buyer_prompt: dreamBuyerPrompt,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });

    if (error) {
      console.error('Error saving prompt settings:', error);
      toast.error(`Lưu thất bại: ${error.message}`);
    } else {
      toast.success('Đã lưu cấu hình prompt thành công!');
    }
    setIsSaving(false);
  };

  const handleReset = () => {
    setDreamBuyerPrompt(DEFAULT_DREAM_BUYER_PROMPT);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 size={24} className="animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Global Prompt Settings</h2>
            <p className="text-sm text-slate-500 mt-1">Configure the base instructions for your AI generators.</p>
          </div>
          <Bot className="text-[#16A349] h-8 w-8 opacity-20" />
        </div>

        <div className="space-y-6">
          <div className="border border-slate-200 rounded-xl p-5 hover:border-[#A5D6A7] transition-colors">
            <div className="flex items-center justify-between mb-3">
              <label className="text-[14px] font-bold text-slate-900">Dream Buyer Avatar System Prompt</label>
            </div>
            <textarea 
              ref={textareaRef}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#16A349]/20 focus:border-[#16A349] leading-relaxed resize-y min-h-[240px]"
              value={dreamBuyerPrompt}
              onChange={(e) => setDreamBuyerPrompt(e.target.value)}
            />
            <div className="flex items-center gap-3 mt-3">
              <button onClick={handleReset} className="text-[12px] font-bold text-[#16A349] hover:underline">Reset to Default</button>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Biến dữ liệu động</h4>
              <p className="text-xs text-slate-500 mb-3">Nhấp vào để chèn vào prompt của bạn. Các biến này sẽ được tự động thay thế bằng dữ liệu từ form "Dream Buyer".</p>
              <div className="flex flex-wrap gap-2">
                {promptVariables.map(variable => (
                  <button
                    key={variable.value}
                    onClick={() => handleInsertVariable(variable.value)}
                    className="bg-slate-100 text-slate-700 text-xs font-mono px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1.5"
                    title={variable.name}
                  >
                    {variable.value}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end pt-6 border-t border-slate-100 mt-6 gap-3">
          <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[#16A349] text-white text-[13px] font-bold hover:bg-[#149641] transition-colors shadow-sm disabled:opacity-50">
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptConfigTab;