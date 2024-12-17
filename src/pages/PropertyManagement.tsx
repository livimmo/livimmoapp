import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { PropertyList } from "@/components/properties/PropertyList";
import { AddLiveDialog } from "@/components/AddLiveDialog";
import { mockProperties } from "@/data/mockProperties";
import { AddPropertyDialog } from "@/components/property/AddPropertyDialog";
import { useToast } from "@/hooks/use-toast";

const PropertyManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [surfaceRange, setSurfaceRange] = useState([0, 1000]);
  const [viewType, setViewType] = useState<"all" | "live" | "replay">("all");
  const [transactionType, setTransactionType] = useState<string[]>(["Vente"]);
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);

  const isAgent = user?.role === "agent" || user?.role === "promoter";

  const filteredProperties = mockProperties.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !propertyType || property.type === propertyType;
    const matchesPriceRange = property.price >= priceRange[0] && property.price <= priceRange[1];
    const matchesSurfaceRange = property.surface >= surfaceRange[0] && property.surface <= surfaceRange[1];
    const matchesTransactionType = transactionType.includes(property.transactionType);
    const matchesViewType = viewType === "all" ? true :
      viewType === "live" ? (property.hasLive && !property.isReplay) :
      (property.hasLive && property.isReplay);

    return matchesSearch && matchesType && matchesPriceRange && 
           matchesSurfaceRange && matchesTransactionType && matchesViewType;
  });

  const handleAddProperty = () => {
    if (!isAgent) {
      toast({
        title: "Accès refusé",
        description: "Seuls les agents et promoteurs peuvent ajouter des biens",
        variant: "destructive",
      });
      return;
    }
    setIsAddPropertyOpen(true);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des biens</h1>
        {isAgent && (
          <div className="flex gap-2">
            <Button onClick={handleAddProperty}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un bien
            </Button>
            <AddLiveDialog />
          </div>
        )}
      </div>

      <PropertyFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        propertyType={propertyType}
        setPropertyType={setPropertyType}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        surfaceRange={surfaceRange}
        setSurfaceRange={setSurfaceRange}
        viewType={viewType}
        setViewType={setViewType}
        transactionType={transactionType}
        setTransactionType={setTransactionType}
      />

      <PropertyList properties={filteredProperties} />

      <AddPropertyDialog
        open={isAddPropertyOpen}
        onOpenChange={setIsAddPropertyOpen}
      />
    </div>
  );
};

export default PropertyManagement;