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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const login = async (email: string, password: string, role?: UserRole) => {
    try {
      // TODO: Implement real authentication logic here
      // Simulation d'une connexion réussie
      setUser({
        id: '1',
        email,
        firstName: 'John',
        lastName: 'Doe',
        role: role,
        accountType: role === 'promoter' || role === 'agent' ? 'agent' : 'buyer',
      });
      
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur Livimmo !",
      });
      
      // Redirection en fonction du rôle
      if (role === "promoter" || role === "agent") {
        navigate('/properties');
      } else {
        navigate('/');
      }
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
      // TODO: Implement real signup logic here
      // Simulation d'une inscription réussie
      setUser({
        id: '1',
        email,
        firstName,
        lastName,
        role,
        accountType: role === 'promoter' || role === 'agent' ? 'agent' : 'buyer',
      });
      
      toast({
        title: "Inscription réussie",
        description: "Bienvenue sur Livimmo !",
      });
      
      // Redirection en fonction du rôle
      if (role === "promoter" || role === "agent") {
        navigate('/properties');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "Erreur d'inscription",
        description: "Une erreur est survenue lors de l'inscription",
        variant: "destructive",
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
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
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