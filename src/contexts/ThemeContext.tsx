import { createContext, useContext, useState, useMemo, ReactNode } from 'react';

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
  const [theme, setTheme] = useState<Theme>(defaultTheme);

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