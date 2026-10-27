import React from 'react';
import { MapPin, Info } from 'lucide-react';

export const LocationNotice: React.FC = () => {
  return (
    <div className="card-bottom-info">
      <div className="location-notice">
        <MapPin size={15} color="#64748b" />
        <span>Please enable location in your browser settings</span>
      </div>
      <div
        style={{
          marginTop: '6px',
          fontSize: '11.5px',
          color: 'var(--text-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
        }}
      >
        <Info size={12} />
        <span>Location verification ensures geo-fenced anti-counterfeit protection</span>
      </div>
    </div>
  );
};
