import { useState } from "react";
import { Building, MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface Developer {
  id: number;
  name: string;
  logo: string;
  location: string;
  projectCount: number;
  description: string;
}

const mockDevelopers: Developer[] = [
  {
    id: 1,
    name: "Groupe Al Omrane",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623",
    location: "Casablanca",
    projectCount: 12,
    description: "Leader de l'immobilier au Maroc"
  },
  {
    id: 2,
    name: "Addoha",
    logo: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    location: "Rabat",
    projectCount: 8,
    description: "Promoteur immobilier de référence"
  },
  {
    id: 3,
    name: "Alliances",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    location: "Marrakech",
    projectCount: 15,
    description: "Excellence dans l'immobilier"
  }
];

const Developers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredDevelopers = mockDevelopers.filter(
    (developer) =>
      developer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      developer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Découvrez les promoteurs immobiliers et leurs projets
      </h1>
      
      <div className="relative mb-8">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Rechercher par nom ou localisation..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDevelopers.map((developer) => (
          <Card 
            key={developer.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/developer/${developer.id}`)}
          >
            <CardHeader className="p-0">
              <img
                src={developer.logo}
                alt={developer.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-2">{developer.name}</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{developer.location}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-3">
                <Building className="h-4 w-4 mr-1" />
                <span>{developer.projectCount} projets</span>
              </div>
              <p className="text-gray-600">{developer.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Developers;