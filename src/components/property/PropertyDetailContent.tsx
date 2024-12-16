import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Property } from "@/types/property";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle2 } from "lucide-react";

interface PropertyDetailContentProps {
  property: Property;
}

export const PropertyDetailContent = ({ property }: PropertyDetailContentProps) => {
  const navigate = useNavigate();

  const handleAgentClick = () => {
    if (property.agent?.id) {
      navigate(`/agent/${property.agent.id}`);
    }
  };

  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="flex items-center text-muted-foreground">
        <MapPin className="h-4 w-4 mr-2" />
        {property.location}
      </div>

      {/* Agent Section */}
      <div 
        className="p-4 bg-accent rounded-lg cursor-pointer hover:bg-accent/80 transition-colors"
        onClick={handleAgentClick}
      >
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border border-gray-200">
            <AvatarImage src={property.agent?.image} alt={property.agent?.name} />
            <AvatarFallback>{property.agent?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{property.agent?.name}</h3>
              {property.agent?.verified && (
                <div className="flex items-center gap-1 text-primary">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-xs">Vérifié</span>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{property.agent?.company || 'Agent indépendant'}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-accent rounded-lg">
          <div className="font-semibold">{property.surface} m²</div>
          <div className="text-sm text-muted-foreground">Surface</div>
        </div>
        <div className="p-4 bg-accent rounded-lg">
          <div className="font-semibold">{property.rooms}</div>
          <div className="text-sm text-muted-foreground">Pièces</div>
        </div>
        <div className="p-4 bg-accent rounded-lg">
          <div className="font-semibold">{property.bathrooms}</div>
          <div className="text-sm text-muted-foreground">Salle de bains</div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-muted-foreground whitespace-pre-line">{property.description}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Équipements</h2>
        <div className="flex flex-wrap gap-2">
          {property.features.map((feature) => (
            <Badge key={feature} variant="secondary">
              {feature}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};