export type UserRole = "owner" | "buyer" | "tenant" | "agent" | "promoter" | "developer";

export type AccountType = "user" | "agent" | "promoter" | "developer";

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  accountType: AccountType;
  location?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}