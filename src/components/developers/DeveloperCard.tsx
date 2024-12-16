import { Developer } from "@/types/developer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ratings/StarRating";
import { Building, Video, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface DeveloperCardProps {
  developer: Developer;
}

export const DeveloperCard = ({ developer }: DeveloperCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img
          src={developer.logo}
          alt={developer.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold">{developer.name}</h3>
            <p className="text-sm text-muted-foreground">{developer.location}</p>
          </div>
          <Badge variant={developer.sector === "residential" ? "default" : "secondary"}>
            {developer.sector}
          </Badge>
        </div>
        <StarRating rating={developer.rating} totalReviews={developer.totalReviews} />
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {developer.description}
        </p>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Building className="w-4 h-4" />
            <span>{developer.activeProjects}</span>
          </div>
          <div className="flex items-center gap-1">
            <Video className="w-4 h-4" />
            <span>{developer.activeLives}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{developer.scheduledLives}</span>
          </div>
        </div>
        <Link to={`/developer/${developer.id}`}>
          <Button className="w-full">Voir les programmes live</Button>
        </Link>
      </CardContent>
    </Card>
  );
};