import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { User, UserRole, AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    try {
      // TODO: Implement real authentication logic here
      setUser({
        id: '1',
        email,
        firstName: 'John',
        lastName: 'Doe',
      });
      
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur Livimmo !",
      });
      
      // Si l'utilisateur n'a pas de rôle, rediriger vers la sélection de rôle
      if (!user?.role) {
        navigate('/select-role');
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

  const signup = async ({ email, password, firstName, lastName, role }: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: UserRole;
  }) => {
    try {
      // TODO: Implement real signup logic here
      setUser({
        id: '1',
        email,
        firstName,
        lastName,
        role,
      });
      
      toast({
        title: "Inscription réussie",
        description: "Bienvenue sur Livimmo !",
      });
      
      if (!role) {
        navigate('/select-role');
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

  const updateUserRole = async (role: UserRole) => {
    try {
      // TODO: Implement real role update logic here
      setUser(prev => prev ? { ...prev, role } : null);
      
      toast({
        title: "Rôle mis à jour",
        description: "Votre rôle a été mis à jour avec succès",
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour votre rôle",
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
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, updateUserRole }}>
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