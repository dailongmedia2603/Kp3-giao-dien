import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Globe, 
  Layout, 
  FileText, 
  Server, 
  RefreshCw, 
  Edit3, 
  Eye, 
  CheckCircle2, 
  AlertCircle, 
  Box, 
  Layers, 
  Cpu, 
  Sparkles, 
  Save, 
  ArrowRight, 
  Database, 
  Terminal, 
  Activity, 
  Zap, 
  MoreHorizontal,
  Settings
} from 'lucide-react';

// --- Types & Mock Data ---

interface Page {
  id: string;
  title: string;
  url: string;
  status: 'live' | 'staging' | 'draft';
  lastSync: string;
  conversionRate: string;
  platform: 'WordPress' | 'Shopify' | 'Webflow';
}

const MOCK_PAGES: Page[] = [
  { id: '1', title: 'Homepage (VSL Hero)', url: '/home', status: 'live', lastSync: '2m ago', conversionRate: '4.2%', platform: 'WordPress' },
  { id: '2', title: 'Core Offer Checkout', url: '/checkout/core', status: 'live', lastSync: '1h ago', conversionRate: '12.5%', platform: 'Shopify' },
  { id: '3', title: 'Upsell Flow - OTO1', url: '/upsell/1', status: 'staging', lastSync: '10m ago', conversionRate: '-', platform: 'WordPress' },
  { id: '4', title: 'Blog Archive', url: '/blog', status: 'live', lastSync: '1d ago', conversionRate: '1.1%', platform: 'WordPress' },
];

interface ContentBlock {
  id: string;
  name: string;
  type: string;
  usageCount: number;
  lastUpdated: string;
}

const MOCK_BLOCKS: ContentBlock[] = [
  { id: '1', name: "Founder's Bio (Short)", type: 'Text', usageCount: 42, lastUpdated: '2d ago' },
  { id: '2', name: "30-Day Guarantee Badge", type: 'Component', usageCount: 15, lastUpdated: '1w ago' },
  { id: '3', name: "Pricing Table (Tiered)", type: 'UI Section', usageCount: 8, lastUpdated: '3d ago' },
  { id: '4', name: "Footer Legal Links", type: 'Navigation', usageCount: 156, lastUpdated: '12h ago' },
];

interface Article {
  id: string;
  topic: string;
  stage: 'outline' | 'draft' | 'review' | 'ready';
  seoScore: number;
  wordCount: number;
}

const MOCK_ARTICLES: Article[] = [
  { id: '1', topic: 'The Future of AI in Real Estate', stage: 'ready', seoScore: 92, wordCount: 1450 },
  { id: '2', topic: '5 Ways to Scale Your Agency', stage: 'review', seoScore: 78, wordCount: 2100 },
  { id: '3', topic: 'Understanding Direct Response', stage: 'draft', seoScore: 45, wordCount: 800 },
];

