import type { DrugProductData } from '../types/drug';

/**
 * Default backend API endpoint.
 * You can set this in your .env file as VITE_BACKEND_API_URL or change it here.
 * When your backend is running, this endpoint will be called.
 */
export const DEFAULT_API_ENDPOINT = import.meta.env.VITE_BACKEND_API_URL || '/api/drug-verify';

/**
 * Realistic demo data matching the exact 9 elements required for drug QR decoding.
 * Used for preview and development until your backend service is live.
 */
export const DEMO_DRUG_RECORDS: DrugProductData[] = [
  {
    // 1. Unique Product Identification Code
    uniqueProductIdentificationCode: 'SIN110003262300860',
    // 2. Proper & Generic Name of the Drug
    properAndGenericName: 'Telmisartan 80mg and Hydrochlorothiazide 12.5mg Tablets IP',
    // 3. Brand Name
    brandName: 'TELMA 80 H TABS 10X15\'S (ELITE)',
    // 4. Name & Address of Manufacturer
    manufacturerNameAndAddress: 'Pixtron Systems Lifesciences Ltd. – Samlik Marchak, Industrial Growth Centre, Near Ranipool, District: Gangtok, Sikkim: 737135',
    // 5. Batch Number
    batchNumber: '18240818',
    // 6. Date of Manufacturing
    dateOfManufacture: '05 November 2024',
    // 7. Date of Expiry
    dateOfExpiry: '31 October 2027',
    // 8. Manufacturing Licence Number
    manufacturingLicenseNumber: 'M/602/2012',
    // 9. Details of Excipients
    detailsOfExcipients: 'Microcrystalline Cellulose IP, Lactose Monohydrate IP, Povidone K-30, Magnesium Stearate IP, Red Oxide of Iron, Lake Sunset Yellow FCF',
    // Additional metadata
    scannedCode: 'LDMW4YB8',
    verificationStatus: 'VERIFIED',
    verifiedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    officialPortalUrl: 'https://pixtron.in',
    dosageForm: 'Film-Coated Tablets',
    packSize: '10 strips x 15 tablets',
    storageConditions: 'Store protected from moisture at a temperature not exceeding 30°C',
  },
  {
    // 1. Unique Product Identification Code
    uniqueProductIdentificationCode: 'GS1-8901037004128',
    // 2. Proper & Generic Name of the Drug
    properAndGenericName: 'Amoxicillin and Potassium Clavulanate Tablets IP 625mg',
    // 3. Brand Name
    brandName: 'PIX-CLAV 625 DUO (STRIP OF 10)',
    // 4. Name & Address of Manufacturer
    manufacturerNameAndAddress: 'Pixtron Systems BioPharma – Plot 18-A, Pharma Zone, Baddi, Solan, Himachal Pradesh: 173205',
    // 5. Batch Number
    batchNumber: 'AX240902',
    // 6. Date of Manufacturing
    dateOfManufacture: '12 September 2024',
    // 7. Date of Expiry
    dateOfExpiry: '31 August 2026',
    // 8. Manufacturing Licence Number
    manufacturingLicenseNumber: 'MNB/09/781',
    // 9. Details of Excipients
    detailsOfExcipients: 'Colloidal Silicon Dioxide IP, Sodium Starch Glycolate IP, Magnesium Stearate IP, Hypromellose, Titanium Dioxide IP, Purified Talc IP',
    // Additional metadata
    scannedCode: 'PX794KL2',
    verificationStatus: 'VERIFIED',
    verifiedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    officialPortalUrl: 'https://pixtron.in',
    dosageForm: 'Oral Solid Tablets',
    packSize: '1 strip x 10 tablets',
    storageConditions: 'Store in a dry place below 25°C. Protect from light.',
  },
  {
    // 1. Unique Product Identification Code
    uniqueProductIdentificationCode: 'SIN14008761209341',
    // 2. Proper & Generic Name of the Drug
    properAndGenericName: 'Metformin Hydrochloride Prolonged-Release Tablets IP 500mg',
    // 3. Brand Name
    brandName: 'GLYCO-PIX PR 500 (15 TABLETS)',
    // 4. Name & Address of Manufacturer
    manufacturerNameAndAddress: 'Pixtron Systems Healthtech – Unit III, GIDC Sanand, Ahmedabad, Gujarat: 382170',
    // 5. Batch Number
    batchNumber: 'MT241105',
    // 6. Date of Manufacturing
    dateOfManufacture: '01 January 2025',
    // 7. Date of Expiry
    dateOfExpiry: '31 December 2027',
    // 8. Manufacturing Licence Number
    manufacturingLicenseNumber: 'G/28/1429',
    // 9. Details of Excipients
    detailsOfExcipients: 'Hydroxypropyl Methylcellulose K100M, Sodium Carboxymethylcellulose, Polyvinylpyrrolidone K-90, Magnesium Stearate IP',
    // Additional metadata
    scannedCode: 'MF980ER1',
    verificationStatus: 'VERIFIED',
    verifiedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    officialPortalUrl: 'https://pixtron.in',
    dosageForm: 'Extended-Release Tablets',
    packSize: '2 strips x 15 tablets',
    storageConditions: 'Keep tightly closed. Store below 30°C.',
  }
];

