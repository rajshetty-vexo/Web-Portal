# Pixtron Systems - Drug QR Code Verification Portal

A modern, responsive React + TypeScript web application for pharmaceutical QR code verification and traceability, displaying the **9 statutory drug product data elements** as mandated by drug regulatory guidelines (CDSCO / GS1 Healthcare).

Designed with the reference layout from `webpage.png` and branded with the official **Pixtron Systems** identity.

---

## 📋 The 9 Statutory Key Data Elements Displayed

1. **Unique Product Identification Code** (e.g. `SIN110003262300860` or GS1 GTIN)
2. **Proper and Generic Name of the Drug** (e.g. `Telmisartan 80mg and Hydrochlorothiazide 12.5mg Tablets IP`)
3. **Brand Name** (e.g. `TELMA 80 H TABS 10X15'S (ELITE)`)
4. **Name and Address of the Manufacturer** (e.g. `Pixtron Systems Lifesciences Ltd. – Samlik Marchak, Industrial Growth Centre, Near Ranipool, Gangtok, Sikkim: 737135`)
5. **Batch Number** (e.g. `18240818`)
6. **Date of Manufacture** (e.g. `05 November 2024`)
7. **Date of Expiry** (e.g. `31 October 2027`)
8. **Manufacturing License Number** (e.g. `M/602/2012`)
9. **Details of Excipients** (e.g. `Microcrystalline Cellulose IP, Lactose Monohydrate IP, Povidone K-30, Magnesium Stearate IP, Red Oxide of Iron, Lake Sunset Yellow FCF`)

---

## 🚀 Key Features

- **Reference Layout Matching**: Faithfully adopts the card structure of the reference document (`webpage.png`), elevated with modern typography (`Plus Jakarta Sans` and `JetBrains Mono`), glassmorphic touches, and micro-interactions.
- **Pixtron Systems Branding**: Replaces placeholder branding with high-resolution vector assets from `pixtron_systems_logo.png`.
- **Backend Ready**: Ready to consume data from your backend API service (configured via `.env` or in-app API settings drawer).
- **Graceful Demo Fallback**: When the backend is offline or during testing, it seamlessly serves realistic demo datasets with a clear status indicator.
- **Multi-Sample Switcher**: Toggle between 3 sample pharmaceutical records (Telmisartan, Amoxicillin-Clav, Metformin PR) to test diverse field lengths and packaging.
- **Copy to Clipboard**: Quick-copy buttons on codes, batch numbers, and license numbers.
- **Print / PDF Ready**: Optimized print stylesheet for generating clean verification slips during audits.
- **Dark & Light Mode**: Accessible clinical white and modern dark mode.

---

## 🔌 Backend API Integration

### 1. Endpoint Configuration
Set your backend API URL in the `.env` file:
```env
# In .env:
VITE_BACKEND_API_URL=http://localhost:5000/api/drug-verify
```
Or configure it live directly inside the UI by clicking the **"Demo Mode / Backend"** badge or **API settings** button in the header bar.

### 2. Request Contract
When a QR code is scanned, the portal calls:
```http
GET {VITE_BACKEND_API_URL}?code={SCANNED_CODE}
```
*(Example: `GET /api/drug-verify?code=LDMW4YB8`)*

### 3. Expected Response JSON Payload
Your backend API should return JSON matching this structure:
```json
{
  "uniqueProductIdentificationCode": "SIN110003262300860",
  "properAndGenericName": "Telmisartan 80mg and Hydrochlorothiazide 12.5mg Tablets IP",
  "brandName": "TELMA 80 H TABS 10X15'S (ELITE)",
  "manufacturerNameAndAddress": "Pixtron Systems Lifesciences Ltd. – Samlik Marchak, Industrial Growth Centre, Near Ranipool, Gangtok, Sikkim: 737135",
  "batchNumber": "18240818",
  "dateOfManufacture": "05 November 2024",
  "dateOfExpiry": "31 October 2027",
  "manufacturingLicenseNumber": "M/602/2012",
  "detailsOfExcipients": "Microcrystalline Cellulose IP, Lactose Monohydrate IP, Povidone K-30, Magnesium Stearate IP",
  "scannedCode": "LDMW4YB8",
  "verificationStatus": "VERIFIED",
  "officialPortalUrl": "https://pixtron.in"
}
```

*Note: The frontend API client also includes key aliases (e.g. `genericName`, `drugName`, `mfgDate`, `expDate`) so slight differences in backend JSON key casing are handled gracefully.*

---

## 🛠️ Project Setup & Commands

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation
```bash
npm install
```

### Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build Production Bundle
```bash
npm run build
```
Creates an optimized production build in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

---

## 📁 Directory Structure
```
14.UI_for_qr_decode/
├── public/
│   ├── pixtron_systems_logo.png   # Pixtron Systems logo
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ApiSettingsModal.tsx   # Live backend endpoint testing & payload helper
│   │   ├── BrandHeader.tsx        # Logo & company tagline
│   │   ├── DataRow.tsx            # Individual key-value item with copy action
│   │   ├── DrugDetailsList.tsx    # 9 statutory pharmaceutical data elements
│   │   ├── LocationNotice.tsx     # Location verification notice
│   │   ├── OfficialBanner.tsx     # Top portal official verification notice
│   │   ├── PortalFooter.tsx       # CDSCO & GS1 compliance notes
│   │   ├── ScannedCodeBar.tsx     # Scanned code & verification status badge
│   │   └── TopActionBar.tsx       # Theme, sample switcher, print, and backend status
│   ├── services/
│   │   └── drugApi.ts             # API client with backend call & fallback mock data
│   ├── types/
│   │   └── drug.ts                # TypeScript interfaces for all 9 data elements
│   ├── App.tsx                    # Main verification application page
│   ├── index.css                  # Modern CSS design system & typography
│   └── main.tsx                   # React root entry point
├── .env                           # Environment configuration for backend API URL
├── .env.example                   # Example environment file
├── index.html                     # HTML5 template with Google fonts
├── package.json                   # Dependencies and scripts
└── vite.config.ts                 # Vite bundler configuration
```
