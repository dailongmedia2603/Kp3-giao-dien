import React from 'react';
import { DashboardCardProps } from '../types';
import { ArrowRight } from 'lucide-react';

export const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, icon: Icon, variant, actionLeft, actionRight }) => {
  const isHighlighted = variant === 'highlighted';
  
  return (
    <div className={`
      ${isHighlighted ? 'bg-white' : 'bg-white'}
      p-6 rounded-xl border border-slate-200/80 shadow-sm flex flex-col h-full transition-all hover:shadow-md hover:-translate-y-1
    `}>
      <div className="flex items-start justify-between mb-4">
        <div className={`
          w-12 h-12 rounded-lg flex items-center justify-center
          ${isHighlighted ? 'bg-[#E8FCF3] text-[#0EB869]' : 'bg-slate-100 text-slate-600'}
        `}>
          <Icon size={24} strokeWidth={2} />
        </div>
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
      </div>
      <div className="mt-6 flex items-center gap-2">
        {actionLeft && (
          <button 
            onClick={actionLeft.onClick}
            className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            {actionLeft.text}
          </button>
        )}
        {actionRight && (
          <button 
            onClick={actionRight.onClick}
            className={`
              flex-1 text-sm font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all
              ${isHighlighted 
                ? 'bg-[#0EB869] text-white hover:bg-[#0B9655] shadow-sm' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}
            `}
          >
            {actionRight.text}
            {!isHighlighted && <ArrowRight size={14} />}
          </button>
        )}
      </div>
    </div>
  );
};