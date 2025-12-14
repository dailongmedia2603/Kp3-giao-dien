import React, { useState } from 'react';
import { useTheme } from '@/src/contexts/ThemeContext';
import { Save, RotateCcw } from 'lucide-react';

const DesignSettingsTab: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [localTheme, setLocalTheme] = useState(theme);

  const handleFontChange = (field: keyof typeof theme.fontSizes, value: string) => {
    setLocalTheme(prev => ({
      ...prev,
      fontSizes: { ...prev.fontSizes, [field]: `${value}px` },
    }));
  };

  const handleColorChange = (field: keyof typeof theme.colors, value: string) => {
    setLocalTheme(prev => ({
      ...prev,
      colors: { ...prev.colors, [field]: value },
    }));
  };

  const handleSave = () => {
    setTheme(localTheme);
    // Optional: Add a toast notification for success
  };

  const handleReset = () => {
    // In a real app, you'd have default values stored somewhere
    const defaultTheme = {
      fontSizes: { sidebarCategory: '13px', sidebarItem: '13px', pageTitle: '26px', pageDescription: '13px', cardTitle: '16px', body: '14px', label: '12px' },
      colors: { primary: '#16A349', textPrimary: '#1e293b', textSecondary: '#64748b', background: '#F8F9FB', cardBackground: '#FFFFFF' },
    };
    setLocalTheme(defaultTheme);
    setTheme(defaultTheme);
  };

  const renderFontInput = (label: string, field: keyof typeof theme.fontSizes) => (
    <div className="flex items-center justify-between py-3 border-b border-slate-100">
      <label className="text-sm text-slate-600">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={parseInt(localTheme.fontSizes[field])}
          onChange={(e) => handleFontChange(field, e.target.value)}
          className="w-20 p-1 border border-slate-300 rounded-md text-sm text-right"
        />
        <span className="text-sm text-slate-500">px</span>
      </div>
    </div>
  );

  const renderColorInput = (label: string, field: keyof typeof theme.colors) => (
    <div className="flex items-center justify-between py-3 border-b border-slate-100">
      <label className="text-sm text-slate-600">{label}</label>
      <input
        type="color"
        value={localTheme.colors[field]}
        onChange={(e) => handleColorChange(field, e.target.value)}
        className="w-10 h-10 p-1 border border-slate-300 rounded-md"
      />
    </div>
  );

  return (
    <div className="animate-in fade-in duration-300">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
        <h2 className="text-lg font-bold text-slate-900 mb-6">Design & Branding</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Typography Section */}
          <div>
            <h3 className="font-bold text-slate-800 mb-4">Typography</h3>
            <div className="space-y-2">
              {renderFontInput("Sidebar Category Title", 'sidebarCategory')}
              {renderFontInput("Sidebar Item", 'sidebarItem')}
              {renderFontInput("Page Title", 'pageTitle')}
              {renderFontInput("Page Description", 'pageDescription')}
              {renderFontInput("Card Title", 'cardTitle')}
              {renderFontInput("Body Text", 'body')}
              {renderFontInput("Labels / Badges", 'label')}
            </div>
          </div>

          {/* Colors Section */}
          <div>
            <h3 className="font-bold text-slate-800 mb-4">Colors</h3>
            <div className="space-y-2">
              {renderColorInput("Primary / Accent", 'primary')}
              {renderColorInput("Primary Text", 'textPrimary')}
              {renderColorInput("Secondary Text", 'textSecondary')}
              {renderColorInput("Page Background", 'background')}
              {renderColorInput("Card Background", 'cardBackground')}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-slate-100 mt-8 gap-3">
          <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-[13px] font-bold hover:bg-slate-50 transition-colors">
            <RotateCcw size={16} />
            Reset to Default
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[#16A349] text-white text-[13px] font-bold hover:bg-[#149641] transition-colors shadow-sm">
            <Save size={16} />
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesignSettingsTab;