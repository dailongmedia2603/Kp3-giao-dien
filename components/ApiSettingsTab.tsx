import React, { useState } from 'react';
import { Save, RotateCcw, CheckCircle, AlertTriangle, Loader2, Key } from 'lucide-react';

const ApiSettingsTab: React.FC = () => {
  const [projectId, setProjectId] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gemini-1.5-pro'); // Mặc định là model có sẵn
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

  const handleTestConnection = () => {
    setTestStatus('testing');
    // Mô phỏng cuộc gọi API
    setTimeout(() => {
      if (projectId && apiKey) {
        setTestStatus('success');
      } else {
        setTestStatus('error');
      }
      setTimeout(() => setTestStatus('idle'), 3000);
    }, 1500);
  };

  const handleSave = () => {
    // Trong ứng dụng thực tế, điều này sẽ lưu vào backend hoặc context an toàn
    console.log('Saving API settings:', { projectId, apiKey, model });
    alert('Settings saved! (Simulated)');
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Cấu hình API</h2>
            <p className="text-sm text-slate-500 mt-1">Kết nối với các mô hình AI bên ngoài như Vertex AI của Google.</p>
          </div>
          <Key className="text-[#16A349] h-8 w-8 opacity-20" />
        </div>

        <div className="space-y-6">
          <div className="border border-slate-200 rounded-xl p-5 hover:border-[#A5D6A7] transition-colors">
            <h3 className="text-[14px] font-bold text-slate-900 mb-3">Google Vertex AI</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Google Cloud Project ID</label>
                <input 
                  type="text" 
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  placeholder="e.g., my-gcp-project-12345"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#16A349]/20 focus:border-[#16A349]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">Vertex AI API Key</label>
                <input 
                  type="password" 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="••••••••••••••••••••••••••••••"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#16A349]/20 focus:border-[#16A349]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2">AI Model</label>
                <select 
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full p-3 bg-white border border-slate-200 rounded-lg text-[14px] font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#16A349]/20 focus:border-[#16A349]"
                >
                  <option value="gemini-1.5-pro">Gemini 1.5 Pro (Recommended)</option>
                  <option value="gemini-2.5-pro" disabled>Gemini 2.5 Pro (Coming Soon)</option>
                  <option value="gemini-1.0-pro">Gemini 1.0 Pro</option>
                </select>
                <p className="text-xs text-slate-400 mt-2">Gemini 2.5 Pro chưa có sẵn. Cài đặt này sẽ sẵn sàng khi nó được phát hành.</p>
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
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-[13px] font-bold hover:bg-slate-50 transition-colors">
              <RotateCcw size={16} />
              Hủy bỏ
            </button>
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[#16A349] text-white text-[13px] font-bold hover:bg-[#149641] transition-colors shadow-sm"
            >
              <Save size={16} />
              Lưu cấu hình
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiSettingsTab;