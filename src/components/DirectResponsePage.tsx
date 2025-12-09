import React from 'react';
import { PlaceholderContent } from './PlaceholderContent';

export const DirectResponsePage: React.FC<{ onNavigate: (view: string) => void }> = () => {
  return <PlaceholderContent title="Direct Response Headline" description="Create powerful headlines to drive action." />;
};