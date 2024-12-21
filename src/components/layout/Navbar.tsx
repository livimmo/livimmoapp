import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Livimmo
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/properties">Biens</Link>
              <Link to="/profile">Mon Profil</Link>
              <Button variant="outline" onClick={logout}>
                Déconnexion
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Connexion</Button>
              </Link>
              <Link to="/register">
                <Button>Inscription</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};