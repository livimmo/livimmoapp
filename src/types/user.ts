export type AccountType = "user" | "agent" | "promoter" | "developer";

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  accountType: AccountType;
  createdAt?: Date;
  updatedAt?: Date;
}