import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { AgentCard } from "@/components/agents/AgentCard";
import { DeveloperCard } from "@/components/developers/DeveloperCard";
import { mockAgents } from "@/data/mockAgents";
import { developers } from "@/data/mockDevelopers";

const Directory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedRating, setSelectedRating] = useState("0");
  const [activeTab, setActiveTab] = useState("all");

  const filteredAgents = mockAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation === "all" || agent.location === selectedLocation;
    const matchesRating = Number(selectedRating) <= agent.rating;
    
    return matchesSearch && matchesLocation && matchesRating;
  });

  const filteredDevelopers = developers.filter(developer => {
    const matchesSearch = developer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         developer.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation === "all" || developer.location === selectedLocation;
    const matchesRating = Number(selectedRating) <= developer.rating;
    
    return matchesSearch && matchesLocation && matchesRating;
  });

  const locations = Array.from(new Set([...mockAgents, ...developers].map(a => a.location)));

  return (
    <div className="container px-4 py-6 pb-20">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Annuaire Promoteurs & Agents</h1>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <Input
                placeholder="Rechercher un promoteur ou agent par nom, localisation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Localisation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les localisations</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedRating} onValueChange={setSelectedRating}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Note minimale" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Toutes les notes</SelectItem>
                <SelectItem value="4">4+ étoiles</SelectItem>
                <SelectItem value="4.5">4.5+ étoiles</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="developers">Promoteurs</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDevelopers.map((developer) => (
              <DeveloperCard key={developer.id} developer={developer} />
            ))}
            {filteredAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="developers">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDevelopers.map((developer) => (
              <DeveloperCard key={developer.id} developer={developer} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="agents">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Directory;