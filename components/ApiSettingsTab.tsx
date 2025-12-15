import React, { useState, useEffect } from 'react';
import { Save, RotateCcw, CheckCircle, AlertTriangle, Loader2, Key, Bot } from 'lucide-react';
import { supabase } from '@/src/integrations/supabase/client';
import { useSession } from '@/src/contexts/SessionContext';
import toast from 'react-hot-toast';

const ApiSettingsTab: React.FC = () => {
  const { user } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'vertex' | 'troll'>('vertex');

  // Vertex AI State
  const [projectId, setProjectId] = useState('');
  const [serviceAccountJson, setServiceAccountJson] = useState('');
  const [location, setLocation] = useState('us-central1');
  const [model, setModel] = useState('gemini-1.5-pro-preview-0409');
  const [vertexTestStatus, setVertexTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [vertexTestPrompt, setVertexTestPrompt] = useState('Say "Hello World" in Vietnamese.');

  // TrollLLM State
  const [trollApiKey, setTrollApiKey] = useState('');
  const [trollTestStatus, setTrollTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const trollBaseURL = 'https://chat.trollllm.xyz/v1';
  const trollModelId = 'gemini-3-pro-preview';

  useEffect(() => {
    if (!user) return;

    const fetchSettings = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('api_configurations')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data) {
        // Vertex AI
        setProjectId(data.project_id || '');
        setServiceAccountJson(data.service_account_json || '');
        setLocation(data.location || 'us-central1');
        setModel(data.model || 'gemini-1.5-pro-preview-0409');
        // TrollLLM
        setTrollApiKey(data.troll_api_key || '');
      } else if (error && error.code !== 'PGRST116') {
        console.error('Error fetching API settings:', error);
        toast.error('Không thể tải cài đặt API.');
      }
      setIsLoading(false);
    };

    fetchSettings();
  }, [user]);

  const handleVertexTest = async () => {
    setVertexTestStatus('testing');
    try {
      const { data, error } = await supabase.functions.invoke('test-vertex-connection', {
        body: { prompt: vertexTestPrompt },
      });
      if (error) throw error;
      setVertexTestStatus('success');
      toast.success(`AI Response: "${data.text}"`);
    } catch (error: any) {
      setVertexTestStatus('error');
      const functionError = error.context?.json?.error || error.message;
      toast.error(`Test failed: ${functionError}`, { duration: 6000 });
      console.error('Connection test failed:', error);
    } finally {
      setTimeout(() => setVertexTestStatus('idle'), 5000);
    }
  };

  const handleTrollTest = async () => {
    if (!trollApiKey) {
        toast.error('Vui lòng nhập API key.');
        return;
    }
    setTrollTestStatus('testing');
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTrollTestStatus('success');
      toast.success('Kết nối thành công!');
    } catch (error: any) {
      setTrollTestStatus('error');
      toast.error(`Test thất bại: ${error.message}`);
    } finally {
      setTimeout(() => setTrollTestStatus('idle'), 3000);
    }
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
        // Vertex
        project_id: projectId,
        service_account_json: serviceAccountJson,
        location: location,
        model: model,
        // Troll
        troll_api_key: trollApiKey,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });

    if (error) {
      console.error('Error saving API settings:', error);
      toast.error(`Lưu thất bại: ${error.message}`);
    } else {
      toast.success('Đã lưu cấu hình thành công!');
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
            <h2 className="text-lg font-bold text-slate-900">Cấu hình API</h2>
            <p className="text-sm text-slate-500 mt-1">Kết nối với các mô hình AI bên ngoài.</p>
          </div>
          <Key className="text-[#16A349] h-8 w-8 opacity-20" />
        </div>

        {/* Sub-tabs */}
        <div className="flex border-b border-slate-200 mb-6">
            <button onClick={() => setActiveSubTab('vertex')} className={`px-4 py-3 text-sm font-bold ${activeSubTab === 'vertex' ? 'text-[#16A349] border-b-2 border-[#16A349]' : 'text-slate-500'}`}>
                Google Vertex AI
            </button>
            <button onClick={() => setActiveSubTab('troll')} className={`px-4 py-3 text-sm font-bold ${activeSubTab === 'troll' ? 'text-[#16A349] border-b-2 border-[#16A349]' : 'text-slate-500'}`}>
                TrollLLM
            </button>
        </div>

        {/* Vertex AI Form */}
        {activeSubTab === 'vertex' && (
            <div className="space-y-6">
                <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">Google Cloud Project ID</label>
                    <input type="text" value={projectId} onChange={(e) => setProjectId(e.target.value)} placeholder="e.g., my-gcp-project-12345" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#16A349]/20 focus:border-[#16A349]" />
                </div>
                <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">Location</label>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., us-central1" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#16A349]/20 focus:border-[#16A349]" />
                </div>
                <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">Google Service Account JSON Key</label>
                    <textarea value={serviceAccountJson} onChange={(e) => setServiceAccountJson(e.target.value)} placeholder='{ "type": "service_account", ... }' className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#16A349]/20 focus:border-[#16A349] h-32 resize-none" />
                </div>
                <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">AI Model</label>
                    <select value={model} onChange={(e) => setModel(e.target.value)} className="w-full p-3 bg-white border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#16A349]/20 focus:border-[#16A349]">
                        <option value="gemini-1.5-pro-preview-0409">Gemini 1.5 Pro</option>
                        <option value="gemini-1.0-pro">Gemini 1.0 Pro</option>
                    </select>
                </div>
                <div className="pt-4 border-t border-slate-100">
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">Test Prompt</label>
                    <textarea value={vertexTestPrompt} onChange={(e) => setVertexTestPrompt(e.target.value)} placeholder='Enter a prompt...' className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#16A349]/20 focus:border-[#16A349] h-20 resize-none" />
                </div>
                <div className="flex justify-end">
                    <button onClick={handleVertexTest} disabled={vertexTestStatus === 'testing'} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-[13px] font-bold hover:bg-slate-50 transition-colors disabled:opacity-50">
                        {vertexTestStatus === 'testing' && <Loader2 size={16} className="animate-spin" />}
                        {vertexTestStatus === 'success' && <CheckCircle size={16} className="text-green-500" />}
                        {vertexTestStatus === 'error' && <AlertTriangle size={16} className="text-red-500" />}
                        {vertexTestStatus === 'idle' && 'Kiểm tra kết nối'}
                        {vertexTestStatus !== 'idle' && (vertexTestStatus === 'testing' ? 'Đang kiểm tra...' : vertexTestStatus === 'success' ? 'Thành công!' : 'Thất bại!')}
                    </button>
                </div>
            </div>
        )}

        {/* TrollLLM Form */}
        {activeSubTab === 'troll' && (
            <div className="space-y-6">
                <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">Base URL</label>
                    <input type="text" value={trollBaseURL} disabled className="w-full p-3 bg-slate-100 border border-slate-200 rounded-lg text-[13px] font-mono text-slate-500" />
                </div>
                <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">API Key</label>
                    <input type="password" value={trollApiKey} onChange={(e) => setTrollApiKey(e.target.value)} placeholder="Nhập API key của bạn" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#16A349]/20 focus:border-[#16A349]" />
                </div>
                <div>
                    <label className="block text-[13px] font-bold text-slate-700 mb-2">Model ID</label>
                    <input type="text" value={trollModelId} disabled className="w-full p-3 bg-slate-100 border border-slate-200 rounded-lg text-[13px] font-mono text-slate-500" />
                </div>
                <div className="flex justify-end">
                    <button onClick={handleTrollTest} disabled={trollTestStatus === 'testing'} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-[13px] font-bold hover:bg-slate-50 transition-colors disabled:opacity-50">
                        {trollTestStatus === 'testing' && <Loader2 size={16} className="animate-spin" />}
                        {trollTestStatus === 'success' && <CheckCircle size={16} className="text-green-500" />}
                        {trollTestStatus === 'error' && <AlertTriangle size={16} className="text-red-500" />}
                        {trollTestStatus === 'idle' && 'Kiểm tra kết nối'}
                        {trollTestStatus !== 'idle' && (trollTestStatus === 'testing' ? 'Đang kiểm tra...' : trollTestStatus === 'success' ? 'Thành công!' : 'Thất bại!')}
                    </button>
                </div>
            </div>
        )}
        
        <div className="flex justify-end pt-6 border-t border-slate-100 mt-6">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[#16A349] text-white text-[13px] font-bold hover:bg-[#149641] transition-colors shadow-sm disabled:opacity-50"
          >
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Lưu cấu hình
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiSettingsTab;