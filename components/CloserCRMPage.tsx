import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  DollarSign, 
  MoreHorizontal, 
  AlertTriangle, 
  Bot, 
  ArrowLeft,
  Send,
  Crown,
  PieChart,
  Activity,
  Users,
  Filter,
  Mail,
  Phone,
  MessageSquare,
  Zap
} from 'lucide-react';

// --- TYPES & MOCK DATA ---
type StageId = 'new' | 'contacted' | 'engaged' | 'qualified' | 'sold';
type Grade = 'A' | 'B' | 'C' | 'D';

interface Deal {
  id: string;
  name: string;
  company: string;
  value: number;
  stage: StageId;
  grade: Grade;
  lastContact: string;
  messages: { sender: 'ai' | 'human' | 'client'; text: string; time: string; channel: 'zalo' | 'messenger' }[];
}

const STAGES: { id: StageId; title: string; color: string }[] = [
  { id: 'new', title: 'Uncontacted', color: 'bg-slate-400' },
  { id: 'contacted', title: 'Contacted', color: 'bg-blue-400' },
  { id: 'engaged', title: 'Engaged', color: 'bg-purple-500' },
  { id: 'qualified', title: 'Qualified', color: 'bg-amber-500' },
  { id: 'sold', title: 'Sold', color: 'bg-green-500' },
];

const INITIAL_DEALS: Deal[] = [
  { id: '1', name: 'Sarah Connor', company: 'Cyberdyne Systems', value: 50000, stage: 'qualified', grade: 'A', lastContact: '2h ago', messages: [{ sender: 'client', text: 'The proposal looks great! Let\'s move forward.', time: '10:30 AM', channel: 'messenger' }] },
  { id: '2', name: 'John Doe', company: 'Acme Corp', value: 5000, stage: 'new', grade: 'C', lastContact: '1d ago', messages: [{ sender: 'ai', text: 'Chào mừng bạn đến với chúng tôi! Bạn cần hỗ trợ gì ạ?', time: 'Yesterday', channel: 'zalo' }] },
  { id: '3', name: 'Lex Luthor', company: 'LexCorp', value: 10000, stage: 'engaged', grade: 'D', lastContact: '3d ago', messages: [{ sender: 'client', text: 'I need 10 revisions on the logo. And a discount.', time: '3d ago', channel: 'messenger' }] },
  { id: '4', name: 'Bruce Wayne', company: 'Wayne Enterprises', value: 250000, stage: 'sold', grade: 'A', lastContact: '1w ago', messages: [{ sender: 'human', text: 'Payment received. Welcome aboard!', time: '1w ago', channel: 'messenger' }] },
  { id: '5', name: 'Peter Parker', company: 'Daily Bugle', value: 1500, stage: 'contacted', grade: 'B', lastContact: '5h ago', messages: [{ sender: 'ai', text: 'Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm.', time: '5h ago', channel: 'zalo' }] },
];

const MOCK_CHURN_ALERTS = [
    { name: 'Innovate Solutions', lastInteraction: '8 days ago', value: 45000 },
    { name: 'HealthCo', lastInteraction: '12 days ago', value: 8000 },
];

const MOCK_4D_DATA = [
    { name: 'Doing', value: 65, color: '#EF4444' },
    { name: 'Deciding', value: 15, color: '#3B82F6' },
    { name: 'Delegating', value: 10, color: '#8B5CF6' },
    { name: 'Designing', value: 10, color: '#10B981' },
];

// --- UI Components ---

const PieChartComponent = ({ data }: { data: typeof MOCK_4D_DATA }) => {
    let cumulative = 0;
    return (
        <svg viewBox="0 0 100 100" className="w-24 h-24">
            {data.map(slice => {
                const startAngle = (cumulative / 100) * 360;
                cumulative += slice.value;
                const endAngle = (cumulative / 100) * 360;
                const largeArcFlag = slice.value > 50 ? 1 : 0;
                const x1 = 50 + 45 * Math.cos(Math.PI * startAngle / 180);
                const y1 = 50 + 45 * Math.sin(Math.PI * startAngle / 180);
                const x2 = 50 + 45 * Math.cos(Math.PI * endAngle / 180);
                const y2 = 50 + 45 * Math.sin(Math.PI * endAngle / 180);
                return <path key={slice.name} d={`M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArcFlag} 1 ${x2} ${y2} Z`} fill={slice.color} />;
            })}
        </svg>
    );
};

