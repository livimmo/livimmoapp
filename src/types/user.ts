export type AccountType = "agent" | "developer" | "owner" | "tenant" | "buyer" | "user";

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role: AccountType;
  avatar?: string;
  verified?: boolean;
}