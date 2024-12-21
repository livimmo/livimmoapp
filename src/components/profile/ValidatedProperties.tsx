import { PropertyList } from "@/components/properties/PropertyList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockProperties } from "@/data/mockProperties";

export const ValidatedProperties = () => {
  // Filter properties that have been validated through physical or virtual visits
  const physicalVisits = mockProperties.slice(0, 2); // Simulation de données
  const virtualVisits = mockProperties.slice(2, 4); // Simulation de données

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Biens Validés</h2>
      
      <Tabs defaultValue="physical" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="physical">Visites Physiques</TabsTrigger>
          <TabsTrigger value="virtual">Visites Virtuelles</TabsTrigger>
        </TabsList>

        <TabsContent value="physical" className="mt-4">
          {physicalVisits.length > 0 ? (
            <PropertyList properties={physicalVisits} />
          ) : (
            <p className="text-center text-muted-foreground py-8">
              Aucun bien validé en visite physique
            </p>
          )}
        </TabsContent>

        <TabsContent value="virtual" className="mt-4">
          {virtualVisits.length > 0 ? (
            <PropertyList properties={virtualVisits} />
          ) : (
            <p className="text-center text-muted-foreground py-8">
              Aucun bien validé en visite virtuelle
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};