const DealCard: React.FC<{ deal: Deal; onDealClick: (deal: Deal) => void; onDragStart: (e: React.DragEvent, dealId: string) => void; }> = ({ deal, onDealClick, onDragStart }) => {
  const gradeStyles = { A: { icon: Crown, text: 'Giant Pumpkin', color: 'amber' }, D: { icon: AlertTriangle, text: 'Weed', color: 'red' } };
  const gradeInfo = gradeStyles[deal.grade as keyof typeof gradeStyles];
  return (
    <div draggable onDragStart={(e) => onDragStart(e, deal.id)} onClick={() => onDealClick(deal)} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing transition-shadow group">
      {gradeInfo && <div className={`flex items-center gap-1.5 text-xs font-bold mb-2 text-${gradeInfo.color}-600`}><gradeInfo.icon size={14} /> {gradeInfo.text}</div>}
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="font-bold text-slate-800 text-sm">{deal.name}</div>
          <div className="text-xs text-slate-400">{deal.company}</div>
        </div>
        <button className="text-slate-300 hover:text-slate-500"><MoreHorizontal size={14} /></button>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-slate-50">
        <div className="flex items-center gap-1 text-green-600 font-bold text-xs"><DollarSign size={12} />{deal.value.toLocaleString()}</div>
        <span className="text-[10px] text-slate-400">{deal.lastContact}</span>
      </div>
    </div>
  );
};

