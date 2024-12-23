export type AccountType = "agent" | "promoter" | "developer" | "owner" | "buyer" | "tenant" | "admin" | "user";

export type UserRole = AccountType;

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  accountType: AccountType;
  avatar?: string;
  phone?: string;
  location?: string;
  description?: string;
  verified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}