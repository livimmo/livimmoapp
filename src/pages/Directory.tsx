import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AgentCard } from "@/components/agents/AgentCard";
import { DeveloperCard } from "@/components/developers/DeveloperCard";
import { mockAgents } from "@/data/mockAgents";
import { developers } from "@/data/mockDevelopers";
import { Search } from "lucide-react";

const Directory = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAgents = mockAgents.filter(agent => 
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDevelopers = developers.filter(developer =>
    developer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    developer.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container px-4 py-6 pb-20">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Annuaire</h1>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            placeholder="Rechercher un agent ou promoteur..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs defaultValue="agents" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="agents" className="flex-1">Agents</TabsTrigger>
            <TabsTrigger value="developers" className="flex-1">Promoteurs</TabsTrigger>
          </TabsList>

          <TabsContent value="agents" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="developers" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDevelopers.map((developer) => (
                <DeveloperCard key={developer.id} developer={developer} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </header>
    </div>
  );
};

export default Directory;