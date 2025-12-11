import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Users, 
  DollarSign, 
  MoreHorizontal, 
  Award, 
  AlertTriangle, 
  Bot, 
  ArrowLeft,
  Send,
  Crown
} from 'lucide-react';

// --- Custom Icons ---
const ZaloIcon = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 512 512" className={className}>
    <path fill="#0068ff" d="M382.7,448H129.3c-24.5,0-44.3-19.8-44.3-44.3V108.3c0-24.5,19.8-44.3,44.3-44.3h253.4c24.5,0,44.3,19.8,44.3,44.3v295.4C427,428.2,407.2,448,382.7,448z"/>
    <path fill="#fff" d="M299.3,203.9h-34.3v34.3h34.3c19,0,34.3-15.4,34.3-34.3v-34.3h-34.3v34.3C299.3,188.5,283.9,203.9,299.3,203.9z M203.9,203.9h34.3v-34.3h-34.3c-19,0-34.3,15.4-34.3,34.3v34.3h34.3v-34.3C203.9,219.3,219.3,203.9,203.9,203.9z M264.9,308.1h-51.5v-34.3h51.5c19,0,34.3-15.4,34.3-34.3v-34.3h-85.8v34.3h51.5v34.3h-51.5c-19,0-34.3,15.4-34.3,34.3v34.3h85.8v-34.3H264.9z"/>
  </svg>
);

const FacebookMessengerIcon = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <path fill="#0084ff" d="M12 0C5.373 0 0 5.373 0 12c0 4.833 2.823 8.99 6.736 10.95c.294.14.626.29.96.44c.513.23.88.72.88,1.28v.03c0 .828.672 1.5 1.5 1.5h3.848c.828 0 1.5-.672 1.5-1.5v-.03c0-.56.367-1.05.88-1.28c.334-.15.666-.3.96-.44C21.177 20.99 24 16.833 24 12C24 5.373 18.627 0 12 0z"/>
    <path fill="#fff" d="m6.333 10.14l3.25 3.25l5.834-5.833l-3.25-3.25zM17.667 10.14l-3.25 3.25l-5.834-5.833l3.25-3.25z"/>
  </svg>
);

// --- TYPES & MOCK DATA ---
type StageId = 'new' | 'qualified' | 'proposal' | 'won';
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
  { id: 'new', title: 'New Leads', color: 'bg-slate-500' },
  { id: 'qualified', title: 'Qualified', color: 'bg-blue-500' },
  { id: 'proposal', title: 'Proposal Sent', color: 'bg-purple-500' },
  { id: 'won', title: 'Won', color: 'bg-green-500' },
];

const INITIAL_DEALS: Deal[] = [
  { id: '1', name: 'Sarah Connor', company: 'Cyberdyne Systems', value: 50000, stage: 'proposal', grade: 'A', lastContact: '2h ago', messages: [{ sender: 'client', text: 'The proposal looks great! Let\'s move forward.', time: '10:30 AM', channel: 'messenger' }] },
  { id: '2', name: 'John Doe', company: 'Acme Corp', value: 5000, stage: 'new', grade: 'C', lastContact: '1d ago', messages: [{ sender: 'ai', text: 'Chào mừng bạn đến với chúng tôi! Bạn cần hỗ trợ gì ạ?', time: 'Yesterday', channel: 'zalo' }] },
  { id: '3', name: 'Lex Luthor', company: 'LexCorp', value: 10000, stage: 'qualified', grade: 'D', lastContact: '3d ago', messages: [{ sender: 'client', text: 'I need 10 revisions on the logo. And a discount.', time: '3d ago', channel: 'messenger' }] },
  { id: '4', name: 'Bruce Wayne', company: 'Wayne Enterprises', value: 250000, stage: 'won', grade: 'A', lastContact: '1w ago', messages: [{ sender: 'human', text: 'Payment received. Welcome aboard!', time: '1w ago', channel: 'messenger' }] },
  { id: '5', name: 'Peter Parker', company: 'Daily Bugle', value: 1500, stage: 'new', grade: 'B', lastContact: '5h ago', messages: [{ sender: 'ai', text: 'Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm.', time: '5h ago', channel: 'zalo' }] },
];

