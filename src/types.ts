import { LucideIcon } from 'lucide-react';

export interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  variant: 'default' | 'highlighted';
  actionLeft?: {
    text: string;
    onClick: () => void;
  };
  actionRight: {
    text: string;
    onClick: () => void;
  };
}

export interface SidebarItemProps {
  label: string;
  icon: LucideIcon;
  isActive?: boolean;
  badge?: string;
  onClick?: () => void;
  isCollapsed?: boolean;
}