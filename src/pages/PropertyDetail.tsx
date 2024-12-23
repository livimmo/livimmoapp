import { useState } from "react";
import { useParams } from "react-router-dom";
import { mockProperties } from "@/data/mockProperties";
import { PropertyDetailHeader } from "@/components/property/PropertyDetailHeader";
import { PropertyDetailContent } from "@/components/property/PropertyDetailContent";
import { PropertyVirtualTour } from "@/components/property/PropertyVirtualTour";

const PropertyDetail = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  
  const property = mockProperties.find(p => p.id === id);

  if (!property) {
    return <div>Property not found</div>;
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PropertyDetailHeader 
        property={property}
        isFavorite={isFavorite}
        handleToggleFavorite={handleToggleFavorite}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <PropertyDetailContent property={property} />
        {property.virtualTour?.enabled && (
          <PropertyVirtualTour property={property} />
        )}
      </div>
    </div>
  );
};

export default PropertyDetail;