import { Property } from "@/types/property";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FavoriteButton } from "../property/FavoriteButton";
import { ShareButtons } from "../properties/ShareButtons";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { LiveInfo } from "@/components/live/LiveInfo";
import { useState } from "react";

interface VirtualTourCardProps {
  property: Property;
}

export const VirtualTourCard = ({ property }: VirtualTourCardProps) => {
  const navigate = useNavigate();
  const [showShare, setShowShare] = useState(false);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [viewerCount] = useState(Math.floor(Math.random() * 50) + 10);

  return (
    <>
      <Card className="overflow-hidden group">
        <div className="relative">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              variant="secondary" 
              onClick={() => setShowVirtualTour(true)}
            >
              <Eye className="w-4 h-4 mr-2" />
              Visiter
            </Button>
          </div>
          <div className="absolute top-2 left-2">
            <Badge className="bg-background/80 backdrop-blur-sm">
              Visite virtuelle
            </Badge>
          </div>
          <div className="absolute top-2 right-2 flex gap-2">
            <FavoriteButton 
              propertyId={property.id} 
              title={property.title}
              className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowShare(!showShare);
              }}
            >
              <Eye className="h-5 w-5" />
            </Button>
          </div>
          {showShare && (
            <div className="absolute top-14 right-2 z-10">
              <ShareButtons
                property={{
                  title: property.title,
                  price: property.price,
                  location: property.location,
                }}
                currentUrl={window.location.href}
              />
            </div>
          )}
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

      <Dialog open={showVirtualTour} onOpenChange={setShowVirtualTour}>
        <DialogContent className="max-w-7xl h-[90vh] p-0">
          <div className="relative h-full flex flex-col">
            <div className="flex-1">
              <iframe
                src="https://my.matterport.com/show/?m=TzhRashYdRt"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
              />
            </div>
            <LiveInfo 
              property={property}
              viewerCount={viewerCount}
              onMakeOffer={() => {}}
              onToggleChat={() => {}}
              isReplay={true}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};