import React from 'react';
import {
  Server,
  Sun,
  Moon,
  Printer,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

interface TopActionBarProps {
  source: 'backend' | 'demo';
  endpoint: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenApiModal: () => void;
  onSelectSample: (index: number) => void;
  onRefresh: () => void;
  isLoading: boolean;
  selectedSampleIndex: number;
}

export const TopActionBar: React.FC<TopActionBarProps> = ({
  source,
  endpoint,
  theme,
  onToggleTheme,
  onOpenApiModal,
  onSelectSample,
  onRefresh,
  isLoading,
  selectedSampleIndex,
}) => {
  return (
    <header className="top-action-bar">
      <div className="top-bar-left">
        <button
          type="button"
          className={`pill-badge ${source === 'backend' ? 'live' : 'demo'}`}
          onClick={onOpenApiModal}
          title="Click to configure backend API endpoint"
          style={{ cursor: 'pointer', border: 'none' }}
        >
          <span className="pulsing-dot" />
          <span>
            {source === 'backend'
              ? 'Connected to Backend'
              : `Demo Mode (Backend: ${endpoint.split('?')[0]})`}
          </span>
        </button>
      </div>

      <div className="top-bar-right">
        {/* Sample selector for previewing different QR records */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Sparkles size={14} color="var(--text-muted)" />
          <select
            className="icon-btn"
            style={{ padding: '6px 10px', fontSize: '12px' }}
            value={selectedSampleIndex}
            onChange={(e) => onSelectSample(Number(e.target.value))}
            title="Switch demo drug record"
          >
            <option value={0}>Sample 1: Telmisartan (Original)</option>
            <option value={1}>Sample 2: Amoxicillin-Clav</option>
            <option value={2}>Sample 3: Metformin PR</option>
          </select>
        </div>

        {/* Reload button */}
        <button
          type="button"
          className="icon-btn"
          onClick={onRefresh}
          title="Refresh Data"
          disabled={isLoading}
        >
          <RefreshCw size={14} className={isLoading ? 'spin' : ''} />
        </button>

        {/* Configure API endpoint */}
        <button
          type="button"
          className="icon-btn"
          onClick={onOpenApiModal}
          title="Backend API Configuration"
        >
          <Server size={14} />
          <span style={{ display: 'none' }}>API</span>
        </button>

        {/* Print verification slip */}
        <button
          type="button"
          className="icon-btn"
          onClick={() => window.print()}
          title="Print Verification Certificate"
        >
          <Printer size={14} />
        </button>

        {/* Light / Dark Mode Toggle */}
        <button
          type="button"
          className="icon-btn"
          onClick={onToggleTheme}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
        </button>
      </div>
    </header>
  );
};
