import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/src/integrations/supabase/client';

const LoginPage = () => {
  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      {/* Left Column - Branding */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-slate-100 p-12 border-r border-slate-200">
        <div className="max-w-md text-center">
          <img src="/logo-full.png" alt="KP3 Logo" className="h-12 mx-auto mb-8" />
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            The OS for Agency Profits
          </h1>
          <p className="mt-4 text-slate-500">
            Automate delivery, manage clients, and scale your business with confidence. All in one place.
          </p>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="flex items-center justify-center min-h-screen bg-[#F8F9FB] p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:hidden">
            <img src="/logo-full.png" alt="KP3 Logo" className="h-10 mx-auto mb-6" />
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
              Sign In
            </h2>
            <p className="text-slate-500 mt-2">Enter your credentials to access your dashboard.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200/80">
            <Auth
              supabaseClient={supabase}
              providers={[]}
              appearance={{
                theme: ThemeSupa,
                className: {
                  container: 'space-y-4',
                  label: 'block text-sm font-bold text-slate-700',
                  input: 'w-full p-3 mt-1 border border-slate-300 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#16A349]/20 focus:border-[#16A349]',
                  button: 'w-full py-3 mt-4 bg-[#16A349] text-white text-sm font-bold rounded-lg hover:bg-[#149641] transition-colors shadow-sm',
                  anchor: 'text-sm text-center block text-slate-600 hover:text-[#16A349] hover:underline',
                  divider: 'hidden',
                  message: 'text-sm text-center text-red-500 mt-2',
                },
              }}
              socialLayout="horizontal"
              showLinks={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;