import { useParams } from "react-router-dom";
import { mockAgents } from "@/data/mockAgents";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockProperties } from "@/data/mockProperties";
import { scheduledLives, replayLives } from "@/data/mockLives";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Mail, Facebook, Instagram, Linkedin } from "lucide-react";
import { AgentHeader } from "@/components/agent/AgentHeader";
import { AgentStats } from "@/components/agent/AgentStats";
import { AgentProperties } from "@/components/agent/AgentProperties";
import { AgentLives } from "@/components/agent/AgentLives";

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

  // Filtrer les propriétés de l'agent
  const agentProperties = mockProperties.filter(property => 
    property.agent.name === agent.name
  );

  // Filtrer les lives programmés de l'agent
  const agentLives = scheduledLives.filter(live => 
    live.agent === agent.name
  );

  // Filtrer les replays de l'agent
  const agentReplays = replayLives.filter(replay =>
    replay.agent === agent.name
  );

  return (
    <div className="container px-4 py-8 pb-20">
      <div className="space-y-6">
        <AgentHeader agent={agent} />
        <AgentStats agent={agent} />

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
          <p className="text-muted-foreground">{agent.description}</p>
        </div>

        {/* Spécialités */}
        {agent.specialties?.length > 0 && (
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

        {/* Onglets pour les biens et lives */}
        <Tabs defaultValue="properties" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="properties">Biens actifs</TabsTrigger>
            <TabsTrigger value="lives">Lives programmés</TabsTrigger>
            <TabsTrigger value="replays">Replays</TabsTrigger>
            <TabsTrigger value="sold">Biens vendus</TabsTrigger>
          </TabsList>
          
          <TabsContent value="properties" className="mt-6">
            <AgentProperties properties={agentProperties} />
          </TabsContent>

          <TabsContent value="lives" className="mt-6">
            <AgentLives lives={agentLives} />
          </TabsContent>

          <TabsContent value="replays" className="mt-6">
            <AgentLives lives={agentReplays} />
          </TabsContent>

          <TabsContent value="sold" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <p className="col-span-full text-center text-muted-foreground py-8">
                Historique des ventes à venir
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AgentDetail;