export interface FetchResult {
  data: DrugProductData;
  source: 'backend' | 'demo';
  endpoint: string;
}

/**
 * Fetch drug product data from the backend API.
 * If the backend API endpoint is unreachable or returns an error,
 * this function automatically falls back to demo data so development and preview never break.
 *
 * @param scannedCode Optional code passed from QR scanner or URL
 * @param customEndpoint Optional custom API URL to override the default
 */
export async function fetchDrugProductData(
  scannedCode?: string,
  customEndpoint?: string
): Promise<FetchResult> {
  const endpoint = customEndpoint || DEFAULT_API_ENDPOINT;
  const targetCode = scannedCode || 'LDMW4YB8';

  // Construct URL with query parameters
  const url = endpoint.includes('?') 
    ? `${endpoint}&code=${encodeURIComponent(targetCode)}`
    : `${endpoint}?code=${encodeURIComponent(targetCode)}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const backendJson = await response.json();
      // Map response to our 9 key data structure if keys are slightly different
      const mappedData: DrugProductData = {
        uniqueProductIdentificationCode:
          backendJson.uniqueProductIdentificationCode ||
          backendJson.productCode ||
          backendJson.gtin ||
          backendJson.code ||
          'SIN110003262300860',
        properAndGenericName:
          backendJson.properAndGenericName ||
          backendJson.genericName ||
          backendJson.drugName ||
          'Telmisartan 80mg and Hydrochlorothiazide 12.5mg Tablets IP',
        brandName:
          backendJson.brandName ||
          backendJson.brand ||
          'TELMA 80 H TABS 10X15\'S (ELITE)',
        manufacturerNameAndAddress:
          backendJson.manufacturerNameAndAddress ||
          backendJson.manufacturer ||
          'Pixtron Systems Lifesciences Ltd. – Samlik Marchak, Industrial Growth Centre, Near Ranipool, District: Gangtok, Sikkim: 737135',
        batchNumber:
          backendJson.batchNumber ||
          backendJson.batch ||
          '18240818',
        dateOfManufacture:
          backendJson.dateOfManufacture ||
          backendJson.mfgDate ||
          '05 November 2024',
        dateOfExpiry:
          backendJson.dateOfExpiry ||
          backendJson.expDate ||
          '31 October 2027',
        manufacturingLicenseNumber:
          backendJson.manufacturingLicenseNumber ||
          backendJson.licenceNumber ||
          'M/602/2012',
        detailsOfExcipients:
          backendJson.detailsOfExcipients ||
          backendJson.excipients ||
          'Microcrystalline Cellulose IP, Lactose Monohydrate IP, Povidone K-30, Magnesium Stearate IP',
        scannedCode: backendJson.scannedCode || targetCode,
        verificationStatus: backendJson.verificationStatus || 'VERIFIED',
        verifiedAt: backendJson.verifiedAt || new Date().toLocaleDateString('en-GB'),
        officialPortalUrl: backendJson.officialPortalUrl || 'https://pixtron.in',
        dosageForm: backendJson.dosageForm,
        packSize: backendJson.packSize,
        storageConditions: backendJson.storageConditions,
      };

      return {
        data: mappedData,
        source: 'backend',
        endpoint: url,
      };
    }
  } catch {
    // Backend is either not running yet or endpoint returned an error.
    // Graceful fallback to demo dataset.
  }

  // Find matching demo record or default to first record
  const matchingRecord =
    DEMO_DRUG_RECORDS.find((rec) => rec.scannedCode.toLowerCase() === targetCode.toLowerCase()) ||
    DEMO_DRUG_RECORDS[0];

  return {
    data: {
      ...matchingRecord,
      scannedCode: targetCode,
    },
    source: 'demo',
    endpoint: url,
  };
}
