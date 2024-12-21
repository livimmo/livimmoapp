import { useState } from "react";
import { developers } from "@/data/mockDevelopers";
import { DeveloperCard } from "@/components/developers/DeveloperCard";
import { DeveloperSlider } from "@/components/developers/DeveloperSlider";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

const mockSlides = [
  {
    id: 1,
    type: "ad" as const,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    title: "Nouvelle résidence de luxe à Casablanca",
    description: "Découvrez notre nouveau projet immobilier au cœur de Casablanca",
    link: "/property/1"
  },
  {
    id: 2,
    type: "property" as const,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    title: "Villa avec piscine",
    description: "Magnifique villa moderne avec piscine et jardin paysager",
    price: 2500000,
    location: "Marrakech",
    link: "/property/2"
  },
  {
    id: 3,
    type: "live" as const,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    title: "Visite live - Appartement vue mer",
    description: "Visite en direct d'un appartement avec vue panoramique",
    viewers: 156,
    link: "/live/3"
  },
  {
    id: 4,
    type: "registration" as const,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227",
    title: "Prochain live - Riad traditionnel",
    description: "Inscrivez-vous pour la visite virtuelle de ce riad d'exception",
    date: "25 Mars à 15h00",
    remainingSeats: 12,
    link: "/live/schedule/4"
  }
];

const Developers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedSector, setSelectedSector] = useState("all");

  const filteredDevelopers = developers.filter(developer => {
    const matchesSearch = developer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         developer.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation === "all" || developer.location === selectedLocation;
    const matchesSector = selectedSector === "all" || developer.sector === selectedSector;
    
    return matchesSearch && matchesLocation && matchesSector;
  });

  const locations = Array.from(new Set(developers.map(d => d.location)));
  const sectors = Array.from(new Set(developers.map(d => d.sector)));

  return (
    <div className="container px-4 py-6 pb-20">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Promoteurs</h1>
        
        {/* Slider Section */}
        <DeveloperSlider slides={mockSlides} />
        
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
                <SelectItem value="all">Toutes les localisations</SelectItem>
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
                <SelectItem value="all">Tous les secteurs</SelectItem>
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