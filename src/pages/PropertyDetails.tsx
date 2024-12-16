import { useParams } from "react-router-dom";

export const PropertyDetails = () => {
  const { id } = useParams();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Détails de la propriété {id}</h1>
      {/* Contenu à implémenter plus tard */}
    </div>
  );
};