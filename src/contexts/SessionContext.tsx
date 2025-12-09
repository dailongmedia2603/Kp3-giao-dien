import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/src/integrations/supabase/client';

interface Profile {
  id: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
}

interface SessionContextValue {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
}

const SessionContext = createContext<SessionContextValue>({
  session: null,
  user: null,
  profile: null,
  loading: true,
});

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Perform a one-time check for the initial session on component mount.
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      // 2. IMPORTANT: Set loading to false immediately after the initial check is complete.
      // This ensures the loading screen always disappears.
      setLoading(false);

      // 3. Set up the listener for future auth events (login, logout, etc.).
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
        }
      );

      // Cleanup the subscription on component unmount.
      return () => {
        subscription.unsubscribe();
      };
    });
  }, []); // The empty dependency array ensures this effect runs only once.

  // 4. A separate effect to fetch the user profile whenever the user object changes.
  useEffect(() => {
    // Only fetch the profile if there is a user.
    if (user) {
      supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
        .then(({ data, error }) => {
          if (error && error.code !== 'PGRST116') {
            console.error('Error fetching profile:', error);
          } else {
            setProfile(data);
          }
        });
    } else {
      // If there is no user, ensure the profile is cleared.
      setProfile(null);
    }
  }, [user]); // This effect depends on the user object.

  const value = {
    session,
    user,
    profile,
    loading,
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};