import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  LifeBuoy, 
  LayoutList, 
  Kanban, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  MoreHorizontal, 
  Search, 
  Filter, 
  MessageSquare, 
  User, 
  DollarSign, 
  ShoppingBag, 
  Zap, 
  Send, 
  Paperclip, 
  Smile, 
  ArrowLeft,
  Crown,
  ShieldAlert
} from 'lucide-react';

// --- Types ---
interface Message {
  id: string;
  sender: 'agent' | 'client';
  text: string;
  timestamp: string;
}

interface Ticket {
  id: string;
  clientName: string;
  clientRole: string;
  clientTier: 'VIP' | 'High LTV' | 'At Risk' | 'Standard';
  ltv: string;
  subject: string;
  status: 'new' | 'in-progress' | 'waiting' | 'resolved';
  slaDue: string; // e.g. "15 mins"
  slaStatus: 'ok' | 'warning' | 'critical';
  messages: Message[];
  funnelStage: string;
  lastPurchase: string;
}

// --- Mock Data ---
const MOCK_TICKETS: Ticket[] = [
  {
    id: 'T-1024',
    clientName: 'Alex Mercer',
    clientRole: 'CEO @ TechFlow',
    clientTier: 'VIP',
    ltv: '$24,500',
    subject: 'Urgent: Funnel tracking pixel not firing',
    status: 'new',
    slaDue: '14 mins',
    slaStatus: 'critical',
    funnelStage: 'Scaling (Phase 3)',
    lastPurchase: 'Consulting Package Q3',
    messages: [
      { id: 'm1', sender: 'client', text: 'Hey guys, we just launched the new campaign but the pixel isn\'t registering leads in the dashboard. We are spending $2k/day, need this fixed ASAP.', timestamp: '10:45 AM' }
    ]
  },
  {
    id: 'T-1025',
    clientName: 'Sarah Jenkins',
    clientRole: 'Founder',
    clientTier: 'High LTV',
    ltv: '$12,200',
    subject: 'Question about upgrading to "Done-For-You"',
    status: 'in-progress',
    slaDue: '45 mins',
    slaStatus: 'warning',
    funnelStage: 'Stabilize',
    lastPurchase: 'Course Access',
    messages: [
      { id: 'm1', sender: 'client', text: 'I\'m loving the course but honestly I don\'t have time to implement. Can we hop on a call to discuss the DFY option?', timestamp: '09:30 AM' },
      { id: 'm2', sender: 'agent', text: 'Hi Sarah! I can absolutely help with that. Our DFY spots are limited but let me check availability for you.', timestamp: '09:35 AM' }
    ]
  },
  {
    id: 'T-1026',
    clientName: 'Mike Ross',
    clientRole: 'Marketing Director',
    clientTier: 'At Risk',
    ltv: '$4,500',
    subject: 'Refund request - Module 4',
    status: 'new',
    slaDue: '2 hours',
    slaStatus: 'ok',
    funnelStage: 'Churn Risk',
    lastPurchase: 'Mastermind Ticket',
    messages: [
      { id: 'm1', sender: 'client', text: 'I\'m not seeing the value in Module 4. It feels outdated. I\'d like to request a partial refund.', timestamp: 'Yesterday' }
    ]
  }
];

