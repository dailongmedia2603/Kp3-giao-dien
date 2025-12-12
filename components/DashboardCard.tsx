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
        ? 'bg-[#E8F5E9] border border-[#A5D6A7] shadow-sm' 
        : 'bg-white border border-slate-200/80 shadow-sm hover:shadow-md'}
    `}>
      {/* Card Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className={`
          p-2.5 rounded-lg shrink-0
          ${isHighlighted ? 'bg-white border border-[#A5D6A7]' : 'bg-white border border-slate-100'}
        `}>
          <Icon 
            size={24} 
            className={isHighlighted || title.includes("Facebook") ? 'text-[#16A349]' : 'text-[#16A349]'} 
            strokeWidth={1.5}
            fill={title.includes("Facebook") ? '#16A349' : 'none'}
            color={title.includes("Facebook") ? 'white' : '#16A349'}
          />
        </div>
        <h3 className="text-[16px] font-bold text-slate-900 mt-1">{title}</h3>
      </div>

      {/* Description */}
      <p className="text-slate-500 text-[14px] leading-relaxed mb-8 flex-1">
        {description}
      </p>

      {/* Divider */}
      <div className={`h-px w-full mb-4 ${isHighlighted ? 'bg-[#A5D6A7]/60' : 'bg-slate-100'}`}></div>

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
          className="text-[13px] font-bold text-[#16A349] hover:text-[#149641] transition-colors"
        >
          {actionRight.text}
        </button>
      </div>
    </div>
  );
};