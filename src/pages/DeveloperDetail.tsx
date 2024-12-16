import { useParams } from "react-router-dom";
import { Building, Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertyCard } from "@/components/PropertyCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data - à remplacer par les données de l'API
const mockDeveloper = {
  id: 1,
  name: "Groupe Al Omrane",
  logo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  description: "Leader dans le développement immobilier au Maroc avec plus de 20 ans d'expérience.",
  email: "contact@alomrane.ma",
  phone: "+212 5XX-XXXXXX",
  location: "Casablanca, Maroc",
  projects: [
    {
      id: 1,
      title: "Les Jardins de l'Atlas",
      price: 2500000,
      location: "Marrakech",
      type: "Villa",
      surface: 250,
      rooms: 4,
      bathrooms: 3,
      description: "Magnifique villa avec vue sur l'Atlas",
      features: ["Piscine", "Jardin", "Garage"],
      images: ["https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"],
      hasLive: true,
      isLiveNow: false,
      remainingSeats: 10,
      agent: {
        name: "Sarah Martin",
        image: "https://i.pravatar.cc/150?u=sarah",
        phone: "+212 6 12 34 56 78",
        email: "sarah.martin@example.com",
      }
    },
  ]
};

const DeveloperDetail = () => {
  const { id } = useParams();
  const developer = mockDeveloper;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={developer.logo} alt={developer.name} />
                <AvatarFallback>
                  <Building className="h-10 w-10" />
                </AvatarFallback>
              </Avatar>
              <CardTitle>{developer.name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{developer.description}</p>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{developer.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${developer.email}`} className="hover:text-primary">
                  {developer.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a href={`tel:${developer.phone}`} className="hover:text-primary">
                  {developer.phone}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-6">Projets du promoteur</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {developer.projects.map((project) => (
              <PropertyCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperDetail;