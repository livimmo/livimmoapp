import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Bienvenue sur Livimmo</h1>
      <p className="text-lg mb-8">
        Découvrez les meilleures propriétés immobilières en temps réel.
      </p>
      <div className="flex gap-4">
        <Link to="/properties">
          <button className="bg-primary text-white px-6 py-2 rounded-lg">
            Voir les biens
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;