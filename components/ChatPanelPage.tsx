import React, { useState, useRef, useEffect } from 'react';
import { 
  Home, 
  ChevronRight, 
  MessageSquare, 
  Search, 
  Filter, 
  User, 
  Send, 
  Paperclip, 
  Smile, 
  ChevronDown,
  MoreHorizontal,
  Inbox,
  Star
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

// --- MOCK DATA ---
const MOCK_CONVERSATIONS = [
  { id: 1, name: 'Nguyễn Thị Lan', lastMessage: 'Cảm ơn bạn, mình đã nhận được báo giá rồi.', timestamp: '2m ago', unread: true, channel: 'zalo' },
  { id: 2, name: 'Trần Văn Hùng', lastMessage: 'Ok, I will be there for the 2PM appointment.', timestamp: '1h ago', unread: false, channel: 'messenger' },
  { id: 3, name: 'Lê Minh Anh', lastMessage: 'Liệu trình này có tác dụng phụ không ạ?', timestamp: '3h ago', unread: true, channel: 'zalo' },
  { id: 4, name: 'Phạm Hoàng Yến', lastMessage: 'You: Please confirm your email address.', timestamp: 'Yesterday', unread: false, channel: 'messenger' },
];

const MOCK_MESSAGES = {
  1: [
    { sender: 'user', text: 'Xin chào, mình muốn hỏi về liệu trình triệt lông.', channel: 'zalo', time: '10:30 AM' },
    { sender: 'agent', text: 'Chào bạn, cảm ơn đã quan tâm. Mình gửi bạn báo giá chi tiết nhé.', channel: 'zalo', time: '10:31 AM' },
    { sender: 'user', text: 'Cảm ơn bạn, mình đã nhận được báo giá rồi.', channel: 'zalo', time: '10:35 AM' },
  ],
  2: [
    { sender: 'agent', text: 'Hi there! Just a reminder about your appointment tomorrow at 2PM.', channel: 'messenger', time: '9:00 AM' },
    { sender: 'user', text: 'Ok, I will be there for the 2PM appointment.', channel: 'messenger', time: '9:05 AM' },
  ],
  3: [
    { sender: 'user', text: 'Liệu trình này có tác dụng phụ không ạ?', channel: 'zalo', time: '7:15 AM' },
  ],
  4: [],
};

const QUICK_REPLIES = [
  "Gửi báo giá", "Xin lịch hẹn", "Cảm ơn & hẹn gặp lại", "Chính sách hoàn tiền"
];

// --- Main Component ---
export const ChatPanelPage: React.FC = () => {
  const [activeConversationId, setActiveConversationId] = useState<number | null>(1);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [status, setStatus] = useState<'available' | 'away'>('available');

  const filteredConversations = MOCK_CONVERSATIONS.filter(c => filter === 'all' || c.unread);
  const activeConversation = MOCK_CONVERSATIONS.find(c => c.id === activeConversationId);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex h-[calc(100vh-100px)] animate-in fade-in duration-300">
      {/* Sidebar: Conversation List */}
      <div className="w-[320px] border-r border-slate-100 flex flex-col shrink-0">
        <ConversationListHeader status={status} onStatusChange={setStatus} filter={filter} onFilterChange={setFilter} />
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map(convo => (
            <ConversationListItem 
              key={convo.id}
              conversation={convo}
              isActive={convo.id === activeConversationId}
              onClick={() => setActiveConversationId(convo.id)}
            />
          ))}
        </div>
      </div>

      {/* Main: Chat Window */}
      <div className="flex-1 flex flex-col">
        {activeConversation ? (
          <ChatWindow conversation={activeConversation} messages={MOCK_MESSAGES[activeConversation.id as keyof typeof MOCK_MESSAGES]} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <Inbox size={48} className="mb-4 opacity-20" />
            <p className="font-medium">Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Sub-Components ---

const ConversationListHeader: React.FC<{ status: string, onStatusChange: (s: any) => void, filter: string, onFilterChange: (f: any) => void }> = ({ status, onStatusChange, filter, onFilterChange }) => (
  <div className="p-4 border-b border-slate-100 bg-slate-50/50">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <div className={`w-2.5 h-2.5 rounded-full ${status === 'available' ? 'bg-green-500' : 'bg-slate-400'}`}></div>
        <select 
          value={status} 
          onChange={(e) => onStatusChange(e.target.value)}
          className="text-sm font-bold bg-transparent focus:outline-none"
        >
          <option value="available">Available</option>
          <option value="away">Away</option>
        </select>
      </div>
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" placeholder="Search..." className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:border-[#0EB869]" />
      </div>
    </div>
    <div className="flex gap-1 bg-slate-100 p-1 rounded-md">
      <button onClick={() => onFilterChange('all')} className={`flex-1 text-xs font-bold py-1 rounded ${filter === 'all' ? 'bg-white shadow-sm' : 'text-slate-500'}`}>All</button>
      <button onClick={() => onFilterChange('unread')} className={`flex-1 text-xs font-bold py-1 rounded ${filter === 'unread' ? 'bg-white shadow-sm' : 'text-slate-500'}`}>Unread</button>
    </div>
  </div>
);

const ConversationListItem: React.FC<{ conversation: any, isActive: boolean, onClick: () => void }> = ({ conversation, isActive, onClick }) => (
  <div onClick={onClick} className={`p-4 border-b border-slate-100 cursor-pointer flex gap-3 transition-colors ${isActive ? 'bg-blue-50' : 'hover:bg-slate-50'}`}>
    {conversation.unread && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>}
    <div className={`flex-1 ${conversation.unread ? '' : 'ml-4'}`}>
      <div className="flex justify-between items-start">
        <span className="font-bold text-sm text-slate-800">{conversation.name}</span>
        <span className="text-xs text-slate-400">{conversation.timestamp}</span>
      </div>
      <p className="text-xs text-slate-500 truncate">{conversation.lastMessage}</p>
    </div>
  </div>
);

const ChatWindow: React.FC<{ conversation: any, messages: any[] }> = ({ conversation, messages }) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div>
          <h3 className="font-bold text-slate-900">{conversation.name}</h3>
          <p className="text-xs text-slate-500">Online</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-slate-200 rounded-full text-slate-500"><Star size={16} /></button>
          <button className="p-2 hover:bg-slate-200 rounded-full text-slate-500"><MoreHorizontal size={16} /></button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => <MessageBubble key={i} message={msg} />)}
        <div ref={messagesEndRef} />
      </div>
      <MessageComposer />
    </>
  );
};

