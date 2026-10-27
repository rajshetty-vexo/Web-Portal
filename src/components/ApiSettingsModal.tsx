import React, { useState } from 'react';
import { X, Server, CheckCircle2, AlertTriangle, RefreshCw, Code2 } from 'lucide-react';

interface ApiSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentEndpoint: string;
  onSaveEndpoint: (newEndpoint: string) => void;
  onResetDefault: () => void;
}

export const ApiSettingsModal: React.FC<ApiSettingsModalProps> = ({
  isOpen,
  onClose,
  currentEndpoint,
  onSaveEndpoint,
  onResetDefault,
}) => {
  const [endpointInput, setEndpointInput] = useState(currentEndpoint);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'failed'>('idle');
  const [testMessage, setTestMessage] = useState('');

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setTestStatus('testing');
    setTestMessage('Pinging endpoint...');
    try {
      const target = endpointInput.includes('?')
        ? `${endpointInput}&code=TEST123`
        : `${endpointInput}?code=TEST123`;

      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 3500);
      const res = await fetch(target, { method: 'GET', signal: controller.signal });
      clearTimeout(id);

      if (res.ok) {
        setTestStatus('success');
        setTestMessage(`Connected successfully! HTTP ${res.status} ${res.statusText}`);
      } else {
        setTestStatus('failed');
        setTestMessage(`Endpoint replied with error HTTP ${res.status} ${res.statusText}`);
      }
    } catch (err: unknown) {
      setTestStatus('failed');
      const errorMsg = err instanceof Error ? err.message : 'Connection failed';
      setTestMessage(`Could not connect: ${errorMsg}. (Using demo fallback in development)`);
    }
  };

  const handleSave = () => {
    onSaveEndpoint(endpointInput);
    onClose();
  };

  const examplePayload = `{
  "uniqueProductIdentificationCode": "SIN110003262300860",
  "properAndGenericName": "Telmisartan 80mg Tablets IP",
  "brandName": "TELMA 80 H",
  "manufacturerNameAndAddress": "Pixtron Systems Lifesciences Ltd. Gangtok, Sikkim",
  "batchNumber": "18240818",
  "dateOfManufacture": "05 November 2024",
  "dateOfExpiry": "31 October 2027",
  "manufacturingLicenseNumber": "M/602/2012",
  "detailsOfExcipients": "Microcrystalline Cellulose IP, Lactose Monohydrate",
  "scannedCode": "LDMW4YB8",
  "verificationStatus": "VERIFIED"
}`;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <Server size={18} color="#003882" />
            <span>Backend API Configuration</span>
          </div>
          <button
            type="button"
            className="copy-mini-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Configure the backend API URL from which QR decode data is loaded. If the backend is offline, the portal automatically falls back to sample drug data.
          </p>

          <div className="input-group">
            <label className="input-label" htmlFor="api-endpoint-input">
              Backend Endpoint URL:
            </label>
            <input
              id="api-endpoint-input"
              type="text"
              className="text-input"
              value={endpointInput}
              onChange={(e) => setEndpointInput(e.target.value)}
              placeholder="/api/drug-verify or http://localhost:5000/api/drug-verify"
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              type="button"
              className="icon-btn"
              onClick={handleTestConnection}
              disabled={testStatus === 'testing'}
            >
              <RefreshCw size={13} className={testStatus === 'testing' ? 'spin' : ''} />
              <span>{testStatus === 'testing' ? 'Testing...' : 'Test Connection'}</span>
            </button>
            <button
              type="button"
              className="icon-btn"
              onClick={() => {
                onResetDefault();
                setEndpointInput('/api/drug-verify');
              }}
            >
              Reset to Default
            </button>
          </div>

          {testStatus !== 'idle' && (
            <div
              style={{
                fontSize: '12.5px',
                padding: '8px 12px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor:
                  testStatus === 'success'
                    ? '#ecfdf5'
                    : testStatus === 'testing'
                    ? '#eff6ff'
                    : '#fffbeb',
                color:
                  testStatus === 'success'
                    ? '#065f46'
                    : testStatus === 'testing'
                    ? '#1e40af'
                    : '#92400e',
                border: `1px solid ${
                  testStatus === 'success' ? '#a7f3d0' : '#fed7aa'
                }`,
              }}
            >
              {testStatus === 'success' ? (
                <CheckCircle2 size={16} />
              ) : (
                <AlertTriangle size={16} />
              )}
              <span>{testMessage}</span>
            </div>
          )}

          <div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <Code2 size={14} />
              <span>Backend Response JSON Structure (9 Key Elements):</span>
            </div>
            <pre className="code-snippet">{examplePayload}</pre>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="icon-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn-primary" onClick={handleSave}>
            Apply Endpoint
          </button>
        </div>
      </div>
    </div>
  );
};
