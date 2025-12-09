import React from 'react';
import { Construction } from 'lucide-react';

interface PlaceholderContentProps {
  title: string;
  description?: string;
}

export const PlaceholderContent: React.FC<PlaceholderContentProps> = ({ title, description }) => {
  return (
    <div className="p-8 flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
          {description && <p className="text-slate-500 mt-1">{description}</p>}
        </div>
      </div>
      <div className="flex-1 bg-white rounded-xl border border-slate-200/80 shadow-sm p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 mx-auto">
            <Construction size={32} className="text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800">Feature In Development</h3>
          <p className="text-slate-500 mt-2 max-w-sm">
            The content for the "{title}" page is currently being built. Please check back later!
          </p>
        </div>
      </div>
    </div>
  );
};