const MessageBubble: React.FC<{ message: any }> = ({ message }) => (
  <div className={`flex items-end gap-2 ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
    {message.sender === 'user' && <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-sm shrink-0">N</div>}
    <div className={`max-w-[70%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm
      ${message.sender === 'agent' 
        ? 'bg-[#0EB869] text-white rounded-br-none' 
        : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none'}
    `}>
      {message.text}
    </div>
    {message.channel === 'zalo' && <ZaloIcon className="shrink-0 mb-1" />}
    {message.channel === 'messenger' && <FacebookMessengerIcon className="shrink-0 mb-1" />}
  </div>
);

const MessageComposer: React.FC = () => {
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  return (
    <div className="p-4 border-t border-slate-100 bg-white">
      <div className="relative">
        <textarea 
          placeholder="Type your message..."
          className="w-full p-4 pr-12 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EB869]/20 focus:border-[#0EB869] resize-none h-24 text-sm"
        />
        <div className="absolute bottom-3 left-3 flex items-center gap-1">
          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full"><Smile size={18} /></button>
          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full"><Paperclip size={18} /></button>
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <div className="relative">
            <button onClick={() => setShowQuickReplies(!showQuickReplies)} className="text-xs font-bold text-slate-500 hover:underline">Quick Reply</button>
            {showQuickReplies && (
              <div className="absolute bottom-full right-0 mb-2 w-48 bg-white border rounded-lg shadow-lg p-2 space-y-1">
                {QUICK_REPLIES.map(reply => <button key={reply} className="w-full text-left text-xs p-2 hover:bg-slate-100 rounded">{reply}</button>)}
              </div>
            )}
          </div>
          <div className="flex items-center bg-slate-800 rounded-lg">
            <button className="px-4 py-2 text-white text-sm font-bold flex items-center gap-2">
              <Send size={16} /> Send
            </button>
            <div className="h-6 w-px bg-slate-600"></div>
            <select className="bg-transparent text-white text-xs font-bold p-2 focus:outline-none appearance-none">
              <option>via Zalo</option>
              <option>via SMS</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};