const PipelineColumn: React.FC<{ stage: any; deals: Deal[]; onDrop: any; onDragOver: any; onDealClick: any; onDragStart: any; }> = ({ stage, deals, onDrop, onDragOver, onDealClick, onDragStart }) => (
  <div onDrop={(e) => onDrop(e, stage.id)} onDragOver={onDragOver} className="min-w-[300px] w-[300px] bg-slate-100 rounded-xl border border-slate-200 flex flex-col h-full max-h-[calc(100vh-380px)]">
    <div className="p-4 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-slate-100 rounded-t-xl z-10">
      <div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${stage.color}`}></div><h3 className="text-sm font-bold text-slate-800">{stage.title}</h3></div>
      <span className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full">{deals.length}</span>
    </div>
    <div className="p-3 space-y-3 overflow-y-auto flex-1">{deals.map(deal => <DealCard key={deal.id} deal={deal} onDealClick={onDealClick} onDragStart={onDragStart} />)}</div>
  </div>
);

// --- Main Component ---
export const CloserCRMPage: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'automation'>('dashboard');

  const handleDrop = (e: React.DragEvent, stageId: StageId) => {
    const dealId = e.dataTransfer.getData('dealId');
    setDeals(prevDeals => prevDeals.map(d => d.id === dealId ? { ...d, stage: stageId } : d));
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  return (
    <div className="p-8 max-w-[1800px] mx-auto font-sans h-full flex flex-col">
      <div className="flex flex-col items-center mb-8 text-center shrink-0">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold">Closer CRM</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Sales Command Center</h1>
        <p className="text-slate-500 text-[15px] leading-relaxed mb-8 max-w-2xl mx-auto">Tối ưu hóa hiệu suất, quản lý pipeline và tự động hóa quy trình bán hàng của bạn.</p>
        <div className="bg-white border border-slate-200 rounded-lg p-1 flex shadow-sm">
            <button onClick={() => setActiveTab('dashboard')} className={`px-6 py-2 text-xs font-bold rounded-md transition-all flex items-center gap-2 ${activeTab === 'dashboard' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>Dashboard</button>
            <button onClick={() => setActiveTab('automation')} className={`px-6 py-2 text-xs font-bold rounded-md transition-all flex items-center gap-2 ${activeTab === 'automation' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>Automation Playbooks</button>
        </div>
      </div>

      {activeTab === 'dashboard' && (
        <div className="animate-in fade-in duration-300 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <h3 className="font-bold text-slate-800 mb-4">Godfather Offer Metrics</h3>
                    <div className="flex justify-around items-center text-center">
                        <div><p className="text-3xl font-bold text-slate-800">10,240</p><p className="text-xs text-slate-400">Clicks</p></div>
                        <ChevronRight className="text-slate-300" />
                        <div><p className="text-3xl font-bold text-slate-800">512</p><p className="text-xs text-slate-400">Leads (5%)</p></div>
                        <ChevronRight className="text-slate-300" />
                        <div><p className="text-3xl font-bold text-green-600">25</p><p className="text-xs text-slate-400">Sales (5%)</p></div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-slate-800 mb-4">4D Mix Tracker</h3>
                        <div className="space-y-2 text-sm">
                            {MOCK_4D_DATA.map(d => <div key={d.name} className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm" style={{backgroundColor: d.color}}></div><span className="font-medium text-slate-600">{d.name}</span><span className="font-bold text-slate-800 ml-auto">{d.value}%</span></div>)}
                        </div>
                    </div>
                    <PieChartComponent data={MOCK_4D_DATA} />
                </div>
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><AlertTriangle className="text-red-500" /> Churn Alert</h3>
                    <div className="space-y-3">
                        {MOCK_CHURN_ALERTS.map((alert, i) => <div key={i} className="p-3 bg-red-50 border border-red-100 rounded-lg flex justify-between items-center"><div className="font-bold text-red-800 text-sm">{alert.name}</div><div className="text-xs text-red-600">{alert.lastInteraction}</div></div>)}
                    </div>
                </div>
            </div>
            <div className="flex-1 flex gap-6 overflow-x-auto pb-4 h-full items-start">
                {STAGES.map(stage => <PipelineColumn key={stage.id} stage={stage} deals={deals.filter(d => d.stage === stage.id)} onDrop={handleDrop} onDragOver={handleDragOver} onDealClick={() => {}} onDragStart={() => {}} />)}
            </div>
        </div>
      )}

      {activeTab === 'automation' && (
        <div className="animate-in fade-in duration-300 bg-white border border-slate-200 rounded-xl p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Lead Nurture Playbook</h2>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 text-center">
                <div className="p-6 bg-slate-50 rounded-xl border w-72"><h3 className="font-bold">New Lead Created</h3><p className="text-xs text-slate-500">Trigger Event</p></div>
                <ArrowRight className="text-slate-300 hidden lg:block" />
                <div className="p-6 bg-slate-50 rounded-xl border w-72"><h3 className="font-bold">Check Time</h3><p className="text-xs text-slate-500">Is it business hours?</p></div>
                <ArrowRight className="text-slate-300 hidden lg:block" />
                <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-xl border border-green-200 w-72"><h3 className="font-bold text-green-800">YES: Create Task</h3><p className="text-xs text-green-600">Assign to Sale for immediate call (Speed to Lead)</p></div>
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 w-72"><h3 className="font-bold text-blue-800">NO: Auto-SMS</h3><p className="text-xs text-blue-600">Send confirmation & schedule callback</p></div>
                </div>
            </div>
             <div className="flex justify-center my-8"><ArrowDownRight className="text-slate-300" /></div>
             <div className="flex flex-col lg:flex-row items-center justify-center gap-8 text-center">
                <div className="p-6 bg-slate-50 rounded-xl border w-72"><h3 className="font-bold">Wait 5 Minutes</h3><p className="text-xs text-slate-500">Is status still 'Uncontacted'?</p></div>
                <ArrowRight className="text-slate-300 hidden lg:block" />
                <div className="p-6 bg-purple-50 rounded-xl border border-purple-200 w-72"><h3 className="font-bold text-purple-800">YES: Auto-Email</h3><p className="text-xs text-purple-600">Send Magic Lantern follow-up</p></div>
                <ArrowRight className="text-slate-300 hidden lg:block" />
                <div className="p-6 bg-amber-50 rounded-xl border border-amber-200 w-72"><h3 className="font-bold text-amber-800">ON REPLY: Engage</h3><p className="text-xs text-amber-600">Change status to 'Engaged' & notify Sales team</p></div>
            </div>
        </div>
      )}
    </div>
  );
};