export const WebsitePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pages' | 'blocks' | 'factory' | 'deploy'>('pages');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // --- Views ---

  // 1. Money Pages Manager
  const PagesView = () => (
    <div className="animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-slate-900">Critical Conversion Pages</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
          <RefreshCw size={14} /> Sync All Pages
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-bold text-slate-500 text-xs uppercase tracking-wider">Page Name</th>
              <th className="px-6 py-4 font-bold text-slate-500 text-xs uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 font-bold text-slate-500 text-xs uppercase tracking-wider">Platform</th>
              <th className="px-6 py-4 font-bold text-slate-500 text-xs uppercase tracking-wider">Vital Signs</th>
              <th className="px-6 py-4 font-bold text-slate-500 text-xs uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_PAGES.map(page => (
              <tr key={page.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900">{page.title}</div>
                  <div className="text-xs text-slate-400 font-mono">{page.url}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border
                    ${page.status === 'live' ? 'bg-green-50 text-green-700 border-green-200' : 
                      page.status === 'staging' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-100 text-slate-500 border-slate-200'}
                  `}>
                    <div className={`w-1.5 h-1.5 rounded-full ${page.status === 'live' ? 'bg-green-500 animate-pulse' : page.status === 'staging' ? 'bg-amber-500' : 'bg-slate-400'}`}></div>
                    {page.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Globe size={14} /> {page.platform}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <div className="text-xs text-slate-500">Sync: {page.lastSync}</div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      <Activity size={12} className="text-[#0EB869]" /> CR: {page.conversionRate}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-slate-100 rounded text-slate-500" title="View Live">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded text-slate-500" title="Edit Copy">
                      <Edit3 size={16} />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded text-indigo-600 font-bold text-xs" title="Push Update">
                      Push
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // 2. Content Blocks Library
  const BlocksView = () => (
    <div className="animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Global Content Assets</h2>
          <p className="text-slate-500 text-xs">Update once, reflect everywhere.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 shadow-sm">
          + Create New Block
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_BLOCKS.map(block => (
          <div key={block.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <Box size={20} />
              </div>
              <div className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-500">
                {block.type}
              </div>
            </div>
            
            <h3 className="font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{block.name}</h3>
            
            <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center text-xs">
              <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                <Layers size={14} /> Used on <span className="text-slate-900 font-bold">{block.usageCount}</span> pages
              </span>
            </div>
            <div className="mt-2 text-[10px] text-slate-400">Updated {block.lastUpdated}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // 3. Content Factory
  const FactoryView = () => (
    <div className="flex h-[calc(100vh-280px)] gap-6 animate-in fade-in duration-300">
      
      {/* Left: Input & List */}
      <div className={`flex flex-col gap-6 transition-all duration-300 ${isEditorOpen ? 'w-[350px] shrink-0' : 'w-full'}`}>
        
        {/* Input */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
            Generate New Asset
          </label>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Enter topic or keyword (e.g. 'Benefits of Keto for productivity')" 
              className="flex-1 p-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
            />
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center">
              <Sparkles size={18} />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="bg-white border border-slate-200 rounded-xl flex-1 overflow-hidden flex flex-col shadow-sm">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 font-bold text-sm text-slate-700">
            Recent Production
          </div>
          <div className="overflow-y-auto flex-1">
            {MOCK_ARTICLES.map(article => (
              <div 
                key={article.id} 
                onClick={() => { setSelectedArticle(article); setIsEditorOpen(true); }}
                className={`p-4 border-b border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors
                  ${selectedArticle?.id === article.id ? 'bg-indigo-50 border-l-4 border-l-indigo-500' : ''}
                `}
              >
                <div className="font-bold text-slate-900 text-sm mb-1 line-clamp-1">{article.topic}</div>
                <div className="flex justify-between items-center mt-2">
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded
                    ${article.stage === 'ready' ? 'bg-green-100 text-green-700' : 
                      article.stage === 'review' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}
                  `}>
                    {article.stage}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>{article.wordCount} words</span>
                    <span className={`font-bold ${article.seoScore > 80 ? 'text-green-600' : 'text-amber-500'}`}>
                      SEO: {article.seoScore}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Editor (Only shows when an article is selected) */}
      {isEditorOpen && selectedArticle && (
        <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden animate-in slide-in-from-right-4 duration-300">
          {/* Editor Toolbar */}
          <div className="h-14 border-b border-slate-100 flex items-center justify-between px-4 bg-slate-50/30">
            <div className="flex items-center gap-2">
              <button onClick={() => setIsEditorOpen(false)} className="md:hidden p-2 text-slate-400"><ArrowRight size={16} /></button>
              <span className="text-xs font-bold text-slate-400 uppercase">Draft Mode</span>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-100 rounded text-green-700 text-xs font-bold">
                <CheckCircle2 size={12} /> SEO Score: {selectedArticle.seoScore}
              </div>
              <button className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded hover:bg-indigo-700">
                Push to CMS
              </button>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Main Text Area */}
            <div className="flex-1 overflow-y-auto p-8 max-w-3xl mx-auto w-full">
              <h1 className="text-3xl font-bold text-slate-900 mb-6">{selectedArticle.topic}</h1>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed mb-4">
                  Here is the AI generated draft content. It would look like a clean Notion-style editor. 
                  Imagine paragraphs of high-quality, SEO-optimized text here based on the keyword analysis.
                </p>
                <h2 className="text-xl font-bold text-slate-800 mt-6 mb-3">Key Takeaways</h2>
                <ul className="list-disc pl-5 space-y-2 text-slate-600 mb-6">
                  <li>Point one regarding the topic.</li>
                  <li>Point two about efficiency and scaling.</li>
                  <li>Point three focusing on automation.</li>
                </ul>
                <p className="text-slate-600 leading-relaxed">
                  More content continues here...
                </p>
              </div>
            </div>

            {/* SEO Sidebar */}
            <div className="w-64 border-l border-slate-100 bg-slate-50 p-4 overflow-y-auto hidden xl:block">
              <h4 className="font-bold text-slate-700 text-xs uppercase mb-4">SEO Analysis</h4>
              <div className="space-y-3">
                <SeoCheck label="Keyword Density" status="good" />
                <SeoCheck label="Headline H1" status="good" />
                <SeoCheck label="Meta Description" status="warning" />
                <SeoCheck label="Readability Score" status="good" />
                <SeoCheck label="Internal Links" status="bad" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // 4. Deployment Panel
  const DeployView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-300">
      
      {/* Visual Diagram */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-[0.03]" 
              style={{ backgroundImage: 'radial-gradient(#4F46E5 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
          </div>

          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-12 relative z-10">Data Flow Architecture</h3>
          
          <div className="flex items-center gap-8 relative z-10">
            {/* Source */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-200 text-white">
                <Database size={32} />
              </div>
              <div className="text-center">
                <div className="font-bold text-slate-900">KP3 Hub</div>
                <div className="text-xs text-slate-500">Source of Truth</div>
              </div>
            </div>

            {/* Connection Line */}
            <div className="w-32 h-[2px] bg-slate-200 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs font-mono text-slate-400 border border-slate-200 rounded">
                REST API
              </div>
              <div className="absolute top-1/2 right-0 w-2 h-2 bg-green-500 rounded-full -translate-y-1/2 shadow-[0_0_10px_#22c55e] animate-pulse"></div>
            </div>

            {/* Destination */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 bg-[#21759B] rounded-2xl flex items-center justify-center shadow-xl shadow-blue-100 text-white relative">
                <Server size={32} />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center border border-slate-100 shadow-sm">
                  <CheckCircle2 size={14} className="text-green-500" />
                </div>
              </div>
              <div className="text-center">
                <div className="font-bold text-slate-900">WordPress</div>
                <div className="text-xs text-slate-500">Production (v6.4)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sync Settings */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Settings size={18} className="text-slate-400" /> Sync Configuration
          </h3>
          <div className="flex items-center justify-between p-4 border border-slate-100 rounded-lg bg-slate-50">
            <div>
              <div className="font-bold text-slate-800 text-sm">Auto-Sync on Save</div>
              <div className="text-xs text-slate-500">Push changes immediately when assets are updated.</div>
            </div>
            <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Log */}
      <div className="lg:col-span-1 bg-slate-900 rounded-xl shadow-lg overflow-hidden flex flex-col h-[500px]">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-slate-400" />
            <span className="text-xs font-mono text-slate-300 font-bold">Sync Logs</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
          </div>
        </div>
        <div className="p-4 font-mono text-xs space-y-2 overflow-y-auto flex-1 text-slate-300">
          <div className="text-green-400">➜ system init --mode=production</div>
          <div className="text-slate-500">[10:41:02] Establishing connection to wp-json/v2...</div>
          <div className="text-green-400">[10:41:03] Connection Verified (24ms)</div>
          <div className="text-slate-500">[10:42:15] POST /pages/update id=1024</div>
          <div className="text-blue-400">[10:42:16] Syncing Content Block "Founder Bio"...</div>
          <div className="text-green-400">[10:42:17] Success: Updated 12 instances.</div>
          <div className="text-slate-500">[10:45:00] Scheduled backup started.</div>
          <div className="text-green-400">[10:45:05] Backup completed (4.2MB).</div>
          <div className="opacity-50 mt-4 border-t border-slate-700/50 pt-2">Waiting for new events...</div>
        </div>
      </div>

    </div>
  );

  return (
    <div className="p-8 max-w-[1600px] mx-auto font-sans h-full flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col items-center mb-8 text-center shrink-0">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold">
            Website Hub
          </span>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight flex items-center gap-3">
          Content Mission Control <Globe className="text-indigo-600" size={28} />
        </h1>
        
        <p className="text-slate-500 text-[15px] leading-relaxed mb-8 max-w-2xl mx-auto">
          Manage your web presence as a single source of truth. Deploy content globally.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-slate-100/50 rounded-xl border border-slate-200 p-1.5 flex mb-8 gap-1 max-w-4xl mx-auto shrink-0 overflow-x-auto">
        <NavButton 
          isActive={activeTab === 'pages'} 
          onClick={() => setActiveTab('pages')} 
          icon={Layout} 
          label="Money Pages" 
        />
        <NavButton 
          isActive={activeTab === 'blocks'} 
          onClick={() => setActiveTab('blocks')} 
          icon={Box} 
          label="Content Blocks" 
        />
        <NavButton 
          isActive={activeTab === 'factory'} 
          onClick={() => setActiveTab('factory')} 
          icon={Cpu} 
          label="Content Factory" 
        />
        <NavButton 
          isActive={activeTab === 'deploy'} 
          onClick={() => setActiveTab('deploy')} 
          icon={Server} 
          label="Deployment" 
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0">
        {activeTab === 'pages' && <PagesView />}
        {activeTab === 'blocks' && <BlocksView />}
        {activeTab === 'factory' && <FactoryView />}
        {activeTab === 'deploy' && <DeployView />}
      </div>

    </div>
  );
};

// --- Helpers ---

const NavButton = ({ isActive, onClick, icon: Icon, label }: { isActive: boolean, onClick: () => void, icon: any, label: string }) => (
  <button 
    onClick={onClick}
    className={`flex-1 min-w-[140px] py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-[13px] font-bold transition-all duration-200 whitespace-nowrap
      ${isActive 
        ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200' 
        : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'
      }`}
  >
    <Icon size={18} strokeWidth={2} />
    {label}
  </button>
);

const SeoCheck = ({ label, status }: { label: string, status: 'good' | 'warning' | 'bad' }) => (
  <div className="flex items-center justify-between text-xs">
    <span className="text-slate-600 font-medium">{label}</span>
    {status === 'good' && <CheckCircle2 size={14} className="text-green-500" />}
    {status === 'warning' && <AlertCircle size={14} className="text-amber-500" />}
    {status === 'bad' && <AlertCircle size={14} className="text-red-500" />}
  </div>
);