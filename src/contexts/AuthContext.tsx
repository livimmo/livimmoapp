import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { User, UserRole, AccountType } from '@/types/user';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string, role: UserRole) => Promise<void>;
  logout: () => void;
  switchRole: (newRole: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const login = async (email: string, password: string, role?: UserRole) => {
    try {
      setUser({
        id: '1',
        email,
        firstName: 'John',
        lastName: 'Doe',
        role: role || 'buyer',
        accountType: 'user',
      });
      
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur Livimmo !",
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect",
        variant: "destructive",
      });
    }
  };

  const signup = async (email: string, password: string, firstName: string, lastName: string, role: UserRole) => {
    try {
      setUser({
        id: '1',
        email,
        firstName,
        lastName,
        role,
        accountType: 'user',
      });
      
      toast({
        title: "Inscription réussie",
        description: "Bienvenue sur Livimmo !",
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Erreur d'inscription",
        description: "Une erreur est survenue lors de l'inscription",
        variant: "destructive",
      });
    }
  };

  const switchRole = (newRole: UserRole) => {
    if (user) {
      setUser({ 
        ...user, 
        role: newRole,
        accountType: newRole === 'buyer' || newRole === 'owner' || newRole === 'tenant' ? 'user' : newRole as AccountType
      });
      toast({
        title: "Rôle mis à jour",
        description: `Vous êtes maintenant en mode ${newRole}`,
      });
    }
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt !",
    });
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};