import React, { useState, useRef } from 'react';
import { 
  Home, 
  ChevronRight, 
  Shield, 
  FileText, 
  Archive, 
  PenTool, 
  Settings, 
  LayoutDashboard,
  Plus,
  Search,
  Copy,
  Download,
  Trash2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowLeft,
  Save,
  User,
  Monitor,
  Mail
} from 'lucide-react';

// --- Types ---
interface Template {
  id: string;
  name: string;
  lastUpdated: string;
  timesUsed: number;
  content: string;
}

interface SignedDocument {
  id: string;
  templateName: string;
  clientName: string;
  signedDate: string;
  status: 'Signed' | 'Pending';
}

// --- Mock Data ---
const MOCK_TEMPLATES: Template[] = [
  { id: 'tpl1', name: 'High-Ticket Coaching Agreement', lastUpdated: '2 days ago', timesUsed: 42, content: 'This agreement is made on {{Date}} between [Your Company] and {{Client_Name}} for the price of {{Price}}...' },
  { id: 'tpl2', name: 'Agency Retainer Contract', lastUpdated: '1 week ago', timesUsed: 15, content: 'This retainer agreement outlines the scope of work...' },
  { id: 'tpl3', name: 'Mastermind Terms & Conditions', lastUpdated: '1 month ago', timesUsed: 8, content: 'By joining the mastermind, you agree to the following terms...' },
];

const MOCK_VAULT: SignedDocument[] = [
  { id: 'doc1', templateName: 'High-Ticket Coaching Agreement', clientName: 'Sarah Jenkins', signedDate: '2024-10-22', status: 'Signed' },
  { id: 'doc2', templateName: 'Agency Retainer Contract', clientName: 'Tom Ford', signedDate: '2024-10-20', status: 'Signed' },
  { id: 'doc3', templateName: 'High-Ticket Coaching Agreement', clientName: 'David Chen', signedDate: 'N/A', status: 'Pending' },
];

const TEMPLATE_VARIABLES = ['{{Client_Name}}', '{{Client_Email}}', '{{Price}}', '{{Date}}', '{{Offer_Name}}'];

