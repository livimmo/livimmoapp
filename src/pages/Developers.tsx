import { useState } from "react";
import { developers } from "@/data/mockDevelopers";
import { DeveloperCard } from "@/components/developers/DeveloperCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

const Developers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSector, setSelectedSector] = useState("");

  const filteredDevelopers = developers.filter(developer => {
    const matchesSearch = developer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         developer.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !selectedLocation || developer.location === selectedLocation;
    const matchesSector = !selectedSector || developer.sector === selectedSector;
    
    return matchesSearch && matchesLocation && matchesSector;
  });

  const locations = Array.from(new Set(developers.map(d => d.location)));
  const sectors = Array.from(new Set(developers.map(d => d.sector)));

  return (
    <div className="container px-4 py-6 pb-20">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Promoteurs</h1>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <Input
                placeholder="Rechercher un promoteur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Localisation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Toutes les localisations</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Secteur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les secteurs</SelectItem>
                {sectors.map(sector => (
                  <SelectItem key={sector} value={sector}>
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDevelopers.map((developer) => (
          <DeveloperCard key={developer.id} developer={developer} />
        ))}
      </div>
    </div>
  );
};

export default Developers;