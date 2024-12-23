export type AccountType = "buyer" | "seller" | "agent" | "promoter" | "owner";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  accountType: AccountType;
  role?: UserRole;
}

export type UserRole = "user" | "admin" | "agent" | "promoter" | "owner" | "buyer";