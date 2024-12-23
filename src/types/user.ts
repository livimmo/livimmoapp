export type AccountType = "agent" | "promoter" | "developer" | "owner" | "buyer" | "admin" | "user";

export interface User {
  id: string;
  email: string;
  name: string;
  role: AccountType;
  avatar?: string;
  phone?: string;
  location?: string;
  description?: string;
  verified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}