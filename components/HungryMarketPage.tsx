import React from 'react';
import { Target } from 'lucide-react';

export const HungryMarketPage: React.FC = () => {
  return (
    <div className="p-8 flex flex-col items-center justify-center h-full text-slate-400">
      <Target size={64} className="mb-4 opacity-20" />
      <h1 className="text-2xl font-bold text-slate-600">Hungry Market</h1>
      <p>This page is under construction.</p>
    </div>
  );
};