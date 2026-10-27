import React from 'react';

export const BrandHeader: React.FC = () => {
  return (
    <div className="brand-header">
      <div className="logo-wrapper">
        <img
          src="/pixtron_systems_logo.png"
          alt="Pixtron Systems Logo"
          className="company-logo"
        />
      </div>
      <p className="brand-tagline">
        Intelligent Vision &amp; Pharmaceutical Verification
      </p>
    </div>
  );
};
