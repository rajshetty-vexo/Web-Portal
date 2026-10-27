export interface DrugProductData {
  // 1. Unique Product Identification Code
  uniqueProductIdentificationCode: string;
  // 2. Proper and Generic Name of the Drug
  properAndGenericName: string;
  // 3. Brand Name
  brandName: string;
  // 4. Name and Address of the Manufacturer
  manufacturerNameAndAddress: string;
  // 5. Batch Number
  batchNumber: string;
  // 6. Date of Manufacture
  dateOfManufacture: string;
  // 7. Date of Expiry
  dateOfExpiry: string;
  // 8. Manufacturing License Number
  manufacturingLicenseNumber: string;
  // 9. Details of Excipients
  detailsOfExcipients: string;

  // Metadata & verification details
  scannedCode: string;
  verificationStatus: 'VERIFIED' | 'WARNING' | 'EXPIRED' | 'UNVERIFIED';
  verifiedAt: string;
  officialPortalUrl: string;
  dosageForm?: string;
  packSize?: string;
  storageConditions?: string;
}

export interface ApiFetchOptions {
  code?: string;
  customEndpoint?: string;
}
