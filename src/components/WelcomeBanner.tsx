import React from 'react';

export const WelcomeBanner: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200 mb-8">
      <h2 className="text-2xl font-bold text-slate-900">Welcome Back!</h2>
      <p className="text-slate-500 mt-1">Here's a quick overview of your dashboard.</p>
    </div>
  );
};