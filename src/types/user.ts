export type UserRole = "promoter" | "agent" | "tenant" | "buyer";

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  avatar?: string;
}