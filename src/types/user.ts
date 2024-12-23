export type AccountType = "user" | "agent" | "promoter" | "developer" | "owner" | "tenant" | "buyer";
export type UserRole = AccountType;

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}