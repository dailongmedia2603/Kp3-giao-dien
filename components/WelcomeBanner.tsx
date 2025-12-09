import React from 'react';

export const WelcomeBanner: React.FC = () => {
  return (
    <div className="bg-[#F2F4F7] rounded-xl p-8 mb-8 border border-slate-200/60 shadow-sm">
      <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
        Welcome Mike Sherry <span className="animate-wave origin-[70%_70%]">👋</span>
      </h1>
      <p className="text-slate-500 text-[16px]">
        Let's get started with something awesome.
      </p>
    </div>
  );
};
