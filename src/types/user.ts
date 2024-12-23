export type AccountType = "agent" | "owner" | "buyer" | "tenant" | "promoter" | "user" | "developer";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: AccountType;
  location?: string;
  description?: string;
  verified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserRole = AccountType;