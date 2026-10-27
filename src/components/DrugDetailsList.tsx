import React from 'react';
import {
  QrCode,
  Pill,
  Bookmark,
  Building2,
  Hash,
  Calendar,
  CalendarCheck,
  FileCheck2,
  FlaskConical,
} from 'lucide-react';
import type { DrugProductData } from '../types/drug';
import { DataRow } from './DataRow';

interface DrugDetailsListProps {
  data: DrugProductData;
}

export const DrugDetailsList: React.FC<DrugDetailsListProps> = ({ data }) => {
  return (
    <div className="drug-details-list" id="drug-details-section">
      {/* 1. Unique Product Identification Code */}
      <DataRow
        label="Unique Product Identification Code"
        value={data.uniqueProductIdentificationCode}
        icon={<QrCode size={15} />}
        isMono={true}
        allowCopy={true}
      />

      {/* 2. Proper & Generic Name of the Drug */}
      <DataRow
        label="Proper & Generic Name"
        value={data.properAndGenericName}
        icon={<Pill size={15} />}
        isPrimary={true}
      />

      {/* 3. Brand Name */}
      <DataRow
        label="Brand Name"
        value={data.brandName}
        icon={<Bookmark size={15} />}
        inline={true}
        isPrimary={true}
      />

      {/* 4. Name & Address of Manufacturer */}
      <DataRow
        label="Name & Address of Manufacturer"
        value={data.manufacturerNameAndAddress}
        icon={<Building2 size={15} />}
      />

      {/* 5. Batch Number */}
      <DataRow
        label="Batch Number"
        value={data.batchNumber}
        icon={<Hash size={15} />}
        inline={true}
        isMono={true}
        allowCopy={true}
      />

      {/* 6. Date of Manufacturing */}
      <DataRow
        label="Date of Manufacturing"
        value={data.dateOfManufacture}
        icon={<Calendar size={15} />}
        inline={true}
      />

      {/* 7. Date of Expiry */}
      <DataRow
        label="Date of Expiry"
        value={data.dateOfExpiry}
        icon={<CalendarCheck size={15} />}
        inline={true}
        badge="Active"
      />

      {/* 8. Manufacturing Licence Number */}
      <DataRow
        label="Manufacturing Licence Number"
        value={data.manufacturingLicenseNumber}
        icon={<FileCheck2 size={15} />}
        inline={true}
        isMono={true}
        allowCopy={true}
      />

      {/* 9. Details of Excipients */}
      <DataRow
        label="Details of Excipients"
        value={data.detailsOfExcipients}
        icon={<FlaskConical size={15} />}
      />
    </div>
  );
};
