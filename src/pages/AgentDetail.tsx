import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PropertyCard } from "@/components/PropertyCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Mail, 
  MapPin, 
  BadgeCheck, 
  Building2, 
  Calendar,
  Star,
  UserCheck 
} from "lucide-react";
import { mockProperties } from "@/data/mockProperties";
import { StarRating } from "@/components/ratings/StarRating";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const AgentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Pour la démo, on prend le premier agent des propriétés mockées qui correspond à l'ID
  const agent = mockProperties.find(p => p.agent.id === id)?.agent;
  const agentProperties = mockProperties.filter(p => p.agent.id === id);
  const upcomingLives = agentProperties.filter(p => p.hasLive && !p.isLiveNow);
  const currentLives = agentProperties.filter(p => p.hasLive && p.isLiveNow);

  if (!agent) {
    return (
      <div className="container px-4 py-8">
        <Card className="p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Agent non trouvé</h1>
            <Button onClick={() => navigate(-1)}>Retour</Button>
          </div>
        </Card>
      </div>
    );
  }

  const handleContact = (type: 'phone' | 'email') => {
    toast({
      title: "Contact",
      description: `Vous allez être mis en relation avec ${agent.name} par ${type === 'phone' ? 'téléphone' : 'email'}.`,
    });
  };

  return (
    <div className="container px-4 py-8">
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <Avatar className="w-32 h-32 border-2 border-primary/10">
              <AvatarImage src={agent.image} alt={agent.name} />
              <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <h1 className="text-2xl font-bold">{agent.name}</h1>
                <div className="flex gap-2">
                  {agent.isVerified && (
                    <Badge variant="secondary" className="gap-1">
                      <BadgeCheck className="h-4 w-4" />
                      Vérifié
                    </Badge>
                  )}
                  <Badge variant="outline" className="gap-1">
                    <UserCheck className="h-4 w-4" />
                    Expert
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <StarRating rating={4.5} totalReviews={42} />
              </div>

              <div className="space-y-2 mb-4">
                <p className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  Agent immobilier professionnel
                </p>
                <p className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  Casablanca, Maroc
                </p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Button variant="outline" className="gap-2" onClick={() => handleContact('phone')}>
                  <Phone className="h-4 w-4" />
                  {agent.phone}
                </Button>
                <Button variant="outline" className="gap-2" onClick={() => handleContact('email')}>
                  <Mail className="h-4 w-4" />
                  {agent.email}
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button>S'abonner</Button>
              <Button variant="outline">Message</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="properties" className="space-y-6">
        <TabsList>
          <TabsTrigger value="properties">Biens ({agentProperties.length})</TabsTrigger>
          <TabsTrigger value="lives">Lives ({upcomingLives.length})</TabsTrigger>
          <TabsTrigger value="current">En direct ({currentLives.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="properties">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agentProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="lives">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingLives.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="current">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentLives.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgentDetail;