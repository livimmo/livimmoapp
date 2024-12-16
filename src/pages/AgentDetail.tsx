import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PropertyCard } from "@/components/PropertyCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Check, Building2, Calendar } from "lucide-react";
import { mockProperties } from "@/data/mockProperties";

const AgentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Pour la démo, on prend le premier agent des propriétés mockées
  const agent = mockProperties[0].agent;
  const agentProperties = mockProperties.filter(p => p.agent.name === agent.name);

  return (
    <div className="container px-4 py-8">
      <Card className="p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <Avatar className="w-32 h-32 border-2 border-primary/10">
            <AvatarImage src={agent.image} alt={agent.name} />
            <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <h1 className="text-2xl font-bold">{agent.name}</h1>
              {agent.isVerified && (
                <Badge variant="secondary" className="gap-1">
                  <Check className="h-4 w-4" />
                  Vérifié
                </Badge>
              )}
            </div>
            
            <div className="space-y-2 mb-4">
              <p className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
                <Building2 className="h-4 w-4" />
                Agent immobilier
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Casablanca, Maroc
              </p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <Button variant="outline" className="gap-2">
                <Phone className="h-4 w-4" />
                {agent.phone}
              </Button>
              <Button variant="outline" className="gap-2">
                <Mail className="h-4 w-4" />
                {agent.email}
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button>S'abonner</Button>
            <Button variant="outline">Contacter</Button>
          </div>
        </div>
      </Card>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Biens en vente
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agentProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Prochains lives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agentProperties
              .filter(p => p.hasLive)
              .map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetail;