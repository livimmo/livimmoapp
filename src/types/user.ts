export type AccountType = "user" | "buyer" | "seller" | "agent" | "promoter" | "owner" | "tenant" | "developer";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  location?: string;
  description?: string;
  role?: UserRole;
  accountType: AccountType;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserRole = "user" | "admin" | "agent" | "promoter" | "owner" | "buyer" | "tenant" | "developer";