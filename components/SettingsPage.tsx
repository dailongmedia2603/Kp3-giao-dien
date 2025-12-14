import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Settings, 
  Terminal, 
  User, 
  CreditCard, 
  Bell, 
  Save,
  RotateCcw,
  Bot
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'prompts' | 'general' | 'billing' | 'notifications'>('prompts');

  return (
    <div className="p-8 max-w-[1200px] mx-auto font-sans">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8 text-[13px] text-slate-500">
        <Home size={16} className="text-slate-400" />
        <ChevronRight size={14} className="text-slate-300" />
        <span>System</span>
        <ChevronRight size={14} className="text-slate-300" />
        <span className="bg-[#E8F5E9] text-[#16A349] px-3 py-1 rounded text-xs font-bold capitalize">
          Settings
        </span>
      </div>

      <div className="flex flex-col items-start mb-8">
         <h1 className="text-[26px] font-bold text-slate-900 mb-2 tracking-tight">Settings</h1>
         <p className="text-slate-500 text-[13px]">Manage your workspace preferences and AI configurations.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Sidebar - Navigation */}
        <div className="w-full lg:w-[260px] shrink-0">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-6">
                <div className="p-2 space-y-1">
                    <button 
                        onClick={() => setActiveTab('prompts')}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-[14px] font-medium rounded-lg transition-colors ${activeTab === 'prompts' ? 'bg-[#E8F5E9] text-[#16A349]' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                        <Terminal size={18} />
                        Prompt Config
                    </button>
                    <button 
                        onClick={() => setActiveTab('general')}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-[14px] font-medium rounded-lg transition-colors ${activeTab === 'general' ? 'bg-[#E8F5E9] text-[#16A349]' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                        <User size={18} />
                        General
                    </button>
                    <button 
                        onClick={() => setActiveTab('notifications')}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-[14px] font-medium rounded-lg transition-colors ${activeTab === 'notifications' ? 'bg-[#E8F5E9] text-[#16A349]' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                        <Bell size={18} />
                        Notifications
                    </button>
                    <button 
                        onClick={() => setActiveTab('billing')}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-[14px] font-medium rounded-lg transition-colors ${activeTab === 'billing' ? 'bg-[#E8F5E9] text-[#16A349]' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                        <CreditCard size={18} />
                        Billing & Plans
                    </button>
                </div>
            </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 w-full">
            
            {/* Prompt Configuration Tab */}
            {activeTab === 'prompts' && (
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
                            
                            {/* Facebook Ads Prompt */}
                            <div className="border border-slate-200 rounded-xl p-5 hover:border-[#A5D6A7] transition-colors">
                                <div className="flex items-center justify-between mb-3">
                                    <label className="text-[14px] font-bold text-slate-900">Facebook Ad Generator System Prompt</label>
                                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">gpt-4o</span>
                                </div>
                                <textarea 
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#16A349]/20 focus:border-[#16A349] leading-relaxed resize-y min-h-[120px]"
                                    defaultValue="You are a world-class direct response copywriter specialized in Facebook Ads. Your tone is persuasive, empathetic, and action-oriented. Always focus on the 'Dream Buyer' persona provided."
                                />
                                <div className="flex items-center gap-3 mt-3">
                                    <button className="text-[12px] font-bold text-[#16A349] hover:underline">Reset to Default</button>
                                </div>
                            </div>

                            {/* Direct Response Prompt */}
                            <div className="border border-slate-200 rounded-xl p-5 hover:border-[#A5D6A7] transition-colors">
                                <div className="flex items-center justify-between mb-3">
                                    <label className="text-[14px] font-bold text-slate-900">Headlines Generator System Prompt</label>
                                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">gpt-4o</span>
                                </div>
                                <textarea 
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#16A349]/20 focus:border-[#16A349] leading-relaxed resize-y min-h-[120px]"
                                    defaultValue="You are an expert in writing high-converting headlines using the '4 U's' formula (Urgent, Unique, Ultra-specific, Useful). Generate catchy, curiosity-inducing headlines."
                                />
                                <div className="flex items-center gap-3 mt-3">
                                    <button className="text-[12px] font-bold text-[#16A349] hover:underline">Reset to Default</button>
                                </div>
                            </div>

                            {/* Creativity Slider */}
                            <div className="bg-[#E8F5E9] border border-[#A5D6A7] rounded-xl p-5">
                                <label className="text-[14px] font-bold text-slate-900 mb-1 block">Global Creativity Level (Temperature)</label>
                                <p className="text-xs text-slate-500 mb-4">Controls the randomness of the output. Lower is more deterministic, higher is more creative.</p>
                                
                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-bold text-slate-500">Precise</span>
                                    <input type="range" className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#16A349]" />
                                    <span className="text-xs font-bold text-slate-500">Creative</span>
                                </div>
                            </div>

                        </div>
                        
                        <div className="flex justify-end pt-6 border-t border-slate-100 mt-6 gap-3">
                             <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-[13px] font-bold hover:bg-slate-50 transition-colors">
                                <RotateCcw size={16} />
                                Discard Changes
                            </button>
                            <button className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[#16A349] text-white text-[13px] font-bold hover:bg-[#149641] transition-colors shadow-sm">
                                <Save size={16} />
                                Save Configuration
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* General Settings Tab */}
            {activeTab === 'general' && (
                 <div className="animate-in fade-in duration-300">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 mb-6">
                        <div className="mb-6 border-b border-slate-100 pb-6">
                            <h2 className="text-lg font-bold text-slate-900">Profile Settings</h2>
                            <p className="text-sm text-slate-500 mt-1">Update your personal information.</p>
                        </div>

                        <div className="space-y-5 max-w-lg">
                            <div>
                                <label className="block text-[13px] font-bold text-slate-700 mb-2">Full Name</label>
                                <input type="text" defaultValue="Mike Sherry" className="w-full p-3 border border-slate-200 rounded-lg text-[14px] focus:outline-none focus:border-[#16A349]" />
                            </div>
                            <div>
                                <label className="block text-[13px] font-bold text-slate-700 mb-2">Email Address</label>
                                <input type="email" defaultValue="mike@agency.com" className="w-full p-3 border border-slate-200 rounded-lg text-[14px] focus:outline-none focus:border-[#16A349]" />
                            </div>
                            <div>
                                <label className="block text-[13px] font-bold text-slate-700 mb-2">Workspace Name</label>
                                <input type="text" defaultValue="Sherry Growth Systems" className="w-full p-3 border border-slate-200 rounded-lg text-[14px] focus:outline-none focus:border-[#16A349]" />
                            </div>
                        </div>

                        <div className="flex justify-end pt-6 mt-6">
                            <button className="px-6 py-2 rounded-lg bg-[#16A349] text-white text-[13px] font-bold hover:bg-[#149641] transition-colors shadow-sm">
                                Save Changes
                            </button>
                        </div>
                    </div>
                 </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
                <div className="animate-in fade-in duration-300">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 mb-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">Email Notifications</h2>
                        <div className="space-y-4">
                            <ToggleItem title="Generation Complete" description="Receive an email when a large batch generation is finished." checked />
                            <ToggleItem title="Weekly Digest" description="Summary of your team's usage and new assets created." />
                            <ToggleItem title="Product Updates" description="News about new features and improvements." checked />
                        </div>
                    </div>
                </div>
            )}

            {/* Billing Tab */}
            {activeTab === 'billing' && (
                <div className="animate-in fade-in duration-300">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 mb-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">Current Plan</h2>
                        
                        <div className="bg-[#E8F5E9] border border-[#A5D6A7] rounded-xl p-6 flex items-center justify-between mb-6">
                            <div>
                                <div className="text-[#16A349] font-bold text-sm uppercase tracking-wide mb-1">Pro Plan</div>
                                <div className="text-3xl font-bold text-slate-900">$49<span className="text-lg text-slate-400 font-medium">/mo</span></div>
                                <p className="text-sm text-slate-500 mt-2">Next billing date: July 24, 2024</p>
                            </div>
                            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-50">
                                Manage Subscription
                            </button>
                        </div>

                        <h3 className="text-[15px] font-bold text-slate-900 mb-4">Payment Methods</h3>
                        <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg">
                            <div className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center text-white text-[10px] font-bold">VISA</div>
                            <span className="text-sm font-medium text-slate-700">•••• 4242</span>
                            <span className="text-xs text-slate-400 ml-auto">Expires 12/25</span>
                        </div>
                    </div>
                </div>
            )}

        </div>
      </div>
      
      <div className="h-10"></div>
    </div>
  );
};

const ToggleItem = ({ title, description, checked = false }: { title: string, description: string, checked?: boolean }) => {
    const [isOn, setIsOn] = useState(checked);
    return (
        <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
            <div>
                <div className="text-[14px] font-bold text-slate-900">{title}</div>
                <div className="text-[13px] text-slate-500">{description}</div>
            </div>
            <button 
                onClick={() => setIsOn(!isOn)}
                className={`w-11 h-6 rounded-full p-1 transition-colors relative ${isOn ? 'bg-[#16A349]' : 'bg-slate-200'}`}
            >
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isOn ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </button>
        </div>
    )
}