import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Building2, Video, Calendar, Check } from "lucide-react";
import { PropertyList } from "@/components/properties/PropertyList";
import { mockProperties } from "@/data/mockProperties";
import { StarRating } from "@/components/ratings/StarRating";

export const AgentProfile = () => {
  const { id } = useParams();
  
  // Pour la démo, on utilise le premier agent des propriétés mock
  const agent = mockProperties[0].agent;
  const agentProperties = mockProperties.filter(p => p.agent.name === agent.name);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* En-tête du profil */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative">
            <img
              src={agent.image}
              alt={agent.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <Badge className="absolute -bottom-2 right-0 bg-primary">
              <Check className="w-4 h-4 mr-1" />
              Vérifié
            </Badge>
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{agent.name}</h1>
            <div className="flex items-center gap-4 text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                Agent Immobilier
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Casablanca
              </span>
            </div>
            <StarRating rating={4.5} totalReviews={42} />
          </div>

          <div className="flex flex-col gap-2 w-full md:w-auto">
            <Button className="w-full md:w-auto">
              <Phone className="w-4 h-4 mr-2" />
              {agent.phone}
            </Button>
            <Button variant="outline" className="w-full md:w-auto">
              <Mail className="w-4 h-4 mr-2" />
              Contacter par email
            </Button>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <Card className="p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{agentProperties.length}</div>
            <div className="text-sm text-muted-foreground">Biens actifs</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">12</div>
            <div className="text-sm text-muted-foreground">Lives réalisés</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">3</div>
            <div className="text-sm text-muted-foreground">Lives programmés</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">89%</div>
            <div className="text-sm text-muted-foreground">Taux de satisfaction</div>
          </div>
        </div>
      </Card>

      {/* Biens de l'agent */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Biens disponibles</h2>
        <PropertyList properties={agentProperties} />
      </div>
    </div>
  );
};

export default AgentProfile;