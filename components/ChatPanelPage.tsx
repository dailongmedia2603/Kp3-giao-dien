import React from 'react';
import { MessageSquare } from 'lucide-react';

export const ChatPanelPage: React.FC = () => {
  return (
    <div className="p-8 flex flex-col items-center justify-center h-full text-slate-400">
      <MessageSquare size={64} className="mb-4 opacity-20" />
      <h1 className="text-2xl font-bold text-slate-600">Chat Panel</h1>
      <p>This page is under construction.</p>
    </div>
  );
};