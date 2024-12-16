import { useParams } from "react-router-dom";
import { mockAgents } from "@/data/mockAgents";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ratings/StarRating";
import { PropertyCard } from "@/components/PropertyCard";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Facebook, Instagram, Linkedin, MapPin, Building2, Star, Calendar } from "lucide-react";

const AgentDetail = () => {
  const { id } = useParams();
  const agent = mockAgents.find(a => a.id === Number(id));

  if (!agent) {
    return (
      <div className="container px-4 py-8">
        <p>Agent non trouvé</p>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 pb-20">
      <div className="space-y-6">
        {/* En-tête du profil */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover" />
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <h1 className="text-2xl font-bold">{agent.name}</h1>
              {agent.verified && (
                <Badge variant="secondary" className="w-fit">
                  Vérifié
                </Badge>
              )}
            </div>
            
            {agent.company && (
              <p className="text-gray-600">{agent.company}</p>
            )}
            
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>{agent.location}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <StarRating rating={agent.rating} />
              <span className="text-sm text-gray-600">
                ({agent.totalReviews} avis)
              </span>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-lg border">
            <Building2 className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Biens actifs</p>
              <p className="font-semibold">{agent.activeProperties}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 rounded-lg border">
            <Calendar className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Lives réalisés</p>
              <p className="font-semibold">{agent.completedLives}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 rounded-lg border">
            <Calendar className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Lives programmés</p>
              <p className="font-semibold">{agent.scheduledLives}</p>
            </div>
          </div>
        </div>

        {/* Contact et réseaux sociaux */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Contact</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Phone className="w-4 h-4" />
              {agent.contact.phone}
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Mail className="w-4 h-4" />
              {agent.contact.email}
            </Button>
            {agent.contact.social?.facebook && (
              <Button variant="outline" size="sm" className="gap-2">
                <Facebook className="w-4 h-4" />
                Facebook
              </Button>
            )}
            {agent.contact.social?.instagram && (
              <Button variant="outline" size="sm" className="gap-2">
                <Instagram className="w-4 h-4" />
                Instagram
              </Button>
            )}
            {agent.contact.social?.linkedin && (
              <Button variant="outline" size="sm" className="gap-2">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Button>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">À propos</h2>
          <p className="text-gray-600">{agent.description}</p>
        </div>

        {/* Spécialités */}
        {agent.specialties.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Spécialités</h2>
            <div className="flex flex-wrap gap-2">
              {agent.specialties.map((specialty, index) => (
                <Badge key={index} variant="secondary">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Biens gérés */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Biens gérés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Ici, vous pouvez mapper sur les biens de l'agent une fois que vous aurez les données */}
            <PropertyCard property={{
              id: 1,
              title: "Appartement exemple",
              price: 250000,
              location: "Paris",
              surface: 75,
              rooms: 3,
              type: "Appartement",
              images: ["placeholder.jpg"],
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetail;