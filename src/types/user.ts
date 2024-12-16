export type UserRole = "promoter" | "agent" | "tenant" | "buyer";
export type AccountType = "buyer" | "agent";

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  accountType?: AccountType;
  avatar?: string;
}