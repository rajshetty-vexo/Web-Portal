import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface DataRowProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  isMono?: boolean;
  isPrimary?: boolean;
  badge?: string;
  allowCopy?: boolean;
  inline?: boolean;
}

export const DataRow: React.FC<DataRowProps> = ({
  label,
  value,
  icon,
  isMono = false,
  isPrimary = false,
  badge,
  allowCopy = false,
  inline = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`data-row ${inline ? 'data-row-inline' : ''}`}>
      <div className="data-row-header">
        <span className="data-key">
          {icon && <span className="data-key-icon">{icon}</span>}
          <span>{label}:</span>
        </span>

        {allowCopy && (
          <button
            type="button"
            className="copy-mini-btn"
            onClick={handleCopy}
            title={`Copy ${label}`}
            aria-label={`Copy ${label}`}
          >
            {copied ? <Check size={13} color="#059669" /> : <Copy size={13} />}
          </button>
        )}
      </div>

      <div
        className={`data-value ${isPrimary ? 'primary-highlight' : ''} ${
          isMono ? 'mono' : ''
        }`}
      >
        <span>{value}</span>
        {badge && <span className="value-badge active">{badge}</span>}
      </div>
    </div>
  );
};
