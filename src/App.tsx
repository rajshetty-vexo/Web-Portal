import React, { useState, useEffect, useCallback } from 'react';
import type { DrugProductData } from './types/drug';
import {
  fetchDrugProductData,
  DEFAULT_API_ENDPOINT,
  DEMO_DRUG_RECORDS,
} from './services/drugApi';
import { BrandHeader } from './components/BrandHeader';
import { ScannedCodeBar } from './components/ScannedCodeBar';
import { DrugDetailsList } from './components/DrugDetailsList';
import { LocationNotice } from './components/LocationNotice';

export const App: React.FC = () => {
  const [data, setData] = useState<DrugProductData>(DEMO_DRUG_RECORDS[0]);

  // Read URL query parameters if present (e.g., ?code=LDMW4YB8)
  const getQueryCode = useCallback(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('code') || undefined;
    }
    return undefined;
  }, []);

  const loadData = useCallback(async () => {
    const codeFromUrl = getQueryCode();
    try {
      const result = await fetchDrugProductData(codeFromUrl, DEFAULT_API_ENDPOINT);
      setData(result.data);
    } catch {
      setData(DEMO_DRUG_RECORDS[0]);
    }
  }, [getQueryCode]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="page-wrapper">
      <main className="app-container">
        {/* Verification Card with 9 Statutory Elements */}
        <div className="verification-card" role="region" aria-label="Drug Verification Information">
          {/* Pixtron Systems Company Logo Header */}
          <BrandHeader />

          {/* Scanned Code Bar */}
          <ScannedCodeBar
            code={data.scannedCode}
            status={data.verificationStatus}
          />

          {/* 9 Statutory Pharmaceutical Data Elements */}
          <DrugDetailsList data={data} />

          {/* Browser Location / Geo-Verification Notice */}
          <LocationNotice />
        </div>
      </main>
    </div>
  );
};

export default App;
