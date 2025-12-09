import React from 'react';
import { DashboardCardProps } from '../types';

export const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  variant, 
  actionLeft, 
  actionRight 
}) => {
  const isHighlighted = variant === 'highlighted';

  return (
    <div className={`
      flex flex-col h-full rounded-xl p-6 transition-all duration-200
      ${isHighlighted 
        ? 'bg-[#E8FCF3] border border-[#86EFAC] shadow-sm' 
        : 'bg-white border border-slate-200/80 shadow-sm hover:shadow-md'}
    `}>
      {/* Card Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className={`
          p-2.5 rounded-lg shrink-0
          ${isHighlighted ? 'bg-white border border-[#86EFAC]' : 'bg-white border border-slate-100'}
        `}>
          <Icon 
            size={24} 
            className={isHighlighted || title.includes("Facebook") ? 'text-[#0EB869]' : 'text-[#0EB869]'} 
            strokeWidth={1.5}
            fill={title.includes("Facebook") ? '#0EB869' : 'none'}
            color={title.includes("Facebook") ? 'white' : '#0EB869'}
          />
        </div>
        <h3 className="text-[16px] font-bold text-slate-900 mt-1">{title}</h3>
      </div>

      {/* Description */}
      <p className="text-slate-500 text-[14px] leading-relaxed mb-8 flex-1">
        {description}
      </p>

      {/* Divider */}
      <div className={`h-px w-full mb-4 ${isHighlighted ? 'bg-[#86EFAC]/60' : 'bg-slate-100'}`}></div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-auto">
        {actionLeft ? (
           <button 
             onClick={actionLeft.onClick}
             className="text-[13px] font-bold text-slate-900 hover:text-slate-700 transition-colors"
           >
             {actionLeft.text}
           </button>
        ) : (
          <div></div> 
        )}
        
        <button 
          onClick={actionRight.onClick}
          className="text-[13px] font-bold text-[#0EB869] hover:text-[#0B9655] transition-colors"
        >
          {actionRight.text}
        </button>
      </div>
    </div>
  );
};