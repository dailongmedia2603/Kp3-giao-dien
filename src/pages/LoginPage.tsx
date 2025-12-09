import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8">
        <div>
          <h1 
            className="text-center text-4xl font-[800] tracking-tighter text-[#0EB869]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            GETTIME.MONEY
          </h1>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={[]}
            theme="light"
            socialLayout="horizontal"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;