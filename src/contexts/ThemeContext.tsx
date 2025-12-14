import { createContext, useContext, useState, useMemo, useEffect, ReactNode } from 'react';
import { supabase } from '@/src/integrations/supabase/client';
import { useSession } from './SessionContext';

// Định nghĩa cấu trúc của theme
interface Theme {
  fontSizes: {
    sidebarCategory: string;
    sidebarItem: string;
    pageTitle: string;
    pageDescription: string;
    cardTitle: string;
    body: string;
    label: string;
  };
  colors: {
    primary: string;
    textPrimary: string;
    textSecondary: string;
    background: string;
    cardBackground: string;
  };
}

// Các giá trị mặc định
const defaultTheme: Theme = {
  fontSizes: {
    sidebarCategory: '13px',
    sidebarItem: '13px',
    pageTitle: '26px',
    pageDescription: '13px',
    cardTitle: '16px',
    body: '14px',
    label: '12px',
  },
  colors: {
    primary: '#16A349',
    textPrimary: '#1e293b', // slate-800
    textSecondary: '#64748b', // slate-500
    background: '#F8F9FB',
    cardBackground: '#FFFFFF',
  },
};

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  setTheme: () => {},
});

// Component Provider để bao bọc ứng dụng
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useSession();
  const THEME_STORAGE_KEY = 'kp3-dashboard-theme';

  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      if (typeof window !== 'undefined') {
        const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme) {
          return JSON.parse(savedTheme);
        }
      }
    } catch (error) {
      console.error("Could not load theme from localStorage", error);
    }
    return defaultTheme;
  });

  // Effect to fetch theme from Supabase when user logs in
  useEffect(() => {
    if (user) {
      const fetchTheme = async () => {
        const { data, error } = await supabase
          .from('user_settings')
          .select('theme')
          .eq('user_id', user.id)
          .single();

        if (data?.theme) {
          // Compare with local storage to see if an update is needed
          const localTheme = JSON.stringify(theme);
          const remoteTheme = JSON.stringify(data.theme);
          if (localTheme !== remoteTheme) {
            setThemeState(data.theme as Theme);
            localStorage.setItem(THEME_STORAGE_KEY, remoteTheme);
          }
        } else if (error && error.code !== 'PGRST116') {
          console.error("Error fetching theme from Supabase:", error);
        }
      };
      fetchTheme();
    }
  }, [user]);

  const setTheme = async (newTheme: Theme) => {
    // 1. Update state immediately for responsiveness
    setThemeState(newTheme);

    // 2. Save to localStorage for fast reloads
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(newTheme));
      }
    } catch (error) {
      console.error("Could not save theme to localStorage", error);
    }

    // 3. Save to Supabase for cross-device sync
    if (user) {
      const { error } = await supabase
        .from('user_settings')
        .upsert({ user_id: user.id, theme: newTheme }, { onConflict: 'user_id' });
      
      if (error) {
        console.error("Could not save theme to Supabase", error);
      }
    }
  };

  const themeStyle = useMemo(() => {
    return `
      :root {
        --font-size-sidebar-category: ${theme.fontSizes.sidebarCategory};
        --font-size-sidebar-item: ${theme.fontSizes.sidebarItem};
        --font-size-page-title: ${theme.fontSizes.pageTitle};
        --font-size-page-description: ${theme.fontSizes.pageDescription};
        --font-size-card-title: ${theme.fontSizes.cardTitle};
        --font-size-body: ${theme.fontSizes.body};
        --font-size-label: ${theme.fontSizes.label};

        --color-primary: ${theme.colors.primary};
        --color-text-primary: ${theme.colors.textPrimary};
        --color-text-secondary: ${theme.colors.textSecondary};
        --color-background: ${theme.colors.background};
        --color-card-background: ${theme.colors.cardBackground};
      }
    `;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <style>{themeStyle}</style>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook để sử dụng theme
export const useTheme = () => useContext(ThemeContext);