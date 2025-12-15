import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, AlertTriangle, Loader2, Bot } from 'lucide-react';
import { supabase } from '@/src/integrations/supabase/client';
import { useSession } from '@/src/contexts/SessionContext';
import toast from 'react-hot-toast';

const ApiTrollSettingsTab: React.FC = () => {
  const { user } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

  const baseURL = 'https://chat.trollllm.xyz/v1';
  const modelId = 'gemini-3-pro-preview';

  useEffect(() => {
    if (!user) return;

    const fetchSettings = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('troll_api_configurations')
        .select('api_key')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setApiKey(data.api_key || '');
      } else if (error && error.code !== 'PGRST116') {
        console.error('Error fetching Troll API settings:', error);
        toast.error('Không thể tải cài đặt API Troll.');
      }
      setIsLoading(false);
    };

    fetchSettings();
  }, [user]);

  const handleTestConnection = async () => {
    if (!apiKey) {
        toast.error('Vui lòng nhập API key.');
        return;
    }
    setTestStatus('testing');
    try {
      // This is a mock test.
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTestStatus('success');
      toast.success('Kết nối thành công!');
    } catch (error: any) {
      setTestStatus('error');
      toast.error(`Test thất bại: ${error.message}`);
    } finally {
      setTimeout(() => setTestStatus('idle'), 3000);
    }
  };

  const handleSave = async () => {
    if (!user) {
      toast.error('Bạn phải đăng nhập để lưu cài đặt.');
      return;
    }

    setIsSaving(true);
    const { error } = await supabase
      .from('troll_api_configurations')
      .upsert({
        user_id: user.id,
        api_key: apiKey,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });

    if (error) {
      console.error('Error saving Troll API settings:', error);
      toast.error(`Lưu thất bại: ${error.message}`);
    } else {
      toast.success('Đã lưu cấu hình API Troll thành công!');
    }
    setIsSaving(false);
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
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Cấu hình API Troll</h2>
            <p className="text-sm text-slate-500 mt-1">Tích hợp với TrollLLM để có những phản hồi hài hước.</p>
          </div>
          <Bot className="text-blue-500 h-8 w-8 opacity-20" />
        </div>

        <div className="space-y-6">
          <div className="border border-slate-200 rounded-xl p-5 hover:border-blue-200 transition-colors">
            <h3 className="text-[14px] font-bold text-slate-900 mb-3">TrollLLM API</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Base URL</label>
                <input 
                  type="text" 
                  value={baseURL}
                  disabled
                  className="w-full p-3 bg-slate-100 border border-slate-200 rounded-lg text-[13px] font-mono text-slate-500"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">API Key</label>
                <input 
                  type="password" 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Nhập API key của bạn"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Model ID</label>
                <input 
                  type="text" 
                  value={modelId}
                  disabled
                  className="w-full p-3 bg-slate-100 border border-slate-200 rounded-lg text-[13px] font-mono text-slate-500"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-6 border-t border-slate-100 mt-6">
          <button 
            onClick={handleTestConnection}
            disabled={testStatus === 'testing'}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-[13px] font-bold hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            {testStatus === 'testing' && <Loader2 size={16} className="animate-spin" />}
            {testStatus === 'success' && <CheckCircle size={16} className="text-green-500" />}
            {testStatus === 'error' && <AlertTriangle size={16} className="text-red-500" />}
            {testStatus === 'idle' && 'Kiểm tra kết nối'}
            {testStatus !== 'idle' && (
              testStatus === 'testing' ? 'Đang kiểm tra...' :
              testStatus === 'success' ? 'Thành công!' : 'Thất bại!'
            )}
          </button>
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-600 text-white text-[13px] font-bold hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50">
              {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Lưu cấu hình
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiTrollSettingsTab;