import { useParams } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Détails du bien {id}</h1>
      {/* Content will be implemented later */}
      <div className="text-gray-600">
        Les détails du bien seront affichés ici.
      </div>
    </div>
  );
};

export default PropertyDetails;