export type AccessResult = {
  allowed: boolean;
  message: string;
  clientName?: string;
  expirationDate?: string;
};