export const LegalShieldPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'templates' | 'vault' | 'esign'>('dashboard');
  const [templates, setTemplates] = useState<Template[]>(MOCK_TEMPLATES);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);

  const handleSelectTemplate = (template: Template) => {
    setEditingTemplate(template);
    setActiveTab('templates');
  };

  const handleBackToList = () => {
    setEditingTemplate(null);
  };

  const renderContent = () => {
    if (editingTemplate) {
      return <TemplateEditor template={editingTemplate} onBack={handleBackToList} />;
    }

    switch (activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'templates': return <TemplatesView onEdit={handleSelectTemplate} templates={templates} />;
      case 'vault': return <VaultView />;
      case 'esign': return <EsignPreview />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto font-sans h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col items-center mb-8 text-center shrink-0">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold">
            Legal Shield
          </span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight flex items-center gap-3">
          <Shield size={28} className="text-blue-600" />
          Legal Automation Suite
        </h1>
        <p className="text-slate-500 text-[15px] leading-relaxed mb-8 max-w-2xl mx-auto">
          Automate contracts, secure e-signatures, and protect your business from disputes & chargebacks.
        </p>
      </div>

      {/* Tabs */}
      {!editingTemplate && (
        <div className="bg-slate-100/50 rounded-xl border border-slate-200 p-1.5 flex mb-8 gap-1 max-w-4xl mx-auto shrink-0">
          <TabButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={LayoutDashboard} label="Dashboard" />
          <TabButton active={activeTab === 'templates'} onClick={() => setActiveTab('templates')} icon={FileText} label="Templates" />
          <TabButton active={activeTab === 'vault'} onClick={() => setActiveTab('vault')} icon={Archive} label="Signed Vault" />
          <TabButton active={activeTab === 'esign'} onClick={() => setActiveTab('esign')} icon={PenTool} label="E-Sign Preview" />
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 min-h-0">
        {renderContent()}
      </div>
    </div>
  );
};

// --- Sub-Views ---

const DashboardView: React.FC = () => (
  <div className="animate-in fade-in duration-300">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard title="Contracts Sent" value="58" change="+12 this month" color="blue" />
      <StatCard title="Signed & Secured" value="51" change="88% rate" color="green" />
      <StatCard title="Pending Signature" value="7" change="Action required" color="yellow" />
      <StatCard title="Dispute Rate" value="0.0%" change="Protected" color="green" />
    </div>
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
      <div className="p-5 border-b border-slate-100">
        <h3 className="font-bold text-slate-900">Recent Activity</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Client</th>
              <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Contract</th>
              <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Status</th>
              <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Date</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_VAULT.map(doc => (
              <tr key={doc.id} className="border-b border-slate-100 last:border-0">
                <td className="px-6 py-4 font-medium text-slate-800">{doc.clientName}</td>
                <td className="px-6 py-4 text-slate-600">{doc.templateName}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${doc.status === 'Signed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{doc.status}</span>
                </td>
                <td className="px-6 py-4 text-slate-500">{doc.signedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const TemplatesView: React.FC<{ templates: Template[], onEdit: (template: Template) => void }> = ({ templates, onEdit }) => (
  <div className="animate-in fade-in duration-300">
    <div className="flex justify-end mb-6">
      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 shadow-sm">
        <Plus size={14} /> New Template
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map(template => (
        <div key={template.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><FileText size={20} /></div>
            <span className="text-xs text-slate-400">{template.lastUpdated}</span>
          </div>
          <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{template.name}</h3>
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
            <span className="text-xs text-slate-500">Used {template.timesUsed} times</span>
            <button onClick={() => onEdit(template)} className="text-xs font-bold text-blue-600 hover:underline">Edit</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TemplateEditor: React.FC<{ template: Template, onBack: () => void }> = ({ template, onBack }) => (
  <div className="animate-in fade-in duration-300">
    <div className="flex items-center gap-4 mb-6">
      <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"><ArrowLeft size={18} /></button>
      <h2 className="text-xl font-bold text-slate-900">Editing: {template.name}</h2>
    </div>
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm p-6">
        <textarea
          defaultValue={template.content}
          className="w-full h-96 p-4 border border-slate-200 rounded-lg font-mono text-sm leading-relaxed focus:outline-none focus:border-blue-500"
        />
        <div className="flex justify-end mt-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 shadow-sm">
            <Save size={14} /> Save Template
          </button>
        </div>
      </div>
      <div className="w-full lg:w-64">
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Variables</h4>
          <div className="space-y-2">
            {TEMPLATE_VARIABLES.map(v => (
              <div key={v} className="flex items-center justify-between p-2 bg-slate-50 rounded text-xs">
                <span className="font-mono text-slate-700">{v}</span>
                <button onClick={() => navigator.clipboard.writeText(v)} className="text-slate-400 hover:text-blue-600"><Copy size={14} /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const VaultView: React.FC = () => (
  <div className="animate-in fade-in duration-300">
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex justify-between items-center">
        <h3 className="font-bold text-slate-900">Signed Document Vault</h3>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input type="text" placeholder="Search by client or contract..." className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-500" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Client</th>
              <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Contract</th>
              <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Status</th>
              <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase">Date</th>
              <th className="px-6 py-3 font-bold text-slate-500 text-xs uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_VAULT.map(doc => (
              <tr key={doc.id} className="border-b border-slate-100 last:border-0">
                <td className="px-6 py-4 font-medium text-slate-800">{doc.clientName}</td>
                <td className="px-6 py-4 text-slate-600">{doc.templateName}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${doc.status === 'Signed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{doc.status}</span>
                </td>
                <td className="px-6 py-4 text-slate-500">{doc.signedDate}</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-slate-400 hover:text-blue-600"><Download size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const EsignPreview: React.FC = () => {
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const sigCanvas = useRef<any>(null);

  const handleClear = () => {
    setSignatureData(null);
  };

  const handleSign = () => {
    // In a real app, this would capture canvas data. Here we just simulate.
    setSignatureData('path/to/fake-signature.svg');
  };

  return (
    <div className="animate-in fade-in duration-300 bg-slate-100 p-8 rounded-xl border border-slate-200">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Review & Sign: Coaching Agreement</h2>
          <p className="text-sm text-slate-500 mb-6">For: Sarah Jenkins</p>
          
          <div className="h-80 border border-slate-200 rounded-lg p-4 overflow-y-scroll bg-slate-50 mb-6 font-mono text-xs text-slate-600">
            <p>This agreement is made on October 26, 2024 between KP3 Inc. ("Company") and Sarah Jenkins ("Client").</p>
            <p className="mt-4">1. SCOPE OF SERVICES: Company agrees to provide high-ticket coaching services as outlined in the "Scale to 8-Figures" program for a period of 12 months.</p>
            <p className="mt-4">2. FEES: Client agrees to pay a one-time fee of $15,000 USD. This fee is non-refundable.</p>
            <p className="mt-4">3. CONFIDENTIALITY: Both parties agree to keep all shared information confidential.</p>
            <p className="mt-4">[... more legal text ...]</p>
          </div>

          <h3 className="font-bold text-slate-900 mb-2">Draw Your Signature</h3>
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 h-48 mb-4 relative">
            {signatureData ? (
              <div className="flex items-center justify-center h-full">
                <p className="font-['Caveat',_cursive] text-4xl text-slate-800 -rotate-3">Sarah Jenkins</p>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 italic">
                Draw on the signature pad
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2 mb-6">
            <button onClick={handleClear} className="text-xs font-bold text-slate-500 hover:underline">Clear</button>
            {!signatureData && <button onClick={handleSign} className="px-4 py-1 bg-slate-200 text-slate-700 text-xs font-bold rounded hover:bg-slate-300">Simulate Sign</button>}
          </div>

          <button disabled={!signatureData} className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors">
            I Agree & Sign Contract
          </button>

          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-500">
            <h4 className="font-bold text-slate-600 mb-2">Audit Trail</h4>
            <div className="grid grid-cols-3 gap-4">
              <div><span className="font-bold">IP Address:</span> 78.12.34.56</div>
              <div><span className="font-bold">Device:</span> iPhone 15 Pro</div>
              <div><span className="font-bold">Timestamp:</span> 2024-10-26 10:52:12 UTC</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const TabButton: React.FC<{ active: boolean, onClick: () => void, icon: React.ElementType, label: string }> = ({ active, onClick, icon: Icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex-1 min-w-[120px] py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-[13px] font-bold transition-all duration-200 whitespace-nowrap
      ${active 
        ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200' 
        : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'
      }`}
  >
    <Icon size={18} />
    {label}
  </button>
);

const StatCard: React.FC<{ title: string, value: string, change: string, color: 'blue' | 'green' | 'yellow' }> = ({ title, value, change, color }) => {
  const colors = {
    blue: 'text-blue-600 bg-blue-50',
    green: 'text-green-600 bg-green-50',
    yellow: 'text-amber-600 bg-amber-50',
  };
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">{title}</h4>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
      <p className={`text-xs font-bold mt-1 ${colors[color]}`}>{change}</p>
    </div>
  );
};