import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../integrations/supabase/client';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-sm mx-auto">
        <div className="text-center mb-8">
          <span className="text-3xl font-[900] tracking-tighter text-slate-900">
            GETTIME.<span className="text-[#0EB869]">MONEY</span>
          </span>
          <p className="text-slate-500 mt-2 text-[15px]">
            Chào mừng trở lại! Vui lòng đăng nhập để tiếp tục.
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#0EB869',
                    brandAccent: '#0B9655',
                  },
                  fonts: {
                    bodyFontFamily: 'Inter, sans-serif',
                    buttonFontFamily: 'Inter, sans-serif',
                    labelFontFamily: 'Inter, sans-serif',
                  }
                },
              },
            }}
            providers={[]}
            theme="light"
          />
        </div>
        <div className="text-center mt-6 text-xs text-slate-400">
          Copyright © KP3 2025. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;