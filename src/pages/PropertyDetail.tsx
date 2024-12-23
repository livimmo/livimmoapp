import { useParams } from "react-router-dom";
import { mockProperties } from "@/data/mockProperties";
import { PropertyDetailHeader } from "@/components/property/PropertyDetailHeader";
import { PropertyDetailContent } from "@/components/property/PropertyDetailContent";

const PropertyDetail = () => {
  const { id } = useParams();
  const property = mockProperties.find((p) => p.id === id);

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PropertyDetailHeader property={property} />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <PropertyDetailContent property={property} />
      </div>
    </div>
  );
};

export default PropertyDetail;