export type UserRole = "promoter" | "agent" | "tenant" | "buyer";

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role?: UserRole;
  isVerified?: boolean;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: UserRole;
  }) => Promise<void>;
  logout: () => void;
  updateUserRole: (role: UserRole) => Promise<void>;
}