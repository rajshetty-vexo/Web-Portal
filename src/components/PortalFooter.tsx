import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const PortalFooter: React.FC = () => {
  return (
    <footer className="portal-footer">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
        <ShieldCheck size={14} color="#003882" />
        <span>Compliant with Central Drugs Standard Control Organisation (CDSCO) &amp; GS1 Barcode Guidelines</span>
      </div>
      <p style={{ color: 'var(--text-light)' }}>
        © {new Date().getFullYear()} Pixtron Systems Ltd. All pharmaceutical product verification data is cryptographically authenticated.
      </p>
      <div className="portal-footer-links">
        <a href="https://pixtron.in" target="_blank" rel="noopener noreferrer">Official Portal</a>
        <span>•</span>
        <a href="#privacy" onClick={(e) => e.preventDefault()}>Data Privacy</a>
        <span>•</span>
        <a href="#terms" onClick={(e) => e.preventDefault()}>Verification Terms</a>
      </div>
    </footer>
  );
};
