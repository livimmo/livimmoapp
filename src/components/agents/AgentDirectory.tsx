import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { AgentCard } from "./AgentCard";
import { mockProperties } from "@/data/mockProperties";

// Extraire les agents uniques des propriétés mockées
const uniqueAgents = Array.from(
  new Map(mockProperties.map((p) => [p.agent.id, p.agent])).values()
);

const developers = [
  {
    id: "dev-1",
    name: "Groupe Al Omrane",
    image: "https://i.pravatar.cc/150?u=alomrane",
    description: "Leader national de l'aménagement territorial",
    projectCount: 15,
    isVerified: true,
  },
  {
    id: "dev-2",
    name: "Addoha",
    image: "https://i.pravatar.cc/150?u=addoha",
    description: "Premier promoteur immobilier coté en bourse",
    projectCount: 12,
    isVerified: true,
  },
];

export const AgentDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredAgents = uniqueAgents.filter((agent) =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDevelopers = developers.filter((developer) =>
    developer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un agent ou un promoteur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <Tabs defaultValue="agents">
        <TabsList className="mb-6">
          <TabsTrigger value="agents">Agents ({uniqueAgents.length})</TabsTrigger>
          <TabsTrigger value="developers">
            Promoteurs ({developers.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onClick={() => navigate(`/agent/${agent.id}`)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="developers" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDevelopers.map((developer) => (
              <AgentCard
                key={developer.id}
                agent={{
                  ...developer,
                  phone: "",
                  email: "",
                }}
                isDeveloper
                onClick={() => navigate(`/developer/${developer.id}`)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};