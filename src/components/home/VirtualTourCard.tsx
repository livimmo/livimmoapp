import { Property } from "@/types/property";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface VirtualTourCardProps {
  property: Property;
}

export const VirtualTourCard = ({ property }: VirtualTourCardProps) => {
  const navigate = useNavigate();

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
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex gap-2 text-sm text-muted-foreground">
          <span>{property.surface} m²</span>
          <span>•</span>
          <span>{property.rooms} pièces</span>
        </div>
        <Button variant="ghost" size="sm" onClick={() => navigate(`/property/${property.id}`)}>
          Voir plus
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};