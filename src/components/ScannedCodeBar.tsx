import React, { useState } from 'react';
import { Copy, Check, CheckCircle2 } from 'lucide-react';

interface ScannedCodeBarProps {
  code: string;
  status?: 'VERIFIED' | 'WARNING' | 'EXPIRED' | 'UNVERIFIED';
}

export const ScannedCodeBar: React.FC<ScannedCodeBarProps> = ({
  code,
  status = 'VERIFIED',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="scanned-code-bar">
      <div className="scanned-code-left">
        <span className="scanned-code-label">ScannedCode:</span>
        <span className="scanned-code-value">{code}</span>
        <button
          type="button"
          className="copy-mini-btn"
          onClick={handleCopyCode}
          title="Copy scanned code"
          aria-label="Copy scanned code"
        >
          {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
        </button>
      </div>

      <div className="auth-badge">
        <CheckCircle2 size={14} />
        <span>{status === 'VERIFIED' ? 'Verified Authentic' : status}</span>
      </div>
    </div>
  );
};
