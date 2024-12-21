export type UserRole = "promoter" | "agent" | "tenant" | "buyer" | "owner";
export type AccountType = "buyer" | "agent" | "owner";

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  accountType?: AccountType;
  avatar?: string;
  phone?: string;
  description?: string;
  location?: string;
  createdAt?: Date;
  isVerified?: boolean;
}