export const SupportPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const activeTicket = MOCK_TICKETS.find(t => t.id === selectedTicketId);

  // --- Render Helpers ---

  const renderTierBadge = (tier: string) => {
    switch(tier) {
      case 'VIP':
        return <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700 border border-purple-200 uppercase tracking-wide"><Crown size={10} /> VIP Client</span>;
      case 'High LTV':
        return <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 uppercase tracking-wide"><DollarSign size={10} /> High LTV</span>;
      case 'At Risk':
        return <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 border border-red-200 uppercase tracking-wide"><ShieldAlert size={10} /> At Risk</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200 uppercase tracking-wide">Standard</span>;
    }
  };

  const renderSLA = (time: string, status: string) => {
    const colorClass = status === 'critical' ? 'text-red-600 bg-red-50 border-red-200 animate-pulse' : 
                       status === 'warning' ? 'text-amber-600 bg-amber-50 border-amber-200' : 
                       'text-slate-600 bg-slate-50 border-slate-200';
    return (
      <div className={`flex items-center gap-1.5 px-2 py-1 rounded border text-xs font-bold ${colorClass}`}>
        <Clock size={12} />
        {time} left
      </div>
    );
  };

  // --- Views ---

  const TriageListView = () => (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-300">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 font-bold text-slate-500 text-xs uppercase tracking-wider">Priority / SLA</th>
            <th className="px-6 py-4 font-bold text-slate-500 text-xs uppercase tracking-wider">Client Context</th>
            <th className="px-6 py-4 font-bold text-slate-500 text-xs uppercase tracking-wider">Subject</th>
            <th className="px-6 py-4 font-bold text-slate-500 text-xs uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 font-bold text-slate-500 text-xs uppercase tracking-wider text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {MOCK_TICKETS.map(ticket => (
            <tr 
              key={ticket.id} 
              onClick={() => setSelectedTicketId(ticket.id)}
              className="hover:bg-slate-50 cursor-pointer transition-colors group"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                {renderSLA(ticket.slaDue, ticket.slaStatus)}
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-slate-900">{ticket.clientName}</span>
                  <div className="flex gap-2">
                    {renderTierBadge(ticket.clientTier)}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="font-medium text-slate-800 mb-0.5">{ticket.subject}</div>
                <div className="text-xs text-slate-500 line-clamp-1">{ticket.messages[ticket.messages.length - 1].text}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`
                  px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide
                  ${ticket.status === 'new' ? 'bg-blue-100 text-blue-700' : 
                    ticket.status === 'in-progress' ? 'bg-amber-100 text-amber-700' :
                    ticket.status === 'waiting' ? 'bg-slate-100 text-slate-600' : 'bg-green-100 text-green-700'}
                `}>
                  {ticket.status.replace('-', ' ')}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-slate-400 hover:text-[#0EB869] opacity-0 group-hover:opacity-100 transition-all">
                  <ChevronRight size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const KanbanView = () => (
    <div className="flex gap-6 overflow-x-auto pb-4 h-full animate-in fade-in duration-300">
      {['new', 'in-progress', 'waiting', 'resolved'].map(status => (
        <div key={status} className="min-w-[320px] bg-slate-50 rounded-xl border border-slate-200 flex flex-col h-full">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white rounded-t-xl sticky top-0">
            <h3 className="font-bold text-slate-700 uppercase text-xs tracking-wider">{status.replace('-', ' ')}</h3>
            <span className="text-xs font-bold bg-slate-100 px-2 py-0.5 rounded-full text-slate-500">
              {MOCK_TICKETS.filter(t => t.status === status).length}
            </span>
          </div>
          <div className="p-3 space-y-3 flex-1 overflow-y-auto">
            {MOCK_TICKETS.filter(t => t.status === status).map(ticket => (
              <div 
                key={ticket.id} 
                onClick={() => setSelectedTicketId(ticket.id)}
                className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md hover:border-[#0EB869] cursor-pointer transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  {renderTierBadge(ticket.clientTier)}
                  {ticket.slaStatus === 'critical' && <AlertCircle size={14} className="text-red-500" />}
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-2 line-clamp-2">{ticket.subject}</h4>
                <div className="flex items-center justify-between text-xs text-slate-500 mt-3 pt-3 border-t border-slate-50">
                  <span className="font-medium text-slate-700">{ticket.clientName}</span>
                  <span className={`${ticket.slaStatus === 'critical' ? 'text-red-500 font-bold' : ''}`}>{ticket.slaDue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const TicketDetailView = () => {
    if (!activeTicket) return null;

    return (
      <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] gap-6 animate-in slide-in-from-right-4 duration-300">
        
        {/* LEFT: Communication Thread */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-4">
              <button onClick={() => setSelectedTicketId(null)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500">
                <ArrowLeft size={18} />
              </button>
              <div>
                <h2 className="font-bold text-slate-900 text-lg leading-tight line-clamp-1">{activeTicket.subject}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-500 font-mono">#{activeTicket.id}</span>
                  <span className="text-slate-300">•</span>
                  {renderSLA(activeTicket.slaDue, activeTicket.slaStatus)}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600 hover:bg-slate-50">Mark Resolved</button>
              <button className="px-3 py-1.5 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600 hover:bg-slate-50">Transfer</button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50 space-y-6">
            {activeTicket.messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${msg.sender === 'agent' ? 'order-1' : 'order-2'}`}>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm
                    ${msg.sender === 'agent' 
                      ? 'bg-[#0EB869] text-white rounded-tr-none' 
                      : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'}
                  `}>
                    {msg.text}
                  </div>
                  <div className={`text-[10px] text-slate-400 mt-1 ${msg.sender === 'agent' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions (Macros) */}
          <div className="px-4 py-2 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto">
            <MacroButton label="Tech Issue Ack" onClick={() => setReplyText("Hi there! I've escalated this to our dev team immediately. Will update you in 30 mins.")} />
            <MacroButton label="Booking Link" onClick={() => setReplyText("Here is the link to book your strategy call: cal.com/vip-support")} />
            <MacroButton label="Refund Policy" onClick={() => setReplyText("Our refund policy allows for... (snippet inserted)")} />
            <MacroButton label="Ask for Screenshot" onClick={() => setReplyText("Could you please send a screenshot of the error you're seeing?")} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-200">
            <div className="relative">
              <textarea 
                value={replyText}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReplyText(e.target.value)}
                placeholder="Type your reply... (Press Enter to send)"
                className="w-full p-4 pr-12 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EB869]/20 focus:border-[#0EB869] resize-none h-24 text-sm"
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <button className="text-slate-400 hover:text-slate-600"><Paperclip size={18} /></button>
                <button className="p-2 bg-[#0EB869] text-white rounded-lg hover:bg-[#0B9655] shadow-sm">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: The Dossier (Context) */}
        <div className="w-full lg:w-[350px] shrink-0 flex flex-col gap-6">
          
          {/* Client Profile Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center text-xl font-bold text-slate-500 border-2 border-white shadow-sm">
                {activeTicket.clientName.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">{activeTicket.clientName}</h3>
                <p className="text-xs text-slate-500">{activeTicket.clientRole}</p>
                <div className="mt-1">{renderTierBadge(activeTicket.clientTier)}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Lifetime Value</div>
                <div className="text-lg font-bold text-[#0EB869]">{activeTicket.ltv}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Status</div>
                <div className="text-sm font-bold text-slate-700">Active</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <ShoppingBag size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Last Purchase</div>
                  <div className="font-medium text-slate-900">{activeTicket.lastPurchase}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Zap size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Funnel Stage</div>
                  <div className="font-medium text-slate-900">{activeTicket.funnelStage}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats / Health */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ActivityIcon size={16} className="text-slate-400" /> Account Health
            </h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">Usage Rate</span>
                  <span className="font-bold text-slate-700">85%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full">
                  <div className="bg-[#0EB869] h-1.5 rounded-full w-[85%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">NPS Score</span>
                  <span className="font-bold text-slate-700">9/10</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full">
                  <div className="bg-[#0EB869] h-1.5 rounded-full w-[90%]"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto font-sans h-full flex flex-col">
      
      {/* Header */}
      {!selectedTicketId && (
        <div className="flex flex-col items-center mb-8 text-center shrink-0">
          <div className="flex items-center gap-2 mb-6 text-[13px] text-slate-500">
            <Home size={16} className="text-slate-400" />
            <ChevronRight size={14} className="text-slate-300" />
            <span className="bg-[#E8FCF3] text-[#0EB869] px-3 py-1 rounded text-xs font-bold">
              Client Success
            </span>
          </div>

          <h1 className="text-[26px] font-bold text-slate-900 mb-3 tracking-tight">
            Retention Command Center
          </h1>
          
          <p className="text-slate-500 text-[13px] leading-relaxed mb-8 max-w-2xl mx-auto">
            Prioritize high-value clients. Resolve issues instantly. Protect recurring revenue.
          </p>

          {/* View Toggle */}
          <div className="bg-white border border-slate-200 rounded-lg p-1 flex shadow-sm mb-4">
            <button 
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded text-xs font-bold flex items-center gap-2 transition-all ${viewMode === 'list' ? 'bg-slate-900 text-white shadow' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <LayoutList size={14} /> Triage List
            </button>
            <button 
              onClick={() => setViewMode('kanban')}
              className={`px-4 py-2 rounded text-xs font-bold flex items-center gap-2 transition-all ${viewMode === 'kanban' ? 'bg-slate-900 text-white shadow' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Kanban size={14} /> Kanban Board
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 min-h-0">
        {selectedTicketId ? (
          <TicketDetailView />
        ) : (
          viewMode === 'list' ? <TriageListView /> : <KanbanView />
        )}
      </div>

    </div>
  );
};

// --- Small Helpers ---
const MacroButton = ({ label, onClick }: { label: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="px-3 py-1.5 bg-slate-50 border border-slate-200 hover:border-[#0EB869] hover:text-[#0EB869] rounded-lg text-xs font-medium transition-colors whitespace-nowrap"
  >
    {label}
  </button>
);

const ActivityIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
);