export interface CalibrationData {
  standardValue: number;
  observedValue: number;
  deviationValue: number;
}

export interface Certificate {
  id: string;
  'Certificate #': string;
  equipmentType: string;
  client: string;
  dataSheetNo: string;
  calibrationDate: string;
  calibrationDue: string;
  temperature: string;
  location: string;
  calibratedBy: string;
  checkedBy: string;
  traceability: string;
  calibrationData: CalibrationData[];
  manufacturer: string;
  srNo: string;
  code: string;
  isValid: boolean;
}

// Shape of a row parsed from the admin's Excel upload (before saving to server)
export interface ImportedCertificate {
  'Certificate #': string;
  Client: string;
  'Model/Type': string;
  'Data Sheet No.': string;
  Manufacturer: string;
  Temperature: string;
  'Sr. No.': string;
  'Calibration Date': string;
  Code: string;
  'Calibration Due': string;
  Location: string;
  'Tag/ID': string;
  'Calibrated at': string;
  'STANDARD VALUE': string;
  'OBSERVED VALUE': string;
  'DEVIATION VALUE': string;
  TRACEABILITY?: string;
  'CALIBRATED BY'?: string;
  'CHECKED BY'?: string;
}

export const isExpired = (dueDate: string): boolean => {
  if (!dueDate || dueDate === 'N/A') return false;
  const parts = dueDate.trim().split('-');
  if (parts.length !== 3) return false;
  const due = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
  if (isNaN(due.getTime())) return false;
  return new Date() > due;
};

export const getCertStatus = (calibrationDue: string): 'Valid' | 'Expired' | 'Pending' => {
  if (!calibrationDue || calibrationDue === 'N/A') return 'Pending';
  return isExpired(calibrationDue) ? 'Expired' : 'Valid';
};