// --- MAIN COMPONENT ---
export const CloserCRMPage: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  const handleDealClick = (deal: Deal) => setSelectedDeal(deal);
  const handleCloseDetail = () => setSelectedDeal(null);

  const handleDragStart = (e: React.DragEvent, dealId: string) => {
    e.dataTransfer.setData('dealId', dealId);
  };

  const handleDrop = (e: React.DragEvent, stageId: StageId) => {
    const dealId = e.dataTransfer.getData('dealId');
    setDeals(prevDeals => prevDeals.map(d => d.id === dealId ? { ...d, stage: stageId } : d));
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  return (
    <div className="p-8 max-w-[1800px] mx-auto font-sans h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col items-center mb-8 text-center shrink-0">
        <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
          <Home size={16} className="text-slate-400" />
          <ChevronRight size={14} className="text-slate-300" />
          <span className="bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold">
            Closer CRM
          </span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
          The Pumpkin Plan CRM
        </h1>
        <p className="text-slate-500 text-[15px] leading-relaxed mb-8 max-w-2xl mx-auto">
          Nuôi dưỡng những khách hàng "bí ngô" và loại bỏ "cỏ dại". Tối ưu hóa quy trình bán hàng của bạn.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Pipeline View */}
        <div className="flex-1 flex gap-6 overflow-x-auto pb-4 h-full items-start">
          {STAGES.map(stage => (
            <PipelineColumn 
              key={stage.id}
              stage={stage}
              deals={deals.filter(d => d.stage === stage.id)}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDealClick={handleDealClick}
              onDragStart={handleDragStart}
            />
          ))}
        </div>

        {/* Detail Panel */}
        {selectedDeal && <DealDetailPanel deal={selectedDeal} onClose={handleCloseDetail} />}
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const PipelineColumn: React.FC<{
  stage: { id: StageId; title: string; color: string };
  deals: Deal[];
  onDrop: (e: React.DragEvent, stageId: StageId) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDealClick: (deal: Deal) => void;
  onDragStart: (e: React.DragEvent, dealId: string) => void;
}> = ({ stage, deals, onDrop, onDragOver, onDealClick, onDragStart }) => (
  <div 
    onDrop={(e) => onDrop(e, stage.id)}
    onDragOver={onDragOver}
    className="min-w-[320px] w-[320px] bg-slate-50 rounded-xl border border-slate-200 flex flex-col h-full max-h-[calc(100vh-280px)]"
  >
    <div className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-slate-50 rounded-t-xl z-10">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${stage.color}`}></div>
        <h3 className="text-sm font-bold text-slate-800">{stage.title}</h3>
      </div>
      <span className="text-xs font-bold text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded-full">{deals.length}</span>
    </div>
    <div className="p-3 space-y-3 overflow-y-auto flex-1">
      {deals.map(deal => (
        <DealCard key={deal.id} deal={deal} onDealClick={onDealClick} onDragStart={onDragStart} />
      ))}
    </div>
  </div>
);

const DealCard: React.FC<{
  deal: Deal;
  onDealClick: (deal: Deal) => void;
  onDragStart: (e: React.DragEvent, dealId: string) => void;
}> = ({ deal, onDealClick, onDragStart }) => {
  const gradeStyles = {
    A: { icon: Crown, text: 'Giant Pumpkin', color: 'amber' },
    D: { icon: AlertTriangle, text: 'Weed', color: 'red' },
  };
  const gradeInfo = gradeStyles[deal.grade as keyof typeof gradeStyles];

  return (
    <div 
      draggable 
      onDragStart={(e) => onDragStart(e, deal.id)}
      onClick={() => onDealClick(deal)}
      className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md cursor-pointer transition-shadow group"
    >
      {gradeInfo && (
        <div className={`flex items-center gap-1.5 text-xs font-bold mb-2 text-${gradeInfo.color}-600`}>
          <gradeInfo.icon size={14} /> {gradeInfo.text}
        </div>
      )}
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="font-bold text-slate-800 text-sm">{deal.name}</div>
          <div className="text-xs text-slate-400">{deal.company}</div>
        </div>
        <button className="text-slate-300 hover:text-slate-500"><MoreHorizontal size={14} /></button>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-slate-50">
        <div className="flex items-center gap-1 text-green-600 font-bold text-xs">
          <DollarSign size={12} />
          {deal.value.toLocaleString()}
        </div>
        <span className="text-[10px] text-slate-400">{deal.lastContact}</span>
      </div>
    </div>
  );
};

const DealDetailPanel: React.FC<{ deal: Deal; onClose: () => void }> = ({ deal, onClose }) => (
  <div className="w-[450px] shrink-0 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full animate-in slide-in-from-right-4 duration-300">
    {/* Header */}
    <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
      <div className="flex items-center gap-3">
        <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500"><ArrowLeft size={16} /></button>
        <div>
          <h3 className="font-bold text-slate-900">{deal.name}</h3>
          <p className="text-xs text-slate-500">{deal.company}</p>
        </div>
      </div>
      <MoreHorizontal size={18} className="text-slate-400" />
    </div>

    {/* Client Grading */}
    <div className="p-4">
      {deal.grade === 'A' && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 text-center">
          <Crown size={24} className="mx-auto text-amber-500 mb-2" />
          <h4 className="font-bold text-amber-800">Giant Pumpkin Client</h4>
          <p className="text-xs text-amber-600">Khách hàng giá trị cao, ít phàn nàn. Ưu tiên hàng đầu.</p>
        </div>
      )}
      {deal.grade === 'D' && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center">
          <AlertTriangle size={24} className="mx-auto text-red-500 mb-2" />
          <h4 className="font-bold text-red-800">"Weed" Client</h4>
          <p className="text-xs text-red-600 mb-3">Khách hàng giá trị thấp, đòi hỏi nhiều. Cân nhắc "sa thải".</p>
          <button className="w-full py-2 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-600">Suggest to Fire Client</button>
        </div>
      )}
    </div>

    {/* AI Receptionist */}
    <div className="p-4 border-t border-slate-100 flex-1 flex flex-col min-h-0">
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2"><Bot size={14} /> AI Receptionist Log</h4>
      <div className="flex-1 bg-slate-50 rounded-lg p-3 space-y-3 overflow-y-auto">
        {deal.messages.map((msg, i) => (
          <div key={i} className={`flex items-end gap-2 ${msg.sender === 'client' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[80%] p-2 rounded-lg text-xs ${msg.sender === 'client' ? 'bg-white border' : 'bg-blue-500 text-white'}`}>
              {msg.text}
            </div>
            {msg.channel === 'zalo' && <ZaloIcon />}
            {msg.channel === 'messenger' && <FacebookMessengerIcon />}
          </div>
        ))}
      </div>
      <button className="w-full mt-3 py-2 bg-slate-800 text-white text-sm font-bold rounded-lg hover:bg-slate-700">Take Over Conversation</button>
    </div>

    {/* Zalo Actions */}
    <div className="p-4 border-t border-slate-100">
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Actions</h4>
      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
          <Send size={14} /> Nhắc hẹn
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
          <DollarSign size={14} /> Yêu cầu TT
        </button>
      </div>
    </div>
  </div>
);