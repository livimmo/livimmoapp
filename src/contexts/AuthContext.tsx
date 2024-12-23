import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { User, UserRole } from '@/types/user';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string, role: UserRole) => Promise<void>;
  logout: () => void;
  switchRole: (newRole: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const switchRole = async (newRole: UserRole) => {
    if (!user) return;
    
    // Simuler un délai d'API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setUser({
      ...user,
      role: newRole,
      accountType: newRole === 'promoter' || newRole === 'agent' ? 'agent' : 
                  newRole === 'owner' ? 'owner' : 'buyer'
    });
  };

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
      
      // Redirection vers la page d'accueil pour tous les utilisateurs
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
      
      // Redirection vers la page d'accueil pour tous les utilisateurs
      navigate('/');
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
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      signup, 
      logout,
      switchRole 
    }}>
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
