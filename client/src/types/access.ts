export type AccessResult = {
  allowed: boolean;
  message: string;
  clientName?: string;
  expirationDate?: string;
};

export type AttendanceEntry = {
  id: number;
  clientId: string | null;
  clientName: string | null;
  scannedCode: string;
  allowed: boolean;
  message: string;
  timestamp: string;
};
