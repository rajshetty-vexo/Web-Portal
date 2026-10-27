import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface OfficialBannerProps {
  portalUrl?: string;
}

export const OfficialBanner: React.FC<OfficialBannerProps> = ({
  portalUrl = 'https://pixtron.in',
}) => {
  return (
    <div className="official-url-banner">
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
        <ShieldCheck size={16} color="#003882" />
        <span>
          The official Pixtron Systems URL for displaying product information is{' '}
          <a href={portalUrl} target="_blank" rel="noopener noreferrer">
            {portalUrl}
          </a>
        </span>
      </div>
    </div>
  );
};
