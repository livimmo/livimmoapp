export type AccountType = "agent" | "promoter" | "developer" | "owner" | "tenant" | "buyer" | "user";

export type UserRole = AccountType; // Pour la rétrocompatibilité

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role: AccountType;
  avatar?: string;
  verified?: boolean;
  location?: string;
  description?: string;
  company?: string;
  companyLogo?: string;
}