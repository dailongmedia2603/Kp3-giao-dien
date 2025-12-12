import { Auth } from '@supabase/auth-ui-react';
import { supabase } from '@/src/integrations/supabase/client';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8F9FB] p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <img src="/logo-full.png" alt="KP3 Logo" className="h-10 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-slate-800">
            Welcome Back
          </h2>
          <p className="text-slate-500 mt-2">Sign in to access your dashboard.</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200/80">
          <Auth
            supabaseClient={supabase}
            providers={[]}
            appearance={{
              className: {
                container: 'space-y-4',
                label: 'block text-sm font-bold text-slate-700',
                input: 'w-full p-3 mt-1 border border-slate-300 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0EB869]/20 focus:border-[#0EB869]',
                button: 'w-full py-3 mt-4 bg-[#0EB869] text-white text-sm font-bold rounded-lg hover:bg-[#0B9655] transition-colors shadow-sm',
                anchor: 'text-sm text-center block text-slate-600 hover:text-[#0EB869] hover:underline',
                divider: 'hidden',
                message: 'text-sm text-center text-red-500 mt-2',
              },
            }}
            theme="light"
            socialLayout="horizontal"
            showLinks={true}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;