import { Property } from "@/types/property";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ChatButton } from "@/components/chat/ChatButton";
import { VisitBookingButton } from "@/components/property/VisitBookingButton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle2 } from "lucide-react";

interface VirtualTourCardProps {
  property: Property;
}

export const VirtualTourCard = ({ property }: VirtualTourCardProps) => {
  const navigate = useNavigate();

  const handleAgentClick = () => {
    if (property.agent.id) {
      navigate(`/agent/${property.agent.id}`);
    }
  };

  return (
    <Card className="overflow-hidden group">
      <div className="relative">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="secondary" onClick={() => navigate(`/property/${property.id}`)}>
            <Eye className="w-4 h-4 mr-2" />
            Lancer la visite
          </Button>
        </div>
        <Badge className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm">
          Visite virtuelle
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
        <p className="text-primary font-bold">{property.price.toLocaleString()} DH</p>
        <p className="text-sm text-muted-foreground">{property.location}</p>
        
        <div className="flex gap-2 text-sm text-muted-foreground mt-2">
          <span>{property.surface} m²</span>
          <span>•</span>
          <span>{property.rooms} pièces</span>
        </div>
      </CardContent>

      <div className="px-4 py-3 border-t flex flex-col gap-2 bg-gray-50">
        <div 
          className="flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors p-2 rounded-lg"
          onClick={handleAgentClick}
        >
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border border-gray-200">
              <AvatarImage src={property.agent.image} alt={property.agent.name} />
              <AvatarFallback>{property.agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">{property.agent.name}</span>
              <span className="text-xs text-gray-500">{property.agent.company || 'Agent indépendant'}</span>
            </div>
          </div>
          {property.agent.verified && (
            <div className="flex items-center gap-1 text-primary">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-xs">Vérifié</span>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <ChatButton
            agentId={property.agent.id?.toString() || "0"}
            agentName={property.agent.name}
            propertyId={property.id}
            propertyTitle={property.title}
          />
          <Button 
            variant="default" 
            className="w-full gap-2"
            onClick={() => navigate(`/property/${property.id}`)}
          >
            Visite privée
          </Button>
        </div>
      </div>
    </Card>
  );
};